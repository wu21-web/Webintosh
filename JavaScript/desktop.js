import { getMenu, updateMenubar, app_menus, appleMenu, setupMenu, menus } from "./finder.js";
import { getP } from "./element.js";

const datetime = getP('datetime');
const menu_logo = getP("logo");

function fetchJSON(url, arrayName) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`网络响应失败，状态码: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 确保数据中包含指定的数组
            if (data.hasOwnProperty(arrayName) && Array.isArray(data[arrayName])) {
                return data[arrayName]; // 返回指定的数组
            } else {
                // 如果数据中没有指定的数组或数组格式不正确
                throw new Error(`未找到指定的数组名称 "${arrayName}" 或该值不是数组类型`);
            }
        })
        .catch(error => {
            // 统一的错误处理，打印详细的错误信息
            console.error('发生错误:', error.message);
            throw error;  // 可选择将错误抛出，以便上层捕获
        });
}

function updateTime() {
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours().toString().padStart(2, '0');
    const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
    let day = currentDateTime.getDate();
    let month = currentDateTime.getMonth() + 1;
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let weekDay = days[currentDateTime.getDay()];
    day = day.toString();
    month = month.toString();
    datetime.innerHTML = `${month}月${day}日 ${weekDay} ${hours}:${minutes}`;
}

function getMaxZIndex() {
    let maxZIndex = 0;
    const elements = document.querySelectorAll('*');

    elements.forEach((element) => {
        const zIndex = window.getComputedStyle(element).zIndex;
        if (zIndex !== 'auto' && !isNaN(zIndex)) {
            maxZIndex = Math.max(maxZIndex, parseInt(zIndex, 10));
        }
    });

    return maxZIndex;
}

menu_logo.addEventListener('click', () => appleMenu(menu_logo));
getMenu();
// setupMenu(menus[0], "关于访达 hr 设置... hr 清倒废纸篓... hr 服务 hr 隐藏访达 隐藏其他 全部显示", "none none none none none none none", "45", "125")
updateTime();
setInterval(updateTime, 10000);
