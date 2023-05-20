//npm 으로 설치한 애들 연결하기
const express = require('express');
const cookieParser = require('cookie-parser');
const routers = require('./routes/route'); //라우트스 파일에있는 라우트를 불러오겠다.
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views')); //ejs 쓸 때 쓰면 된다.
app.set('view engine', 'ejs'); //ejs 쓸 때 쓰면 된다.
app.use(expressLayout);
app.use('/', routers);
app.use(express.static(path.join(__dirname, 'public'))); // 익스프레스 안의 스태틱을 사용하는거다 그냥 스태틱이 아님, 얘는 경로를 일일히 세팅 하게 않하려고 써주는것 여기서 경로를 지정 해주는것
//스태틱은 정적인 애들 css html을 읽어주는 것 

module.exports = app; //app이라는 이름으로 묘둘화 시켜서 내보내겠다.