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
    footerAcc,
    carsAcc
} from "./module.js";

window.showSubmenu = showSubmenu;
window.toggleActive = toggleActive;
window.toggleAcc = toggleAcc;
window.toggleWishlist = toggleWishlist;
window.toggleSubmenu = toggleSubmenu;
window.toggleMobileMenu = toggleMobileMenu;
window.footerAcc = footerAcc;
window.carsAcc = carsAcc;

document.querySelector('#defaultAcc').click();

footerAcc();
showSubmenu();

const headerSwiper = new Swiper("#headerSlider", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
        nextEl: ".headerSlider__btns_btn.next",
        prevEl: ".headerSlider__btns_btn.prev",
    },
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


const headerBrands = new Swiper("#headerBrands", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
        nextEl: ".header__brands_slider_btns_btn.next",
        prevEl: ".header__brands_slider_btns_btn.prev",
    },
});


let accSliderEl = new Swiper('.problemFixSlider', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 16,
    navigation: {
        nextEl: ".problemFixSlider__btns_btn.next",
        prevEl: ".problemFixSlider__btns_btn.prev",
    },
    pagination: {
        el: ".problemFixSlider .swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // when window width is >=
        769: {
            slidesPerView: 5,
            spaceBetween: 26
        }
    }
});



const productsSwiper = new Swiper("#productsSwiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
        nextEl: ".productsSlider__btns_btn.next",
        prevEl: ".productsSlider__btns_btn.prev",
    },
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

    deleteBtn.addEventListener('click', () => {
        // выкидываем файл из массива
        selectedFiles = selectedFiles.filter(f => !filesEqual(f, file));

        // удаляем превью
        wrapper.remove();
        URL.revokeObjectURL(img.src);

        // пересобираем input.files и декор
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