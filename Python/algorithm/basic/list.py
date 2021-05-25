a = [chr(i) for i in range(97, 102)]
print("기본 리스트:", a)

a.append(chr(100))
print("추가:", a)

a.insert(2, chr(105))
print("삽입:", a)

# 단순히 temp = a 로 한다면 a랑 temp랑 
## 동일한 레퍼런스를 가져, a를 바꾸면 temp도 바뀐다.
temp = [] 
for i in a:
  temp.append(i)
a.sort()
print("정렬 전:", temp)
print("정렬 후:", a)

a.sort(reverse=True)
print("내림차순:", a)

a.reverse()
print("뒤집기:", a)

print("특정 값 개수:", a.count('a'))

a.remove('i')
print("특정 값 하나 제거:", a)

remove_set = ['a', 'd']
removed_a = [i for i in a if i not in remove_set]
print("여러 값 제거:", removed_a)