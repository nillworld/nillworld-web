# https://programmers.co.kr/learn/courses/30/lessons/72416
from collections import defaultdict

def solution(sales, links):
    # links를 번호순으로 정렬
    links.sort(key=lambda x: (x[0], x[1]))
    totalTeamNum = links[-1][0]
    print(totalTeamNum)
    # 팀원으로 구성된 새로운 배열 초기화 / 팀장이 index 0, 팀장이 아니라도 하나의 팀으로 생각하여 배열 생성
    teams = [[i] for i in range(len(sales))]
    print(teams)
    # sales랑 계산하기 쉽게 번호 1 씩 빼서 팀원들 배열에 넣기
    for link in links:
        teams[link[0]-1].append(link[1]-1)
    print(teams)

    # 팀 연결관계 구하기
    # for team in teams:
    #     for leader in team




# check
    # dictionary = defaultdict(list)
    # for link in links:
    #     dictionary[link[0]-1].append(link[1]-1)
    # # teamCheck(0, dictionary)
    # print(dictionary)

    # for i in dictionary[0]:
    #     if(i in dictionary):
    #         leader = sales[i]
    #         # sales와 dictionary 파싱 해야함.
    #         others = min(sales[dictionary[i]],sales[i]) + min(sales[dictionary[0]], sales[0])
    #         # others = sales[min(dictionary[i])] + sales[min(dictionary[0])]
    #         print(others, leader)




    answer = 0
    return answer

# def teamCheck(checkKey, dictionary):
#     for member in dictionary[checkKey]:
#         if member in dictionary:
#             print(member)
#             if (checkKey+1 in dictionary):
#                 print("??")
#                 teamCheck(checkKey+1, dictionary)


    # 각 팀 관계에서 (연결된)팀장 매출 vs 나머지 인원 중 각 팀 두명 매출의 최소값
    ##### '두명 - 팀장'의 값이 최대 인 팀 연결 부터 처리. 그래서 제외할 두명 혹은 한명의 매출을 answer에 더함.
    ##### 나머지 팀 연결에서 '두명 - 팀장'의 값이 최대 인 팀 또 처리.


    # 팀 연결을 다 확인...?
    

sales = [5, 6, 5, 3, 4]
links = [[1,3], [1,4], [2,5], [1,2]]
#       1
#   3   4   2
#           5


# 팀을 만들자. team = [[1,4,2],[2,3,5]] 팀장은 team[n][0]에 위치.
# 각자의 매출을 dict로 만들자. {1: 5, 2: 6, 3: 5}
# 두 팀의 최소값 합 vs 연결된 팀장겸 팀원의 값  => 두 팀만 생각 했을 경우.
# 이를 여러 팀에서 생각.
print(solution(sales, links))