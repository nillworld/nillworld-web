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
  let canvasRatio;

  const sceneInfo = [
    // 0
    {
      type: "sticky",
      heightNum: 7, //Multiples of browser height
      scrollHeight: 0,
      //DOM Object
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
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
        main_message: document.querySelector(".main-message h2"),
        project_div: document.querySelector("#scroll-section-1 .project"),
        message_div_automouse: document.querySelector(".project-message.automouse"),
        message_div_nas: document.querySelector(".project-message.nas-server"),
        project_automouse_title: document.querySelector(".project-message-title.automouse"),
        project_nas_title: document.querySelector(".project-message-title.nas-server"),
        project_apple_title: document.querySelector(".project-message.apple-page"),
        loop_video: document.querySelector(".loop-video"),
        project_canvas: document.querySelector(".project-canvas"),
        project_context: document.querySelector(".project-canvas").getContext("2d"),
        imagesPath: ["./images/projects/automouse.png", "./images/projects/theia-code.png"],
        projectImg: [],
        slideArea: document.querySelector(".slideArea"),
        slideInputs: document.querySelectorAll(".slideImgBox input"),
        slideLabels: document.querySelector(".slideImgBox .labels"),
        slideImgs: document.querySelector(".slideImgs"),
        slideImgUl: document.querySelector(".slideImgs ul"),
        emojiImgs: document.querySelectorAll(".slideImgs .emoji"),
        slidePrevBtn: document.querySelector("#scroll-section-1 .prev"),
        slideNextBtn: document.querySelector("#scroll-section-1 .next"),
        emojiImg: document.querySelectorAll(".emoji img"),
        apple_canvas: document.querySelector("#apple-canvas"),
        this_canvas: document.querySelector("#this-canvas"),
        jump_canvas: document.querySelector("#jump"),
        apple_context: document.querySelector("#apple-canvas").getContext("2d"),
        this_context: document.querySelector("#this-canvas").getContext("2d"),
        jump_context: document.querySelector("#jump").getContext("2d"),
        apple_imgesPath: ["./images/apple-0.png", "./images/apple-1.png", "./images/whiteboard.png"],
        apple_imges: [],
        this_imges: [],
        videoImages: [],
      },
      values: {
        videoImageCount: 26,
        imageSequence: [0, 25],
        main_opacity_in: [0, 1, { start: 0.0, end: 0.06 }],
        main_taranslateY_in: [20, 0, { start: 0.0, end: 0.06 }],
        automouse_img_opacity_in: [0, 1, { start: 0.14, end: 0.19 }],
        main_opacity_out: [1, 0, { start: 0.11, end: 0.14 }],
        main_taranslateY_out: [0, -20, { start: 0.11, end: 0.14 }],
        automouse_img_opacity_down: [1, 0.2, { start: 0.23, end: 0.26 }],
        automouse_img_opacity_out: [0.2, 0, { start: 0.35, end: 0.38 }],
        nas_img_opacity_in: [0, 1, { start: 0.43, end: 0.47 }],
        nas_img_opacity_down: [1, 0.1, { start: 0.53, end: 0.55 }],
        nas_img_opacity_out: [0.1, 0, { start: 0.65, end: 0.67 }],
        emojiCouint: 8,
        apple_canvas_in: [0, 1, { start: 0.72, end: 0.75 }],
        apple_canvas_out: [1, 0, { start: 0.85, end: 1 }],
      },
    },
    // 2
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageA: document.querySelector("#scroll-section-2 .a"),
        messageB: document.querySelector("#scroll-section-2 .b"),
        messageC: document.querySelector("#scroll-section-2 .c"),
        pinB: document.querySelector("#scroll-section-2 .b .pin"),
        pinC: document.querySelector("#scroll-section-2 .c .pin"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
        messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
      },
    },
    // 3
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        canvasCaption: document.querySelector(".canvas-caption"),
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
        imagesPath: ["./images/blend-image-1.jpg", "./images/blend-image-2.jpg"],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
        rectStartY: 0,
      },
    },
  ];

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `./video/01/Nill-code-${100 + i}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    imgElem2 = new Image();
    imgElem2.src = `./images/profileImg.jpg`;
    sceneInfo[0].objs.profileImg.push(imgElem2);

    let imgElem3;
    for (let i = 0; i < sceneInfo[1].objs.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[1].objs.imagesPath[i];
      sceneInfo[1].objs.projectImg.push(imgElem3);
    }

    let imgElem4;
    for (let i = 0; i < sceneInfo[1].objs.apple_imgesPath.length; i++) {
      imgElem4 = new Image();
      imgElem4.src = sceneInfo[1].objs.apple_imgesPath[i];
      sceneInfo[1].objs.apple_imges.push(imgElem4);
    }

    let imgElem4_1;
    imgElem4_1 = new Image();
    imgElem4_1.src = `./images/this-1.png`;
    sceneInfo[1].objs.this_imges.push(imgElem4_1);

    let imgElem4_2;
    for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
      imgElem4_2 = new Image();
      imgElem4_2.src = `./video/03/jump-${i}.jpg`;
      sceneInfo[1].objs.videoImages.push(imgElem4_2);
    }

    let imgElem5;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem5 = new Image();
      imgElem5.src = `./video/02/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem5);
    }

    let imgElem6;
    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imgElem6 = new Image();
      imgElem6.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem6);
    }
  }

  function checkMenu() {
    if (yOffset > 44) {
      document.body.classList.add("local-nav-sticky");
    } else {
      document.body.classList.remove("local-nav-sticky");
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
    const heightRatio = window.innerHeight / 900;
    let section1_canvas_scale;
    //when long height, top rate up (cuz of local bar -> 50px)
    let projectYtrans = 0;
    let project_message_width_Ratio = 0.9;
    if (window.innerWidth >= 1200 && window.innerHeight >= 900) {
      section1_canvas_scale = 1;
    } else {
      if (window.innerWidth / 1200 >= window.innerHeight / 900) {
        section1_canvas_scale = window.innerHeight / 900;
      } else {
        projectYtrans = -5;
        //minus scrollbar width -> 20
        section1_canvas_scale = (window.innerWidth - 20) / 1200;
      }
    }
    if (section1_canvas_scale * 1200 > 700) {
      project_message_width_Ratio = 0.7;
    }
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, 10%, 0) scale(1)`;
    sceneInfo[0].objs.profile_canvas.style.transform = `translate3d(-50%, -49%, 0) scale(1)`;
    sceneInfo[1].objs.project_canvas.style.transform = `translate3d(-50%, ${projectYtrans - 50}%, 0) scale(${section1_canvas_scale})`;
    sceneInfo[1].objs.message_div_automouse.style.width = `${1200 * section1_canvas_scale * project_message_width_Ratio}px`;
    sceneInfo[1].objs.message_div_nas.style.width = `${1200 * section1_canvas_scale * project_message_width_Ratio}px`;
    sceneInfo[1].objs.project_automouse_title.style.marginTop = `${window.innerHeight * sceneInfo[1].heightNum * 0.28}px`;
    sceneInfo[1].objs.project_nas_title.style.marginTop = `${window.innerHeight * sceneInfo[1].heightNum * 0.18}px`;
    sceneInfo[1].objs.slideArea.style.marginTop = `${window.innerHeight * sceneInfo[1].heightNum * 0.22}px`;
    sceneInfo[1].objs.loop_video.style.width = `${1200 * section1_canvas_scale * project_message_width_Ratio}px`;
    sceneInfo[1].objs.this_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
    sceneInfo[1].objs.jump_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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
      direction[i].src = `./images/projects/${projectName}/${projectName}-${i}.jpg`;
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
        // console.log('0 play');
        // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        // objs.container.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

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
        imgChange(values.emojiCouint, objs.emojiImg, "emoji");
        slideElement(objs.slideImgs);
        if (scrollRatio <= 0.1) {
          objs.main_message.style.opacity = calcValues(values.main_opacity_in, currentYOffset);
          objs.main_message.style.transform = `translate3d(0, ${calcValues(values.main_taranslateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.main_message.style.opacity = calcValues(values.main_opacity_out, currentYOffset);
          objs.main_message.style.transform = `translate3d(0, ${calcValues(values.main_taranslateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio <= 0.4) {
          objs.project_context.drawImage(objs.projectImg[0], 0, 0);
        } else {
          objs.project_context.drawImage(objs.projectImg[1], 0, 0);
        }
        if (scrollRatio <= 0.21) {
          objs.project_canvas.style.opacity = calcValues(values.automouse_img_opacity_in, currentYOffset);
        } else if (scrollRatio <= 0.3) {
          objs.project_canvas.style.opacity = calcValues(values.automouse_img_opacity_down, currentYOffset);
        } else if (scrollRatio <= 0.4) {
          objs.project_canvas.style.opacity = calcValues(values.automouse_img_opacity_out, currentYOffset);
        } else if (scrollRatio <= 0.52) {
          objs.project_canvas.style.opacity = calcValues(values.nas_img_opacity_in, currentYOffset);
        } else if (scrollRatio <= 0.57) {
          objs.project_canvas.style.opacity = calcValues(values.nas_img_opacity_down, currentYOffset);
        } else {
          objs.project_canvas.style.opacity = calcValues(values.nas_img_opacity_out, currentYOffset);
        }
        if (scrollRatio <= 0.79) {
          objs.apple_context.drawImage(objs.apple_imges[0], 0, 0);
          objs.apple_canvas.style.opacity = calcValues(values.apple_canvas_in, currentYOffset);
          objs.apple_canvas.style.backgroundColor = "rgba(30, 30, 30, 1)";
          objs.this_context.clearRect(0, 0, objs.this_canvas.width, objs.this_canvas.height);
        } else {
          objs.apple_context.drawImage(objs.apple_imges[1], 0, 0);
          objs.apple_canvas.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
          objs.this_context.clearRect(0, 0, objs.this_canvas.width, objs.this_canvas.height);
          objs.apple_canvas.style.opacity = calcValues(values.apple_canvas_out, currentYOffset);
        }

        break;
      case 2:
        // console.log('2 play');
        if (scrollRatio <= 0.32) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
        if (scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            // 캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
          } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
          }

          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = "white";
          objs.context.drawImage(objs.images[0], 0, 0);

          // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // 좌우 흰색 박스 그리기
          objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);
          objs.context.fillRect(parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);
        }

        break;

      case 3:
        // console.log('3 play');
        let step = 0;
        // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = "white";
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        if (!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 흰색 박스 그리기
        objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);

        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          // console.log('캔버스 닿기 전');
          objs.canvas.classList.remove("sticky");
        } else {
          step = 2;
          // console.log('캔버스 닿은 후');
          // 이미지 블렌드
          // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          const blendHeight = calcValues(values.blendHeight, currentYOffset);

          objs.context.drawImage(
            objs.images[1],
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight,
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight
          );

          objs.canvas.classList.add("sticky");
          objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            objs.canvas.style.marginTop = 0;
          }

          if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
            objs.canvas.classList.remove("sticky");
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
            values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
            values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
            objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
            objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
          }
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

    if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
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
      if (currentScene === 0 || currentScene === 2) {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let currentYOffset = delayedYOffset - prevScrollHeight;
        //모바일 바운스로인한 clcValues 함수 typeError 방지
        if (currentYOffset < 0) {
          objs.canvas.style.top = `300%`;
          currentYOffset = 0;
        } else {
          sceneInfo[2].objs.canvas.style.top = `50%`;
          currentYOffset = delayedYOffset - prevScrollHeight;
        }
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }

        const canvas_Ratio = (window.innerWidth * 704) / (window.innerHeight * 720);
        const canvas_transY = 10 - (sequence * canvas_Ratio * 0.5) / 6;
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
        let section2_ratio = currentYOffset / (window.innerHeight * 13);
        let apple_canvas_Ratio = 1;
        if (window.innerWidth < 570) {
          apple_canvas_Ratio = 0.65;
        }
        if (section2_ratio < 0.83) {
          objs.apple_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${apple_canvas_Ratio})`;
          objs.jump_context.clearRect(0, 0, objs.jump_canvas.width, objs.jump_canvas.height);
        } else {
          // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
          let sequence2 = Math.round((section2_ratio * 100 - 83) * 2);
          console.log(sequence2);
          scale_section2_ratio = 0.02 + Math.pow((section2_ratio - 0.83) * 9, 7);
          objs.apple_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${scale_section2_ratio * 5})`;
          objs.this_canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${scale_section2_ratio})`;
          if (objs.videoImages[sequence2]) {
            objs.jump_context.drawImage(objs.videoImages[sequence2], 0, 0);
          }
          objs.apple_context.drawImage(objs.apple_imges[2], 0, 0);
          objs.this_context.drawImage(objs.this_imges[0], 0, 0);
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
    var objs = sceneInfo[currentScene].objs;
    var values = sceneInfo[currentScene].values;
    var slideArea = objs.slideArea;
    var slideInputs = objs.slideInputs;
    var slideLabels = objs.slideLabels;
    var prevBtn = objs.slidePrevBtn;
    var nextBtn = objs.slideNextBtn;
    var emojiLength = values.emojiCouint;
    var imgWidth = Math.round(document.body.offsetWidth * 0.95);
    var pos1,
      pos2,
      pos3 = 0;
    var touchStartX;
    var touchEndX;
    var touchMovedStartX;
    var touchMovedEndX;

    if (imgWidth > 1200) {
      imgWidth = 1200;
    }
    //  화면 높이 < Img 높이 + 상단바 + 프로젝트 타이틀 + 라벨버튼
    if (window.innerHeight < (imgWidth / 1000) * 540 + 50 + 50 + 30) {
      slideArea.style.maxWidth = `${(window.innerHeight / 540) * 1000 * 0.7}px`;
      imgWidth = (window.innerHeight / 540) * 1000 * 0.7;
      slideArea.style.top = `55%`;
    } else {
      slideArea.style.maxWidth = `1200px`;
      slideArea.style.top = `50%`;
    }
    slideImgs.style.transition = 0.2 + "s";
    slideImgs.addEventListener("touchstart", touchStart, false);
    slideImgs.onmousedown = dragMouseDown;
    prevBtn.onclick = prevImg;
    nextBtn.onclick = nextImg;

    function touchStart(e) {
      e = e || window.event;
      e.preventDefault();
      if (slideState) {
        touchStartX = e.changedTouches[0].clientX;
        slideImgs.addEventListener("touchmove", touchMove, false);
      }
      slideState = false;
      //slideImgs.addEventListener('touchend', touchEnd, false);
    }
    function touchMove(e) {
      e = e || window.event;
      e.preventDefault();
      touchMovedEndX = touchStartX - e.changedTouches[0].clientX;
      touchStartX = e.changedTouches[0].clientX;
      slideImgs.style.left = slideImgs.offsetLeft - touchMovedEndX + "px";
      slideImgs.style.transition = 0 + "s";
      touchMovedEndX = 0;
      slideImgs.addEventListener("touchend", touchEnd, false);
    }
    function touchEnd(e) {
      slideState = true;
      e = e || window.event;
      e.preventDefault();
      touchEndX = e.changedTouches[0].clientX;
      if (touchEndX - touchStartX > 0) {
        if (touchEndX - touchStartX > imgWidth / 3) {
          prevImg();
        } else {
          stayImg();
        }
      } else {
        if (touchStartX - touchEndX > imgWidth / 3) {
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
      if (pos1 > imgWidth / 4) {
        slideSection += 1;
      }
      if (pos1 < -imgWidth / 4) {
        console.log(pos1);
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

  ///////////////////////////////////////////////////

  window.addEventListener("load", () => {
    document.body.classList.remove("before-load");
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
      checkMenu();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      ///////////////////////////////////////////
      sceneInfo[1].objs.slideImgs.style.left = 0 + "px";
      sceneInfo[1].objs.slideInputs[0].checked = true;

      console.log(sceneInfo[1].objs.slideInputs[0].checked);
      slideElement(sceneInfo[1].objs.slideImgs);
      ///////////////////////////////////////////

      setLayout();
      if (window.innerWidth > 900) {
        sceneInfo[3].values.rectStartY = 0;
      }
      if (currentScene === 3) {
        // 추가 코드
        // Scene 3의 요소들은 위치나 크기가 미리 정해지지 않고
        // 현재 창 사이즈나 스크롤 위치에 따라 가변적으로 변하기 때문에
        // 리사이즈에 일일이 대응시키기가 까다롭습니다.
        // Scene 3에 진입 시점에 요소들의 위치와 크기가 결정이 되는 특징을 이용해서
        // 현재 Scene이 3일 경우에는 좀 위로 스크롤이 되도록 해서
        // Scene 3의 시작 지점 이전으로 돌리는 식으로 요소들의 레이아웃이 깨지는 현상을 방지해 줍니다.
        // 시작 지점 이전으로 스크롤을 이동 시키는 동작은
        // 바로 위 518 라인의 자동 스크롤 코드를 그대로 활용했습니다.
        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if (tempYOffset > 0) {
          let siId = setInterval(() => {
            scrollTo(0, tempYOffset);
            tempYOffset -= 50;

            if (tempScrollCount > 20) {
              clearInterval(siId);
            }
            tempScrollCount++;
          }, 20);
        }
      }
    });

    window.addEventListener("orientationchange", () => {
      setTimeout(setLayout, 500);
    });

    document.querySelector(".loading").addEventListener("transitionend", (e) => {
      document.body.removeChild(e.currentTarget);
    });
  });

  setCanvasImages();
})();

// const videoElem = document.querySelector(".videotest");
// videoElem.addEventListener("loadeddata", function () {
//   init();
// });
// function init() {
//   videoElem.currentTime = videoElem.duration;
// }

/////////////////////////////////////////////
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
/////////////////////////////////////////////
