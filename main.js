/**
 *
 * @param options
 * @return {{getActiveSlide: getActiveSlide, slideTo: slideTo}}
 * @constructor
 */
function Swiper(options) {
    let self = this;

    let defaultOptions = {
        initSlide: 0,
        hasSwipe: true
    };

    options = Object.assign(options, defaultOptions);

    let state = {
        activeSlide: null,
        count: null,
        translateX: null
    };

    self._container = document.querySelector(options.container);
    self._wrapper = self._container && self._container.querySelector('.swiper-wrapper');

    if (!self._container ||
        !self._container.childElementCount ||
        !self._wrapper ||
        !self._wrapper.childElementCount) {
        return;
    }

    self._slides = self._wrapper.children;

    state.count = self._slides.length;

    function calcSizes() {
        state.sizes = {
            slide: {
                width: self._wrapper.clientWidth
            }
        }
    }

    calcSizes();

    function slideTo(index) {
        state.activeSlide !== null && self._slides[state.activeSlide].classList.remove('active');

        self._slides[index].classList.add('active');

        state.activeSlide = index;

        changeTranslate(index * state.sizes.slide.width);
    }

    function changeTranslate(offsetX) {
        self._wrapper.style.transform = `translate3d(-${offsetX}px, 0,0)`;
    }

    slideTo(options.initSlide);

    function getActiveSlide() {
        return state.activeSlide;
    }

    function bindControls() {
        self._containerContols = document.querySelector('.swiper-controls');

        if (!self._containerContols || !self._containerContols.childElementCount) {
            return;
        }

        self._prevButton = self._containerContols.querySelector('.swiper-button-prev');
        self._nextButton = self._containerContols.querySelector('.swiper-button-next');

        self._prevButton.addEventListener('click', function () {
            if (state.activeSlide !== 0) {
                slideTo(state.activeSlide - 1);
            }
        });

        self._nextButton.addEventListener('click', function () {
            if (state.activeSlide !== state.count - 1) {
                slideTo(state.activeSlide + 1);
            }
        });
    }

    if (options.hasControls) {
        bindControls();
    }

    // if (options.hasSwipe) {
    //     bindSwipe();
    // }
    //
    // function bindSwipe() {
    //     self._wrapper.addEventListener('dragstart', function (e) {
    //         e.preventDefault();
    //     });
    //
    //     self._wrapper.addEventListener('mousedown', function (e) {
    //         // console.log(e.offsetX);
    //         self._hasClick = true;
    //     });
    //
    //     self._wrapper.addEventListener('mouseup', function () {
    //         self._hasClick = false;
    //     });
    //
    //     self._wrapper.addEventListener('mouseout', function () {
    //         self._hasClick = false;
    //     });
    //
    //     document.querySelector('.swiper-slide').addEventListener('mousemove', function (e) {
    //         if (self._hasClick) {
    //             let foo = (state.activeSlide || 1) - state.sizes.slide.width + e.offsetX;
    //             console.log(foo);
    //             changeTranslate(foo);
    //         }
    //     });
    // }

    return {
        getActiveSlide: getActiveSlide,
        slideTo: slideTo,
    };
}
