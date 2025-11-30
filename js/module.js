export function toggleActive(event, active) {
    document.querySelector(`#${active}`).classList.toggle('active');
}

export function toggleWishlist(event) {
    event.classList.toggle('active');
}

export function toggleSubmenu(submenu) {
    document.querySelector(`#${submenu}`).classList.toggle('active');
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