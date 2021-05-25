a, b = map(int, input().split())
count = 0
while a != 1:
  if(a % b == 0):
    a /= b
    count += 1  # ++count 안됨
  else:
    a -= 1
    count += 1
    # 이처럼한번씩 a를 뺄 수도 있지만 한번에 빼서 반복문 실행 횟수를 줄일려면
    ## target = (a // b) * b
    ## count += a - target     => 한번에 빼버림
    ## a = target

print(count)