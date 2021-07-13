#https://programmers.co.kr/learn/courses/30/lessons/1845

def solution(nums):
    answer = 0
    numLen = len(nums)
    noDupList = list(set(nums))
    if len(nums)/2 >= len(noDupList):
        answer = len(noDupList)
    else:
        answer = int(len(nums)/2)
    
    return answer

numsArray = [[3,1,2,3],[3,3,3,2,2,4],[3,3,3,2,2,2]]
for nums in numsArray:
    print(solution(nums))