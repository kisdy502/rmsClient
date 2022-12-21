import '../../resources/css/common.css';
import '../../resources/css/home.css';

import ic_home from '../../resources/images/ic_home.png';
import normal_bg from '../../resources/images/normal_bg.jpeg';
import arrow_down from '../../resources/images/arrow_down.png';
// import ums from '../../resources/svg/ums.svg';
// import product1 from '../../resources/svg/product.svg';
// import product2 from '../../resources/svg/product-add.svg';
// import product3 from '../../resources/svg/product-brand.svg';
// import product4 from '../../resources/svg/product-list.svg';

const svgMapOb = require.context('../../resources/svg/', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(svgMapOb)

import { getMenuTreeList } from '../../resources/js/home_controller.js';
import $ from '../../resources/lib/jquery.min.js';

$(document).ready(function () {
    loadMenuTreeList();
});

$('#img_jump_home').click(function () {

})



function loadMenuTreeList(params) {
    getMenuTreeList().then(response => {
        if (response.status == 200) {
            if (response.data.code == 200) {
                console.log('data: ', response.data.data);
                var len = response.data.data.length
                var $treeRoot = $('.left')
                $.each(response.data.data, function (i, item) {
                    console.log('item:' + item.title + ",icon" + item.icon);

                    var $div = $('<div></div>');
                    $div.addClass('menu-item').addClass('collapsed')
                    var $div_img_wrap = $('<div></div>');
                    $div_img_wrap.addClass('div-wrap-img')
                    var $img = $('<img />')
                    $img.attr('src', "resources/svg/svg-sprite.svg#icon-" + item.icon + "-usage")
                    $img.addClass('img-icon').addClass('img-default')
                    var $span = $('<span></span>')
                    $span.text(item.title)
                    var $imgTag = $('<img />')
                    $imgTag.attr('src', arrow_down)
                    $imgTag.addClass('img-tag')
                    $div_img_wrap.append($img)
                    $div.append($div_img_wrap).append($span).append($imgTag);

                    $div.hover(
                        function () {
                            $(this).children("div").children("img").eq(0).addClass("img-light").removeClass("img-default");
                        },
                        function () {
                            $(this).children("div").children("img").eq(0).addClass("img-default").removeClass("img-light");
                        }
                    );

                    $treeRoot.append($div);
                    if (item.children) {
                        var $ul = $('<ul></ul>');
                        $.each(item.children, function (i, subItem) {
                            var $li = $('<li></li>');
                            var $sub_img_wrap = $('<div></div>');
                            $sub_img_wrap.addClass('sub-div-wrap-img')
                            var $img = $('<img />')
                            $img.addClass('img-sub-icon').addClass('img-default')
                            $img.attr('src', "resources/svg/svg-sprite.svg#icon-" + subItem.icon + "-usage")
                            console.log('icon:' + subItem.icon);

                            var $a = $('<a></a>')
                            $a.attr('href',subItem.name)
                            $a.text(subItem.title)
                            $sub_img_wrap.append($img)
                            $li.append($sub_img_wrap).append($a)
                            $ul.append($li);


                            $li.click(function (e) {
                                console.log('menu name:' + subItem.name);
                            })
                            $li.hover(
                                function () {
                                    $(this).children("div").children("img").eq(0).addClass("img-light").removeClass("img-default");
                                },
                                function () {
                                    $(this).children("div").children("img").eq(0).addClass("img-default").removeClass("img-light");
                                }
                            );
                        })

                        $treeRoot.append($ul)
                    }
                })

                $('div.menu-item').click(function (e) {
                    console.log("折叠菜单项开关:" + e.currentTarget);
                    if ($(e.currentTarget).hasClass('collapsed')) {
                        $(e.currentTarget).removeClass("collapsed");
                    } else {
                        $(e.currentTarget).addClass("collapsed");
                    }
                })

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





