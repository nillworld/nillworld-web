# 암호문 해독

#test case

keyword_1 = 'mark'
keyword_2 = 'love'
keyword_3 = 'nillisawsome'

sentence_1 = 'live simple life'
sentence_2 = 'I will be what I want to be'
sentence_3 = 'you got me thinking about when you were mine'

rule_1 = [1, 2, 2, 3, 1]
rule_2 = [1, 1, 3, 2, 4, 1]
rule_3 = [3, 2, 4, 2, 1, 1, 1, 2, 1]


def answer(keyword, sentence, rule):
  result = list(sentence)
  insertIdx = 0
  for i in range(len(rule)):
    keywordIdx = i
    insertIdx += i + rule[i]
    if(len(keyword) < insertIdx):
      keywordIdx = insertIdx % len(keyword)
    result.insert(insertIdx, keyword[keywordIdx])
  print(result)
  return 0





answer(keyword_1, sentence_1, rule_1)
answer(keyword_2, sentence_2, rule_2)
answer(keyword_3, sentence_3, rule_3)