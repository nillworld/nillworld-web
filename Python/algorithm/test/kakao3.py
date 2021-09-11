from collections import defaultdict
import math


def solution(fees, records):
    answer = []
    totalTimes = defaultdict(int)
    recordsDic = {}
    totalfees = {}
    for record in records:
        record = list(record.split())
        if record[2] == "IN":
            recordsDic[record[1]] = int(record[0][:2])* 60 + int(record[0][3:])
        if record[2] == "OUT":
            totalTimes[record[1]] = totalTimes[record[1]] + int(record[0][:2])* 60 + int(record[0][3:]) - recordsDic[record[1]]
            del recordsDic[record[1]]
    for eachRecordsDic in recordsDic:
        totalTimes[eachRecordsDic] = totalTimes[eachRecordsDic] + 60*23 + 59 - recordsDic[eachRecordsDic]
    for totalTime in totalTimes:
        if totalTimes[totalTime]-fees[0] < 0:
            addfee = 0
        else:
            addfee = math.ceil((totalTimes[totalTime]-fees[0])/fees[2])* fees[3]
        totalfees[totalTime] = fees[1] + addfee
    totalfees = sorted(totalfees.items())
    for key, value in totalfees:
        answer.append(value)
    return answer


fees = [180, 5000, 10, 600]
records = ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]
print(solution(fees, records))