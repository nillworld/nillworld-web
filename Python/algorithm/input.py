import sys
data = input()  ##단순 입력 받기
data1 = list(map(int, input().split())) ## 공백으로 구분하여 입력받은 값 int로 맵핑해서 배열로 만듬
data2 = sys.stdin.readline().rstrip() ## input보다 동작속도 빠른 라이브러리 sys.stdin(standard input).readline / rstrip()는 줄바꿈(엔터) 미포함.
data = data * 2
data2 = data2 * 1
print(data1)
print(data + data2)
print(int(data)+int(data2))
print("it is "+ str(300) + "test") ## str() 없으면 type 에러.  + 대신 , 쓰면 공백 생김.
