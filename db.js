var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'database-1.ckqtywedccws.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'ghdqjawls12',
    database: 'pigmalion',
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
//회원가입 정보 조인테이블에 넣어주는 함수  
function insertJoinData(id, pw, rpw, sex, name, birth, cWeight, tWeight, callback) {
    connection.query(`insert into jointable(create_time,id,pw,rpw,sex,name,birth,cWeight,tWeight)values(now(),'${id}','${pw}','${rpw}','${sex}','${name}','${birth}','${cWeight}','${tWeight}')`, (err) => {
        if (err) throw err;
        callback();
    })
}
//로그인 성공여부 함수
function loginCheck(id, pw, callback) {
    connection.query(`select * from jointable where id = '${id}' and pw ='${pw}'`, (err, results) => {
        if (err) throw err;
        callback(results);
    })
}

// 칼로리 캘린더 테이블에 넣어주는 함수
function insertUsercalendar(userid,when,foodsListM,foodsListLunch,foodsListDinner,currentKg, callback) {
    const insertQuery = "insert into `usercalendarinfo` (`userid`, `whenregis`,`whenfood`,`foodname`, `kcal`, `tan`, `dan`, `fat`,`currentkg`) values ?";
    const updateQuery = "UPDATE `jointable` SET `newWeight` = ? WHERE `id` = ?";
    const values = [];
    if (foodsListM.length > 0 || foodsListLunch.length > 0 || foodsListDinner.length > 0) {
    for (i = 0; i < foodsListM.length; i++) {
        values.push([`${userid}`,`${when}`,`${foodsListM[i][0]}`,`${foodsListM[i][1]}`,`${foodsListM[i][2]}`,`${foodsListM[i][3]}`,`${foodsListM[i][4]}`,`${foodsListM[i][5]}`,`${currentKg}`])
     };
    for (i = 0; i < foodsListLunch.length; i++) {
        values.push([`${userid}`,`${when}`,`${foodsListLunch[i][0]}`,`${foodsListLunch[i][1]}`,`${foodsListLunch[i][2]}`,`${foodsListLunch[i][3]}`,`${foodsListLunch[i][4]}`,`${foodsListLunch[i][5]}`,`${currentKg}`])
     };
    for (i = 0; i < foodsListDinner.length; i++) {
        values.push([`${userid}`,`${when}`,`${foodsListDinner[i][0]}`,`${foodsListDinner[i][1]}`,`${foodsListDinner[i][2]}`,`${foodsListDinner[i][3]}`,`${foodsListDinner[i][4]}`,`${foodsListDinner[i][5]}`,`${currentKg}`])
     };
    }else{
        values.push([`${userid}`,null,null,null,null,null,null,null,null]);
    };
    connection.query(insertQuery, [values], (err) => {
        if (err) throw err;
        connection.query(updateQuery, [currentKg, userid], (err) => {
            if (err) throw err;
            callback();
        });
    })
}
//칼로리 캘린더 데이터 받아오는 함수
function getUsercalendar(userid,todayYearMonthDate,callback){
    connection.query(`select * from usercalendarinfo where userid = '${userid}' and whenregis = '${todayYearMonthDate}'`,(err,results)=>{
        if(err) throw err;
        connection.query(`select * from jointable where id = '${userid}'`, (err,joinresults) => {
            if (err) throw err;
        callback(results,joinresults);
        });
    });
}
//칼로리 캘린더 해당 날짜 데이터 지우는 함수
function deleteCalendar(whenregis,callback){
    connection.query(`delete from usercalendarinfo where whenregis ='${whenregis}'`,(err)=>{
        if(err) throw err;
        callback();
    })
}
    module.exports = {
        insertJoinData,
        loginCheck,
        insertUsercalendar,
        getUsercalendar,
        deleteCalendar
    };