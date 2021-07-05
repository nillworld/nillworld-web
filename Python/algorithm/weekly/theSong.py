# https://programmers.co.kr/learn/courses/30/lessons/17683

def solution(m, musicinfos):
  answer = ''
  rememberM = len(m)
  songLength = ''
  eachMusic = []
  playH = int(musicinfos[0][6]+musicinfos[0][7])-int(musicinfos[0][0]+musicinfos[0][1])
  playM = int(musicinfos[0][9]+musicinfos[0][10])-int(musicinfos[0][3]+musicinfos[0][4]) + playH*60
  playLength = playM //rememberM

  for musicinfo in musicinfos:
    eachMusic = list(musicinfo.split(","));
    playHour = int(eachMusic[1][:2]) - int(eachMusic[0][:2])
    playMinute = int(eachMusic[1][3:]) - int(eachMusic[0][3:]) + playHour* 60
    doubleMelody = eachMusic[3] * 2
    if len(doubleMelody) >= playMinute:
      compareMelody = doubleMelody[:playMinute]
    else:
      k = playMinute// len(doubleMelody)
      l = playMinute % len(doubleMelody)
      compareMelody = eachMusic[3]*k + eachMusic[3][:l]
    if m[len(m)-1] == '#':
      if m in compareMelody:
        return eachMusic[2]
    else:
      if m in compareMelody:
        ######### 3번째 마지막 C랑 C# 구별 안되고 있음
        if m + '#' not in compareMelody+ compareMelody[0]:
          print(m)
          return eachMusic[2]
      
    if m in compareMelody:
      return eachMusic[2]
  return "none"
      



#####################################
m = ["ABCDEFG", "CC#BCC#BCC#BCC#B", "ABC"]
musicinfos = 	[["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"],["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"],["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]]

for i in range(len(m)):
  print(solution(m[i], musicinfos[i]))
