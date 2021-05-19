(() => {
  const container = document.querySelector(".container");
  const content = document.querySelector(".content");
  const comment = document.querySelector(".comment");
  const emptyBox = document.querySelector(".empty-box");
  const rootDiv = document.querySelector("#comments");
  const submitBtn = document.querySelector("#submit");
  const commentCount = document.querySelector("#comment-count .count");
  const contentLike = document.querySelector("#content-like");
  const contentDislike = document.querySelector("#content-dislike");
  const contentShare = document.querySelector("#content-share");
  const contentLikeCount = document.querySelector("#content-like .count");
  const contentDislikeCount = document.querySelector("#content-dislike .count");
  const contentShareCount = document.querySelector("#content-share .count");
  const commentTextarea = document.querySelector("#comment-input");
  const close = document.querySelector(".close");
  const loginForm = document.querySelector(".login-form");
  const userId = document.querySelector("#userId");
  const userPassword = document.querySelector("#userPassword");
  const snsLoginBtns = document.querySelectorAll(".sns-btn-group");

  let loginAlertCheck = false;
  let likeClickCheck = false;
  let dislikeClickCheck = false;
  let shareClickCheck = false;
  let userName = "";
  let banWordCheck = false;

  comment.style.top = `${window.innerHeight - 50}px`;

  if (content.offsetHeight < window.innerHeight - 50) {
    comment.style.position = "sticky";
  }

  window.addEventListener("resize", () => {
    console.log("eeee");
    comment.style.top = `${window.innerHeight - 50}px`;

    if (content.offsetHeight < window.innerHeight - 50) {
      comment.style.position = "sticky";
    }
  });

  //맨위 댓글 숫자 세는거.
  //타임스템프 만들기
  function generateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const time = year + "-" + month + "-" + wDate + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  contentLike.addEventListener("click", () => {
    if (sessionStorage.getItem("userId") === null) {
      alert("로그인 후 이용 가능합니다.");
      openLogin();
      return;
    }
    if (!likeClickCheck) {
      if (dislikeClickCheck) {
        contentDislike.style.color = "black";
        contentDislikeCount.innerHTML--;
        dislikeClickCheck = false;
      }
      contentLike.style.color = "blue";
      contentLikeCount.innerHTML++;
      likeClickCheck = true;
    } else {
      contentLike.style.color = "black";
      contentLikeCount.innerHTML--;
      likeClickCheck = false;
    }
  });
  contentDislike.addEventListener("click", () => {
    if (sessionStorage.getItem("userId") === null) {
      alert("로그인 후 이용 가능합니다.");
      openLogin();
      return;
    }
    if (!dislikeClickCheck) {
      if (likeClickCheck) {
        contentLike.style.color = "black";
        contentLikeCount.innerHTML--;
        likeClickCheck = false;
      }
      contentDislike.style.color = "blue";
      contentDislikeCount.innerHTML++;
      dislikeClickCheck = true;
    } else {
      contentDislike.style.color = "black";
      contentDislikeCount.innerHTML--;
      dislikeClickCheck = false;
    }
  });
  contentShare.addEventListener("click", () => {
    contentShareCount.innerHTML++;
  });

  function spammingCheck() {
    let lastCommetTime = sessionStorage.getItem("LCtime");
    if (sessionStorage.getItem("SCount") == null) {
      sessionStorage.setItem("SCount", 0);
    }
    let spammingCount = sessionStorage.getItem("SCount");
    let nowTime = new Date().getTime();
    if (spammingCount >= 5 && nowTime - lastCommetTime <= 600000) {
      console.log("도배 막기");
      alert("도배로 인해 10분간 댓글을 등록하실 수 없습니다.");
      return true;
    }
    //도배 10분뒤 풀림
    if (spammingCount >= 5 && nowTime - lastCommetTime > 600000) {
      sessionStorage.setItem("SCount", 0);
    }
  }

  function numberCount(event) {
    if (sessionStorage.getItem("userId") === null) {
      alert("로그인 후 이용 가능합니다.");
      openLogin();
      return;
    }
    let targetLike = event.target.parentNode.querySelector(".commentLike");
    if (targetLike === null) {
      targetLike = event.target.parentNode.parentNode.querySelector(".commentLike");
    }
    let targetDislike = event.target.parentNode.querySelector(".commentDislike");
    if (targetDislike === null) {
      targetDislike = event.target.parentNode.parentNode.querySelector(".commentDislike");
    }
    console.log(targetLike);
    if (event.currentTarget.style.color === "blue") {
      event.currentTarget.querySelector("span").innerHTML--;
      event.currentTarget.style.color = "black";
      return;
    } else {
      if (event.currentTarget === targetLike && targetDislike.style.color === "blue") {
        targetDislike.style.color = "black";
        targetDislike.querySelector("span").innerHTML--;
      }
      if (event.currentTarget === targetDislike && targetLike.style.color === "blue") {
        targetLike.style.color = "black";
        targetLike.querySelector("span").innerHTML--;
      }
      event.currentTarget.querySelector("span").innerHTML++;
      event.currentTarget.style.color = "blue";
      return;
    }
  }

  function deleteComments(event) {
    let deleteCheck = confirm("댓글을 삭제하시겠습니까?");
    if (!deleteCheck) {
      return;
    }
    const deleteBtn = event.target;
    const list = deleteBtn.parentNode.parentNode.parentNode;
    //commentList
    rootDiv.removeChild(list);
    //메인댓글 카운트 줄이기.
    if (commentCount.innerHTML <= "0") {
      commentCount.innerHTML = 0;
    } else {
      commentCount.innerHTML--;
    }
  }

  function editComment(event) {
    const editBtn = event.target;
    const list = editBtn.parentNode.parentNode.parentNode;
    console.log(list);
    editBtn.disabled = true;
    const editTarget = list.querySelector(".inputValue");
    const targetText = editTarget.innerText;
    editTarget.innerHTML = "";
    const editTextArea = document.createElement("textarea");
    const editSubmit = document.createElement("button");
    editSubmit.innerHTML = "수정";
    editSubmit.className = "editSubmit";
    editTextArea.className = "editTextArea";
    editTextArea.innerHTML = targetText;
    const timeDiv = list.querySelector(".time");
    timeDiv.innerHTML = "";
    editTarget.appendChild(editTextArea);
    editTextArea.style.height = "1px";
    editTextArea.style.height = 10 + editTextArea.scrollHeight + "px";
    editTarget.appendChild(editSubmit);
    editTarget.addEventListener("keydown", (e) => {
      e.target.style.height = "1px";
      e.target.style.height = 10 + e.target.scrollHeight + "px";
      window.scrollTo(0, container.scrollHeight - innerHeight);
    });
    editSubmit.addEventListener("click", () => {
      let banWords = ["시볼", "개새", "fuck"];
      let usedBanWords = [];
      for (let i = 0; i < banWords.length; i++) {
        if (editTextArea.value.indexOf(banWords[i]) > -1) {
          usedBanWords.push('"' + banWords[i] + '"');
        }
      }
      if (usedBanWords.length > 0) {
        alert("단어" + usedBanWords.join(", ") + "은(는) 댓글로 등록하실 수 없습니다.");
        banWordCheck = true;
        return;
      }
      editTarget.innerText = editTextArea.value;
      editTextArea.remove();
      editSubmit.remove();
      timeDiv.innerHTML = `${generateTime()} (수정)`;
      editBtn.disabled = false;
    });
  }

  function showComment(comment) {
    const userNameDiv = document.createElement("div");
    const inputValue = document.createElement("span");
    const showTime = document.createElement("div");
    const voteDiv = document.createElement("div");
    const likeCountSpan = document.createElement("span");
    const dislikeCountSpan = document.createElement("span");
    const commentLike = document.createElement("button");
    const commentDislike = document.createElement("button");
    const commentList = document.createElement("div");
    const rightDiv = document.createElement("div");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    banWordCheck = false;
    delBtn.className = "deleteComment";
    delBtn.innerHTML = "삭제";
    editBtn.className = "editComment";
    editBtn.innerHTML = "수정";
    rightDiv.className = "rightDiv";
    commentList.className = "eachComment";
    userNameDiv.className = "name";
    inputValue.className = "inputValue";
    showTime.className = "time";
    voteDiv.className = "voteDiv";
    likeCountSpan.className = "likeCountSpan";
    dislikeCountSpan.className = "dislikeCountSpan";
    userNameDiv.innerHTML = userName;
    userNameDiv.appendChild(rightDiv);
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(delBtn);

    let banWords = ["시볼", "개새", "fuck"];
    let usedBanWords = [];
    for (let i = 0; i < banWords.length; i++) {
      if (comment.indexOf(banWords[i]) > -1) {
        usedBanWords.push('"' + banWords[i] + '"');
      }
    }
    if (usedBanWords.length > 0) {
      alert("단어" + usedBanWords.join(", ") + "은(는) 댓글로 등록하실 수 없습니다.");
      banWordCheck = true;
      return;
    }
    inputValue.innerText = comment;
    showTime.innerHTML = generateTime();
    likeCountSpan.innerHTML = 0;
    dislikeCountSpan.innerHTML = 0;
    //투표창 만들기, css먼저 입혀야함.
    commentLike.className = "commentLike";
    commentLike.innerHTML = "Like";
    commentDislike.className = "commentDislike";
    commentDislike.innerHTML = "Dislike";
    voteDiv.appendChild(commentLike);
    voteDiv.appendChild(commentDislike);
    commentLike.appendChild(likeCountSpan);
    commentDislike.appendChild(dislikeCountSpan);
    //댓글뿌려주기
    commentList.appendChild(userNameDiv);
    commentList.appendChild(inputValue);
    commentList.appendChild(showTime);
    commentList.appendChild(voteDiv);
    rootDiv.append(commentList);
    delBtn.addEventListener("click", deleteComments);
    editBtn.addEventListener("click", editComment);
    commentLike.addEventListener("click", numberCount);
    commentDislike.addEventListener("click", numberCount);
  }

  let commentLikes = document.querySelectorAll(".commentLike");
  let commentDislikes = document.querySelectorAll(".commentDislike");
  for (const commentLike of commentLikes) {
    commentLike.addEventListener("click", numberCount);
  }
  for (const commentDislike of commentDislikes) {
    commentDislike.addEventListener("click", numberCount);
  }

  for (const snsLoginBtn of snsLoginBtns) {
    snsLoginBtn.addEventListener("click", () => {
      sessionStorage.setItem("userId", "SNS-name");
      login.style.display = "none";
    });
  }

  function pressBtn() {
    const currentVal = commentTextarea.value;
    if (!currentVal.length) {
      alert("댓글을 입력해주세요.");
    } else {
      if (sessionStorage.getItem("userId") === null) {
        alert("로그인 후 댓글을 등록하실 수 있습니다.");
        openLogin();
        commentTextarea.value = "";
        return;
      }
      if (spammingCheck()) {
        return;
      }
      userName = sessionStorage.getItem("userId");
      showComment(currentVal);
      if (new Date().getTime() - sessionStorage.getItem("LCtime") < 5000) {
        sessionStorage.setItem("SCount", Number(sessionStorage.getItem("SCount")) + 1);
      }
      sessionStorage.setItem("LCtime", new Date().getTime());
      if (!banWordCheck) {
        commentTextarea.value = "";
        commentCount.innerHTML++;
      }
      banWordCheck = true;
      window.scrollTo(0, container.scrollHeight - innerHeight);
      commentTextarea.style.height = "40px";
    }
  }
  submitBtn.onclick = pressBtn;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset + window.innerHeight - 59 >= content.offsetHeight) {
      comment.style.position = "sticky";
      emptyBox.style.height = "0px";
    } else {
      comment.style.position = "fixed";
      emptyBox.style.height = "60px";
    }
  });

  commentTextarea.addEventListener("keydown", (e) => {
    if (sessionStorage.getItem("userId") === null && !loginAlertCheck) {
      loginAlertCheck = true;
      alert("로그인 후 댓글을 등록하실 수 있습니다.");
      openLogin();
      commentTextarea.value = "";
      return;
    }
    if (sessionStorage.getItem("userId") !== null) {
      commentTextarea.disabled = false;
    }

    e.target.style.height = "1px";
    e.target.style.height = 22 + e.target.scrollHeight + "px";
    window.scrollTo(0, container.scrollHeight - innerHeight);
  });
  let login = document.getElementById("login");
  function openLogin() {
    login.style.display = "flex";
    document.body.style.overflowY = "hidden";
  }

  close.addEventListener("click", () => {
    loginAlertCheck = false;
    login.style.display = "none";
    document.body.style.overflowY = "scroll";
  });
  loginForm.addEventListener("submit", () => {
    sessionStorage.setItem("userId", userId.value);
    login.style.display = "none";
  });
  // 로그인 화면 바깥의 영역을 클릭할 경우 로그인 창 닫기
  window.onclick = function (event) {
    if (event.target == login) {
      loginAlertCheck = false;
      login.style.display = "none";
    }
  };
})();
