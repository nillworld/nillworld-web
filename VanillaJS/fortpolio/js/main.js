(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let slideState = true; // 슬라이드 touch이벤트 중복 방지
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;
  let beforeInnerHeight = 0;
  let imgElemLoadedTotalCount = 0;

  //language check
  let lang = navigator.language || navigator.userLanguage;
  if (lang == "ko-KR" || lang == "ko" || lang == "ko-kr") {
    //한국어 일때?
    document.querySelector(".language-check").classList.remove("kor");
  } else {
    document.querySelector(".language-check").classList.remove("eng");
  }

  //mobile check
  let mobilePlatform = false;
  let filter = "win16|win32|win64|mac|macintel";
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      mobilePlatform = true;
    }
    if (navigator.platform.toLowerCase() === "macintel" && navigator.maxTouchPoints > 1) {
      mobilePlatform = true;
    }
  }
  // if (navigator.userAgent.match(/KAKAOTALK/i) !== null) {
  //   if (navigator.userAgent.match(/Android/i) !== null) {
  //     location.href = "intent://nillworld.com#Intent;scheme=http;package=com.android.chrome;end";
  //   } else {
  //     location.href = "ftp://";
  //   }
  // }

  let loadingCheck = 0;
  if (loadingCheck == 0) {
    loadingCheck = 1;
    var loadingBar = document.getElementById("loadingBar");
    var width = 10;

    var id = setInterval(frame, 10);
    function frame() {
      if (width == 100) {
        document.body.classList.remove("before-load");
        document.querySelector(".loading").addEventListener("transitionend", (e) => {
          document.querySelector(".language-check").removeChild(e.currentTarget);
        });
        clearInterval(id);
        i = 0;
      } else {
        if (Math.round((imgElemLoadedTotalCount / 938) * 100) > 10) {
          width = Math.round((imgElemLoadedTotalCount / 938) * 100);
        }
        loadingBar.style.width = width + "%";
        loadingBar.innerHTML = width + "%";
      }
    }
  }

  const sceneInfo = [
    // 0
    {
      type: "sticky",
      heightNum: 7, //Multiples of browser height
      scrollHeight: 0,
      //DOM Object
      objs: {
        container: document.querySelector("#scroll-section-0"),
        message_div: document.querySelector("#section0-message-div"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
        canvasDiv: document.querySelector("#scroll-section-0 .code-video"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: [],
        profile_canvas: document.querySelector(".profile-img-canvas"),
        profile_context: document.querySelector(".profile-img-canvas").getContext("2d"),
        profileImg: [],
      },
      //Valus, Numbers
      values: {
        videoImageCount: 371,
        //even img sequence is 371, It's made 650 for codevideo last img ZoomIn and profile canvas show up
        imageSequence: [0, 650],
        canvas_opacity: [1, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_in: [0, 1, { start: 0.05, end: 0.1 }],
        messageB_opacity_in: [0, 1, { start: 0.2, end: 0.25 }],
        messageC_opacity_in: [0, 1, { start: 0.35, end: 0.4 }],
        messageD_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageA_translateY_in: [20, 0, { start: 0.05, end: 0.1 }],
        messageB_translateY_in: [20, 0, { start: 0.2, end: 0.25 }],
        messageC_translateY_in: [20, 0, { start: 0.35, end: 0.4 }],
        messageD_translateY_in: [20, 0, { start: 0.5, end: 0.55 }],
        messageA_opacity_out: [1, 0, { start: 0.15, end: 0.2 }],
        messageB_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageC_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageD_opacity_out: [1, 0, { start: 0.6, end: 0.65 }],
        messageA_translateY_out: [0, -20, { start: 0.15, end: 0.2 }],
        messageB_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageC_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageD_translateY_out: [0, -20, { start: 0.6, end: 0.7 }],
        profile_opacity_in: [0, 0.7, { start: 0.7, end: 0.8 }],
        profile_opacity_out: [0.7, 0, { start: 0.8, end: 0.95 }],
      },
    },
    // 1
    {
      type: "sticky",
      heightNum: 13, // type normal에서는 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        main_message: document.querySelector("#scroll-section-1 .main-message h2"),
        project_div: document.querySelector("#scroll-section-1 .project"),
        message_div_automouse: document.querySelector(".project-message.automouse"),
        message_div_nas: document.querySelector(".project-message.nas-server"),
        project_automouse_title: document.querySelector(".project-message-title.automouse"),
        project_nas_title: document.querySelector(".project-message-title.nas-server"),
        loop_video: document.querySelector(".loop-video"),
        project_canvas: document.querySelector(".project-canvas"),
        project_context: document.querySelector(".project-canvas").getContext("2d"),
        imagesPath: ["./images/projects/automouse.png", "./images/projects/theia-code.png"],
        projectImg: [],
        slideArea: document.querySelector(".slideArea"),
        slideInputs: document.querySelectorAll(".slideImgBox input"),
        slideImgs: document.querySelector(".slideImgs"),
        slideImgUl: document.querySelector(".slideImgs ul"),
        emojiImgs: document.querySelectorAll(".slideImgs .emoji"),
        slidePrevBtn: document.querySelector("#scroll-section-1 .prev"),
        slideNextBtn: document.querySelector("#scroll-section-1 .next"),
        contactModa: document.querySelector(".slide-modal"),
        slide_modalImg: document.querySelector(".slide-modal .modalImg"),
        emojiImg: document.querySelectorAll(".emoji img"),
        messageA: document.querySelector("#scroll-section-1 .main-message.a"),
        messageB: document.querySelector("#scroll-section-1 .main-message.b"),
        this_back_div: document.querySelector("#this-back-div"),
        this_div: document.querySelector("#this-div"),
        jump_canvas: document.querySelector("#jump-canvas"),
        jump_context: document.querySelector("#jump-canvas").getContext("2d"),
        videoImages: [],
      },
      values: {
        emojiCount: 7,
        videoImageCount: 26,
        imageSequence: [0, 25],
        main_opacity_in: [0, 1, { start: 0.0, end: 0.04 }],
        main_taranslateY_in: [20, 0, { start: 0.0, end: 0.04 }],
        main_opacity_out: [1, 0, { start: 0.09, end: 0.11 }],
        main_taranslateY_out: [0, -20, { start: 0.09, end: 0.11 }],
        automouse_img_opacity_in: [0, 1, { start: 0.11, end: 0.16 }],
        automouse_img_opacity_down: [1, 0.2, { start: 0.2, end: 0.22 }],
        automouse_img_opacity_out: [0.2, 0, { start: 0.31, end: 0.34 }],
        nas_img_opacity_in: [0, 1, { start: 0.39, end: 0.42 }],
        nas_img_opacity_down: [1, 0.1, { start: 0.46, end: 0.48 }],
        nas_img_opacity_out: [0.1, 0, { start: 0.58, end: 0.61 }],
        backColor_black: [30, 0, { start: 0.63, end: 0.68 }],
        messageA_opacity_in: [0, 1, { start: 0.68, end: 0.71 }],
        messageA_opacity_out: [1, 0, { start: 0.74, end: 0.76 }],
        messageB_opacity_in: [0, 1, { start: 0.77, end: 0.79 }],
        messageB_opacity_out: [1, 0, { start: 0.83, end: 0.84 }],
        this_in: [0, 1, { start: 0.85, end: 0.87 }],
        this_out: [1, 0, { start: 0.98, end: 0.99 }],
        this_white_opacity: [1, 0, { start: 0.92, end: 0.96 }],
        jump_scale: [2, 1, { start: 0.9, end: 0.96 }],
      },
    },
    //2
    {
      type: "sticky",
      heightNum: 6.2,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        jump_div: document.querySelector("#scroll-section-2 .canvas-div"),
        jump_canvas: document.querySelector("#jump-canvas-2"),
        jump_context: document.querySelector("#jump-canvas-2").getContext("2d"),
        jumpImg: [],
        main_message: document.querySelector("#scroll-section-2 .main-message"),
        main_message_nothing: document.querySelector("#nothing"),
        main_message_upper: document.querySelector("#possible-upper"),
        main_message_space: document.querySelector("#possible-space"),
        possible_activities: document.querySelector("#possible-activities"),
        figureImgs: document.querySelectorAll("#scroll-section-2 .figureImg"),
        modal: document.querySelector("#scroll-section-2 .possible-modal"),
        modalImg: document.querySelector("#scroll-section-2 .modalImg"),
        modalText: document.querySelector("#scroll-section-2 .modalText"),
      },
      values: {
        jump_opacity_down: [1, 0.2, { start: 0, end: 0.15 }],
        main_message_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        main_message_spacing: [-4, -1.5, { start: 0.15, end: 0.2 }],
        main_message_nothing_opacity: [1, 0, { start: 0.25, end: 0.3 }],
        main_message_translateY_middle: [0, -10, { start: 0.28, end: 0.33 }],
        main_message_upper_opacity: [0, 1, { start: 0.28, end: 0.33 }],
        main_message_space_spacing: [-0.8, 2, { start: 0.28, end: 0.33 }],
        jump_opacity_out: [0.2, 0, { start: 0.36, end: 0.4 }],
        main_message_translateY_out: [-10, -100, { start: 0.4, end: 0.5 }],
        main_message_opacity_out: [1, 0, { start: 0.4, end: 0.47 }],
      },
    },
    // 3
    {
      type: "sticky",
      heightNum: 12,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        messageA: document.querySelector("#scroll-section-3 .a"),
        messageB: document.querySelector("#scroll-section-3 .b"),
        messageC: document.querySelector("#scroll-section-3 .c"),
        pinB: document.querySelector("#scroll-section-3 .b .pin"),
        pinC: document.querySelector("#scroll-section-3 .c .pin"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        rowDiv: document.querySelector("#scroll-section-3 .rowDiv"),
        rowDivCover: document.querySelector("#scroll-section-3 .cover-rowDiv"),
        mind_Message: document.querySelector("#scroll-section-3 .mind-message"),
        videoImages: [],
      },
      values: {
        videoImageCount: 487,
        imageSequence: [0, 600],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.85, end: 1 }],
        messageA_translateY_in: [5, 0, { start: 0.15, end: 0.2 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageA_translateY_out: [0, -5, { start: 0.25, end: 0.3 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        rowDiv_translateX: [100, -100, { start: 0.3, end: 0.9 }],
      },
    },
  ];

  function setCanvasImages() {
    let imgElem;

    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `./video/01/Nill-code-${100 + i}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgElem);
      imgElem.addEventListener("load", () => {
        imgElemLoadedTotalCount++;
      });
    }

    let imgElem2;
    imgElem2 = new Image();
    imgElem2.src = `./images/profileImg.jpg`;
    sceneInfo[0].objs.profileImg.push(imgElem2);
    imgElem2.addEventListener("load", () => {
      imgElemLoadedTotalCount++;
    });

    let imgElem3;
    for (let i = 0; i < sceneInfo[1].objs.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[1].objs.imagesPath[i];
      sceneInfo[1].objs.projectImg.push(imgElem3);
      imgElem3.addEventListener("load", () => {
        imgElemLoadedTotalCount++;
      });
    }

    let imgElem4;
    for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
      imgElem4 = new Image();
      imgElem4.src = `./video/02/jump-${i}.jpg`;
      sceneInfo[1].objs.videoImages.push(imgElem4);
      imgElem4.addEventListener("load", () => {
        imgElemLoadedTotalCount++;
      });
    }

    let imgElem4_1;
    imgElem4_1 = new Image();
    imgElem4_1.src = `./video/02/jump-25.jpg`;
    sceneInfo[2].objs.jumpImg.push(imgElem4_1);
    imgElem4_1.addEventListener("load", () => {
      imgElemLoadedTotalCount++;
    });

    let imgElem5;
    for (let i = 0; i < sceneInfo[3].values.videoImageCount; i++) {
      imgElem5 = new Image();
      imgElem5.src = `./video/03/sunset-${i}.jpg`;
      sceneInfo[3].objs.videoImages.push(imgElem5);
      imgElem5.addEventListener("load", () => {
        imgElemLoadedTotalCount++;
      });
    }
  }

  function setLayout() {
    if (mobilePlatform) {
      let afterInnerHeight = window.innerHeight;
      if (beforeInnerHeight <= afterInnerHeight) {
        beforeInnerHeight = afterInnerHeight;
        yOffset = window.pageYOffset;
      }
    } else {
      beforeInnerHeight = window.innerHeight;
      yOffset = window.pageYOffset;
    }

    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * beforeInnerHeight;
      if (window.innerWidth < 1217) {
        sceneInfo[2].scrollHeight = 7 * beforeInnerHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].heightNum * 100}vh`;
    }

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
    const heightRatio = beforeInnerHeight / 900;
    let section1_canvas_scale;
    //when long height, top rate up (cuz of local bar -> 50px)
    let projectYtrans = 0;
    let project_message_width_Ratio = 0.9;
    if (window.innerWidth >= 1200 && beforeInnerHeight >= 900) {
      section1_canvas_scale = 1;
    } else {
      if (window.innerWidth / 1200 >= beforeInnerHeight / 900) {
        section1_canvas_scale = beforeInnerHeight / 900;
      } else {
        projectYtrans = -5;
        //minus scrollbar width -> 20
        section1_canvas_scale = (window.innerWidth - 20) / 1200;
      }
    }
    if (section1_canvas_scale * 1200 > 700) {
      project_message_width_Ratio = 0.7;
    }
    let canvas_Ratio = 1;
    if (window.innerWidth / 1920 >= beforeInnerHeight / 1080) {
      canvas_Ratio = window.innerWidth / 1920;
    } else {
      canvas_Ratio = beforeInnerHeight / 1080;
    }
    let activities_marginTop = 0.45;
    if (window.innerWidth <= 1220) {
      activities_marginTop = 0.6;
    }
    let sunset_translateX = -50;
    if (window.innerWidth / beforeInnerHeight < 1920 / 1080) {
      sunset_translateX = -(1920 / 1080 - window.innerWidth / beforeInnerHeight) * 10 - 50;
    }
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, 10%, 0) scale(1)`;
    sceneInfo[0].objs.message_div.style.display = "none";
    sceneInfo[0].objs.profile_canvas.style.height = "100vh";
    sceneInfo[0].objs.profile_canvas.style.transform = `translate3d(-50%, 0px, 0) scale(1)`;
    sceneInfo[1].objs.project_canvas.style.transform = `translate3d(-50%, ${projectYtrans - 50}%, 0) scale(${section1_canvas_scale})`;
    sceneInfo[1].objs.message_div_automouse.style.width = `${1200 * section1_canvas_scale * project_message_width_Ratio}px`;
    sceneInfo[1].objs.message_div_nas.style.width = `${1200 * section1_canvas_scale * project_message_width_Ratio}px`;
    sceneInfo[1].objs.project_automouse_title.style.marginTop = `${beforeInnerHeight * sceneInfo[1].heightNum * 0.24}px`;
    sceneInfo[1].objs.project_nas_title.style.marginTop = `${beforeInnerHeight * sceneInfo[1].heightNum * 0.14}px`;
    sceneInfo[1].objs.slideArea.style.marginTop = `${beforeInnerHeight * sceneInfo[1].heightNum * 0.14}px`;
    sceneInfo[1].objs.slideImgs.style.left = 0 + "px";
    sceneInfo[1].objs.slideInputs[0].checked = true;
    slideElement(sceneInfo[1].objs.slideImgs);
    sceneInfo[1].objs.loop_video.style.width = `${1200 * section1_canvas_scale * project_message_width_Ratio}px`;
    sceneInfo[1].objs.this_back_div.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
    sceneInfo[1].objs.jump_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${canvas_Ratio})`;
    sceneInfo[2].objs.jump_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${canvas_Ratio})`;
    sceneInfo[2].objs.possible_activities.style.marginTop = `${beforeInnerHeight * sceneInfo[2].heightNum * activities_marginTop}px`;
    sceneInfo[3].objs.canvas.style.transform = `translate3d(${sunset_translateX}%, -50%, 0) scale(${canvas_Ratio})`;
    sceneInfo[3].objs.rowDivCover.style.width = `${window.innerWidth}px`;
    sceneInfo[3].objs.rowDiv.style.transform = `translate3d(100vw, 0%, 0)`;
    sceneInfo[3].objs.rowDiv.style.width = `350vw`;
  }
  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  ///////////////////////////////////////////////
  function imgChange(length, direction, projectName) {
    for (let i = 0; i < length; i++) {
      direction[i].src = `./images/projects/${projectName}/${projectName}-${i + 1}.jpg`;
    }
  }

  ////////////////////////////////////////////////

  // 애니매이션 담당하는 함수 / screenLoop에 다 담으면 복잡해서 따로 뺌
  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    //
    switch (currentScene) {
      case 0:
        // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        // objs.container.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        objs.canvasDiv.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        objs.message_div.style.display = "block";
        if (scrollRatio <= 0.125) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.275) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio <= 0.425) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.575) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
          // objs.context.drawImage(objs.videoImages[470], 0, 0);
        }
        objs.profile_context.drawImage(objs.profileImg[0], 0, 0);
        if (scrollRatio <= 0.8) {
          objs.profile_canvas.style.opacity = calcValues(values.profile_opacity_in, currentYOffset);
        } else {
          objs.profile_canvas.style.opacity = calcValues(values.profile_opacity_out, currentYOffset);
        }
        break;
      case 1:
        imgChange(values.emojiCount, objs.emojiImg, "emoji");
        slideElement(objs.slideImgs);
        if (scrollRatio <= 0.08) {
          objs.main_message.style.opacity = calcValues(values.main_opacity_in, currentYOffset);
          objs.main_message.style.transform = `translate3d(0, ${calcValues(values.main_taranslateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.main_message.style.opacity = calcValues(values.main_opacity_out, currentYOffset);
          objs.main_message.style.transform = `translate3d(0, ${calcValues(values.main_taranslateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio <= 0.36) {
          objs.project_context.drawImage(objs.projectImg[0], 0, 0);
        } else {
          objs.project_context.drawImage(objs.projectImg[1], 0, 0);
        }
        if (scrollRatio <= 0.18) {
          objs.project_canvas.style.opacity = calcValues(values.automouse_img_opacity_in, currentYOffset);
        } else if (scrollRatio <= 0.25) {
          objs.project_canvas.style.opacity = calcValues(values.automouse_img_opacity_down, currentYOffset);
        } else if (scrollRatio <= 0.36) {
          objs.project_canvas.style.opacity = calcValues(values.automouse_img_opacity_out, currentYOffset);
        } else if (scrollRatio <= 0.43) {
          objs.project_canvas.style.opacity = calcValues(values.nas_img_opacity_in, currentYOffset);
        } else if (scrollRatio <= 0.57) {
          objs.project_canvas.style.opacity = calcValues(values.nas_img_opacity_down, currentYOffset);
        } else {
          objs.project_canvas.style.opacity = calcValues(values.nas_img_opacity_out, currentYOffset);
        }
        if (scrollRatio <= 0.72) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
        }
        if (scrollRatio <= 0.8) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
        }
        let scale_section2_ratio = 0;
        if (scrollRatio <= 0.97) {
          scale_section2_ratio = 0.3 + Math.pow((scrollRatio - 0.86) * 20, 5);
        }
        if (scrollRatio <= 0.88) {
          objs.this_div.style.transform = `translate3d(0, 0, 0) scale(0.3)`;
        } else {
          objs.this_div.style.transform = `translate3d(0, 0, 0) scale(${scale_section2_ratio})`;
        }
        // objs.jump_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${calcValues(values.jump_scale, currentYOffset)})`;

        if (scrollRatio <= 0.92) {
          objs.this_div.style.opacity = calcValues(values.this_in, currentYOffset);
          objs.jump_canvas.style.opacity = 0;
        } else {
          objs.this_div.style.opacity = calcValues(values.this_out, currentYOffset);
          objs.jump_canvas.style.opacity = 1;
        }
        if (scrollRatio <= 0.97) {
          objs.this_div.style.backgroundColor = `rgba(255, 255, 255, ${calcValues(values.this_white_opacity, currentYOffset)})`;
          objs.container.style.backgroundColor = `rgba(${calcValues(values.backColor_black, currentYOffset)}, ${calcValues(
            values.backColor_black,
            currentYOffset
          )}, ${calcValues(values.backColor_black, currentYOffset)}, 1)`;
        } else {
          objs.this_div.style.backgroundColor = `rgba(255, 255, 255, 0)`;
          sceneInfo[2].objs.jump_context.drawImage(sceneInfo[2].objs.jumpImg[0], 0, 0);
          objs.container.style.backgroundColor = "white";
        }

        break;
      case 2:
        objs.jump_context.drawImage(objs.jumpImg[0], 0, 0);
        if (scrollRatio <= 0.32) {
          objs.jump_canvas.style.opacity = calcValues(values.jump_opacity_down, currentYOffset);
          objs.jump_div.style.zIndex = 0;
        } else {
          objs.jump_canvas.style.opacity = calcValues(values.jump_opacity_out, currentYOffset);
          objs.jump_div.style.zIndex = -1;
        }
        if (scrollRatio <= 0.22) {
          objs.main_message.style.opacity = calcValues(values.main_message_opacity_in, currentYOffset);
          objs.main_message.style.letterSpacing = `${calcValues(values.main_message_spacing, currentYOffset)}vw`;
        } else {
          objs.main_message_nothing.style.opacity = calcValues(values.main_message_nothing_opacity, currentYOffset);
          objs.main_message_upper.style.opacity = calcValues(values.main_message_upper_opacity, currentYOffset);
          objs.main_message_space.style.letterSpacing = `${calcValues(values.main_message_space_spacing, currentYOffset)}vw`;
          objs.main_message.style.opacity = calcValues(values.main_message_opacity_out, currentYOffset);
        }
        if (scrollRatio <= 0.33) {
          objs.main_message.style.transform = `translate3d(0, ${calcValues(values.main_message_translateY_middle, currentYOffset)}vw, 0)`;
        } else {
          objs.main_message.style.transform = `translate3d(0, ${calcValues(values.main_message_translateY_out, currentYOffset)}vw, 0)`;
        }

        for (let figureImg of objs.figureImgs) {
          figureImg.addEventListener("click", () => {
            document.body.style.overflowY = "hidden";
            objs.modal.style.display = "block";
            objs.modalImg.src = figureImg.src;
            objs.modalText.innerHTML = figureImg.alt;
          });
        }
        var span = document.getElementsByClassName("close")[2];

        // When the user clicks on <span> (x), close the modal
        span.onclick = () => {
          objs.modal.style.display = "none";
          document.body.style.overflowY = "scroll";
        };

        break;
      case 3:
        objs.rowDiv.style.transform = `translate3d(${calcValues(values.rowDiv_translateX, currentYOffset)}%, 0, 0)`;
        if (scrollRatio <= 0.22) {
          // in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(${calcValues(values.messageA_translateY_in, currentYOffset)}%,0, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(${calcValues(values.messageA_translateY_out, currentYOffset)}%,0, 0)`;
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (currentScene < 4) {
      if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        enterNewScene = true;
        currentScene++;
        document.body.setAttribute("id", `show-scene-${currentScene}`);
      }
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      if (currentScene === 0 || currentScene === 3) {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let currentYOffset = delayedYOffset - prevScrollHeight;
        //모바일 바운스로인한 clcValues 함수 typeError 방지
        if (currentYOffset < 0) {
          currentYOffset = 0;
        } else {
          sceneInfo[3].objs.canvas.style.top = `50%`;
          currentYOffset = delayedYOffset - prevScrollHeight;
        }
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        if (currentScene === 3 && sequence >= 486) {
          sequence = 486;
        }
        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }

        const canvas_Ratio = 704 / beforeInnerHeight;
        const canvas_transY = 10 - sequence * Math.sqrt(canvas_Ratio) * 0.15;
        // section-0 canvas codeVideo last img ZoomIn
        if (currentScene === 0 && sequence >= 370) {
          objs.context.drawImage(objs.videoImages[370], 0, 0);
          objs.canvas.style.transform = `translate3d(${-50 + (sequence - 370) / 2}%, ${canvas_transY - (sequence - 370)}%, 0) scale(${
            1 + (sequence - 370) / 30
          })`;
        }
        // section-0 canvas codeVide zumout
        if (currentScene === 0 && sequence < 370) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
          objs.canvas.style.transform = `translate3d(-50%, ${canvas_transY}%, 0) scale(1)`;
        }
      }
      if (currentScene === 1) {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let currentYOffset = delayedYOffset - prevScrollHeight;
        let section2_ratio = currentYOffset / (beforeInnerHeight * 13);
        if (section2_ratio < 0.87) {
          objs.jump_context.clearRect(0, 0, objs.jump_canvas.width, objs.jump_canvas.height);
        } else {
          // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
          let sequence2 = Math.round((section2_ratio * 100 - 92) * 4);
          if (sequence2 >= 25) {
            sequence2 = 25;
          }
          if (objs.videoImages[sequence2]) {
            objs.jump_context.drawImage(objs.videoImages[sequence2], 0, 0);
          }
        }
      }
    }
    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  ///////////////////////////////////////////////////
  function slideElement(slideImgs) {
    if (currentScene === 1) {
      var objs = sceneInfo[currentScene].objs;
      var values = sceneInfo[currentScene].values;
      var slideArea = objs.slideArea;
      var slideInputs = objs.slideInputs;
      var prevBtn = objs.slidePrevBtn;
      var nextBtn = objs.slideNextBtn;
      var emojiLength = values.emojiCount;
      var imgWidth = Math.round(document.body.offsetWidth * 0.95);
      var pos1,
        pos2,
        pos3 = 0;
      var touchStartX;
      var touchMovedStartX;
      var touchEndX;
      var touchMovedEndX;

      if (imgWidth > 1200) {
        imgWidth = 1200;
      }
      //  화면 높이 < Img 높이 + 상단바 + 프로젝트 타이틀 + 라벨버튼
      if (beforeInnerHeight < (imgWidth / 1000) * 540 + 50 + 50 + 30) {
        slideArea.style.maxWidth = `${(beforeInnerHeight / 540) * 1000 * 0.7}px`;
        imgWidth = (beforeInnerHeight / 540) * 1000 * 0.7;
      } else {
        slideArea.style.maxWidth = `1200px`;
      }
      slideImgs.style.transition = 0.2 + "s";
      slideImgs.addEventListener("touchstart", touchStart, {
        capture: false,
        once: false,
        passive: false,
      });
      slideImgs.onmousedown = dragMouseDown;
      prevBtn.onclick = prevImg;
      nextBtn.onclick = nextImg;
      for (let i = 0; i < slideInputs.length; i++) {
        slideInputs[i].onclick = changeBox;
      }

      function changeBox() {
        var slideRdio = document.getElementsByName("slideRdio");
        var slideImgs = document.querySelector(".slideImgs");
        var imgWidth = document.body.offsetWidth * 0.95;
        if (imgWidth > 1200) {
          imgWidth = 1200;
        }
        for (var i = 0; i < slideRdio.length; i++) {
          if (slideRdio[i].checked) {
            slideImgs.style.left = -imgWidth * i + "px";
            slideImgs.style.transition = 0.3 + "s";
          }
        }
      }

      function touchStart(e) {
        if (slideState) {
          touchStartX = e.changedTouches[0].clientX;
          touchMovedStartX = e.changedTouches[0].clientX;
          slideImgs.addEventListener("touchmove", touchMove, false);
          slideImgs.addEventListener("touchend", touchEnd, false);
        }
        slideState = false;
        //slideImgs.addEventListener('touchend', touchEnd, false);
      }
      function touchMove(e) {
        e = e || window.event;
        e.preventDefault();
        touchMovedEndX = touchMovedStartX - e.changedTouches[0].clientX;
        touchMovedStartX = e.changedTouches[0].clientX;
        slideImgs.style.left = slideImgs.offsetLeft - touchMovedEndX + "px";
        slideImgs.style.transition = 0 + "s";
        touchMovedEndX = 0;
      }
      function touchEnd(e) {
        slideState = true;
        e = e || window.event;
        e.preventDefault();
        touchEndX = e.changedTouches[0].clientX;

        if (touchEndX - touchStartX > 0) {
          if (touchEndX - touchStartX > imgWidth / 4) {
            prevImg();
          } else {
            stayImg();
          }
        } else {
          if (touchStartX - touchEndX > imgWidth / 4) {
            nextImg();
          } else {
            stayImg();
          }
        }
      }
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos2 = e.clientX;
        pos3 = e.clientX;
        beforeSlideLeft = slideImgs.offsetLeft;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
      function elementDrag(e) {
        var movedPosition = slideImgs.style.left;
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        slideImgs.style.left = slideImgs.offsetLeft - pos1 + "px";
        slideImgs.style.transition = 0 + "s";
      }
      function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        pos1 = pos2 - e.clientX;
        var aroundSection = Math.abs(beforeSlideLeft) / imgWidth;
        slideSection = Math.round(aroundSection);
        for (let figureImg of objs.emojiImg) {
          figureImg.addEventListener("click", () => {
            if (pos1 > -3 && pos1 < 3) {
              document.body.style.overflowY = "hidden";
              objs.contactModa.style.display = "flex";
              objs.slide_modalImg.src = figureImg.src;
              pos1 = 5;
            }
          });
        }
        var span = document.getElementsByClassName("close")[1];
        // When the user clicks on <span> (x), close the modal
        span.onclick = () => {
          objs.contactModa.style.display = "none";
          document.body.style.overflowY = "scroll";
        };

        if (pos1 > imgWidth / 4) {
          slideSection += 1;
        }
        if (pos1 < -imgWidth / 4) {
          slideSection -= 1;
        }
        if (slideImgs.offsetLeft > 0) {
          slideSection = 0;
        }
        if (slideImgs.offsetLeft < -(emojiLength - 1) * imgWidth) {
          slideSection = emojiLength - 1;
        }
        slideInputs[slideSection].checked = true;
        slideImgs.style.left = -slideSection * imgWidth + "px";
        slideImgs.style.transition = 0.2 + "s";
      }

      function prevImg() {
        if (slideImgs.offsetLeft < 0) {
          var aroundSection = Math.abs(slideImgs.offsetLeft) / imgWidth;
          slideSection = Math.round(aroundSection);
          if (slideSection > emojiLength - 1) {
            slideSection = emojiLength - 1;
          }
          slideInputs[slideSection - 1].checked = true;
          slideImgs.style.left = -(slideSection - 1) * imgWidth + "px";
          slideImgs.style.transition = 0.2 + "s";
        } else {
          slideInputs[emojiLength - 1].checked = true;
          slideImgs.style.left = -(emojiLength - 1) * imgWidth + "px";
          slideImgs.style.transition = 0 + "s";
        }
      }
      function nextImg() {
        if (slideImgs.offsetLeft > -Math.round(imgWidth) * (emojiLength - 1)) {
          var aroundSection = Math.abs(slideImgs.offsetLeft) / imgWidth;
          slideSection = Math.round(aroundSection);
          slideInputs[slideSection + 1].checked = true;
          slideImgs.style.left = -(slideSection + 1) * imgWidth + "px";
          slideImgs.style.transition = 0.2 + "s";
        } else {
          slideInputs[0].checked = true;
          slideImgs.style.left = 0 + "px";
          slideImgs.style.transition = 0 + "s";
        }
      }
      function stayImg() {
        var aroundSection = Math.abs(slideImgs.offsetLeft) / imgWidth;
        if (slideImgs.offsetLeft > 0) {
          slideInputs[emojiLength - 1].checked = true;
          slideImgs.style.left = -(emojiLength - 1) * imgWidth + "px";
          return;
        }
        if (aroundSection > emojiLength - 1) {
          slideImgs.style.left = 0 + "px";
          slideInputs[0].checked = true;
          return;
        }
        slideSection = Math.round(aroundSection);
        slideInputs[slideSection].checked = true;
        slideImgs.style.left = -slideSection * imgWidth + "px";
        slideImgs.style.transition = 0.2 + "s";
      }
    }
  }

  ///////////////////////////////////////////////////

  window.addEventListener("load", () => {
    imgElemLoadedTotalCount += 50;
    setLayout();

    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    let tempYOffset = yOffset;
    let tempScrollCount = 0;
    if (tempYOffset > 0) {
      let siId = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollLoop();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      if (mobilePlatform) {
        let afterInnerHeight = window.innerHeight;
        if (beforeInnerHeight <= afterInnerHeight) {
          beforeInnerHeight = afterInnerHeight;
          setLayout();
        }
      } else {
        beforeInnerHeight = window.innerHeight;
        setLayout();
      }
    });

    window.addEventListener("orientationchange", () => {
      setTimeout(setLayout, 500);
    });
    document.querySelector(".contact").addEventListener("click", () => {
      let contactModal = document.querySelector(".contact-modal");
      contactModal.style.display = "flex";
      document.body.style.overflowY = "hidden";
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = () => {
        contactModal.style.display = "none";
        document.body.style.overflowY = "scroll";
      };
    });
  });

  setCanvasImages();
})();
