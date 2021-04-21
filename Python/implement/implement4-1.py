import sys

m, n = map(int, sys.stdin.readline().split())

locationM, locationN, direction = map(int, sys.stdin.readline().split())

checkArray = [[0] * n for _ in range(m)]
checkArray[locationM][locationN] = 1

mapCondition = [list(map(int, sys.stdin.readline().split())) for _ in range(m)]

count = 1
moveCheck = False
aroundCheck = 0
checkDirectionM = locationM
checkDirectionN = locationN

while True:
  direction -= 1
  if direction == -1:
      direction = 3


  if direction == 0:
    checkDirectionM -= 1
  if direction == 1:
    checkDirectionN += 1
  if direction == 2:
    checkDirectionM += 1
  if direction == 3:
    checkDirectionN -= 1


  if mapCondition[checkDirectionM][checkDirectionN] != 1 and checkArray[checkDirectionM][checkDirectionN] != 1:
    locationM = checkDirectionM
    locationN = checkDirectionN
    checkArray[locationM][locationN] = 1
    count += 1
    aroundCheck = 0
  
  else:
    aroundCheck += 1
    checkDirectionM = locationM
    checkDirectionN = locationN

    if aroundCheck == 4:
      if direction == 0:
        checkDirectionM += 1
      if direction == 1:
        checkDirectionN -= 1
      if direction == 2:
        checkDirectionM -= 1
      if direction == 3:
        checkDirectionN += 1
      if mapCondition[checkDirectionM][checkDirectionN] == 1:
        break
      else:
        locationM = checkDirectionM
        locationN = checkDirectionN
        aroundCheck = 0

print(count)