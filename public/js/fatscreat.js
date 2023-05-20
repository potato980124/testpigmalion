/* 모바일 메뉴박스 섹션 아코디언  */

let plusBtn = document.querySelector('.m_menu_box_wrap');
let lotateMinus = document.querySelector('#m_menu_bar_btn2');
let mCont = document.querySelector('.m_menu_cont');

plusBtn.addEventListener('click', () => {
  lotateMinus.classList.toggle('m_menu_bar_btn_click');
  mCont.classList.toggle('m_menu_cont_click');
})



// 비만도 계산기
let checkboxes = document.getElementsByName('sex');
//체크박스 ->하나만 선택 -> 성별 별 bmi지수 계산
function checkOnlyOne(ele) {
  checkboxes.forEach((all) => {
    all.checked = false;
  })
  ele.checked = true;
}
console.log(checkboxes[0].checked)
window.onload = () => {
  const calcBtn = document.querySelector(".green_btn");
  const calcResetBtn = document.querySelector("#calc_reset");
  calcBtn.addEventListener('click', calcBmi);
  calcResetBtn.addEventListener('click', calcReset)
}

function calcBmi() {
  let height = parseInt(document.querySelector('#height').value);
  let weight = parseInt(document.querySelector('#weight').value);
  let age = parseInt(document.querySelector('#age').value);
  let warn = document.querySelector('#warn_empty');
  let weightCont = document.querySelector('#weightCont');
  let weightAgeCon = document.querySelector('#weightAgeCon');
  if (checkboxes[0].checked == false && checkboxes[1].checked == false) {
    warn.innerHTML = '성별을 선택해 주세요!!';
  } else if (height == '' || isNaN(height)) {
    warn.innerHTML = '정확한 신장을 입력해 주세요!!';
  } else if (weight == '' || isNaN(weight)) {
    warn.innerHTML = '정확한 몸무게를 입력해 주세요!!';
  } else if (age == '' || isNaN(age)) {
    warn.innerHTML = '정확한 나이를 입력해 주세요!!';
  } else {
    let bmi = weight / (height / 100) ** 2; //bmi 계산법
    bmi = Math.round(bmi * 100) / 100; //bmi 수치 반올림
    console.log(checkboxes[0].checked);
    if (checkboxes[0].checked == true) {
      if (bmi < 20.0) {
        weightCont.innerHTML = `${bmi}`;
        weightAgeCon.innerHTML = `저체중`;
      } else if (bmi < 25) {
        weightCont.innerHTML = `${bmi}`;
        weightAgeCon.innerHTML = `정상`;
      } else {
        weightCont.innerHTML = `${bmi}`;
        weightAgeCon.innerHTML = `과체중`;
      }
    } else {
      if (bmi < 18.5) {
        weightCont.innerHTML = `${bmi}`;
        weightAgeCon.innerHTML = `저체중`;
      } else if (bmi < 25) {
        weightCont.innerHTML = `${bmi}`;
        weightAgeCon.innerHTML = `정상`;
      } else {
        weightCont.innerHTML = `${bmi}`;
        weightAgeCon.innerHTML = `과체중`;
      }
    }
  }
}

function calcReset() {
  let warn = document.querySelector('#warn_empty');
  let weightCont = document.querySelector('#weightCont');
  let weightAgeCon = document.querySelector('#weightAgeCon');

  document.querySelector('#height').value = '';
  document.querySelector('#weight').value = '';
  document.querySelector('#age').value = '';
  warn.innerHTML = '';
  weightCont.innerHTML = '';
  weightAgeCon.innerHTML = '';
  checkboxes.forEach((e) => {
    e.checked = false;
  })
}