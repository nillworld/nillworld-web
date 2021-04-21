import sys

m, n = map(int, sys.stdin.readline().split())

locationM, locationN, direction = map(int, sys.stdin.readline().split())

checkArray = [[0] * n for _ in range(m)]

mapCondition = [list(map(int, sys.stdin.readline().split())) for _ in range(m)]




