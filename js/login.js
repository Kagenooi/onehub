import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive(); });


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
