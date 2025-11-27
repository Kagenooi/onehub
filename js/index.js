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
    showSubmenu
} from "./module.js";

window.showSubmenu = showSubmenu;
window.toggleActive = toggleActive;
window.toggleAcc = toggleAcc;
window.toggleWishlist = toggleWishlist;

showSubmenu();

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

const headerCategories = new Swiper("#headerCategories", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
});

const productsSwiper = new Swiper("#productsSwiper", {
    cssMode: true,
    loop: true,
    slidesPerView: 5,
    spaceBetween: 94,
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

fileAttach.addEventListener('input', function (e) {
    const files = Array.from(e.target.files);

    // ограничение до 8
    const limitedFiles = files.slice(0, 8);
    if (files.length > 8) {
        alert('Можно выбрать не больше 8 файлов');
    }

    // пересобираем список файлов (только картинки)
    selectedFiles = limitedFiles.filter(file => file.type.startsWith('image/'));

    // чистим ТОЛЬКО превью, декор не трогаем
    clearPreviews();

    // создаём превью под актуальный список
    selectedFiles.forEach(file => createPreview(file));

    syncInputFiles();
    updateDecorState();
});

function clearPreviews() {
    // удаляем только блоки превью
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
        // убираем файл из массива
        selectedFiles = selectedFiles.filter(f => f !== file);

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
