connectList = [[3,4,6],[3],[1,2,5],[1,7],[3],[1,7,8],[4,6,8],[6,7]]
visitedList = [False]*8

def nodeCheck(connectList, currentNode, visitedList):
  print(currentNode)
  visitedList[currentNode - 1] = True
  for connectNode in connectList[ currentNode - 1 ]:
    if not visitedList[connectNode - 1]:
      nodeCheck(connectList, connectNode, visitedList)

nodeCheck(connectList, 1, visitedList)
