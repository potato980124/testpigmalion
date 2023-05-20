let loginInput = document.querySelectorAll('.login_input');
let idBox = document.querySelector('.id_box');
let pwBox = document.querySelector('.pw_box');
let warnLogin = document.querySelector(".warn_login");
let deleteBtn = document.querySelectorAll(".delete_btn");
// 로그인창 테두리 
loginInput.forEach((e) => {
    e.addEventListener('click', () => {
        if (e == loginInput[0]) {
            pwBox.style.border = "";
            idBox.style.border = "1px solid #91CF00";
        } else {
            idBox.style.border = "";
            pwBox.style.border = "1px solid #91CF00";
        }
    })
})

// 로그인 유효성 검사
function login_check(e) {
    e.preventDefault()
    console.log(loginInput[0].value);
    if (loginInput[0].value == "" ) {
        warnLogin.innerHTML = "아이디를 입력 하세요";
        return false;
    } else if (loginInput[1].value == "") {
        warnLogin.innerHTML = "비밀번호를 입력 하세요";
        return false;
    } else {
        warnLogin.innerHTML = "";
    }
    document.loginCheck.submit();
}

// 삭제버튼
deleteBtn.forEach((e) => {
    e.addEventListener('click', () => {
        loginInput.forEach((e) => {
            e.value = "";
        })
    })
})

