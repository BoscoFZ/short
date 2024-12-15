// ==UserScript==
// @name        Bypass All Shortlinks Debloated - Custom
// @namespace
// @version     1.0
// @description 
// @author      Me
// @icon        https://cdn-icons-png.flaticon.com/512/14025/14025295.png

// @match *://*.adbypass.org/*

// ==/UserScript==

(function() {
    'use strict';

    // Lấy URL hiện tại của trang
    const url = window.location.href;

    // Chuyển hướng đến một URL khác
    const redirect = finalUrl => window.location.assign(finalUrl);

    // Lấy giá trị của tham số trong URL
    const getParam = (url, param) => new URLSearchParams(url).get(param);

    // Hàm mã hóa ROT13 (dịch chuyển các ký tự theo vòng quay 13)
    const rot13 = str => str.replace(/[A-Za-z]/g, char => String.fromCharCode((char.charCodeAt(0) % 32 + 13) % 26 + (char < 'a' ? 65 : 97)));

    // Thay đổi hành vi mở cửa sổ mới để chuyển hướng thay vì mở pop-up
    const popupsToRedirects = () => window.open = (url, target, features) => (window.location.href = url, window);

    // Hàm chạy khi DOM đã tải xong
    const afterDOMLoaded = (callback) => document.addEventListener('DOMContentLoaded', callback);

    // Hàm chạy khi cửa sổ trình duyệt đã tải xong
    const afterWindowLoaded = (callback) => window.addEventListener('load', callback);

    // Kiểm tra URL có hợp lệ không
    const isValidUrl = url => /^(?:https?|ftp):\/\/(?:\w+\.){1,3}\w+(?:\/\S*)?$/.test(url);

    // Nhấn nút nếu nó tồn tại (tự động tìm và click sau 1 giây)
    const clickIfExists = (selector) => {
        let intervalId = setInterval(() => {
            let button = document.querySelector(selector);
            if (button) {
                clearInterval(intervalId);
                button.click();
            }
        }, 1000);
    };

    // Chuyển hướng nếu nút có href hợp lệ
    const redirectIfExists = (selector) => {
        let intervalId = setInterval(() => {
            let button = document.querySelector(selector);
            if (button.href && isValidUrl(button.href)) {
                clearInterval(intervalId);
                redirect(button.href)
            }
        }, 500);
    };

    // Nhấn nút liên tục nếu nó không bị vô hiệu hóa
    const clickIfExistsNonStop = (selector) => {
        let intervalId = setInterval(() => {
            let button = document.querySelector(selector + ':not(.disabled)');
            if (button) {
                button.click();
            }
        }, 500);
    };

    // Chuyển hướng nếu nút không bị vô hiệu hóa
    const redirectIfNotDisabled = (selector) => {
        let intervalId = setInterval(() => {
            let linkButton = document.querySelector(selector + ':not(.disabled)');
            if (linkButton && !linkButton.href.includes('/undefined')) {
                clearInterval(intervalId);
                setTimeout(function() {redirect(linkButton.href);}, 500)
            }
        }, 500);
    };

    // Nhấn nút nếu nó không bị vô hiệu hóa
    const clickIfNotDisabled = (buttonSelector) => {
        let intervalId = setInterval(() => {
            let button = document.querySelector(buttonSelector);
            if (!button.hasAttribute('disabled') && !button.classList.contains('disabled')) {
                clearInterval(intervalId);
                setTimeout(function() {button.click();}, 500)
            }
        }, 500);
    };

    // Kiểm tra xem một phần tử có hiển thị không
    const checkElementVisible = element => element !== null && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length) && (!element.getAttribute('style') || !element.getAttribute('style').includes('display:none'));

    // Nhấn nút nếu phần tử nhìn thấy được
    const clickIfVisible = selector => {
        afterDOMLoaded(function() {
            let intervalId = setInterval(() => {
                let element = document.querySelector(selector);
                if (checkElementVisible(element)) {
                    clearInterval(intervalId);
                    element.click();
                }
            }, 1000);
        });
    };

    // Ngăn không cho trình duyệt tự động chuyển focus hoặc ẩn cửa sổ
    const preventForcedFocusOnWindow = () => {
        window.mouseleave = true;
        window.onmouseover = true;
        document.hasFocus = function() {return true;};
        Object.defineProperty(document, 'webkitVisibilityState', {get() {return 'visible';}});
        Object.defineProperty(document, 'visibilityState', {get() {return 'visible';}});
        window.addEventListener('visibilitychange', function(e) {e.stopImmediatePropagation();}, true, true);
        window.addEventListener('focus', onfocus, true);
        document.addEventListener('visibilitychange', function(e) {e.stopImmediatePropagation();}, true, true);
        Object.defineProperty(document, 'hidden', {get() {return false;}});
    };


    // Sử dụng hàm chuyển hướng
    //adbypass.org dành cho link linkvertise
    /adbypass.org/.test(url) ? afterDOMLoaded(function() {redirectIfExists('#open-bypassed-link')}) : null;


})();
