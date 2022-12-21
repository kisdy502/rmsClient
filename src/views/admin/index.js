import '../../resources/css/common.css';
import '../../resources/css/admin.css';
import '../../resources/css/drop_down.css';

import { getUserList } from '../../resources/js/admin_controller';
import $ from '../../resources/lib/jquery.min.js';

$(document).ready(function () {
    loadUserList();
});

function loadUserList() {
    var keyword = ""

    getUserList(keyword, 5, 1).then(response => {
        if (response.status == 200) {
            if (response.data.code == 200) {
                console.log('data: ', response.data.data);
                buildTableContent(response.data.data.list)

            } else {
                console.log('logic error message:', response.data.message);
            }
        } else {
            console.error('error responseCode: ', response)
        }
    }, (error) => {
        console.error('request error: ', error)
    })
}


function buildTableContent(userList) {
    $.each(userList, function (i, item) {

        console.log(item)
        var $tr = $("<tr></tr>");

        var $td0 = $("<td></td>");
        $td0.html(item.username)
        $tr.append($td0);

        var $td1 = $("<td></td>");
        $td1.html(item.nickName)
        $tr.append($td1);

        var $td2 = $("<td></td>");
        $td2.html(item.email)
        $tr.append($td2);

        var $td3 = $("<td></td>");
        var $img = $("<img></img>");
        $img.css("width", 32)
        $img.css("height", 32)
        $img.attr("src", item.icon)
        $td3.append($img)
        $tr.append($td3);

        var $td4 = $("<td></td>");
        $td4.html(item.createTime)
        $tr.append($td4);

        var $td5 = $("<td></td>");
        var text = (item.status == 1) ? "启用" : "禁用";
        $td5.html(text)
        $tr.append($td5);

        var $td6 = $("<td></td>");
        $td6.html("分配角色 编辑 删除")
        $tr.append($td6);

        $("#tb-user").append($tr)
    })

}
