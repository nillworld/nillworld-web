n = 1260
count = 0
coin_types = [500, 100, 50, 10]
for coin in coin_types:
  a,b = divmod(n, coin)
  n = b
  count += a

print(count)

##  ---------------------------------------    ##

# 큰 단위의 화폐부터 차례대로 확인하기
coin_types = [500, 100, 50, 10]

for coin in coin_types:
    count += n // coin # 해당 화폐로 거슬러 줄 수 있는 동전의 개수 세기
    n %= coin

print(count)


######################################################################


