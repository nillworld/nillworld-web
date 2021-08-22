from datetime import datetime
def solution(lines):
    answer = 0
    trafficTimeList = []
    for line in lines:
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

        trafficTimeList.append([changedStartTime, changedEndTime])

    # 하나의 트래픽 '끝나는 시간' ~ '끝나는시간 + 1000'구간  다른 트래픽
    for i in range(len(trafficTimeList)):
        count = 1
        checkTime = trafficTimeList[i][1]
        for j in range(len(trafficTimeList)):
            if i == j:
                continue
            t_StartTime = trafficTimeList[j][0]
            t_EndTime = trafficTimeList[j][1]
            if checkTime <= t_StartTime < checkTime + 1000:
                count += 1
            elif checkTime <= t_EndTime < checkTime + 1000:
                count += 1
            elif t_StartTime <= checkTime and checkTime + 1000 <= t_EndTime:
                count += 1
        if count > answer:
            answer = count

    return answer

