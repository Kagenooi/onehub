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


document.addEventListener('click', (e) => {
    if (!e.target.closest('.select')) {
        toggleAcc(); // закрываем все селекты
    }
});




const headerSwiper = new Swiper("#headerSlider", {
    cssMode: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
        nextEl: ".header__slider_btns_btn.next",
        prevEl: ".header__slider_btns_btn.prev",
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        // when window width is >=
        769: {
            slidesPerView: 3,
            spaceBetween: 32
        },
        // when window width is >=
        1296: {
            slidesPerView: 4,
            spaceBetween: 32
        }
    }
});

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
const langWrapper2 = document.getElementById('langWrapper2');
document.addEventListener('click', (event) => {
    // если клик произошёл НЕ внутри .navbar__lang
    if (!event.target.closest('.navbar__lang')) {
        langWrapper.classList.remove('active');
        langWrapper2.classList.remove('active');
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


const fileAttach = document.querySelector('#fileAttach');
const inner = document.querySelector('#files');
const fileDecor = inner.querySelector('.contactUs__file_inner_decor');

let selectedFiles = [];
const MAX_FILES = 8;

fileAttach.addEventListener('change', handleFilesChange);

// сравнение файлов, чтобы не дублировать
function filesEqual(a, b) {
    return (
        a.name === b.name &&
        a.size === b.size &&
        a.lastModified === b.lastModified &&
        a.type === b.type
    );
}

function handleFilesChange(e) {
    const picked = Array.from(e.target.files)
        .filter(file => file.type.startsWith('image/'));

    if (!picked.length) {
        fileAttach.value = '';
        return;
    }

    // объединяем уже выбранные + только что выбранные
    let merged = [...selectedFiles];

    picked.forEach(file => {
        const alreadyExists = merged.some(f => filesEqual(f, file));
        if (!alreadyExists) {
            merged.push(file);
        }
    });

    // резка по лимиту
    if (merged.length > MAX_FILES) {
        alert(`Можно выбрать не больше ${MAX_FILES} файлов`);
        merged = merged.slice(0, MAX_FILES);
    }

    selectedFiles = merged;

    // полностью пересобираем превью из selectedFiles
    clearPreviews();
    selectedFiles.forEach(file => createPreview(file));

    // синхронизируем input.files и декор
    syncInputFiles();
    updateDecorState();

    // сбрасываем значение, чтобы повторный выбор тех же файлов снова триггерил change
    fileAttach.value = '';
}

function clearPreviews() {
    // удаляем только блоки превью, декор не трогаем
    inner.querySelectorAll('.attachedWrapper').forEach(el => el.remove());
}

function createPreview(file) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('attachedWrapper');

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('attachedWrapper__btn');

    const deleteBtnIcon = document.createElement('img');
    deleteBtnIcon.src = 'images/delete.png';
    deleteBtnIcon.classList.add('attachedWrapper__btn_icon');

    deleteBtn.appendChild(deleteBtnIcon);
    wrapper.appendChild(deleteBtn);

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    img.classList.add('attachedImage');
    wrapper.appendChild(img);

    deleteBtn.addEventListener('click', (e) => {
        // не даём клику улететь к label / input
        e.stopPropagation();
        e.preventDefault();

        // убираем файл из массива
        selectedFiles = selectedFiles.filter(f => !filesEqual(f, file));

        // удаляем превью
        wrapper.remove();
        URL.revokeObjectURL(img.src);

        // синхронизируем input.files и декор
        syncInputFiles();
        updateDecorState();
    });

    inner.appendChild(wrapper);
}


function syncInputFiles() {
    const dt = new DataTransfer();
    selectedFiles.forEach(file => dt.items.add(file));
    fileAttach.files = dt.files;
}

function updateDecorState() {
    if (!fileDecor) return;

    if (selectedFiles.length > 0) {
        fileDecor.classList.add('inactive');
    } else {
        fileDecor.classList.remove('inactive');
    }
}



const catBtn = document.querySelectorAll('.categorie__header_btns_btn');
const categories = document.querySelector('#categories');
const products = categories.querySelectorAll('.product');

const LS_SIZE_KEY = 'productSize';
const LS_CAT_KEY = 'categoriesClass';

// единая функция применения выбранного размера
function applySize(size) {
    // активная кнопка
    catBtn.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });

    // классы продуктов
    products.forEach(prod => {
        prod.className = 'product'; // сбрасываем всё, оставляем базовый
        prod.classList.add(size);
    });

    // классы для categories
    categories.className = 'categorie__wrapper';
    categories.classList.add(size);

    // сохраняем в localStorage
    localStorage.setItem(LS_SIZE_KEY, size);
    localStorage.setItem(LS_CAT_KEY, categories.className);
}

// клики по кнопкам
catBtn.forEach(element => {
    element.addEventListener('click', function () {
        const size = element.dataset.size;
        applySize(size);
    });
});

// инициализация при загрузке
(function initFromStorage() {
    const savedSize = localStorage.getItem(LS_SIZE_KEY);
    const savedCatClass = localStorage.getItem(LS_CAT_KEY);

    if (savedSize) {
        // нормальная ветка — восстанавливаем по размеру
        applySize(savedSize);
        return;
    }

    // fallback: если ничего не сохранено
    if (catBtn[0]) {
        applySize(catBtn[0].dataset.size);
    }
})();



function toggleFilter(elem) {
    document.querySelector(`.${elem}`).classList.toggle('active');
}
window.toggleFilter = toggleFilter;


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
