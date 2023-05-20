const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("./../db.js");
const session = require("express-session");
// const crypto = require("crypto");
const FileStore = require("session-file-store")(session); // 세션을 파일에 저장
// const cookieParser = require("cookie-parser");
// const request = require("request");

// 세션 (미들웨어) 6
router.use(
  session({
    secret: process.env.COOKIE_SECRET || 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: false, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store: new FileStore(), // 세션이 데이터를 저장하는 곳
  })
);

router.get("/", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("main", {
      is_logined: req.session.is_logined,
    });
  } else {
    res.render("main", {
      is_logined: false,
    });
  }
});

router.get("/login", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("login", {
      is_logined: req.session.is_logined,
    });
  } else {
    res.render("login", {
      is_logined: false,
    });
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});
router.get("/join", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("join", {
      is_logined: req.session.is_logined,
    });
  } else {
    res.render("join", {
      is_logined: false,
    });
  }
});
router.post("/joinInfo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let pw = param["pw"];
  let id = param["id"];
  let rpw = param["rpw"];
  let sex = param["sex"];
  let name = param["name"];
  let birth = param["birth"];
  let cWeight = param["cWeight"];
  let tWeight = param["tWeight"];
  db.insertJoinData(id, pw, rpw, sex, name, birth, cWeight, tWeight, () => {
    res.redirect("/login");
  });
});
// 로그인 체크
router.post("/loginCheck", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param["id"];
  let pw = param["pw"];
  db.loginCheck(id, pw, (results) => {
    if (results.length > 0) {
      req.session.is_logined = true;
      req.session.userId = results[0].id;
      req.session.pw = results[0].pw;
      req.session.cWeight = results[0].cWeight;
      req.session.tWeight = results[0].tWeight;
      res.redirect("/");
    } else {
      res.send(
        `<script>alert('로그인 정보가 일치하지 않습니다.'); document.location.href='/login';</script>`
      );
    }
  });
});

//달력 페이지
router.get("/calendar", (req, res) => {
  if (req.session.is_logined == true) {
    let userid = req.session.userId;
    let todayYearMonthDate = req.query.id;
    console.log(todayYearMonthDate);
    db.getUsercalendar(userid, todayYearMonthDate, (results,joinresults) => {
      // console.log(results);
      res.render("calendar", {
        is_logined: req.session.is_logined,
        cWeight: req.session.cWeight,
        tWeight: req.session.tWeight,
        newWeight: joinresults,
        results: results,
        todayYearMonthDate:todayYearMonthDate
      });
    });
  } else {
    res.send(
      `<script>alert('로그인이 필요한 서비스입니다.'); document.location.href='/login';</script>`
    );
  }
});


router.post("/cRegisInfo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let foodsListM = [];
  let mListLength = param[`m_foods_length`];
  let foodsListLunch = [];
  let lListLength = param[`l_foods_length`];
  let foodsListDinner = [];
  let dListLength = param[`d_foods_length`];
  let when = param["food_info_when"];
  let userid = req.session.userId;
  let currentKg = param["currentKg"];
  // console.log(param);
  console.log(mListLength);
  if (mListLength === 0 || lListLength === 0 || dListLength === 0) {
    res.redirect("/calendar");
    return;
  }
  //아침,점심,저녁
  for (i = 0; i < mListLength; i++) {
    if (mListLength == 1) {
      foodsListM.push([
        param[`m_foods_when`],
        param[`m_foods_name`],
        param[`m_foods_kcal`],
        param[`m_foods_tansu`],
        param[`m_foods_danbak`],
        param[`m_foods_fat`],
      ]);
    } else {
      foodsListM.push([
        param[`m_foods_when`][i],
        param[`m_foods_name`][i],
        param[`m_foods_kcal`][i],
        param[`m_foods_tansu`][i],
        param[`m_foods_danbak`][i],
        param[`m_foods_fat`][i],
      ]);
    }
  }
  for (i = 0; i < lListLength; i++) {
    if (lListLength == 1) {
      foodsListLunch.push([
        param[`l_foods_when`],
        param[`l_foods_name`],
        param[`l_foods_kcal`],
        param[`l_foods_tansu`],
        param[`l_foods_danbak`],
        param[`l_foods_fat`],
      ]);
    } else {
      foodsListLunch.push([
        param[`l_foods_when`][i],
        param[`l_foods_name`][i],
        param[`l_foods_kcal`][i],
        param[`l_foods_tansu`][i],
        param[`l_foods_danbak`][i],
        param[`l_foods_fat`][i],
      ]);
    }
  }
  for (i = 0; i < dListLength; i++) {
    if (dListLength == 1) {
      foodsListDinner.push([
        param[`d_foods_when`],
        param[`d_foods_name`],
        param[`d_foods_kcal`],
        param[`d_foods_tansu`],
        param[`d_foods_danbak`],
        param[`d_foods_fat`],
      ]);
    } else {
      foodsListDinner.push([
        param[`d_foods_when`][i],
        param[`d_foods_name`][i],
        param[`d_foods_kcal`][i],
        param[`d_foods_tansu`][i],
        param[`d_foods_danbak`][i],
        param[`d_foods_fat`][i],
      ]);
    }
  }
  // console.log(foodsListM);
  // console.log(foodsListLunch);
  // console.log(foodsListDinner);
  db.insertUsercalendar(
    userid,
    when,
    foodsListM,
    foodsListLunch,
    foodsListDinner,
    currentKg,
    () => {
      res.redirect("/calendar");
    }
  );
});
// 캘린더 수정 클릭시 해당 데이터 삭제
router.get('/deleteInfo',(req,res)=>{
  let whenregis = req.query.id;
  db.deleteCalendar(whenregis,()=>{
    res.redirect("/calendar");
  })
})

module.exports = router;
