a = [i for i in range(10) if i % 3 == 2]
print(a)
print(sum(a))
print(min(a))

b = [i for i in range(eval('5'))]
print(b)

c = [[i, chr(i+97)] for i in range(10)]
print(c)
c.sort(reverse=True)
print(c)
c.reverse
sorted_c = sorted(c, key = lambda x: x[1], reverse=True)
print(sorted_c)

sorted_c.insert(2,[6,'e'])
print(sorted_c)
sorted_c = sorted(sorted_c, key = lambda x: x[1], reverse=True)
print(sorted_c)

############## 미쳤따~~
aa = [[i,k] for i in range(2) for k in range(6, 10)]
print(aa)
bb = sorted(aa, key = lambda x : x[0], reverse=True)
print(bb)
cc = sorted(aa, key= lambda x:x[0] -x[1])
print(cc)