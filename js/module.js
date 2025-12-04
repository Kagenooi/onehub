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

export function toggleAcc(event) {
    let acc = document.querySelector(`#${event.dataset.acc}`);
    let choose = event.querySelector('span');
    event.classList.toggle('active');
    acc.classList.toggle('active');

    let accBtns = acc.querySelectorAll('button');
    accBtns.forEach(element => {
        element.addEventListener('click', function () {
            choose.innerHTML = element.innerHTML;
            event.classList.remove('active');
            acc.classList.remove('active');
        })
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