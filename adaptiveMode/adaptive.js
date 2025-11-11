export function adaptive() {
    const wrapper = document.querySelector('#adaptive');
    let zoom = document.body.clientWidth / 19.2 / 100;
    if (document.body.clientWidth > 768 && document.body.clientWidth < 1281) {
        zoom = document.body.clientWidth / 11.5 / 100;
    }
    if (document.body.clientWidth < 769) {
        zoom = document.body.clientWidth / 3.2 / 100;
    }
    wrapper.style.zoom = zoom;

    // сохраняем значение zoom для других частей кода (удобно)
    wrapper.dataset.zoom = String(zoom);
    if (document.body.clientWidth < 769) {
        // --- корректируем модалки ---
        // желаемая видимая высота (в пикселях) — можно брать долю окна
        const desiredVisiblePx = Math.round(window.innerHeight * 1); // 100% vh
        document.querySelectorAll('.burger').forEach(modal => {
            // высота, которую нужно присвоить до масштабирования
            const neededHeight = Math.max(Math.round(desiredVisiblePx / zoom), 240); // минимум 240px
            modal.style.height = neededHeight + 'px';
            // удобно задать и max-height, чтобы скролл внутри работал корректно
            modal.style.maxHeight = Math.round(window.innerHeight / zoom) + 'px';
            modal.style.overflowY = 'auto';
        });
    }

    if (document.body.clientWidth > 1281) {
        const wrapper = document.querySelectorAll('.navbar .wrapper');
        let minusHeight = 0;
        wrapper.forEach(element => {
            let realHeight = element.clientHeight * zoom;
            minusHeight = minusHeight + realHeight;
        });

        document.querySelectorAll('.topAds__item').forEach(modal => {
            // высота, которую нужно присвоить до масштабирования
            const neededHeight = Math.max(Math.round(window.innerHeight / zoom), 0); // минимум 240px

            // удобно задать и max-height, чтобы скролл внутри работал корректно
            modal.style.zoom = neededHeight / 1000;

            let moreSize = modal.clientWidth * (neededHeight / 1000) * 2;
            let trueSize = 1630 - (234 * 2) + moreSize;
            modal.parentElement.style.maxWidth = trueSize + 'px';
            modal.parentElement.style.minWidth = trueSize + 'px';
            modal.parentElement.style.top = minusHeight + 'px';
        });
    }
}
