# https://programmers.co.kr/learn/courses/30/lessons/84325

# 점수	SI	        CONTENTS    HARDWARE  	PORTAL    	GAME
# 5   	JAVA	    JAVASCRIPT	C         	JAVA	    C++
# 4	    JAVASCRIPT	JAVA	    C++       	JAVASCRIPT	C#
# 3	    SQL       	PYTHON	    PYTHON    	PYTHON	    JAVASCRIPT
# 2	    PYTHON    	SQL       	JAVA      	KOTLIN	    C
# 1	    C#         	C++	        JAVASCRIPT	PHP	        JAVA

def solution(table, languages, preference):
    answer = ''
    dict = {}
    score = 0
    for jobPart in table:
        tableLine = list(jobPart.split())
        # tableLine = tableLine.replace("\"","")
        dict[tableLine[0]] = list(reversed(tableLine[1:]))
    for job in dict:
        # print(dict[job][0])
        jobscore = 0
        for i in range(len(dict[job])):
            if(dict[job][i] in languages):
                # print(job,dict[job][i],i)
                print(job,dict[job][i],preference[languages.index(dict[job][i])], i)
                jobscore = jobscore+ preference[languages.index(dict[job][i])]*(i+1)
        if (jobscore > score):
            score = jobscore
            answer = job
        print(score, job)



        # for language in languages:
        #     if (dict[job])
            
        # for language in dict[job]:
            # if(language in )
    return answer




table = ["SI JAVA JAVASCRIPT SQL PYTHON C#", "CONTENTS JAVASCRIPT JAVA PYTHON SQL C++", "HARDWARE C C++ PYTHON JAVA JAVASCRIPT", "PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP", "GAME C++ C# JAVASCRIPT C JAVA"]
languages = ["PYTHON", "C++", "SQL"]
preference = [7, 5, 5]


print(solution(table, languages, preference))