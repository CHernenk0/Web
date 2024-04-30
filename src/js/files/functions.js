
import { flsModules } from "./modules.js";

/*Проверка поддержки webp, добавление класса webp или no-webp для HTML*/
export function isWebp() {
    // Проверка поддержки webp 
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}


// Модуль роботи c меню (бургер) =======================================================================================================================================================================================================================
export function menuInit() {
    if (document.querySelector(".icon-menu")) {
        document.addEventListener("click", function (e) {
            if (bodyLockStatus && e.target.closest('.icon-menu')) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        });
    };
}
export function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
}
export function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
}

// Модуль "Сustom сursor" =======================================================================================================================================================================================================================
export function customCursor(isShadowTrue) {
    const wrapper = document.querySelector('[data-custom-cursor]') ? document.querySelector('[data-custom-cursor]') : document.documentElement;
    if (wrapper && !isMobile.any()) {
        //Создаем и добавляем объект курсора
        const cursor = document.createElement('div');
        cursor.classList.add('fls-cursor');
        cursor.style.opacity = 0;
        cursor.insertAdjacentHTML('beforeend', `<span class="fls-cursor__pointer"></span>`);
        isShadowTrue ? cursor.insertAdjacentHTML('beforeend', `<span class="fls-cursor__shadow"></span>`) : null;
        wrapper.append(cursor);

        const cursorPointer = document.querySelector('.fls-cursor__pointer');
        const cursorPointerStyle = {
            width: cursorPointer.offsetWidth,
            height: cursorPointer.offsetHeight
        }
        let cursorShadow, cursorShadowStyle;
        if (isShadowTrue) {
            cursorShadow = document.querySelector('.fls-cursor__shadow');
            cursorShadowStyle = {
                width: cursorShadow.offsetWidth,
                height: cursorShadow.offsetHeight
            }
        }
        function mouseActions(e) {
            if (e.type === 'mouseout') {
                cursor.style.opacity = 0;
            } else if (e.type === 'mousemove') {
                cursor.style.removeProperty('opacity');
                if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || (window.getComputedStyle(e.target).cursor !== 'none' && window.getComputedStyle(e.target).cursor !== 'default')) {
                    cursor.classList.add('_hover');
                } else {
                    cursor.classList.remove('_hover');
                }
            } else if (e.type === 'mousedown') {
                cursor.classList.add('_active');

            } else if (e.type === 'mouseup') {
                cursor.classList.remove('_active');
            }
            cursorPointer ? cursorPointer.style.transform = `translate3d(${e.clientX - cursorPointerStyle.width / 2}px, ${e.clientY - cursorPointerStyle.height / 2}px, 0)` : null;
            cursorShadow ? cursorShadow.style.transform = `translate3d(${e.clientX - cursorShadowStyle.width / 2}px, ${e.clientY - cursorShadowStyle.height / 2}px, 0)` : null;
        }

        window.addEventListener('mouseup', mouseActions);
        window.addEventListener('mousedown', mouseActions);
        window.addEventListener('mousemove', mouseActions);
        window.addEventListener('mouseout', mouseActions);
    }
}
//================================================================================================================================================================================================================================================================================================================
// Другие полезные функции================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
//  (Full Logging System)
export function FLS(message) {
    setTimeout(() => {
        if (window.FLS) {
            console.log(message);
        }
    }, 0);
}
//Получить цифры из строки
export function getDigFromString(item) {
    return parseInt(item.replace(/[^\d]/g, ''))
}
//Форматирование цифр типа 100 000 000
export function getDigFormat(item, sepp = ' ') {
    return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}
// Уникализация массива
export function uniqArray(array) {
    return array.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}
//Функция получения индекса внутри родительского элемента
export function indexInParent(parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};
// Функция проверяет, видим ли объект видимый
export function isHidden(el) {
    return (el.offsetParent === null)
}
// Обработка медиа запросов по атрибутам
export function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа-запросами
    const media = Array.from(array).filter(function (item, index, self) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(",")[0];
        }
    });
    // Инициализация объектов с медиа-запросами

    if (media.length) {
        const breakpointsArray = [];
        media.forEach(item => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });
        // Получаем уникальные брейкпоинты
        let mdQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mdQueries = uniqArray(mdQueries);
        const mdQueriesArray = [];

        if (mdQueries.length) {
            // Работаем с каждым брейкпоинтом
            mdQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                //Объекты с необходимыми условиями
                const itemsArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia
                })
            });
            return mdQueriesArray;
        }
    }
}
//================================================================================================================================================================================================================================================================================================================