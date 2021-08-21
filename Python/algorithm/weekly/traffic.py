# https://programmers.co.kr/learn/courses/30/lessons/17676
from datetime import datetime

def checkBeforeTraffic(count, trafficList, trafficCheckTime, checkIndex):
  if (checkIndex > 0 and (trafficCheckTime <= trafficList[1][checkIndex-1] < trafficCheckTime + 1000 or (trafficList[0][checkIndex-1] < trafficCheckTime and trafficList[1][checkIndex-1] > trafficCheckTime + 1000 ))):
    count += 1
    count = checkBeforeTraffic(count, trafficList, trafficCheckTime, checkIndex-1)
  
  print("checkBeforeTraffic/// ",count, trafficCheckTime, checkIndex)
  return count

def checkAfterTraffic(count, trafficList, trafficCheckTime, checkIndex):
  if (checkIndex < len(trafficList[0])-1 and (trafficCheckTime <= trafficList[0][checkIndex+1] < trafficCheckTime + 1000 or (trafficList[0][checkIndex+1] < trafficCheckTime and trafficList[1][checkIndex+1] > trafficCheckTime + 1000 ))):
    count += 1
    count = checkAfterTraffic(count, trafficList, trafficCheckTime, checkIndex+1)
  
  print("checkAfterTraffic/// ",count, trafficCheckTime, checkIndex)
  return count


def checkBeforeTraffic2(count, trafficList, trafficCheckTime, checkIndex):
  if (checkIndex > 0 and trafficCheckTime-1000 <= trafficList[1][checkIndex-1] < trafficCheckTime):
    count += 1
    count = checkBeforeTraffic(count, trafficList, trafficCheckTime, checkIndex-1)
  
  print("checkBeforeTraffic/// ",count, trafficCheckTime, checkIndex)
  return count

def checkAfterTraffic2(count, trafficList, trafficCheckTime, checkIndex):
  if (checkIndex < len(trafficList[0])-1 and trafficCheckTime - 1000 <= trafficList[0][checkIndex+1] < trafficCheckTime):
    count += 1
    count = checkAfterTraffic(count, trafficList, trafficCheckTime, checkIndex+1)
  
  print("checkAfterTraffic/// ",count, trafficCheckTime, checkIndex)
  return count


def solution(lines):
  # 임의의 1초동안 잠시라도 겹치는 처리 중, 최대 처리량을 구하는 것
  answer = 0
  trafficList = [[],[]]
  for line in lines:
    print(line)
    # line의 시간을 계산하기 쉽게 나누기
    day, timeString, term = list(line.split())
    timeString = day + ' ' + timeString
    
    #term의 마지막 's' 떼어내고 숫자 변환
    term = float(term[:-1])

    timeValue = datetime.strptime(timeString, '%Y-%m-%d %H:%M:%S.%f')

    # 시간만 숫자로 변환 후 응답이 끝난 시간 셋팅
    endTime = (timeValue.hour * 60 + timeValue.minute)*60 + timeValue.second + timeValue.microsecond/1000000
    startTime = endTime-term+0.001

    # 계산하기 쉽게 응답 시작과 끝 시간을 자연수로 변환
    changedEndTime = int(endTime*1000)
    changedStartTime = int(startTime*1000)

    trafficList[0].append(changedStartTime)
    trafficList[1].append(changedEndTime)
    
  # 트래픽 시작 시간 순으로 정렬
  trafficList[0].sort()
  print(trafficList)
  index = 0
  for trafficStartTime in trafficList[0]:
    count = 1
    count = checkBeforeTraffic(count, trafficList, trafficStartTime, index)
    count = checkAfterTraffic(count, trafficList, trafficStartTime, index)
    print(count, "???")
    if (count > answer):
      answer = count
    
    count = 1
    trafficEndTime = trafficList[1][index]
    count = checkBeforeTraffic2(count, trafficList, trafficEndTime, index)
    count = checkAfterTraffic2(count, trafficList, trafficEndTime, index)
    if (count > answer):
      answer = count

    index += 1


    # for i in range(0, len(trafficList[0])):
    #   if(trafficStartTime<= trafficList[0][i] <= trafficStartTime + 1000 or trafficStartTime<= trafficList[1][i] <= trafficStartTime + 1000):
    #     count += 1
    #   if(count > answer):
    #     answer = count



    # for trafficTime in trafficList:
    #   if ( trafficStartTime <= trafficTime[0]<= trafficStartTime+1000 or trafficStartTime <= trafficTime[1]<= trafficStartTime+1000):
    #     count += 1
    #   if(count > answer):
    #     answer = count


  # trafficList.sort(count=lambda x:x[0])
  # for i in range(len(trafficList)):
  #   for checkTime in range(trafficList[0][0],trafficList[0][1]+1):
  #       count=0
  #       # checkTime에서 1초간 트래픽 얼마나 있는지 구하기
  #       for traffic in trafficList:
  #         if(checkTime <= traffic[0] <checkTime + 1000 or checkTime <= traffic[1] <checkTime + 1000 ):
  #           count += 1
  #         if(count > answer):
  #           answer = count
  #   if(i> 0 and trafficList[i][0] > trafficList[i-1][1]):
  #     for checkTime in range(trafficList[i][0],trafficList[i][1]):
  #       count=0
  #       # checkTime에서 1초간 트래픽 얼마나 있는지 구하기
  #       for traffic in trafficList:
  #         if(checkTime <= traffic[0] <checkTime + 1000 or checkTime <= traffic[1] <checkTime + 1000 ):
  #           count += 1
  #         if(count > answer):
  #           answer = count
  #   elif(i> 0 and trafficList[i][0] <= trafficList[i-1][1]):
  #     for checkTime in range(trafficList[i-1][1],trafficList[i][1]):
  #       count=0
  #       # checkTime에서 1초간 트래픽 얼마나 있는지 구하기
  #       for traffic in trafficList:
  #         if(checkTime <= traffic[0] <checkTime + 1000 or checkTime <= traffic[1] <checkTime + 1000 ):
  #           count += 1
  #         if(count > answer):
  #           answer = count



  # 시간은 오름차 정리 해서 각 트래픽의 시작시간 기준으로 1초 동안에 해당되는 트래픽 개수 구하기
  
  # 각 트래픽을  0.001초 단위로 쪼개서 map으로 key는 시간, value는 key에 해당하는 트래픽을 카운트 해 넣는다.
  # 시간 복잡도는 3000x2000 (각 트래픽마다 mapping 하는게 최대 3000개, 그 트래픽의 최대 개수는 2000개 이므로)
      # ====> 이 방법은 0.001 순간의 트래픽만 계산... 우린 1초 동안의 개수 구해야함



  return answer

# lines의 배열 길이는 최대 2000, 최소 1
# 응답 완료 시간 S = 2016-09-15(고정) hh:mm:ss.sss
# 처리시간 T = 0.321s(소수점 셋째 자리까지 끝에는 s로 끝남) /  0.001 <= T <= 3.000
lines = ["2016-09-15 20:59:57.421 0.351s",
"2016-09-15 20:59:58.233 1.181s",
"2016-09-15 20:59:58.299 0.8s",
"2016-09-15 20:59:58.688 1.041s",
"2016-09-15 20:59:59.591 1.412s",
"2016-09-15 21:00:00.464 1.466s",
"2016-09-15 21:00:00.741 1.581s",
"2016-09-15 21:00:00.748 2.31s",
"2016-09-15 21:00:00.966 0.381s",
"2016-09-15 21:00:02.066 2.62s"]
print(solution(lines));
