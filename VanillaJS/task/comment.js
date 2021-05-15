(() => {
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

  let likeClickCheck = false;
  let dislikeClickCheck = false;
  let shareClickCheck = false;
  let userName = "Nill";

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
    console.log("ee");
    if (event.currentTarget.querySelector(".likeCountSpan") !== null) {
      if (event.currentTarget.style.color === "blue") {
        event.currentTarget.querySelector(".likeCountSpan").innerHTML--;
        event.currentTarget.style.color = "black";
        return;
      } else {
        event.currentTarget.querySelector(".likeCountSpan").innerHTML++;
        event.currentTarget.style.color = "blue";
        return;
      }
    }
    if (event.currentTarget.querySelector(".dislikeCountSpan") !== null) {
      if (event.currentTarget.style.color === "blue") {
        event.currentTarget.querySelector(".dislikeCountSpan").innerHTML--;
        event.currentTarget.style.color = "black";
        return;
      } else {
        event.currentTarget.querySelector(".dislikeCountSpan").innerHTML++;
        event.currentTarget.style.color = "blue";
        return;
      }
    }
  }

  function deleteComments(event) {
    const btn = event.target;
    const list = btn.parentNode.parentNode;
    //commentList
    rootDiv.removeChild(list);
    //메인댓글 카운트 줄이기.
    if (commentCount.innerHTML <= "0") {
      commentCount.innerHTML = 0;
    } else {
      commentCount.innerHTML--;
    }
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
    //삭제버튼 만들기
    const delBtn = document.createElement("button");
    delBtn.className = "deleteComment";
    delBtn.innerHTML = "삭제";
    commentList.className = "eachComment";
    userNameDiv.className = "name";
    inputValue.className = "inputValue";
    showTime.className = "time";
    voteDiv.className = "voteDiv";
    likeCountSpan.className = "likeCountSpan";
    dislikeCountSpan.className = "dislikeCountSpan";
    //유저네임가져오기
    userNameDiv.innerHTML = userName;
    userNameDiv.appendChild(delBtn);
    //입력값 넘기기
    inputValue.innerText = comment;
    //타임스템프찍기
    showTime.innerHTML = generateTime();

    likeCountSpan.innerHTML = 0;
    dislikeCountSpan.innerHTML = 0;
    //투표창 만들기, css먼저 입혀야함.
    commentLike.className = "commentLike";
    commentLike.innerHTML = "Like";
    commentDislike.id = "commentDislike";
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
    rootDiv.prepend(commentList);
    delBtn.addEventListener("click", deleteComments);
    console.dir(rootDiv);
  }
  let commentLike = document.querySelector(".commentLike");
  commentLike.addEventListener("click", numberCount);
  commentDislike.addEventListener("click", numberCount);

  //버튼만들기+입력값 전달
  function pressBtn() {
    const currentVal = inputBar.value;
    if (!currentVal.length) {
      alert("댓글을 입력해주세요!!");
    } else {
      showComment(currentVal);
      commentCount.innerHTML++;
      inputBar.value = "";
      commentScroll.scrollTop = commentScroll.scrollHeight;
    }
  }
  btn.onclick = pressBtn;

  window.addEventListener("scroll", () => {
    console.log(window.pageYOffset + window.innerHeight - 60);
    console.log(content.offsetHeight);
    if (window.pageYOffset + window.innerHeight - 59 >= content.offsetHeight) {
      comment.style.position = "sticky";
      emptyBox.style.height = "0px";
    } else {
      comment.style.position = "fixed";
      emptyBox.style.height = "60px";
    }
  });
})();
