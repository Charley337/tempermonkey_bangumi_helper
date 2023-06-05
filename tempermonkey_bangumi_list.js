// ==UserScript==
// @name         Bangumi追番链接管理-list
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  能够帮助管理追番的链接
// @author       You
// @match        https://bangumi.tv/anime/list/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (!window.localStorage) {
        console.log('当前浏览器不支持localStorage!');
        return;

    } else {
        console.log('浏览器支持localStorage, 脚本开始工作');
    }
    
    let item_odd = document.getElementsByClassName('item odd clearit');
    let item_even = document.getElementsByClassName('item even clearit');

    let append_extra_elements = (function(elem_arr) {
        for (let i = 0; i <elem_arr.length; i++) {
            let elem_node = document.createElement('p');

            elem_node.setAttribute('class', 'item resource url');
            elem_node.setAttribute('id', `${elem_arr[i].getAttribute('id')}_resource_url`);

            elem_node.style.paddingTop = '10px';
            elem_node.style.color = '#2ea6ff';

            let elem_url = document.createElement('span');

            elem_url.style.marginRight = '3px';
            elem_url.style.cursor = 'pointer';

            elem_url.onmouseover = (function() {
                this.style.textDecoration = 'underline';
            });

            elem_url.onmouseout = (function() {
                this.style.textDecoration = 'none';
            });

            if (window.localStorage[elem_node.getAttribute('id')]) {
                elem_url.setAttribute('href', window.localStorage[elem_node.getAttribute('id')]);
                elem_url.onclick = (function() {
                    window.open(this.getAttribute('href'), '_blank');
                });
                elem_url.innerHTML = '[资源链接]';

            } else {
                elem_url.innerHTML = '[未设置资源]';
            }

            let elem_modify = document.createElement('span');

            elem_modify.innerHTML = '[修改]';

            elem_modify.style.cursor = 'pointer';

            elem_modify.onmouseover = (function() {
                this.style.textDecoration = 'underline';
            });

            elem_modify.onmouseout = (function() {
                this.style.textDecoration = 'none';
            });

            elem_modify.onclick = (function() {
                let input_url = window.prompt('请输入资源链接', window.localStorage[this.parentNode.getAttribute('id')]);

                if (input_url != null) {
                    this.parentNode.firstChild.setAttribute('href', input_url);
                }

                if (input_url != null && input_url != '') {
                    window.localStorage[this.parentNode.getAttribute('id')] = input_url;
                    this.parentNode.firstChild.innerHTML = '[资源链接]';
                    this.parentNode.firstChild.onclick = (function() {
                        window.open(this.getAttribute('href'), '_blank');
                    });

                } else if (input_url != null && input_url == '') {
                    window.localStorage.removeItem(this.parentNode.getAttribute('id'));
                    this.parentNode.firstChild.innerHTML = '[未设置资源]';
                    this.parentNode.firstChild.onclick = null;
                }
            });

            elem_node.appendChild(elem_url);
            elem_node.appendChild(elem_modify);

            elem_arr[i].getElementsByClassName('inner')[0].appendChild(elem_node);
        }
    });

    append_extra_elements(item_odd);
    append_extra_elements(item_even);

})();
