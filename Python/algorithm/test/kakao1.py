from collections import defaultdict


def solution(id_list, reports, k):
    checkReports = defaultdict(set)
    successReportIds = []
    answer = [0]  *  len(id_list)

    for repost in reports:
        temp = list(repost.split())
        checkReports[temp[1]].add(temp[0])
    # checkReports key: reported user, checkReports value: report users
    for reportedId in checkReports:
        if len(checkReports[reportedId]) >= k:
            for reportId in checkReports[reportedId]:
                successReportIds.append(reportId)
            
    for successReportId in successReportIds:
        for i in range(len(id_list)):
            if successReportId == id_list[i]:
                answer[i] += 1
    return answer

    
id_list = ["muzi", "frodo", "apeach", "neo"]
report = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]
k = 2
print(solution(id_list,report, k))