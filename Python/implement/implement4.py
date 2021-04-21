n, m = map(int, input().split())
d = [ [0] * m for _ in range(n) ]

x, y, direction = map(int, input().split())
d[x][y] = 1

# array = [[0] * m] * n으로 초기화 하면 n개가 동일한 레퍼런스를 가짐
array = []
for i in range(n):
  array.append(list(map(int, input().split())))

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]
def turnLeft():
  global direction
  direction -= 1
  if direction == -1:
    direction = 3

count = 1
turnTime = 0
while True:
  turnLeft()
  nx = x + dx[direction]
  ny = y + dy[direction]
  
  if d[nx][ny] == 0 and array[nx][ny] == 0:
    d[nx][ny] = 1
    x = nx
    y = ny
    count += 1
    turnTime = 0
    continue
  else:
    turnTime += 1
  
  if turnTime == 4:
    nx = x - dx[direction]
    ny = y - dy[direction]
    
    if array[nx][ny] == 0:
      x = nx
      y = ny
    else:
      break
    turnTime = 0

print(count)
