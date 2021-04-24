n, m = map(int, input().split())

iceFrame = [list(map(int, input())) for _ in range(n)]
print(iceFrame)

count = 0

def check(i, j):
  if i - 1 < 0 or i + 1 > n or j - 1< 0 or j + 1 > m or iceFrame[i][j] == 1:
    return
  iceFrame[i][j] = 1
  check(i + 1, j)
  check(i, j + 1)
  check(i - 1, j)
  check(i, j - 1)

for i in range(n):
  for j in range(m):
    if iceFrame[i][j] == 0:
      count += 1
      check(i, j)

print(count)