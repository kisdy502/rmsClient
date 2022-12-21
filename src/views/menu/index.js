import '../../resources/css/common.css';
import '../../resources/css/role.css';

import { getMenuTreeList } from '../../resources/js/home_controller.js';
import $ from '../../resources/lib/jquery.min.js';

$(document).ready(function () {
    loadMenuTreeList();
});

function loadMenuTreeList() {
    getMenuTreeList().then(response => {
        if (response.status == 200) {
            if (response.data.code == 200) {
                console.log('data: ', response.data.data);
                buildTableContent(response.data.data)
                

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

function buildTableContent(menuList){
    $.each(menuList, function (i, item) {

        var $tr = $("<tr></tr>");

        var $td0 = $("<td></td>");
        $td0.html(item.title)
        $tr.append($td0);

        var $td1 = $("<td></td>");
        $td1.html(item.level)
        $tr.append($td1);

        var $td2 = $("<td></td>");
        $td2.html(item.name)
        $tr.append($td2);

        var $td3 = $("<td></td>");
        $td3.html(item.icon)
        $tr.append($td3);

        var $td4 = $("<td></td>");
        var text = (item.hidden == 1) ? "启用" : "禁用";
        $td4.html(text)
        $tr.append($td4);

        var $td5 = $("<td></td>");
        $td5.html(item.sort)
        $tr.append($td5);

        var $td6 = $("<td></td>");
        $td6.html("查看下级")
        $tr.append($td6);

        var $td7 = $("<td></td>");
        $td7.html("编辑 删除")
        $tr.append($td7);

        $("#tb-menu").append($tr)

        if (item.children) {

            $.each(item.children, function (i, subItem) {
                
            })

        }
    })
}
