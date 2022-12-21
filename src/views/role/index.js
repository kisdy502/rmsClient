import '../../resources/css/common.css';
import '../../resources/css/role.css';
import '../../resources/css/drop_down.css';

import { getRoleList } from '../../resources/js/role_controller';
import $ from '../../resources/lib/jquery.min.js';

$(document).ready(function () {
    loadRoleList();

    $("box1ul").bind("click", function (e) {

    })
});

function loadRoleList() {

    getRoleList().then(response => {
        if (response.status == 200) {
            if (response.data.code == 200) {
                console.log('data:', response.data.data);
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


function buildTableContent(roleList) {
    $.each(roleList, function (i, item) {

        console.log(item)
        var $tr = $("<tr></tr>");

        var $td0 = $("<td></td>");
        $td0.html(item.name)
        $tr.append($td0);

        var $td1 = $("<td></td>");
        $td1.html(item.description)
        $tr.append($td1);

        var $td2 = $("<td></td>");
        $td2.html(item.adminCount)
        $tr.append($td2);

        var $td3 = $("<td></td>");
        $td3.html(item.createTime)
        $tr.append($td3);

        var $td4 = $("<td></td>");
        var text = (item.status == 1) ? "启用" : "禁用";
        $td4.html(text)
        $tr.append($td4);

        $("#tb-user").append($tr)
    })

}
