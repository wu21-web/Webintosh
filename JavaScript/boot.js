import { getDiv, getP, getImg } from './element.js';

const process = getDiv("process");
const frame = getDiv("frame");
const proFrame = getDiv("processframe");
const state = getP("state");
const logo = getP("logo");
const logoImg = getImg("logo");
const fileList = [
    "../Font/PingFangSC-Regular.woff2",
    "../Font/sf-pro-display_regular.woff2",
    "../Font/PingFangSC-Semibold.woff2",
    "../Font/sf-pro-display_semibold.woff2",
    "../StyleSheet/boot.css",
    "../Image/Unsupported.png",
    "../Json/boot.json",
    "../Image/MacPro.png",
    "../Image/Wallpaper.png",
    "../Logon/index.html"
];
let altPressed = false;
let ctrlRPressed = false;
let manager_down_sec = 2;
let interval = null;
let nowait = getQueryParam('nowait');

window.addEventListener('keydown', function (event) {
    if (event.key === "Alt" && !altPressed) {
        altPressed = true;
    }
    
    if (event.ctrlKey && event.key.toLowerCase() === "r" && !ctrlRPressed) {
        ctrlRPressed = true;
    }

    if (!interval && (altPressed || ctrlRPressed) && nowait != "true") {
        let elapsedSeconds = 0;
        const targetTime = manager_down_sec;
        interval = setInterval(() => {
            elapsedSeconds++;

            if (elapsedSeconds >= targetTime) {
                clearInterval(interval);
                interval = null;
                
                if (altPressed) {
                    toManager();
                }
            }
        }, 1000);
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === "Alt") {
        altPressed = false;
    }

    if (event.key.toLowerCase() === "r" && event.ctrlKey) {
        ctrlRPressed = false;
    }

    if (!altPressed && !ctrlRPressed && interval) {
        clearInterval(interval);
        interval = null;
    }
});

function fetchJSON(url, arrayName, element) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应失败');
            }
            return response.json();
        })
        .then(data => {
            if (data.hasOwnProperty(arrayName) && Array.isArray(data[arrayName])) {
                const array = data[arrayName];

                if (array.includes(element)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                throw new Error(`未找到指定的数组名称：${arrayName}`);
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

async function fileExists(filename) {
    try {
        const response = await fetch(filename, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

async function boot() {
    let platform = getQueryParam('platform');
    let boot = getQueryParam('boot');

    let freeze = false;
    if (!platform) {
        platform = 'MacPro7,1';
    }

    if (boot == "manager") {
        toManager();
    } else if (boot == "recovery") {
        toRecovery();
    } else if (boot == "problem") {
        fiveCountry();
    }

    fetchJSON('../Json/boot.json', 'platform', platform)
        .then(result => {
            if (result) {
                console.log("Loaded SMBIOS: " + platform);
            } else {
                proFrame.style.background = "var(--boot-bg)";
                notSupported();
                freeze = true;
            }
        });

    let anyFileExists = false;
    let fileExistsNum = 0;

    for (let filePath of fileList) {
        const exists = await fileExists(filePath);
        if (exists) {
            fileExistsNum += 1;
            anyFileExists = true;
            console.log("Verify sucess: " + filePath);
        } else {
            console.log("Verify abort: " + filePath);
            break;
        }
    }


    if (!freeze) {
        if (nowait != "true") {
            setTimeout(() => {
                if (altPressed) { // Don't execute continue if already pressed alt.
                    return;
                }
                logo.style.visibility = "visible";
                setTimeout(() => {
                    if (ctrlRPressed) {
                        setTimeout(toRecovery, 1700);
                    }
                    toLogon(anyFileExists, fileExistsNum);
                }, 1000);
            }, 1500);
        } else {
            logo.style.visibility = "visible";
            toLogon(anyFileExists, fileExistsNum);
        }
    }
}

function toLogon(anyFileExists, fileExistsNum) {
    if (anyFileExists && fileExistsNum > 0) {
        frame.style.visibility = 'visible';
        process.style.width = (process.clientWidth + 10 * fileExistsNum) + "%";
        if (process.style.width == "100%") {
            setTimeout(function () {
                window.location = "../Logon";
            }, 1750);
        }
    }
}

function toManager() {
    window.location = "./manager.html";
}

function toRecovery() {
    window.location = "../Recovery";
}

function fiveCountry() {

}

window.onload = boot;

function notSupported() {
    frame.style.maxWidth = "none";
    frame.style.minWidth = "none";
    frame.style.width = "auto";
    frame.style.height = "auto";
    process.style.display = "none";
    logo.style.display = "none";
    logoImg.style.display = "block";
    state.style.display = "block";
}