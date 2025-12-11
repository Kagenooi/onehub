export function adaptive() {
    const wrapper = document.querySelector('#adaptive');
    const innerHeightBlocks = document.querySelectorAll('.innerHeight');
    const innerHeightBlocks2 = document.querySelector('.innerHeight2');

    if (!wrapper) return;

    let zoom = document.body.clientWidth / 19.2 / 100;

    if (document.body.clientWidth > 768 && document.body.clientWidth < 1281) {
        zoom = document.body.clientWidth / 12.8 / 100;
    }

    if (document.body.clientWidth < 769) {
        zoom = document.body.clientWidth / 5.9 / 100;
    }

    wrapper.style.zoom = zoom;

    // высота видимой части экрана
    const viewportHeight = window.innerHeight;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    if (document.body.clientWidth < 769) {
        innerHeightBlocks2.style.height = (viewportHeight / zoom) - 200 + 'px';
        innerHeightBlocks2.style.maxHeight = (viewportHeight / zoom) - 200 + 'px';
        innerHeightBlocks2.style.minHeight = (viewportHeight / zoom) - 200 + 'px';
    }
    // чтобы блок «под зумом» занимал 100% высоты экрана:
    innerHeightBlocks.forEach((block) => {
        block.style.height = (viewportHeight / zoom) + 'px';
        block.style.minHeight = (viewportHeight / zoom) + 'px';
        block.style.paddingTop = navbarHeight + 'px';
    });

    const mobileBurgerSearch = document.querySelector('.mobileBurger__search');
    const mobileBurgerContainer = document.querySelector('.mobileBurger__container');
    const mobileBurgerContainerHeight = mobileBurgerSearch ? mobileBurgerSearch.offsetHeight : 0;
    const mobileBurgerMenu = document.querySelector('.mobileBurger__menu');
    mobileBurgerMenu.style.height = ((viewportHeight / zoom) - 440) + 'px';
    mobileBurgerMenu.style.minHeight = ((viewportHeight / zoom) - 440) + 'px';
    mobileBurgerContainer.style.minHeight = ((viewportHeight / zoom) - 210) + 'px';
    mobileBurgerContainer.style.height = ((viewportHeight / zoom) - 210) + 'px';
}
