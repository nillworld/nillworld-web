import sys
n, m, k = list(map(int, sys.stdin.readline().rstrip().split())) # or map(int,input().split())
data = list(map(int, sys.stdin.readline().rstrip().split()))
firstNum = 0
secoundNum = 0
for num in data:
  if(num >= secoundNum):
    secoundNum = num
  if(firstNum <= num):
    secoundNum = firstNum
    firstNum = num

a,b = divmod(m, k+1)
print(firstNum)
print(secoundNum)
print(a * (3*firstNum+secoundNum) + b* firstNum)