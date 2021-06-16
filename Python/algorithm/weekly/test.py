# 배열에 행열 추가 삭제
import numpy as np
print(np.eye(5))
aa = np.eye(3)
print(aa, end='\n\n')
bb = np.c_[aa, aa[2]] # 열 추가 2번째 열을 하나 더 추가 후 출력
print(bb, end='\n\n')

cc = np.r_[aa, [aa[2]]] # 2번째 행 추가 후 출력
print(cc, end='\n\n')

a = np.array([1,2,3])
print(a, end='\n\n')
print(np.c_[a], end='\n\n')
print(a.reshape(3,1), end='\n\n')


# test line