import '../../resources/css/common.css';
import '../../resources/css/resource.css';

import { getResourceList, getPageResourceList, getResourceCategoryList } from '../../resources/js/resource_controller';
import $ from '../../resources/lib/jquery.min.js';

$(document).ready(function () {
    loadResourceCategoryList();
    loadResourceList();
});

function loadResourceCategoryList() {

    getResourceCategoryList().then(response => {
        if (response.status == 200) {
            if (response.data.code == 200) {
                console.log('data:', response.data.data);
                buildSelectOptions(response.data.data)

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

function loadResourceList() {

    getResourceList().then(response => {
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


function buildTableContent(resourceList) {
    $.each(resourceList, function (i, item) {

        console.log(item)
        var $tr = $("<tr></tr>");

        var $td0 = $("<td></td>");
        $td0.html(item.name)
        $tr.append($td0);

        var $td1 = $("<td></td>");
        $td1.html(item.url)
        $tr.append($td1);

        var $td2 = $("<td></td>");
        $td2.html(item.description)
        $tr.append($td2);

        var $td3 = $("<td></td>");
        $td3.html(item.createTime)
        $tr.append($td3);

        var $td4 = $("<td></td>");
        $td4.html("编辑 删除")
        $tr.append($td4);

        $("#tb-resource").append($tr)
    })

}


function buildSelectOptions(categroyList) {

    $.each(categroyList, function (i, item) {
        console.log(item)
        var $option = $("<option></option>");
        $option.attr("value",item.name)
        $option.html(item.name)

        $("#sl-resource-category").append($option)
    })
}