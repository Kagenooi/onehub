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

const langWrapper = document.getElementById('langWrapper');
const langWrapper2 = document.getElementById('langWrapper2');
document.addEventListener('click', (event) => {
  // если клик произошёл НЕ внутри .navbar__lang
  if (!event.target.closest('.navbar__lang')) {
    langWrapper.classList.remove('active');
    langWrapper2.classList.remove('active');
  }
});


document.addEventListener('DOMContentLoaded', () => {
    const footerLang = document.querySelector('.footer__lang');
    if (!footerLang) return;

    const toggleBtn = footerLang.querySelector('.footer__lang_btn');
    const menu = footerLang.querySelector('.footer__lang_btns');
    const menuBtns = footerLang.querySelectorAll('.footer__lang_btns_btn');

    let isOpen = false;

    const openMenu = () => {
        // можно захардкодить, можно по содержимому
        menu.style.maxWidth = menu.scrollWidth + 'px';
        isOpen = true;
    };

    const closeMenu = () => {
        menu.style.maxWidth = '0';
        isOpen = false;
    };

    // клик по основной кнопке — открыть/закрыть
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // чтобы клик не улетел на document
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // клик по любому языку — закрыть
    menuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // если нужно менять текст кнопки — раскомментируй:
            // const label = footerLang.querySelector('.footer__lang_btn_txt');
            // if (label) label.textContent = btn.textContent.trim();

            closeMenu();
        });
    });

    // клик вне блока footer__lang — закрыть
    document.addEventListener('click', (e) => {
        if (!footerLang.contains(e.target) && isOpen) {
            closeMenu();
        }
    });
});
