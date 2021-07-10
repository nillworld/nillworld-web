# https://programmers.co.kr/learn/courses/30/lessons/17683

def solution(m, musicinfos):
  answer = 'none'
  playtheMusic = 0
  eachMusic = []
  for musicinfo in musicinfos:
    eachMusic = list(musicinfo.split(","));
    playHour = int(eachMusic[1][:2]) - int(eachMusic[0][:2])
    playMinute = int(eachMusic[1][3:]) - int(eachMusic[0][3:]) + playHour* 60

    if len(eachMusic[3]) < playMinute:
      quotient = playMinute // len(eachMusic[3])
      remainder = playMinute % len(eachMusic[3])
      compareMelody = eachMusic[3]*quotient+eachMusic[3][:remainder]
    else:
      compareMelody = eachMusic[3][:playMinute]

    if m[-1:] == '#':
      if m in compareMelody:
        if playtheMusic < playMinute:
          answer = eachMusic[2]
    else:
      if m in compareMelody:
        if m + '#' not in compareMelody+ compareMelody[0]:
          if playtheMusic < playMinute:
            answer = eachMusic[2]
      
  return answer
      



#####################################
m = ["ABCDEFG", "CC#BCC#BCC#BCC#B", "ABC"]
musicinfos = 	[["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"],["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"],["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]]

for i in range(len(m)):
  print(solution(m[i], musicinfos[i]))
