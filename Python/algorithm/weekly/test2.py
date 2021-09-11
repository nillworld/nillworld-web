def solution(a, b, g, s, w, t):
    answer = -1
    checkWeights = []
    checkTime = []
    for i in range(len(s)):
        if g[i]+s[i] < w[i]:
            checkWeights.append([(g[i]+s[i])/t[i],i])
        else:
            checkWeights.append([w[i]/t[i], i])
    checkWeights.sort(reverse=True)
    for checkWeight in checkWeights:
        eachTime = 0
        while not (g[checkWeight[1]] == 0 and s[checkWeight[1]] == 0) or ((a != 0 and g[checkWeight[1]] == 0) and ( b == 0 or s[checkWeight[1]] == 0)) or ((b != 0 and s[checkWeight[1]] == 0) and ( a == 0 or g[checkWeight[1]] == 0)):
            a - g[checkWeight[1]]
            
        print(checkWeight)
    # print(checkWeights)
    return answer

a = 90
b = 500
g = [70,70,0]
s = [0,0,500]
w = [100,100,2]
t = [4,8,1]
solution(a,b,g,s,w,t)