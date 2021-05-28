# Nill

## This page is about who Nill is

```
 This page was inspired from Apple product page.

 It focus on introduce who I am, what I think.

 It can not explain enough, but you would feel who I am.
```

다음은 이 페이지를 만들며 고민했던 문제들 입니다.

- Loading
  로딩을 Lazy loading으로 디자인 하여 현재 보여지는 색션 먼저 이미지를 다운할지 Loading percentage로 구성할지 고민 이였는데, 마지막 섹션의 이미지들의 용량이 생각보다 많아서 Lazy loading을 하게 되면 불완전한 이미지가 보여질 수 있고 사용자로 하여금 어느 정도 화면이 준비되는지 나타내 주는 게 좋다고 생각하여 Loading percentage로 구성하였습니다.
- Section
  퍼포먼스 향상과 효과 충돌 방지를 위하여 크게 4개의 section으로 나누어 script를 구성하였습니다.
- Object
  반복되는 객체 선택을 줄이고 정형화된 구조를 위해 한 객체 안에 Section별로 속성을 나누고 그 속에서도 객체선택과 계산 수치를 Key 값으로 분리하였습니다.
- Video Scrolling
  최대한 고화질의 영상을 스크롤에 맞춰 보여주기 위하여 비디오를 프레임별로 이미지로 만들어 스크롤 비율에 맞추어 저장하고 부드럽게 보여주기 위하여 requestAnimationFrame()을 이용하여 점차 느리게 스크롤이 되도록 하였습니다.
- Language
  사용자의 브라우저 언어에 맞춰 한국어를 제외한 언어는 영어페이지로 Redirect 합니다. 다른 언어를 선택할 때, 역시 해당 html URL로 이동하도록 하였습니다. 단순 번역은 전달되는 느낌이 다르므로 영어 페이지는 하고자 하는 말이 잘 전달 될 수 있도록 다른 표현이지만 맥락은 같도록 하였습니다.
- Slider
  Parallax scrolling기반의 웹 사이트에다가 프로젝트(Emoji)를 설명할 이미지들을 넣으려 하니 스크롤링에 더욱 많은 피로가 쌓이고 관심 있는 사용자에게만 보여 줄 수 있도록 Slider로 구성하였습니다. VanillaJS를 추구하였기에 슬라이드를 직접 구성하였고 UX가 스크롤링에서 클릭이나 드래그로 바뀌기에 이에 대한 불편함을 최소한으로 줄이기 위해 label, drag 그리고 butten까지 구성하여 쉽게 접근할 수 있도록 구성하였습니다.
- "This"
  두번째 Section중 "This"가 점점 확대 되는 부분이 있는데 폰트가 깨지지 않게 하기 위해 svg 태그를 이용하였고, Section2의 백그라운드가 검은색이기 때문에 "This"와 뒤에 비디오 사이에 하얀색 레이어를 두고 opacity를 내려서 자연스러운 Parallax scrolling 효과로 보여지게끔 하였으며 "This"가 점차 빠르게 커지도록 하기위해 제곱함수 그래프를 착안하여 Math.pow()를 이용하였습니다.
- Safari scroll
  safari에서 스크롤 효과 중 최상단과 최 하단의 바운스 되는 효과와 up scroll중에 adress bar가 나타날 때 resize되어 innerHeight가 작아져 parallax 효과가 깨지는 현상이 발생하는데, MacOS가 없기에 Chrome DevTool을 이용하여 가지고 있던 아이폰으로 디버깅하였습니다. 문제 해결 방식은 모바일 플랫폼에서 innerheight가 커지면 커진 값으로 높이를 고정하여 resize가 되지 않도록 하였습니다(가로모드는 따로 설정하였습니다).
- Browser Compatibility
  Internet Explorer(이하 IE)는 ES6와 호환성이 떨어지고 2020.12.01 부터 MS에서는 지원중단을 밝혔기에 IE에서 사이트 방문 시 엣지 브라우저로 redirect 할 수 있도록 하였으며 Instagram, KakaoTalk과 같은 In-app Browser 또한 호환성이 떨어지고 따로 디버깅 툴을 제공하지 않기에 사용자 환경을 판별하여 In-app Browser로 방문했다면 alert으로 호환성 안내를 했습니다. Android는 Chrome으로 redirect가 가능하나 Ios는 리다이렉트 하기엔 제한사항이 많아서(익명 FTP를 이용하여 강제로 Safari를 통해 열리도록 할 수 있지만 FTP보안 이슈 때문에 사용하지 않았습니다) alert로 안내만 하였습니다.
