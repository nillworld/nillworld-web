# https://leetcode.com/problems/climbing-stairs/

# you are climbing a staircase. It takes "n" steps to reach the top.
# Each time you can either climb "1" or "2" steps. In how many distinct ways can you climb to the top?

# def dpStairs(n, dp):
#   print(dp)
#   if dp[n] != 0:
#     return dp[n]
#   dp[n] = dpStairs(n-1, dp)+dpStairs(n-2, dp)

# def climbStairs(steps):
#   dp=[0]*steps
#   dp[0] = 1
#   dp[1] = 2
#   dpStairs(steps-1, dp)

def climbStairs(n: int) -> int:
    c = [0]*(n+1)
    c[0] = 1
    c[1] = 2

    if n < 3:
        return c[n-1]

    for i in range(2,n):
        c[i] = c[i-1] + c[i-2] 

    return c[n-1]


print(climbStairs(45))