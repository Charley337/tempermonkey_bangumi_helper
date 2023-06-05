// ==UserScript==
// @name         Bangumi追番链接管理-subject
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  能够帮助管理追番的链接
// @author       You
// @match        https://bangumi.tv/subject/*
// @exclude      https://bangumi.tv/subject/*/*
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
    
    let item_id = window.location.href.split('subject/')[1];
    let item_key = `item_${item_id}_resource_url`;

    let elem_subject_prg = document.getElementsByClassName('subject_prg')[0];
    let elem_insert_before_location = elem_subject_prg.childNodes[4];

    let elem_resource_url = document.createElement('a');

    elem_resource_url.style.marginLeft = '3px';
    elem_resource_url.style.color = '#2ea6ff';
    elem_resource_url.style.cursor = 'pointer';

    if (!window.localStorage[item_key]) {
        elem_resource_url.innerHTML = '[未设置资源]';
        elem_resource_url.setAttribute('href', '');
        elem_resource_url.setAttribute('target', '_self');

    } else {
        elem_resource_url.innerHTML = '[资源链接]';
        elem_resource_url.setAttribute('href', window.localStorage[item_key]);
        elem_resource_url.setAttribute('target', '_blank');
    }

    elem_resource_url.onmouseover = (function() {
        this.style.color = '#2ea6ff';
        this.style.textDecoration = 'underline';
    });

    elem_resource_url.onmouseout = (function() {
        this.style.color = '#2ea6ff';
        this.style.textDecoration = 'none';
    });

    let elem_resource_modify = document.createElement('a');

    elem_resource_modify.style.marginLeft = '3px';
    elem_resource_modify.style.color = '#2ea6ff';
    elem_resource_modify.style.cursor = 'pointer';

    elem_resource_modify.innerHTML = '[修改]';

    elem_resource_modify.onmouseover = (function() {
        this.style.color = '#2ea6ff';
        this.style.textDecoration = 'underline';
    });

    elem_resource_modify.onmouseout = (function() {
        this.style.color = '#2ea6ff';
        this.style.textDecoration = 'none';
    });

    elem_resource_modify.onclick = (function() {
        let input_url = window.prompt('请输入资源链接', window.localStorage[item_key]);
        
        if (input_url != null && input_url != '') {
            window.localStorage[item_key] = input_url;
            elem_resource_url.innerHTML = '[资源链接]';
            elem_resource_url.setAttribute('href', input_url);
            elem_resource_url.setAttribute('target', '_blank');

        } else if (input_url != null && input_url == '') {
            window.localStorage.removeItem(item_key);
            elem_resource_url.innerHTML = '[未设置资源]';
            elem_resource_url.setAttribute('href', '');
            elem_resource_url.setAttribute('target', '_self');
        }
    });

    elem_subject_prg.insertBefore(elem_resource_url, elem_insert_before_location);
    elem_subject_prg.insertBefore(elem_resource_modify, elem_insert_before_location);

})();
