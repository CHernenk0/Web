
import Aos from "aos";
import { isMobile } from "./functions.js";
import { flsModules } from "./modules.js";

// import {Aos} from "aos";
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

const iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    const menuBody = document.querySelector('.menu__body');
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

Aos.init({
    // Global settings:
    disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1300, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

const headerElement = document.querySelector('.header');

const callback = function (enteries, observer) {
    if (enteries[0].isIntersecting) { //Эта проверка определяет, является ли первый элемент в массиве entries видимым пользователю (пересекается ли с окном просмотра).
        headerElement.classList.remove('_scroll');
    }
    else {
        headerElement.classList.add('_scroll');
    }
}


const headerObserver = new IntersectionObserver(callback);//Когда IntersectionObserver создан, он начинает наблюдать за целевым элементом и его состоянием пересечения с другими элементами или окном просмотра. Когда происходят изменения состояния пересечения, функция обратного вызова вызывается с массивом объектов IntersectionObserverEntry, содержащих информацию о каждом пересечении.
headerObserver.observe(headerElement);// метод IntersectionObserver следит за хэдэром

// Прокрутка при клике
//собираем в массив объекты с дата атрибутом гоуту
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//если они есть, то
if (menuLinks.length > 0) {
    //пробегаемся по ним и передаем в функцию
    menuLinks.forEach(menuLink => {
        //добавлем прослушиватель события
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    //функция
    function onMenuLinkClick(e) {
        //получаем объект на который кликаем
        const menuLink = e.target;
        //важно!проверка, если этот атрибут заполнен и существует ли объект куда ссылается атрибут!
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            //получаем жэтот объект в константу
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            //высчитываем точное положение этого объекта с учетом высоты,
            // чтобы был точный доезд блока, и он не прятался под хедер
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;




            //заставит скролл прокрутиться к нужному месту
            window.scrollTo({
                //прокрутитььс сверху на то высчитанное расстояние
                top: gotoBlockValue,
                //прокрутка плавная
                behavior: "smooth"
            });
            //отключаем работу ссылки, а выполняла прокрутку
            e.preventDefault();
        }
    }
}



// Прокрутка при клике
//собираем в массив объекты с дата атрибутом гоуту
const menuLinkes = document.querySelectorAll('.menu__link[data-goto]');
//если они есть, то
if (menuLinkes.length > 0) {
    //пробегаемся по ним и передаем в функцию
    menuLinkes.forEach(menuLink => {
        //добавлем прослушиватель события
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    //функция
    function onMenuLinkClick(e) {
        //получаем объект на который кликаем
        const menuLink = e.target;
        //важно!проверка, если этот атрибут заполнен и существует ли объект куда ссылается атрибут!
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            //получаем жэтот объект в константу
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            //высчитываем точное положение этого объекта с учетом высоты,
            // чтобы был точный доезд блока, и он не прятался под хедер
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;




            //заставит скролл прокрутиться к нужному месту
            window.scrollTo({
                //прокрутитььс сверху на то высчитанное расстояние
                top: gotoBlockValue,
                //прокрутка плавная
                behavior: "smooth"
            });
            //отключаем работу ссылки, а выполняла прокрутку
            e.preventDefault();
        }
    }
}
//=====php==========================================================================================================================================

// document.getElementById('subscribeForm').addEventListener('submit', function (e) {

//     e.preventDefault();

//     var formData = new FormData(this);

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '..\components\sendmail\sendmail.php', true);

//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             var response = JSON.parse(xhr.responseText);
//             alert(response.message); // Можете изменить это на вывод сообщения пользователю
//             // Дополнительные действия после успешной отправки
//         } else {
//             console.error('Ошибка при отправке данных:', xhr.statusText);
//             // Дополнительные действия при ошибке
//         }
//     };

//     xhr.onerror = function () {
//         console.error('Ошибка при отправке данных.');
//         // Дополнительные действия при ошибке
//     };

//     xhr.send(formData);
// });

//========================================================================================================================================================
//Добавление карточек из json


class MenuCard {
    constructor(title, text, parentSelector) {

        this.title = title;

        this.text = text;
        this.parentSelector = parentSelector;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="each_card card-each">
                <div class="card-each__title">${this.title}</div>
                <div class="card-each__text">${this.text}</div>
            </div>
    
    
               
            `;

        this.parent.append(element);



    }


}

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Не удалось выполнить запрос ${url}, статус ${res.status}`);
    }

    return await res.json();
};

// getResource('http://localhost:8080/posts')
getResource('http://localhost:3000/posts')
    .then(data => {
        const menu = new MenuCard('title', 'text', '.each_cards');

        data.forEach(({  title, text }) => {
            new MenuCard( title, text, '.each_cards').render();
        });
    });
