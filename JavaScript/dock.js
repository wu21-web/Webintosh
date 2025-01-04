import { getDiv } from './element.js';

function create_window(x, y, file) {
    const iframe = window.parent.document.createElement('iframe');
    iframe.src = file;
    iframe.style.position = 'absolute';
    iframe.style.top = y + 'px';
    iframe.style.left = x + 'px';
    iframe.style.overflow = 'hidden';
    window.parent.document.body.appendChild(iframe);

    iframe.onload = function() {
        iframe.style.width = iframe.contentWindow.document.body.scrollWidth + 'px';
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    };

    window.addEventListener('resize', function() {
        if (iframe.contentWindow.document) {
            iframe.style.width = iframe.contentWindow.document.body.scrollWidth + 'px';
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }
    });
}

const dock = getDiv('dock');
const appname = getDiv("appname");

fetch('../Json/dock.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        const itemsArray = data.items;
        const result = itemsArray.map(item => ({
            name: item[0],
            path: item[1]
        }));
        let i = 0;
        let icons = [];

        result.forEach(dockitem => {
            i += 1;
            if (i == 19) {
                let hr = document.createElement('hr');
                dock.appendChild(hr);
            }
            let icon = document.createElement('img');
            icon.src = "../Image/" + dockitem.name + ".png";
            icon.alt = dockitem.name;
            icon.path = dockitem.path;
            icons.push([icon, dockitem.path]);
            dock.appendChild(icon);
        });

        icons.forEach(iconlist => {
            const icon = iconlist[0];
            const path = iconlist[1];
            icon.addEventListener('click', () => {
                create_window(60, 60, "../" + path);
                // updateMenu(app_menus[icon.alt]);
            });
            icon.addEventListener('mouseover', () => {
                const event = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                icon.dispatchEvent(event);

                const iconrect = icon.getBoundingClientRect();
                appname.style.display = 'block';
                appname.style.top = `${iconrect.top - dock.clientHeight * 0.75}px`;
                appname.style.left = `${iconrect.left + (iconrect.width - appname.offsetWidth) / 2}px`;
                appname.innerHTML = icon.alt;
            });
            icon.addEventListener('mouseout', () => {
                appname.style.display = 'none';
            });
        });
        dock.style.transform = 'translateY(0)';
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });