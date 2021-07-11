# https://programmers.co.kr/learn/courses/30/lessons/17683

def solution(m, musicinfos):
  answer = '(None)' 
  tempMusicLen = 0 
  m = m.replace("C#","c")
  m = m.replace("D#","d")
  m = m.replace("F#","f")
  m = m.replace("G#","g")
  m = m.replace("A#","a")
  for musicinfo in musicinfos:
    startTime = list(musicinfo.split(","))[0]
    endTime = list(musicinfo.split(","))[1]
    musicTitle = list(musicinfo.split(","))[2]
    playMelody = list(musicinfo.split(","))[3]
    playMelody = playMelody.replace("C#","c")
    playMelody = playMelody.replace("D#","d")
    playMelody = playMelody.replace("F#","f")
    playMelody = playMelody.replace("G#","g")
    playMelody = playMelody.replace("A#","a")
    playHour = int(endTime[:2]) - int(startTime[:2])
    playMinute = int(endTime[3:]) - int(startTime[3:]) + playHour* 60

    if len(playMelody) < playMinute:
      quotient = playMinute // len(playMelody)
      remainder = playMinute % len(playMelody)
      compareMelody = playMelody*quotient+playMelody[:remainder]
    else:
      compareMelody = playMelody[:playMinute]
    
    if m in compareMelody:
      if tempMusicLen < playMinute:
        answer = musicTitle
        tempMusicLen = playMinute
  return answer
      



#####################################
m = ["ABCDEFG", "CC#BCC#BCC#BCC#B", "ABC"]
musicinfos = 	[["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"],["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"],["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]]

for i in range(len(m)):
  print(solution(m[i], musicinfos[i]))
