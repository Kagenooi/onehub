export function toggleActive(event, active) {
    document.querySelector(`#${active}`).classList.toggle('active');
}

export function toggleWishlist(event) {
    event.classList.toggle('active');
}

export function toggleSubmenu(submenu) {
    document.querySelector(`#${submenu}`).classList.toggle('active');
}

export function toggleMobileMenu(burger, btn) {
    btn.classList.toggle('active');
    document.querySelector(`#${burger}`).classList.toggle('active');
    let mobileBurger = document.querySelectorAll('.mobileBurger__menu_list');
    for (let i = 0; i < mobileBurger.length; i++) {
        mobileBurger[i].classList.remove('active');
    }
}

// одна публичная функция
// export function toggleAcc(btn) {
//     const allBtns = document.querySelectorAll('.select__btn');
//     const allOptions = document.querySelectorAll('.select__options');

//     // если вызвали без аргумента -> просто закрыть всё
//     if (!btn) {
//         allBtns.forEach(b => b.classList.remove('active'));
//         allOptions.forEach(o => {
//             o.classList.remove('active');
//             o.style.maxHeight = null;
//         });
//         return;
//     }

//     const accId = btn.dataset.acc;
//     const acc = document.getElementById(accId);
//     if (!acc) return;

//     const wasActive = btn.classList.contains('active');

//     // 1. Сначала закрываем все селекты
//     allBtns.forEach(b => b.classList.remove('active'));
//     allOptions.forEach(o => {
//         o.classList.remove('active');
//         o.style.maxHeight = null;
//     });

//     // 2. Если по кнопке кликнули, когда она была активна → просто закрыли всё и выходим
//     if (wasActive) {
//         return;
//     }

//     // 3. Открываем текущий селект
//     btn.classList.add('active');
//     acc.classList.add('active');
//     acc.style.maxHeight = acc.scrollHeight + 'px';

//     // 4. Логика выбора пункта
//     const textSpan = btn.querySelector('.select__btn_txt');
//     const optionBtns = acc.querySelectorAll('.select__options_el');

//     optionBtns.forEach(optionBtn => {
//         optionBtn.onclick = () => {

//             let el = optionBtn;
//             while (el && !el.classList.contains('select')) {
//                 el = el.parentElement;
//             }
//             let hiddenInp = el.querySelector('.select__hidden');
//             hiddenInp.value = optionBtn.value;
            

//             if (textSpan) {
//                 textSpan.textContent = optionBtn.textContent;
//             }
//             // после выбора закрываем всё
//             toggleAcc(); // вызов без аргументов -> close all
//         };
//     });
// }

function syncSelectState(btn, acc) {
    const select = btn.closest('.select');
    if (!select) return;

    const textSpan = btn.querySelector('.select__btn_txt');
    // запоминаем плейсхолдер (первоначальный текст кнопки)
    if (textSpan && !btn.dataset.placeholder) {
        btn.dataset.placeholder = textSpan.textContent.trim();
    }

    const hiddenInp = select.querySelector('.select__hidden');
    const currentVal = (hiddenInp?.value ?? '').trim();

    const optionBtns = acc.querySelectorAll('.select__options_el');

    let matchedBtn = null;
    optionBtns.forEach(ob => {
        const isSel = currentVal !== '' && ob.value === currentVal;
        ob.classList.toggle('active', isSel);
        if (isSel) matchedBtn = ob;
    });

    if (textSpan) {
        if (matchedBtn) textSpan.textContent = matchedBtn.textContent;
        else textSpan.textContent = btn.dataset.placeholder || textSpan.textContent;
    }
}

// вызови это на старте страницы (см. ниже)
export function initSelects() {
    document.querySelectorAll('.select__btn').forEach(btn => {
        const accId = btn.dataset.acc;
        const acc = accId && document.getElementById(accId);
        if (!acc) return;
        syncSelectState(btn, acc);
    });
}

export function toggleAcc(btn) {
    const allBtns = document.querySelectorAll('.select__btn');
    const allOptions = document.querySelectorAll('.select__options');

    // если вызвали без аргумента -> просто закрыть всё
    if (!btn) {
        allBtns.forEach(b => b.classList.remove('active'));
        allOptions.forEach(o => {
            o.classList.remove('active');
            o.style.maxHeight = null;
        });
        return;
    }

    const accId = btn.dataset.acc;
    const acc = document.getElementById(accId);
    if (!acc) return;

    const wasActive = btn.classList.contains('active');

    // 1) Сначала закрываем все селекты
    allBtns.forEach(b => b.classList.remove('active'));
    allOptions.forEach(o => {
        o.classList.remove('active');
        o.style.maxHeight = null;
    });

    // 2) Если клик по уже открытой кнопке — просто закрыли всё
    if (wasActive) return;

    // 3) Открываем текущий селект
    btn.classList.add('active');
    acc.classList.add('active');
    acc.style.maxHeight = acc.scrollHeight + 'px';

    // 3.1) Подсветить дефолтный выбранный пункт (если hidden.value задан)
    syncSelectState(btn, acc);

    // 4) Логика выбора/снятия выбора пункта
    const select = btn.closest('.select');
    const textSpan = btn.querySelector('.select__btn_txt');
    const optionBtns = acc.querySelectorAll('.select__options_el');

    optionBtns.forEach(optionBtn => {
        optionBtn.onclick = () => {
            if (!select) return;

            const hiddenInp = select.querySelector('.select__hidden');
            if (!hiddenInp) return;

            const currentVal = (hiddenInp.value ?? '').trim();
            const clickedVal = (optionBtn.value ?? '').trim();

            const isSame = currentVal !== '' && clickedVal === currentVal;

            // снять выбор, если нажали на тот же пункт
            if (isSame) {
                hiddenInp.value = '';
                optionBtns.forEach(o => o.classList.remove('active'));
                if (textSpan) textSpan.textContent = btn.dataset.placeholder || '';
            } else {
                hiddenInp.value = clickedVal;
                optionBtns.forEach(o => o.classList.remove('active'));
                optionBtn.classList.add('active');
                if (textSpan) textSpan.textContent = optionBtn.textContent;
            }

            // закрываем всё после клика
            toggleAcc();
        };
    });
}



export function showSubmenu() {
    let links = document.querySelectorAll('.burger__menu_list_link');

    links.forEach(element => {
        element.addEventListener('mouseover', function () {
            let submenu = document.querySelector(`#${this.dataset.submenu}`);
            submenu.classList.add('active');

            submenu.addEventListener('mouseover', function () {
                element.classList.add('active');
            });
            submenu.addEventListener('mouseout', function () {
                element.classList.remove('active');
            });
        });
        element.addEventListener('mouseout', function () {
            let submenu = document.querySelector(`#${this.dataset.submenu}`);
            submenu.classList.remove('active');
            element.classList.remove('active');
        });
    });
}


export function footerAcc() {
    let btns = document.querySelectorAll('.footer__menu_el_title');
    btns.forEach(element => {
        element.addEventListener('click', function () {
            let acc = element.nextElementSibling;
            if (acc.style.maxHeight) {
                acc.style.maxHeight = null;
                element.classList.remove('active');
            } else {
                acc.style.maxHeight = acc.style.maxHeight + acc.scrollHeight + 'px';
                element.classList.add('active');
            }
        })
    });
}


export function carsAcc(btn, acc) {
    const allAccs = document.querySelectorAll('.problemFix__accs_item');
    allAccs.forEach(element => {
        element.classList.remove('active');
    });
    document.querySelector(`#${acc}`).classList.add('active');
    const allBtns = document.querySelectorAll('.problemFix__accs_btns_btn');
    allBtns.forEach(element => {
        element.classList.remove('active');
    });
    btn.classList.add('active');
}