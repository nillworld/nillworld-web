# https://programmers.co.kr/learn/courses/30/lessons/17676
import time
def solution(lines):
  # 임의의 1초동안 잠시라도 겹치는 처리 중, 최대 처리량을 구하는 것
  answer = 0
  k = 0
  for line in lines:
    # line의 시간을 계산하기 쉽게 나누기
    day, timeString, term = list(line.split())
    timeString = day + ' ' + timeString
    
    #term의 마지막 's' 떼어내고 숫자 변환
    term = float(term[:-1])

    timeValue = time.strptime(timeString, '%Y-%m-%d %H:%M:%S.%f')
    print(timeValue)




  # 시간은 오름차 정리 해서 각 트래픽의 시작시간 기준으로 1초 동안에 해당되는 트래픽 개수 구하기
  
  # 각 트래픽을  0.001초 단위로 쪼개서 map으로 key는 시간, value는 key에 해당하는 트래픽을 카운트 해 넣는다.
  # 시간 복잡도는 3000x2000 (각 트래픽마다 mapping 하는게 최대 3000개, 그 트래픽의 최대 개수는 2000개 이므로)




  return answer

# lines의 배열 길이는 최대 2000, 최소 1
# 응답 완료 시간 S = 2016-09-15(고정) hh:mm:ss.sss
# 처리시간 T = 0.321s(소수점 셋째 자리까지 끝에는 s로 끝남) /  0.001 <= T <= 3.000
lines = ["2016-09-15 01:00:04.001 2.0s", "2016-09-15 01:00:07.000 2s"]
print(solution(lines));
