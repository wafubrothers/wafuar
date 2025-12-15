console.log("RTL Fix Running…");

// 检测页面是否是 RTL
const isRTL = document.dir === "rtl" || document.documentElement.dir === "rtl";


if (isRTL) {

  // 1️⃣ margin/padding 基本反转
  const baseCSS = `
    /* Margin */
    .ml-0{margin-right:0 !important;} .ml-1{margin-right:0.25rem !important;}
    .ml-2{margin-right:0.5rem !important;} .ml-3{margin-right:0.75rem !important;}
    .ml-4{margin-right:1rem !important;} .ml-5{margin-right:1.25rem !important;}
    .ml-6{margin-right:1.5rem !important;} .ml-8{margin-right:2rem !important;}
    .ml-10{margin-right:2.5rem !important;} .ml-12{margin-right:3rem !important;}
    .ml-16{margin-right:4rem !important;}
    .mr-0{margin-left:0 !important;} .mr-1{margin-left:0.25rem !important;}
    .mr-2{margin-left:0.5rem !important;} .mr-3{margin-left:0.75rem !important;}
    .mr-4{margin-left:1rem !important;} .mr-5{margin-left:1.25rem !important;}
    .mr-6{margin-left:1.5rem !important;} .mr-8{margin-left:2rem !important;}
    .mr-10{margin-left:2.5rem !important;} .mr-12{margin-left:3rem !important;}
    .mr-16{margin-left:4rem !important;}

    /* Padding */
    .pl-0{padding-right:0 !important;} .pl-1{padding-right:0.25rem !important;}
    .pl-2{padding-right:0.5rem !important;} .pl-3{padding-right:0.75rem !important;}
    .pl-4{padding-right:1rem !important;} .pl-5{padding-right:1.25rem !important;}
    .pl-6{padding-right:1.5rem !important;} .pl-8{padding-right:2rem !important;}
    .pl-10{padding-right:2.5rem !important;} .pl-12{padding-right:3rem !important;}
    .pl-16{padding-right:4rem !important;}
    .pr-0{padding-left:0 !important;} .pr-1{padding-left:0.25rem !important;}
    .pr-2{padding-left:0.5rem !important;} .pr-3{padding-left:0.75rem !important;}
    .pr-4{padding-left:1rem !important;} .pr-5{padding-left:1.25rem !important;}
    .pr-6{padding-left:1.5rem !important;} .pr-8{padding-left:2rem !important;}
    .pr-10{padding-left:2.5rem !important;} .pr-12{padding-left:3rem !important;}
    .pr-16{padding-left:4rem !important;}
  `;

  // 2️⃣ 自动生成 space-x-* RTL 规则
  let spaceCSS = "";
  const spaces = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16];
  spaces.forEach((num) => {
    const rem = {
      0: "0px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
    }[num];

    spaceCSS += `
      [dir="rtl"] .space-x-${num}  > :not([hidden]) ~ :not([hidden]) {
        margin-left: 0 !important;
        margin-right: ${rem} !important;
      }
    `;
  });

  // 注入样式
  const style = document.createElement("style");
  style.id = "rtl-fix-style";
  style.innerHTML = baseCSS + spaceCSS;
  document.head.appendChild(style);

// 3️⃣ RTL 下反转 group-hover:translate-x-1
const rtlHoverFix = `
  [dir="rtl"] .group:hover .group-hover\\:translate-x-1 {
    transform: translateX(-0.25rem) !important;
  }
  [dir="rtl"] .group:hover .group-hover\\:translate-x-2 {
    transform: translateX(-0.5rem) !important;
  }
  [dir="rtl"] .group:hover .group-hover\\:-translate-x-1 {
    transform: translateX(0.25rem) !important;
  }
  [dir="rtl"] .group:hover .group-hover\\:-translate-x-2 {
    transform: translateX(0.5rem) !important;
  }
`;
style.innerHTML = baseCSS + spaceCSS + rtlHoverFix;

    // RTL 页面下把 FontAwesome 的角箭头反转
    // 保存原始集合，避免重复替换
    const rightArrows = Array.from(document.querySelectorAll(".fa-angle-right"));
    const leftArrows = Array.from(document.querySelectorAll(".fa-angle-left"));
    // 反转另一种箭头
    const arrowRight = Array.from(document.querySelectorAll(".fa-arrow-right"));
    const arrowLeft = Array.from(document.querySelectorAll(".fa-arrow-left"));

    // 先处理右箭头 -> 左箭头
    rightArrows.forEach((el) => {
        el.classList.remove("fa-angle-right");
        el.classList.add("fa-angle-left");
    });

    // 再处理左箭头 -> 右箭头
    leftArrows.forEach((el) => {
        el.classList.remove("fa-angle-left");
        el.classList.add("fa-angle-right");
    });

  // 先处理右箭头 -> 左箭头
  arrowRight.forEach((el) => {
    el.classList.remove("fa-arrow-right");
    el.classList.add("fa-arrow-left");
  });

  // 再处理左箭头 -> 右箭头
  arrowLeft.forEach((el) => {
    el.classList.remove("fa-arrow-left");
    el.classList.add("fa-arrow-right");
  });


}
