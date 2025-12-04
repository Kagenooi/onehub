import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive(); });


import {
    toggleActive,
    toggleAcc,
    toggleWishlist,
    showSubmenu,
    toggleSubmenu,
    toggleMobileMenu,
    footerAcc
} from "./module.js";

window.showSubmenu = showSubmenu;
window.toggleActive = toggleActive;
window.toggleAcc = toggleAcc;
window.toggleWishlist = toggleWishlist;
window.toggleSubmenu = toggleSubmenu;
window.toggleMobileMenu = toggleMobileMenu;
window.footerAcc = footerAcc;

footerAcc();
showSubmenu();

const productsSwiper = new Swiper("#productsSwiper", {
    cssMode: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
        nextEl: ".productsSlider__btns_btn.next",
        prevEl: ".productsSlider__btns_btn.prev",
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        // when window width is >= 
        769: {
            slidesPerView: 4,
            spaceBetween: 32
        },
        // when window width is >=
        1296: {
            slidesPerView: 5,
            spaceBetween: 94
        }
    }
});

const langWrapper = document.getElementById('langWrapper');

document.addEventListener('click', (event) => {
    // если клик произошёл НЕ внутри .navbar__lang
    if (!event.target.closest('.navbar__lang')) {
        langWrapper.classList.remove('active');
    }
});



document.addEventListener('click', (event) => {
    const burgerBlock = document.getElementById('burger');
    if (!burgerBlock) return;

    // 1) Клик по кнопке открытия бургер-меню
    const burgerBtn = event.target.closest('.navbar__burger_btn');
    if (burgerBtn) {
        burgerBlock.classList.add('active');
        return; // дальше не идём, чтобы не сработало закрытие
    }

    // 2) Клик внутри области navbar__burger или burger
    const burgerArea = event.target.closest('.navbar__burger, .burger');
    if (!burgerArea) return; // не наш кейс вообще

    // 3) Если клик по .toggle (или его детям) — игнорируем
    const isToggleClick = event.target.closest('.toggle');
    if (isToggleClick) return;

    // 4) Клик внутри бургер-области, но НЕ по .toggle и НЕ по кнопке → закрываем
    burgerBlock.classList.remove('active');
});


const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});
const swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 6,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});

const ttxAcc = document.querySelectorAll('.singleProduct__ttx_info_acc_el_btn');
ttxAcc.forEach(element => {
    element.addEventListener('click', function() {
        let acc = this.nextElementSibling;
        if (acc.style.maxHeight) {
            acc.style.maxHeight = null;
        } else {
            acc.style.maxHeight = acc.style.maxHeight + acc.scrollHeight + 'px';
        }
    })
});


const currencyBtn = document.querySelector('.singleProduct__header_currency_btn');
currencyBtn.addEventListener('click', function() {
    let allCurrency = this.nextElementSibling;
    if (allCurrency.style.maxHeight) {
        allCurrency.style.maxHeight = null;
        this.classList.remove('active');
    } else {
        allCurrency.style.maxHeight = allCurrency.style.maxHeight + allCurrency.scrollHeight + 'px';
        this.classList.add('active');
    }
})