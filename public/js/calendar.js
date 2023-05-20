//전역변수
let cInputWrap = document.querySelectorAll(".c_regis_input_wrap");
let cResultBox = document.querySelectorAll(".c_regis_input_result");
let cRegiCheckWhat = document.querySelectorAll(".c_regis_check_wrap");
let cRegisWhatWrap = document.querySelectorAll(".c_regis_what_wrap");
let dateClick = document.querySelectorAll(".date_click");
let subtit = document.querySelector(".c_y_m_d_subtit");

// 목표달성률
let cWeight = document.querySelector(".cWeight");
let tWeight = document.querySelector(".tWeight");
let originWeight = document.querySelector(".originWeight");

let cWeightPig = document.querySelector(".cWeight_pig");
let tWeightThropy = document.querySelector(".tWeight_thropy");
let tSucsess = document.querySelector(".t_sucsess");
console.log(originWeight);
console.log(cWeight);
console.log(tWeight);
let totalCalc =
  ((parseInt(cWeight.innerText) - parseInt(tWeight.innerText)) /
    (parseInt(originWeight.innerText) - parseInt(tWeight.innerText))) *100;
console.log(totalCalc);

if (totalCalc == 0) {
  cWeightPig.style.display = "none";
  tSucsess.style.display = "block";
} else if (totalCalc > 100 || 0 > totalCalc) {
  cWeightPig.style.display = "none";
} else {
  cWeightPig.style.right = `${totalCalc}%`;
  cWeightPig.style.transform = `translateX(${totalCalc}%)`;
}
// 달력
let today = "";
if(!subtit.innerText){
  today = new Date();
}else{
  today = new Date(subtit.innerText);
}
// let today = new Date();
let tMonth = today.getMonth() + 1;
let todayYear = today.getFullYear();
let todayMonth = ("00" + tMonth).slice(-2);
let calendar = document.getElementById("calendar_table");

function buildCalendar() {
  let firstDate = new Date(todayYear, tMonth - 1, 1);
  let lastDate = new Date(todayYear, tMonth, 0);
  let day = firstDate.getDay();
  let week = Math.ceil(lastDate.getDate() / 7) + 1;
  let today_yearMonth = todayYear + "년" + tMonth + "월";
  let leftDays = 7; // setDays 와 반비례
  let setDays = 1; // leftDays 와 반비례
  let nextMonthDate = 1;
  for (i = 1; i < week; i++) {
    let row = calendar.insertRow();
    while (day != 0) {
      row.insertCell().innerHTML = "";
      day -= 1;
      leftDays -= 1;
    } // 1주
    while (leftDays != 0) {
      if (setDays > lastDate.getDate()) {
        row.insertCell().innerHTML = nextMonthDate;
        leftDays -= 1;
        nextMonthDate += 1;
      } else {
        let todayYearMonthDate = todayYear + "-" + ("00" + tMonth).slice(-2) + "-" + ("00" + setDays).slice(-2);
        row.insertCell().innerHTML = `<p class="target_date" onclick="javascript:location.href='/calendar?id=${todayYearMonthDate}'">${setDays}</p>`;
        setDays += 1;
        leftDays -= 1;
        // console.log(setDays);
      }
    }
    leftDays = 7;
  }
  setDays -= 1;
  if (setDays != lastDate.getDate()) {
    let row = calendar.insertRow();
    while (setDays != lastDate.getDate()) {
      setDays++;
      leftDays--;
      let todayYearMonthDate = todayYear + "-" + ("00" + tMonth).slice(-2) + "-" + ("00" + setDays).slice(-2);
      row.insertCell().innerHTML = `<p class="target_date" onclick="javascript:location.href='/calendar?id=${todayYearMonthDate}'">${setDays}</p>`;
    }
    while (leftDays != 0) {
      row.insertCell().innerHTML = nextMonthDate;
      nextMonthDate++;
      leftDays--;
    }
  }
  let lastRow = calendar.rows[calendar.rows.length - 1];
  for (i = 0; i < lastRow.children.length; i++) {
    for (j = 0; j < 8; j++) {
      if (lastRow.children[i].innerText == j) {
        lastRow.children[i].style.color = " rgba(0, 0, 0, 30%)";
      }
    }
  }
  document.getElementById("yearMonth").innerHTML = today_yearMonth;
  //달력 클릭시
  let targetDate = document.querySelectorAll(".target_date");
  targetDate.forEach((e) => {
    e.addEventListener("click", (/* e */) => {
      dateClick.forEach((e) => {
        cInputWrap.forEach((e) => {
          e.children[0].value = "";
        });
        cResultBox.forEach((e) => {
          e.style.display = "none";
        });
        cRegiCheckWhat.forEach((e) => {
          e.innerHTML = "";
        });
        cRegisWhatWrap.forEach((e) => {
          e.innerHTML = "";
        });
      });
    });
  });
}
buildCalendar();

// 중간전역변수
let targetDate = document.querySelectorAll(".target_date");

function deleteCalendar() {
  while (calendar.rows.length > 2) {
    calendar.deleteRow(2);
  }
}

function prevMonth() {
  tMonth = tMonth - 1;
  if (tMonth == 0) {
    tMonth = 12;
    todayYear -= 1;
  }
  deleteCalendar();
  today = new Date(todayYear, tMonth - 1);
  buildCalendar();
}

function nextMonth() {
  tMonth += 1;
  if (tMonth == 13) {
    tMonth = 1;
    todayYear = todayYear + 1;
  }
  deleteCalendar();
  today = new Date(todayYear, tMonth - 1);
  buildCalendar();
}
//fetch로 보낼 데이터 처리 ajsx로 보내려 했는데 안 됐다~~~
// function sendWhen(todayYearMonthDate) {
//   console.log(todayYearMonthDate);
//   let sendData = encodeURIComponent(`${todayYearMonthDate}`);
//   fetch(`/calendar?id=${sendData}`)
//     // .then((response) => response.json())
//     // .then((data) => console.log(data))
//     .catch((error) => console.error(error));
// }
//음식검색 인풋창 클릭시
cInputWrap.forEach((e, index) => {
  e.addEventListener("click", () => {
    cResultBox[index].style.display = "block";
  });
});

// 등록결과 유무시
let cRegisResultsWrap = document.querySelector(".c_regis_results_wrap");
let calResultBox = document.querySelector(".cal_result_box");
if (cRegisResultsWrap === null && subtit.innerText != "") {
    calResultBox.style.display = "block";
}else{
  calResultBox.style.display = "none";
}
//달력 정보에 날짜가 undifined일시
// console.log(subtit.innerText);
if (subtit.innerText == "undefined") {
  subtit.innerText = "";
}
// 처음 소개문구 없어질 떄
let firstCalLeftWrap = document.querySelector('.first_cal_left_wrap');
if( cRegisResultsWrap !== null || calResultBox.style.display == "block"){
  firstCalLeftWrap.style.display = 'none';
}
// 클릭 했을 때 해당 날짜 컬러 변경
targetDate.forEach((e)=>{
  console.log(subtit.innerText.slice(8,10));
  if(subtit.innerText.slice(8,10) == ("00" + e.innerText).slice(-2)){
    e.style.color = "#91CF00";
  }
})
// 음식 데이터
let apiFoodDatas = {};
let atFoodName = [];

function foodSearch() {
  apiFoodDatas = {};
  atFoodName = [];
  let mEat = document.querySelector(".m_eat").value;
  const apiAddr =
    "http://openapi.foodsafetykorea.go.kr/api/9afad6adb4074c399a97/I2790/json/1/100/";
  let rFoodData = apiAddr + "DESC_KOR=" + encodeURI(`${mEat}`);
  fetch(rFoodData)
    .then((response) => response.json())
    .then((data) => {
      apiFoodDatas = data.I2790;
      // console.log(apiFoodDatas);
      atFoodName.splice(0, 100);
      // console.log(apiFoodDatas.row[0]);
      for (i = 0; i < apiFoodDatas.row.length; i++) {
        // console.log(apiFoodDatas.row[i].DESC_KOR);
        // console.log(apiFoodDatas.row[i].NUTR_CONT1);
        // atFoodName.push(apiFoodDatas.row[i].NUTR_CONT1);
        atFoodName.push({
          name: apiFoodDatas.row[i].DESC_KOR,
          kcal: apiFoodDatas.row[i].NUTR_CONT1,
          tansu: apiFoodDatas.row[i].NUTR_CONT2,
          danbak: apiFoodDatas.row[i].NUTR_CONT3,
          fat: apiFoodDatas.row[i].NUTR_CONT4,
        });
      }
      // console.log(atFoodName.length);
      let cFoodList = document.querySelector(".morning");
      cFoodList.innerHTML = "";
      for (i = 0; i < atFoodName.length; i++) {
        cFoodList.innerHTML += `<div class="c_regis_check"><input type="checkbox" class="food_value food_value${i}"><p class="food_name">${atFoodName[i].name}</p><p class="food_kcal">${atFoodName[i].kcal}kcal</p></div>`;
        // 음식 선택시 c_regis_what에 표시
        let foodValue = document.querySelectorAll(".food_value");
        let cRegisWhatWrap = document.querySelector(
          ".c_regis_what_wrap_morning"
        );
        let foodName = document.querySelectorAll(".food_name");
        foodValue.forEach((e, index) => {
          e.addEventListener("change", () => {
            // 체크된 애들 체크박스 아래에 추가 해줄 떄
            if (e.checked == true) {
              cRegisWhatWrap.innerHTML += `<div class="c_regis_what c_regis_what_m c_regis_what_m${index}"><input type="hidden" name="m_foods_when" value="morning"><input type="hidden" name="m_foods_name" value="${atFoodName[index].name}"><input type="hidden" name="m_foods_kcal" value="${atFoodName[index].kcal}"><input type="hidden" name="m_foods_tansu" value="${atFoodName[index].tansu}"><input type="hidden" name="m_foods_danbak" value="${atFoodName[index].danbak}"><input type="hidden" name="m_foods_fat" value="${atFoodName[index].fat}"><p>${foodName[index].innerText}</p><p class="c_delete_check">x</p></div>`;
              let deleteCheck = document.querySelectorAll(".c_delete_check");
              let deleteNum = 0;
              let cRegisWhat = document.querySelectorAll(`.c_regis_what_m`);
              //db에 넣기 위해 히든 인풋 태그에 value 값 넣어줄 때
              let c_regis_what_m_length = cRegisWhat.length;
              let $mFoodsLength = document.querySelector(".m_foods_length");
              $mFoodsLength.value = c_regis_what_m_length;
              deleteCheck.forEach((del, dindex) => {
                // 체크된 음식들 지울 떄
                del.addEventListener("click", () => {
                  deleteNum = cRegisWhat[dindex].classList[2];
                  let cDeleteNum = document.querySelector(`.${deleteNum}`);
                  cDeleteNum.remove();
                  c_regis_what_m_length -= 1;
                  $mFoodsLength.value = c_regis_what_m_length;
                });
              });
              // console.log(c_regis_what_m_length);
            }
          });
        });
      }
    });
}

// 점심
function foodSearchLunch() {
  apiFoodDatas = {};
  atFoodName = [];
  let lEat = document.querySelector(".l_eat").value;
  // console.log(lEat);
  const apiAddr =
    "http://openapi.foodsafetykorea.go.kr/api/9afad6adb4074c399a97/I2790/json/1/100/";
  let rFoodData = apiAddr + "DESC_KOR=" + encodeURI(`${lEat}`);
  fetch(rFoodData)
    .then((response) => response.json())
    .then((data) => {
      apiFoodDatas = data.I2790;
      // console.log(apiFoodDatas);
      atFoodName.splice(0, 100);
      // console.log(apiFoodDatas.row[0]);
      for (i = 0; i < apiFoodDatas.row.length; i++) {
        // console.log(apiFoodDatas.row[i].DESC_KOR);
        // console.log(apiFoodDatas.row[i].NUTR_CONT1);
        // atFoodName.push(apiFoodDatas.row[i].NUTR_CONT1);
        atFoodName.push({
          name: apiFoodDatas.row[i].DESC_KOR,
          kcal: apiFoodDatas.row[i].NUTR_CONT1,
          tansu: apiFoodDatas.row[i].NUTR_CONT2,
          danbak: apiFoodDatas.row[i].NUTR_CONT3,
          fat: apiFoodDatas.row[i].NUTR_CONT4,
        });
      }
      // console.log(atFoodName.length);
      let cFoodList = document.querySelector(".lunch");
      cFoodList.innerHTML = "";
      for (i = 0; i < atFoodName.length; i++) {
        cFoodList.innerHTML += `<div class="c_regis_check"><input type="checkbox" class="food_value_l l_food_value${i}"><p class="lunch_food_name">${atFoodName[i].name}</p><p class="food_kcal">${atFoodName[i].kcal}kcal</p></div>`;
        // 음식 선택시 c_regis_what에 표시
        let foodValue = document.querySelectorAll(".food_value_l");
        // console.log(foodValue);
        let cRegisWhatWrap = document.querySelector(".c_regis_what_wrap_lunch");
        let foodName = document.querySelectorAll(".lunch_food_name");
        foodValue.forEach((e, index) => {
          e.addEventListener("change", () => {
            // 체크된 애들 체크박스 아래에 추가 해줄 떄
            if (e.checked == true) {
              cRegisWhatWrap.innerHTML += `<div class="c_regis_what c_regis_what_l c_regis_what_l${index}"><input type="hidden" name="l_foods_when" value="lunch"><input type="hidden" name="l_foods_name" value="${atFoodName[index].name}"><input type="hidden" name="l_foods_kcal" value="${atFoodName[index].kcal}"><input type="hidden" name="l_foods_tansu" value="${atFoodName[index].tansu}"><input type="hidden" name="l_foods_danbak" value="${atFoodName[index].danbak}"><input type="hidden" name="l_foods_fat" value="${atFoodName[index].fat}"><p>${foodName[index].innerText}</p><p class="c_delete_check_l">x</p></div>`;
              let deleteCheck = document.querySelectorAll(".c_delete_check_l");
              let deleteNum = 0;
              let cRegisWhat = document.querySelectorAll(`.c_regis_what_l`);
              //db에 넣기 위해 히든 인풋 태그에 value 값 넣어줄 때
              let c_regis_what_l_length = cRegisWhat.length;
              let $lFoodsLength = document.querySelector(".l_foods_length");
              $lFoodsLength.value = c_regis_what_l_length;
              deleteCheck.forEach((del, dindex) => {
                // 체크된 음식들 지울 떄
                del.addEventListener("click", () => {
                  deleteNum = cRegisWhat[dindex].classList[2];
                  let cDeleteNum = document.querySelector(`.${deleteNum}`);
                  cDeleteNum.remove();
                  c_regis_what_l_length -= 1;
                  $lFoodsLength.value = c_regis_what_l_length;
                });
              });
            }
          });
        });
      }
    });
}

// 저녁
function foodSearchDinner() {
  apiFoodDatas = {};
  atFoodName = [];
  let DEat = document.querySelector(".d_eat").value;
  // console.log(DEat);
  const apiAddr =
    "http://openapi.foodsafetykorea.go.kr/api/9afad6adb4074c399a97/I2790/json/1/100/";
  let rFoodData = apiAddr + "DESC_KOR=" + encodeURI(`${DEat}`);
  fetch(rFoodData)
    .then((response) => response.json())
    .then((data) => {
      apiFoodDatas = data.I2790;
      // console.log(apiFoodDatas);
      atFoodName.splice(0, 100);
      // console.log(apiFoodDatas.row[0]);
      for (i = 0; i < apiFoodDatas.row.length; i++) {
        // console.log(apiFoodDatas.row[i].DESC_KOR);
        // console.log(apiFoodDatas.row[i].NUTR_CONT1);
        // atFoodName.push(apiFoodDatas.row[i].NUTR_CONT1);
        atFoodName.push({
          name: apiFoodDatas.row[i].DESC_KOR,
          kcal: apiFoodDatas.row[i].NUTR_CONT1,
          tansu: apiFoodDatas.row[i].NUTR_CONT2,
          danbak: apiFoodDatas.row[i].NUTR_CONT3,
          fat: apiFoodDatas.row[i].NUTR_CONT4,
        });
      }
      // console.log(atFoodName.length);
      let cFoodList = document.querySelector(".dinner");
      cFoodList.innerHTML = "";
      for (i = 0; i < atFoodName.length; i++) {
        cFoodList.innerHTML += `<div class="c_regis_check"><input type="checkbox" class="food_value_d d_food_value${i}"><p class="dinner_food_name">${atFoodName[i].name}</p><p class="food_kcal">${atFoodName[i].kcal}kcal</p></div>`;
        // 음식 선택시 c_regis_what에 표시
        let foodValue = document.querySelectorAll(".food_value_d");
        // console.log(foodValue);
        let cRegisWhatWrap = document.querySelector(
          ".c_regis_what_wrap_dinner"
        );
        let foodName = document.querySelectorAll(".dinner_food_name");
        foodValue.forEach((e, index) => {
          e.addEventListener("change", () => {
            // 체크된 애들 체크박스 아래에 추가 해줄 떄
            if (e.checked == true) {
              cRegisWhatWrap.innerHTML += `<div class="c_regis_what c_regis_what_d c_regis_what_d${index}"><input type="hidden" name="d_foods_when" value="dinner"><input type="hidden" name="d_foods_name" value="${atFoodName[index].name}"><input type="hidden" name="d_foods_kcal" value="${atFoodName[index].kcal}"><input type="hidden" name="d_foods_tansu" value="${atFoodName[index].tansu}"><input type="hidden" name="d_foods_danbak" value="${atFoodName[index].danbak}"><input type="hidden" name="d_foods_fat" value="${atFoodName[index].fat}"><p>${foodName[index].innerText}</p><p class="c_delete_check_d">x</p></div>`;
              let deleteCheck = document.querySelectorAll(".c_delete_check_d");
              let deleteNum = 0;
              let cRegisWhat = document.querySelectorAll(`.c_regis_what_d`);
              //db에 넣기 위해 히든 인풋 태그에 value 값 넣어줄 때
              // let mFoodsValue = document.getElementsByName('m_foods');
              // console.log(mFoodsValue[0]);
              let c_regis_what_d_length = cRegisWhat.length;
              let $dFoodsLength = document.querySelector(".d_foods_length");
              $dFoodsLength.value = c_regis_what_d_length;
              deleteCheck.forEach((del, dindex) => {
                // 체크된 음식들 지울 떄
                del.addEventListener("click", () => {
                  deleteNum = cRegisWhat[dindex].classList[2];
                  let cDeleteNum = document.querySelector(`.${deleteNum}`);
                  cDeleteNum.remove();
                  c_regis_what_d_length -= 1;
                  $dFoodsLength.value = c_regis_what_d_length;
                });
              });
            }
          });
        });
      }
    });
}
//post로 전송 할 때 언제,유저 id 히든인풋에 value 값으로 넣어주는 함수
let when = document.querySelector(".food_info_when");
when.value = subtit.innerText;
console.log(when.value);
//post전송시 몸무게 필수 입력
function must_kg(){
  let mustKg = document.querySelector('.must_kg');
  if(mustKg.value==''){
    alert("현재 몸무게를 입력해주세요!");
    return false;
  }
  document.cal_submit.submit();
}

// db에서 받아온 영양소 정보들 합산
let nutriSum = document.querySelector('.nutri_sum');
let nutriResults = document.querySelectorAll('.nutri_result');
let fatSumResult = nutriSum.children[1];
let tanSumResult = nutriSum.children[2];
let danSumResult = nutriSum.children[3];
let kcalSumResult = nutriSum.children[4];
let fatSum = 0;
let tanSum = 0;
let danSum = 0;
let kcalSum = 0;
nutriResults.forEach((e)=>{
  console.log(Number(e.children[1].innerText));
  fatSum += Number(e.children[1].innerText);
  tanSum += Number(e.children[2].innerText);
  danSum += Number(e.children[3].innerText);
  kcalSum += Number(e.children[4].innerText);
})
fatSumResult.innerText = fatSum.toFixed(2);
tanSumResult.innerText = tanSum.toFixed(2);
danSumResult.innerText = danSum.toFixed(2);
kcalSumResult.innerText = kcalSum.toFixed(2);







