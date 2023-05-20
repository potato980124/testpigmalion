// 헤더 
let gnb = document.querySelectorAll('.gnb_menu');
let innerHeader = document.querySelector('.inner_header');
let gnbUnderline = document.querySelectorAll('.g_under_line');
//헤더 드롭 
let header = document.querySelector('header');
let headerHeight = header.offsetHeight;
let gnbColor = document.querySelectorAll('.gnb_menu');
// 헤더 모바일 햄버거 
let hamBtn = document.querySelector('.m_hamberger');
let mobileHeader = document.querySelector('.h_m_menu_wrap');
let line1 = document.querySelector('.line1');
let line2 = document.querySelector('.line2');
let line3 = document.querySelector('.line3');
let indexBody = document.getElementsByTagName('body');


console.log(hamBtn.children);
headerHover();
window.onscroll = function () {
  let windowTop = window.scrollY;
  // 스크롤 세로값이 헤더높이보다 크거나 같으면 
  // 헤더에 클래스 'drop'을 추가한다
  if (windowTop >= headerHeight) {
    headerHoverDrop();
    header.classList.add("header_drop");
    gnbColor.forEach((a) => {
      a.firstElementChild.style.color = "#91CF00";
    })
    for (i = 0; i < hamBtn.children.length;i++){
      hamBtn.children[i].style.backgroundColor = "#91CF00";
    }
  }
  // 아니면 클래스 'drop'을 제거
  else {
    headerHover();
    header.classList.remove("header_drop");
    gnbColor.forEach((a) => {
      a.firstElementChild.style.color = "#ddd";
    })
    for (i = 0; i < hamBtn.children.length;i++){
      hamBtn.children[i].style.backgroundColor = "#fff";
    }
  }
};


function headerHover() {
  gnb.forEach((e, index) => {
    e.addEventListener('mouseenter', () => {
      setTimeout(() => {
        gnbUnderline[index].style.width = '100%';
        e.firstElementChild.style.color = '#91CF00';
      }, 300);
    });
    e.addEventListener('mouseleave', () => {
      setTimeout(() => {
        gnbUnderline[index].style.width = '0';
        e.firstElementChild.style.color = '#ddd';
      }, 300);
    })
  })
}
function headerHoverDrop() {
  gnb.forEach((e, index) => {
    e.addEventListener('mouseenter', () => {
      setTimeout(() => {
        gnbUnderline[index].style.width = '100%';
        e.firstElementChild.style.color = '#91CF00';
      }, 300);
    });
    e.addEventListener('mouseleave', () => {
      setTimeout(() => {
        gnbUnderline[index].style.width = '0';
        e.firstElementChild.style.color = '#91CF00';
      }, 300);
    })
  })
}





hamBtn.addEventListener('click', () => {
  mobileHeader.classList.toggle('h_m_open');
  line1.classList.toggle('h_m_line1_cross');
  line2.classList.toggle('h_m_line_out');
  line3.classList.toggle('h_m_line3_cross');
  // console.log(indexBody[0].style);
  // console.log(indexBody[0].style.length);
  if (indexBody[0].style.length == 0) {
    indexBody[0].style.overflow = 'hidden';
  } else {
    indexBody[0].style.overflow = '';
  }
})
