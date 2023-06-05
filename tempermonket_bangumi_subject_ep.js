// ==UserScript==
// @name         Bangumi追番链接管理-subject-ep
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  能够帮助管理追番的链接
// @author       You
// @match        https://bangumi.tv/subject/*/ep
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

    let item_id = window.location.href.split('/')[4];
    let item_key = `item_${item_id}_resource_url`;

    let location_parent = document.getElementById('columnInSubjectB');

    let elem_div = document.createElement('div');

    elem_div.style.padding = '10px';
    elem_div.style.marginBottom = '15px';
    elem_div.style.border = '1px solid #555';
    elem_div.style.boxShadow = '0px 0px 4px #444, inset 0 1px 1px rgba(0, 0, 0, 0.01)';
    elem_div.style.fontSize = '12px';
    elem_div.style.borderRadius = '15px';
    elem_div.style.backgroundClip = 'padding-box';

    let elem_resource_label = document.createElement('span');

    elem_resource_label.innerHTML = '资源链接:';
    elem_resource_label.style.display = 'block'
    elem_resource_label.style.color = '#EEE';
    elem_resource_label.style.fontSize = '12px';

    let elem_resource_url = document.createElement('a');

    elem_resource_url.style.marginRight = '3px';
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

    elem_resource_modify.style.marginRight = '3px';
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

    elem_div.appendChild(elem_resource_label);
    elem_div.appendChild(elem_resource_url);
    elem_div.appendChild(elem_resource_modify);

    location_parent.appendChild(elem_div);
    
})();
