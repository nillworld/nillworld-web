#https://programmers.co.kr/learn/courses/30/lessons/42888
  #유저의 아이디와 닉네임이 묶인 데어터 셋 => 딕션너리 이용 (1)
  #최종 메시지는 재입장이나 닉네임 변경에 따라 달라짐 => 딕셔너리 값을 끝까지 다 받은 후 메세지 append (2)

def solution(record):
  answer = []

  # (1) 입장할 때와 닉네임 변경할 때만 key값은 id, value는 닉네임으로 dictionary 업데이트 
  dictionary = {}
  for i in record:
    i = i.split()
    if i[0] == "Enter":
      dictionary[i[1]] = i[2]
    if i[0] == "Change":
      dictionary[i[1]] = i[2]

  # (2) 정리된 dictionary를 이용하여 record 값에서 입장과 퇴장한 메시지만 id(key)를 이용하여 닉네임(value)으로 출력
  for i in record:
    i = i.split()
    if i[0] == "Enter":
      print(dictionary[i[1]])
      answer.append(dictionary[i[1]]+"님이 들어왔습니다.")
    if i[0] == "Leave":
      print(dictionary[i[1]])
      answer.append(dictionary[i[1]]+"님이 나갔습니다.")

  return answer


record = ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]
print(solution(record));