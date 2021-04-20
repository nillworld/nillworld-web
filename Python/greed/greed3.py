import sys
a, b = map(int,sys.stdin.readline().rstrip().split()) # map(int,input().split())
k = 0
for i in range(a):
  oneLine = list(map(int,sys.stdin.readline().rstrip().split())) # list(map(int, input().split()))
  oneLine.sort() # sort된 oneLine[0]대신 min(oneLine)으로 가장 작은 수 찾기 가능
  if(oneLine[0] > k):  # if문으로 비교해서 큰수 찾아내는거 대신 k = max(k, oneLine[0])으로 가능
    k = oneLine[0]

print(k)
    

