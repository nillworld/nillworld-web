# https://programmers.co.kr/learn/courses/30/lessons/72416

def solution(sales, links):
    answer = 0
    return answer


salse = [5, 6, 5, 3, 4]
links = [[2,3], [1,4], [2,5], [1,2]]
# 팀을 만들자. team = [[1,4,2],[2,3,5]] 팀장은 team[n][0]에 위치.
# 각자의 매출을 dict로 만들자. {1: 5, 2: 6, 3: 5}
# 두 팀의 최소값 합 vs 연결된 팀장겸 팀원의 값  => 두 팀만 생각 했을 경우.
# 이를 여러 팀에서 생각.
print(solution(salse, links))