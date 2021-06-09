# https://programmers.co.kr/learn/courses/30/lessons/72412

def solution(info, query):

    idx = 0
    answer = [0]*len(query)
    quadraticInfo = []
    quadraticQuery = []

    for eachInfo in info:
        quadraticInfo.append(list(eachInfo.split()))

    for eachQuery in query:
        eachQuery = eachQuery.replace('and ', '')
        quadraticQuery.append(list(eachQuery.split()))
    
    for qA,qB,qC,qD,qE in quadraticQuery:
        for iA,iB,iC, iD,iE in quadraticInfo:
            if (qA == iA or qA == '-') and (qB == iB or qB == '-') and (qC == iC or qC == '-') and (qD == iD or qD == '-') and int(qE) <= int(iE):
                answer[idx] += 1
        idx += 1
    
    print(answer)
        
        
    
    

def testCase():
    info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"]
    query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]

    solution(info, query)

testCase()