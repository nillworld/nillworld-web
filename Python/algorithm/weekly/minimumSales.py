# https://programmers.co.kr/learn/courses/30/lessons/72416
from collections import defaultdict

def solution(sales, links):
    dictionary = defaultdict(list)
    for link in links:
        dictionary[link[0]-1].append(link[1]-1)
    teamCheck(0, dictionary)
    print(dictionary)
    answer = 0
    return answer

def teamCheck(checkKey, dictionary):
    for member in dictionary[checkKey]:
        if member in dictionary:
            print(member)
            if (checkKey+1 in dictionary):
                print("??")
                teamCheck(checkKey+1, dictionary)


    # 각 팀 관계에서 (연결된)팀장 매출 vs 나머지 인원 중 각 팀 두명 매출의 최소값
    ##### '두명 - 팀장'의 값이 최대 인 팀 연결 부터 처리. 그래서 제외할 두명 혹은 한명의 매출을 answer에 더함.
    ##### 나머지 팀 연결에서 '두명 - 팀장'의 값이 최대 인 팀 또 처리.


sales = [5, 6, 5, 3, 4]
links = [[1,3], [1,4], [2,5], [1,2]]
#       1
#   3   4   2
#          4 5


# 팀을 만들자. team = [[1,4,2],[2,3,5]] 팀장은 team[n][0]에 위치.
# 각자의 매출을 dict로 만들자. {1: 5, 2: 6, 3: 5}
# 두 팀의 최소값 합 vs 연결된 팀장겸 팀원의 값  => 두 팀만 생각 했을 경우.
# 이를 여러 팀에서 생각.
print(solution(sales, links))