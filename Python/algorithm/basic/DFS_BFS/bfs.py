from collections import deque
def bfs(nodeGraph, currentNode, visitedNode):
  queBox = deque([currentNode])
  visitedNode[currentNode - 1] = True

  while queBox:
    node = queBox.popleft()
    print(node, end=' ')
    for connectedNode in nodeGraph[node - 1]:
      if not visitedNode[connectedNode - 1]:
        queBox.append(connectedNode)
        visitedNode[connectedNode - 1] = True


nodeGraph = [[2,3,8],[1,7],[1,4,5],[3,5],[3,4],[7],[2,6,8],[1,7]]

visitedNode = [False] * 8

bfs(nodeGraph, 1, visitedNode)

from itertools import combinations
from itertools import permutations
test = list(permutations(nodeGraph, 2))
# print(node_graph)