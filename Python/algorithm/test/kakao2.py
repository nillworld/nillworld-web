def is_prime_number(x):
    # 2부터 (x - 1)까지의 모든 수를 확인
    for i in range(2, x):
        # x가 해당 수로 나누어떨어지면
        if x % i == 0:
            return False
    return True

def solution(n, k):
    answer = 0
    changedN = ""
    if k != 10:
        while n > 0:
            n = n // k
            mod = n % k
            changedN += str(mod)
        changedN = changedN[::-1]
        checkNumbers = list(changedN.split("0"))
    else:
        checkNumbers = list(str(n).split("0"))
    for checkNumber in checkNumbers:
        if checkNumber != "":
            checkNumber = int(checkNumber)
            if checkNumber > 1:
                if checkNumber == 2:
                    answer += 1
                else:
                    if is_prime_number(checkNumber):
                        answer += 1
    return answer



n = 80000
k = 10
print(solution(n, k))