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


// const headerCategories = document.querySelector('.header__categories');
// const headerCategoriesBtns = document.querySelectorAll('.headerCategoriesSmall__btn');
// headerCategoriesBtns.forEach(element => {
//     element.addEventListener('click', () => {
//         const transformValue = element.getAttribute('data-transform');
//         headerCategories.style.left = `${transformValue}px`;
//         for (let i = 0; i < headerCategoriesBtns.length; i++) {
//             headerCategoriesBtns[i].classList.remove('active');
//         }
//         element.classList.add('active');
//     });
// });
// document.querySelector('#defaultCategoriesBtn').click();


document.addEventListener('DOMContentLoaded', () => {
    const headerCategories = document.querySelector('.header__categories'); // блок, который двигаем
    const swipeZone = document.getElementById('headerCategories');          // зона, по которой свайпаем
    const headerCategoriesBtns = Array.from(document.querySelectorAll('.headerCategoriesSmall__btn'));

    if (!headerCategories || !headerCategoriesBtns.length || !swipeZone) return;

    let currentIndex = headerCategoriesBtns.findIndex(btn => btn.id === 'defaultCategoriesBtn');
    if (currentIndex === -1) currentIndex = 0;

    // единая функция переключения
    function setCategory(index) {
        if (index < 0 || index >= headerCategoriesBtns.length) return;

        const btn = headerCategoriesBtns[index];
        const transformValue = btn.getAttribute('data-transform');

        // если хочешь через translateX – замени на transform
        headerCategories.style.left = `${transformValue}px`;

        headerCategoriesBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentIndex = index;
    }

    // клики по кнопкам
    headerCategoriesBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            setCategory(index);
        });
    });

    // дефолтное состояние
    setCategory(currentIndex);

    // ==== свайпы ====
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    swipeZone.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isSwiping = true;
    }, { passive: true });

    swipeZone.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;

        const touch = e.touches[0];
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;

        // если пользователь уходит в вертикальный скролл — не мешаем
        if (Math.abs(diffY) > Math.abs(diffX)) {
            isSwiping = false;
            return;
        }

        // чтобы реально блокировать горизонтальный скролл, можно сделать passive: false
        // и здесь вызвать e.preventDefault()
    }, { passive: true });

    swipeZone.addEventListener('touchend', (e) => {
        if (!isSwiping) return;

        const touch = e.changedTouches[0];
        const diffX = touch.clientX - startX;
        const threshold = 50; // минимальная длина свайпа в px

        if (Math.abs(diffX) > threshold) {
            if (diffX < 0) {
                // свайп влево -> следующая категория
                setCategory(currentIndex + 1);
            } else {
                // свайп вправо -> предыдущая категория
                setCategory(currentIndex - 1);
            }
        }

        isSwiping = false;
    }, { passive: true });
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
