// Плавное усиление тени шапки при прокрутке — без дёрганья.
// Ключевые приёмы:
// 1) Высота шапки не меняется (анимируется только box-shadow).
// 2) «Мёртвая зона» между порогами включения/выключения гасит дребезг.
// 3) rAF-троттлинг — обработчик не выполняется чаще одного кадра.

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const ON_THRESHOLD = 30;   // включаем, когда прокрутили больше 30px
    const OFF_THRESHOLD = 10;  // выключаем, когда вернулись меньше 10px

    let isScrolled = false;
    let ticking = false;

    const update = () => {
        const y = window.scrollY || window.pageYOffset;

        if (!isScrolled && y > ON_THRESHOLD) {
            isScrolled = true;
            header.classList.add('is-scrolled');
        } else if (isScrolled && y < OFF_THRESHOLD) {
            isScrolled = false;
            header.classList.remove('is-scrolled');
        }

        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    };

    // Проверяем сразу — вдруг страница открыта не с самого верха
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
});