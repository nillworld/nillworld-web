y,x = list(input())
count = 8

if int(x) == 1 or int(x) == 8:
  count -= 4
if int(x) == 2 or int(x) == 7:
  count -= 2
if y == 'a' or y == 'h':
  count -= 4
  if int(x) == 1 or int(x) == 8:
    count += 2
  if int(x) == 2 or int(x) == 7:
    count += 1
if y == 'b' or y == 'g':
  count -= 2
  if int(x) == 1 or int(x) == 8:
    count += 2

print(count)


### ------------------- ###

inputData = input()
row = int(inputData[1])
column = int(ord(inputData[0])) - int(ord('a')) + 1

steps = [(-2,-1),(-2,1),(2,-1),(2,1),(1,-2),(1,2),(-1,2),(-1,-2)]

result = 0
for step in steps:
  nextRow = row + step[1]
  nextColumn = column + step[0]
  if nextRow >= 1 and nextRow <= 8 and nextColumn >= 1 and nextColumn <= 8:
    result += 1
print(result)