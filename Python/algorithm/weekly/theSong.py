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
    print(eachMusic)
  return playLength



#####################################
m = ["ABCDEFG", "CC#BCC#BCC#BCC#B", "ABC"]
musicinfos = 	[["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"],["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"],["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]]

for i in range(len(m)):
  print(solution(m[i], musicinfos[i]))
