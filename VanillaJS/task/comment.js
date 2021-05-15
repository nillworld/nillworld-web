(() => {
  const container = document.querySelector(".container");
  const content = document.querySelector(".content");
  const comment = document.querySelector(".comment");
  const emptyBox = document.querySelector(".empty-box");
  const inputBar = document.querySelector("#comment-input");
  const rootDiv = document.querySelector("#comments");
  const btn = document.querySelector("#submit");
  const commentCount = document.querySelector("#comment-count .count");
  const contentLike = document.querySelector("#content-like");
  const contentDislike = document.querySelector("#content-dislike");
  const contentShare = document.querySelector("#content-share");
  const contentLikeCount = document.querySelector("#content-like .count");
  const contentDislikeCount = document.querySelector("#content-dislike .count");
  const contentShareCount = document.querySelector("#content-share .count");
  const commentContainer = document.querySelector(".comment-container");
  const commentScroll = document.querySelector(".comment-scroll");
  const commentTextarea = document.querySelector("#comment-input");
  const close = document.querySelector(".close");
  const modalContent = document.querySelector(".modal-content");
  const userId = document.querySelector("#userId");
  const userPassword = document.querySelector("#userPassword");

  let likeClickCheck = false;
  let dislikeClickCheck = false;
  let shareClickCheck = false;
  let userName = "";

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
    if (!shareClickCheck) {
      contentShare.style.color = "blue";
      contentShareCount.innerHTML++;
      shareClickCheck = true;
    } else {
      contentShare.style.color = "black";
      contentShareCount.innerHTML--;
      shareClickCheck = false;
    }
  });

  function numberCount(event) {
    let targetLike = event.target.parentNode.querySelector(".commentLike");
    if (targetLike === null) {
      targetLike = event.target.parentNode.parentNode.querySelector(".commentLike");
    }
    let targetDislike = event.target.parentNode.querySelector(".commentDislike");
    if (targetDislike === null) {
      targetDislike = event.target.parentNode.parentNode.querySelector(".commentDislike");
    }
    console.log(targetLike);
    // console.log(event.currentTarget);
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
    const btn = event.target;
    const list = btn.parentNode.parentNode.parentNode;
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
    const btn = event.target;
    const list = btn.parentNode.parentNode.parentNode;
    console.log(list);
    btn.disabled = true;
    const editTarget = list.querySelector(".inputValue");
    const targetText = editTarget.innerHTML;
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
    editTarget.appendChild(editSubmit);
    editTarget.addEventListener("keydown", (e) => {
      e.target.style.height = "1px";
      e.target.style.height = 10 + e.target.scrollHeight + "px";
      window.scrollTo(0, container.scrollHeight - innerHeight);
    });
    editSubmit.addEventListener("click", () => {
      editTarget.innerHTML = editTextArea.value;
      editTextArea.remove();
      editSubmit.remove();
      timeDiv.innerHTML = generateTime();
      btn.disabled = false;
    });
  }

  //댓글보여주기
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
    //유저네임가져오기
    userNameDiv.innerHTML = userName;
    userNameDiv.appendChild(rightDiv);
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(delBtn);
    //입력값 넘기기
    inputValue.innerText = comment;
    //타임스템프찍기
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
    // commentDislike.appendChild(countSpan);
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
    console.dir(rootDiv);
  }

  let commentLikes = document.querySelectorAll(".commentLike");
  let commentDislikes = document.querySelectorAll(".commentDislike");
  for (const commentLike of commentLikes) {
    commentLike.addEventListener("click", numberCount);
  }
  for (const commentDislike of commentDislikes) {
    commentDislike.addEventListener("click", numberCount);
  }

  //버튼만들기+입력값 전달
  function pressBtn() {
    const currentVal = inputBar.value;
    if (!currentVal.length) {
      alert("댓글을 입력해주세요.");
    } else {
      if (localStorage.getItem("userId") === null) {
        alert("로그인 후 댓글을 등록하실 수 있습니다.");
        openLogin();
        inputBar.value = "";
        return;
      }
      userName = localStorage.getItem("userId");
      showComment(currentVal);
      commentCount.innerHTML++;
      inputBar.value = "";
      window.scrollTo(0, container.scrollHeight - innerHeight);
      commentTextarea.style.height = "40px";
    }
  }
  btn.onclick = pressBtn;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset + window.innerHeight - 59 >= content.offsetHeight) {
      comment.style.position = "sticky";
      emptyBox.style.height = "0px";
    } else {
      comment.style.position = "fixed";
      comment.style.maxWidth = "500px";
      emptyBox.style.height = "60px";
    }
  });

  // localStorage.setItem("email", "dump@gmail.com");

  commentTextarea.addEventListener("keydown", (e) => {
    if (localStorage.getItem("userId") === null) {
      alert("로그인 후 댓글을 등록하실 수 있습니다.");
      openLogin();
      inputBar.value = "";
      return;
    }

    e.target.style.height = "1px";
    e.target.style.height = 22 + e.target.scrollHeight + "px";
    window.scrollTo(0, container.scrollHeight - innerHeight);
  });
  /////////////////////////////////
  var login = document.getElementById("login");
  function openLogin() {
    login.style.display = "flex";
  }

  close.addEventListener("click", () => {
    login.style.display = "none";
  });
  modalContent.addEventListener("submit", () => {
    localStorage.setItem("userId", userId.value);
    login.style.display = "none";
  });
  // 로그인 화면 바깥의 영역을 클릭할 경우 로그인 창 닫기
  window.onclick = function (event) {
    if (event.target == login) {
      login.style.display = "none";
    }
  };
})();
