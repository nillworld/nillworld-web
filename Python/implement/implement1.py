size = int(input())
directions = list(input().split())

x = 1
y = 1  # x, y = 1, 1

for direction in directions:
  if(direction == 'R' and size > x ):
    x += 1
  if(direction == 'L' and 1 < x ):
    x -= 1
  if(direction == 'U' and 1 < y ):
    y -= 1
  if(direction == 'D' and size > y ):
    y += 1

print(y,x)

### ------------------- ###

n = int(input())
x, y = 1, 1
directions = input().split()
move_direction = ['L', 'R', 'U', 'D']
dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]

for direction in directions:
  for i in range(len(move_direction)):
    if direction == move_direction[i]:
      nx = x + dx[i]
      ny = y + dy[i]
  if nx < 1 or ny < 1 or nx > 1 or ny > n:
    continue
  x, y = nx, ny

print(x, y)