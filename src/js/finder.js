import { getP } from './element.js';
import { WidgetMenu } from "./ui.js";

export const app_menus = {};

export let menus = [];
let applemenu;
let appleMenu_state = false;
let recoverymenu;
let recoveryMenu_state = false;

export function appleMenu(menu_logo) {
    if (!appleMenu_state) {
        menu_logo.style.background = '#fafafa25';
        menu_logo.style.textShadow = 'none';
        appleMenu_state = true;
        applemenu = new WidgetMenu(menu_logo, appleMenu_state);
        applemenu.setAttribute('applemenu', '');
        applemenu.setAttribute("x", "10");
        applemenu.setAttribute("y", "25");
        applemenu.setAttribute("width", "200");
        applemenu.setAttribute("content", "关于本机 hr 系统设置... App%20Store... hr 最近使用的项目 hr 强制退出... hr 睡眠 重新启动... 关机... hr 锁定屏幕 退出登录%20“Webintosh”...");
        applemenu.setAttribute("command", "none none none none none none none none none none");
        document.body.appendChild(applemenu);
        const closeMenu = (e) => {
            if (!e.target.matches("widget-menu[applemenu]") && !e.target.isSameNode(menu_logo)) {
                menu_logo.style.background = 'none';
                menu_logo.style.textShadow = '0 2px 10px #000a;';
                appleMenu_state = false;
                applemenu.style.opacity = 0;
                setTimeout(function () {
                    document.body.removeChild(applemenu);
                }, 100);
                document.removeEventListener('click', closeMenu);
            }
        };

        document.addEventListener('click', closeMenu);
    } else {
        menu_logo.style.background = '#fafafa00';
        menu_logo.style.textShadow = '0 2px 10px #000a;';
        appleMenu_state = false;
        applemenu.style.opacity = 0;
        setTimeout(function () {
            document.body.removeChild(applemenu);
        }, 100);
    }
}

function restart() {
    
}

function shutdown() {
    window.close();
}

export function recoveryMenu(menu_logo) {
    if (!recoveryMenu_state) {
        menu_logo.style.background = '#fafafa25';
        menu_logo.style.textShadow = 'none';
        recoveryMenu_state = true;
        recoverymenu = new WidgetMenu(menu_logo, recoveryMenu_state);
        recoverymenu.setAttribute('recoverymenu', '');
        recoverymenu.setAttribute("x", "10");
        recoverymenu.setAttribute("y", "25");
        // recoverymenu.setAttribute("width", "200");
        recoverymenu.setAttribute("content", "重新启动 关机 hr 启动磁盘...");
        recoverymenu.setAttribute("command", "none none none");
        document.body.appendChild(recoverymenu);
        const closeMenu = (e) => {
            if (!e.target.matches("widget-menu[recoverymenu]") && !e.target.isSameNode(menu_logo)) {
                menu_logo.style.background = 'none';
                menu_logo.style.textShadow = '0 2px 10px #000a;';
                recoveryMenu_state = false;
                recoverymenu.style.opacity = 0;
                setTimeout(function () {
                    document.body.removeChild(recoverymenu);
                }, 100);
                document.removeEventListener('click', closeMenu);
            }
        };

        document.addEventListener('click', closeMenu);
    } else {
        menu_logo.style.background = '#fafafa00';
        menu_logo.style.textShadow = '0 2px 10px #000a;';
        recoveryMenu_state = false;
        recoverymenu.style.opacity = 0;
        setTimeout(function () {
            document.body.removeChild(recoverymenu);
        }, 100);
    }
}

export function updateMenubar(menu) {
    menu.forEach((menu, index) => {
        menus[index].innerHTML = menu;
    });
}

export function getMenu() {
    for (let index = 0; index < 11; index++) {
        menus.push(getP(`menu${index}`));
    }
}

let menuState = false;
let currentMenu = null;

export function setupMenu(element, menu, cmd, x, width) {
    if (!menuState) {
        element.style.background = '#fafafa25';
        element.style.textShadow = 'none';

        currentMenu = new WidgetMenu(element, menuState);
        currentMenu.setAttribute("x", x);
        currentMenu.setAttribute("y", "25");
        currentMenu.setAttribute("width", width);
        currentMenu.setAttribute("content", menu);
        currentMenu.setAttribute("command", cmd);
        document.body.appendChild(currentMenu);

        menuState = true;
        document.addEventListener('click', handleClickOutsideMenu);
    } else {
        element.style.background = '#fafafa00';
        element.style.textShadow = '0 2px 10px #000a;';
        menuState = false;

        currentMenu.style.opacity = 0;
        setTimeout(function () {
            document.body.removeChild(currentMenu);
            currentMenu = null;
        }, 300);
    }
}

export function handleClickOutsideMenu(e) {
    if (!e.target.closest('widget-menu')) {
        setupMenu(currentMenu, currentMenu.getAttribute("content"), currentMenu.getAttribute("command"), currentMenu.getAttribute("x"), currentMenu.getAttribute("y"));
    }
}