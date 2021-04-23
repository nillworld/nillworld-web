a = 10
b = a
print(b)
a = 11
print(b)

array = ['a', 'b']
copyArray = array
print(copyArray)
array.append('k')
print(copyArray)

test = ['e', 'f', 'a']
test2 = [i for i in test if i in {'e', 'a'}]
test.sort()
print(test2)

test3 = ['e', 'f', 'g', 's', 'k']
k = test3[1::2]
print(k)