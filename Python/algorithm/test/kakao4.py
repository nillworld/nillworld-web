import itertools

def solution(n, info):
    answer = []
    score = 0
    ways = list(itertools.combinations_with_replacement(([i for i in range(11)]), n))
    for way in ways:
        tempScore = 0
        tempInfo = [0]*11
        for i in way:
            tempInfo[i] += 1
        # print(tempInfo)
        for i in range(len(info)):
            if tempInfo[i] > info[i]:
                tempScore += 10-i
            if tempInfo[i] <= info[i] and info[i] > 0:
                tempScore -= 10-i
            
            if tempScore > score:
                score = tempScore
                answer = tempInfo
    print(score)
    if answer <= 0:
        answer = [-1]
    return answer
n = 5
info = [2,1,1,1,0,0,0,0,0,0,0]
print(solution(n, info))