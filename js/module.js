export function toggleActive(event, active) {
    document.querySelector(`#${active}`).classList.toggle('active');
}

export function toggleWishlist(event) {
    event.classList.toggle('active');
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