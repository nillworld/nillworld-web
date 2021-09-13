import itertools

def solution(n, info):
    answer = []
    score = 0
    # 몇번째 과녁에 쏘았는지 경우의 수를 중복조합을 이용하여 배열로 나타냄
    ways = list(itertools.combinations_with_replacement(([i for i in range(11)]), n))
    # print(ways)
    for way in ways:
        tempScore = 0
        tempInfo = [0]*11

        # 경우의 수 배열 하나를 과녁 스코어에 매칭  ex) [1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0]
        for i in way:
            tempInfo[i] += 1

        for i in range(len(info)):
            if tempInfo[i] > info[i]:
                tempScore += 10-i
            if tempInfo[i] <= info[i] and info[i] > 0:
                tempScore -= 10-i
            
        if tempScore > score:
            score = tempScore
            answer = tempInfo
    print(score)
    if score <= 0:
        answer = [-1]
    return answer
n = 5
info = [2,1,1,1,0,0,0,0,0,0,0]
print(solution(n, info))
