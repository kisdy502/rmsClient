import '../../resources/css/common.css';
import '../../resources/css/login.css';
import '../../resources/css/drop_down.css';
import example from '../../resources/svg/example.svg';

import { login, getAuthCode, getInfo } from '../../resources/js/login_controller';
import { setToken, setCookie, getCookie } from '../../resources/js/auth'


import $ from '../../resources/lib/jquery.min.js';


$(document).ready(function () {
    var username = getCookie("username");
    var password = getCookie("password");
    if (username) {
        $('input[type=text]').val(username)
    }

    if (password) {
        $('input[type=password]').val(password)
    }

    $("#test").attr("src", example)
    $(".img-container").hover(
        function () {
            $(this).children("img").eq(0).addClass("img-light").removeClass("img-default");
        },
        function () {
            $(this).children("img").eq(0).addClass("img-default").removeClass("img-light");
        }
    );

});

$('#btn_submit').click(function () {
    var username = $('input[type=text]').val();
    var password = $('input[type=password]').val();
    console.log("username:" + username);
    console.log("password:" + password);
    handleLogin(username, password);
})

function handleLogin(username, password) {
    login(username, password).then(response => {
        console.log("response:" + response);
        if (response.status == 200) {
            console.log("code:" + response.data.code);
            if (response.data.code == 200) {
                console.log("data:" + response.data.data);
                var tokenStr = response.data.data.tokenHead + " " + response.data.data.token;
                console.log("tokenStr:" + tokenStr);
                setToken(tokenStr);

                setCookie("username", username, 15);
                setCookie("password", password, 15);

                getUserInfo()
            } else {
                console.log("logic error message:" + response.data.message);
            }

        }
    })
}

function getUserInfo() {

    getInfo().then(response => {
        console.log("response:" + response);
        if (response.status == 200) {
            console.log("code:" + JSON.stringify(response.data.data));
            if (response.data.code == 200) {
               
            } else {
                console.log("logic error message:" + response.data.message);
            }

        }
    })
}

