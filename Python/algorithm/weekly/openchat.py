#https://programmers.co.kr/learn/courses/30/lessons/42888
def solution(record):
  answer = []
  dictionary = {}
  for i in record:
    i = i.split()
    if i[0] == "Enter":
      dictionary[i[1]] = i[2]
      # message = i[1]+"님이 들어왔습니다."
      # answer.append(message)
    if i[0] == "Change":
      dictionary[i[1]] = i[2]
      # message = i[1]+"님이 나갔습니다."
      # answer.append(message)
  for i in record:
    if i[0] == "Enter":
      answer.append(dictionary[i[1]]+"님이 들어왔습니다.")
    if i[0] == "Leave":
      answer.append(dictionary[i[1]]+"님이 나갔습니다.")
      print(dictionary[i[1]])

  return answer


record = ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]
print(solution(record));