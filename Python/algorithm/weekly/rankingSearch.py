# https://tech.kakao.com/2021/01/25/2021-kakao-recruitment-round-1/
# https://programmers.co.kr/learn/courses/30/lessons/72412
from bisect import bisect_left
from itertools import combinations

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
        for iA,iB,iC,iD,iE in quadraticInfo:
            # if qA != iA and qA != '-':
            #     continue
            # if qB != iB and qB != '-':
            #     continue
            # if qC != iC and qC != '-':
            #     continue
            # if qD != iD and qD != '-':
            #     continue
            # if int(qE) > int(iE):
            #     continue
            # answer[idx] += 1
            # 아래 코드랑 효율성 비슷

            if (qA == iA or qA == '-') and (qB == iB or qB == '-') and (qC == iC or qC == '-') and (qD == iD or qD == '-') and int(qE) <= int(iE):
                answer[idx] += 1
        idx += 1
    
    print(answer)


##################################################################
        
        
def solution2(info, query):
    answer = []
    db = {}
    for i in info:                   # info에 대해 반복
        temp = i.split()
        conditions = temp[:-1]       # 조건들만 모으고, 점수 따로
        score = int(temp[-1])  
        for n in range(5):           # 조건들에 대해 조합을 이용해서  
            combi = list(combinations(range(4), n)) # p = permutation (n!/(n-r)!) / c = combination (n!/r!/(n-r)!)
            for c in combi:
                t_c = conditions.copy()
                for v in c:          # '-'를 포함한 새로운 조건을 만들어냄.
                    t_c[v] = '-'
                changed_t_c = '/'.join(t_c)
                if changed_t_c in db:     # 모든 조건의 경우에 수에 대해 딕셔너리
                    db[changed_t_c].append(score)
                else:
                    db[changed_t_c] = [score]

    for value in db.values():             # 딕셔너리 내 모든 값 정렬
        value.sort()
        print(db)
 
    for q in query:                       # query의 모든 조건에 대해서
        qry = [i for i in q.split() if i != 'and']
        qry_cnd = '/'.join(qry[:-1])
        print(qry_cnd)
        qry_score = int(qry[-1])
        if qry_cnd in db:                 # 딕셔너리 내에 값이 존재한다면,
            data = db[qry_cnd]
            if len(data) > 0:          
                start, end = 0, len(data)     # lower bound 알고리즘 통해 인덱스 찾고,
                while start != end and start != len(data):
                    if data[(start + end) // 2] >= qry_score:
                        end = (start + end) // 2
                    else:
                        start = (start + end) // 2 + 1
                answer.append(len(data) - start)      # 해당 인덱스부터 끝까지의 갯수가 정답
        else:
            answer.append(0)

    return answer


##################################################################


def make_all_cases(separate_info):
    cases = []
    for k in range(5):
        for condition in combinations([0,1,2,3], k):
            case = []
            for idx in range(4):
                if idx not in condition:
                    case.append(separate_info[idx])
                else:
                    case.append('-')
            cases.append(''.join(case))
    return cases

def solution3(info, query):
    answer = []
    all_people = {}
    for i in info:
        seperate_info = i.split()
        cases = make_all_cases(seperate_info)
        for case in cases:
            if case not in all_people.keys():
                all_people[case] = [int(seperate_info[4])]
            else:
                all_people[case].append(int(seperate_info[4]))
    
    for key in all_people.keys():
        all_people[key].sort()
        
    for q in query:
        seperate_q = q.split(' and ')
        seperate_q.extend(seperate_q.pop().split())
        target = ''
        for sq in seperate_q[:4]:
            target += sq
        print(target)
        print(all_people.keys())
        if target in all_people.keys():
            answer.append(len(all_people[target]) - bisect_left(all_people[target], int(seperate_q[4]), lo=0, hi=len(all_people[target])))
        else:
            answer.append(0)
    return answer


##################################################################


def testCase():
    info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"]
    query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]

    print(solution2(info, query))

testCase()

# they ask about expect salary and I said, that time they nodded.
# But why today(after A week!) I got much less number, even there are already setted salary!!