export function adaptive() {
    const wrapper = document.querySelector('#adaptive');
    const innerHeightBlocks = document.querySelectorAll('.innerHeight');

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

    // чтобы блок «под зумом» занимал 100% высоты экрана:
    innerHeightBlocks.forEach((block) => {
        block.style.height = (viewportHeight / zoom) + 'px';
        block.style.minHeight = (viewportHeight / zoom) + 'px';
        block.style.paddingTop = navbarHeight + 'px';
    });

    const mobileBurgerSearch = document.querySelector('.mobileBurger__search');
    const mobileBurgerContainer = document.querySelector('.mobileBurger__container');
    const mobileBurgerContainerHeight  = mobileBurgerSearch ? mobileBurgerSearch.offsetHeight : 0;
    const mobileFooter = document.querySelector('.mobileBurger__footer');
    const mobileBurgerMenu = document.querySelector('.mobileBurger__menu');
    mobileBurgerMenu.style.height = (viewportHeight - mobileBurgerContainerHeight - navbarHeight - mobileFooter.offsetHeight - 25) + 'px';
    mobileBurgerMenu.style.minHeight = (viewportHeight - mobileBurgerContainerHeight - navbarHeight - mobileFooter.offsetHeight - 25) + 'px';
    mobileBurgerContainer.style.minHeight = (viewportHeight - mobileBurgerContainerHeight - navbarHeight) + 'px';
    mobileBurgerContainer.style.height = (viewportHeight - mobileBurgerContainerHeight - navbarHeight) + 'px';
}
