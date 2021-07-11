# https://programmers.co.kr/learn/courses/30/lessons/72410

import re

def solution(new_id):
    answer = ''
    new_id = new_id.lower()
    new_id = re.sub(r"[^a-zA-Z0-9-_.]","",new_id)
    while ".." in new_id:
        new_id = new_id.replace("..", ".")
    if len(new_id) != 0 and new_id[0] == ".":
        new_id = new_id[1:]
    if len(new_id) != 0 and new_id[-1] == ".":
        new_id = new_id[:-1]
    if new_id == "":
        new_id = "aaa"
    if len(new_id) >= 16:
        new_id = new_id[:15]
        if len(new_id) != 0 and new_id[-1] == ".":
            new_id = new_id[:-1]
    # if len(new_id) <= 2:
    if len(new_id) == 1:
        new_id = new_id*3
    if len(new_id) == 2:
        new_id = new_id + new_id[-1]
    answer = new_id
    return answer
    

new_ids = ["...!@BaT#*..y.abcdefghijklm", "z-+.^.", "=.=", "123_.def", "abcdefghijklmn.p"]
for new_id in new_ids:
    print(solution(new_id))

