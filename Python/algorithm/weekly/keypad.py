def distance(state, target):
  statePoint = [state / 3, state % 3]
  if state % 3 == 0:
    statePoint[0] = statePoint[0] - 1
    statePoint[1] = 3
  targetPoint  = [target / 3 , target % 3]
  if target % 3 == 0:
    targetPoint[0] = targetPoint[0] - 1
    targetPoint[1] = 3
  distance = abs(targetPoint[0] - statePoint[0]) + abs(targetPoint[1] - statePoint[1])
  return distance

def solution(numbers, hand):
  answer = ''
  handPoint = [10, 12]
  for i in numbers:
    if i == 1 or i == 4 or i == 7:
      handPoint[0] = i
      answer += str(i)
    elif i == 3 or i == 6 or i == 9:
      handPoint[1] = i
      answer += str(i)
    else:
      
      answer += 'A'

  return answer



testCase = [[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"]
testCase2 = [[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"]

print(solution(testCase[0], testCase[1]))