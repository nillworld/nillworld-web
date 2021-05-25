# 암호문 해독

#test case

keyword_1 = 'mark'
keyword_2 = 'wwwwwwwww'
keyword_3 = 'nillisawsome'

sentence_1 = 'eeeeeeeeeeeeee'
sentence_2 = 'I will be what I want to be'
sentence_3 = 'you got me thinking about when you were mine'

rule_1 = [1, 2, 2, 3, 1]
rule_2 = [1, 1, 3, 2, 4, 5]
rule_3 = [3, 2, 4, 2, 1, 1, 1, 2, 1]


def answer(keyword, sentence, rule):
  result = list(sentence)
  insertIdx = 0
  for i in range(len(rule)):
    break_check = False
    keywordIdx = i
    if(len(keyword) - 1 < i):
      keywordIdx = (i + 1) % len(keyword)
    for j in range(insertIdx, insertIdx+ rule[i]):
      if result[j] == keyword[keywordIdx]:
        result.insert(j + 1, keyword[keywordIdx])
        print("duplication",i)
        insertIdx += j + 1 - insertIdx
        break_check = True
        break
    if break_check:
      insertIdx += 1
      continue
    print("mono",i)
    insertIdx += rule[i]
    result.insert(insertIdx, keyword[keywordIdx])
    insertIdx += 1
  print(result)
  return 0





answer(keyword_1, sentence_1, rule_1)
answer(keyword_2, sentence_2, rule_2)
answer(keyword_3, sentence_3, rule_3)