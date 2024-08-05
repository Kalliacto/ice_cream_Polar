const reviews = [
    {
        name: 'John',
        country: 'USA',
        avatar: 'ava1.png',
        review: 'This ice cream is really delicious! I love the taste of it.',
    },
    {
        name: 'Maria',
        country: 'Italy',
        avatar: 'ava2.webp',
        review: 'The ice cream is very tasty and refreshing. It`s perfect for a hot day!',
    },
    {
        name: 'Anna',
        country: 'Russia',
        avatar: 'ava4.webp',
        review: "I love this ice cream because it has a unique flavor that I can't find anywhere else.",
    },
    {
        name: 'Peter',
        country: 'UK',
        avatar: 'ava3.webp',
        review: 'This ice cream is amazing! The texture is smooth and the flavors are intense.',
    },
    {
        name: 'Emma',
        country: 'France',
        avatar: 'ava2.webp',
        review: 'This is the best ice cream I have ever tried! The flavors are rich and the texture is creamy.',
    },
    {
        name: 'Sophie',
        country: 'Germany',
        avatar: 'ava7.webp',
        review: "I love this ice cream because it has a unique flavor that I can't find anywhere else.",
    },
    {
        name: 'Jane',
        country: 'Canada',
        avatar: 'ava5.webp',
        review: 'This ice cream is so good! The flavors are intense and the texture is smooth.',
    },
];

const slidesWrap = document.querySelector('.slides');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const sliderBtns = document.querySelectorAll('.slider__controller_btn');
const markersWrap = document.querySelector('.markers__wrap');
const allMarkers = markersWrap.children;

const slideCount = reviews.length;
let currentSlide = 1;

slidesWrap.style.setProperty('--slide-count', slideCount);
markersWrap.style.setProperty('--slide-count', slideCount);

function createSlide(review) {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    slide.innerHTML = `
        <div class="user">
            <img src="../image/${review.avatar}" alt="ava" class="user__avatar" />
            <div class="user__info">
                <p class="user__name">${review.name}</p>
                <p class="user__country">${review.country}</p>
            </div>
        </div>
        <div class="review">
            <p class="review__text">${review.review}</p>
        </div>
    `;

    return slide;
}

function createSliderMarkers(review) {
    const marker = document.createElement('span');
    marker.classList.add('marker');

    marker.innerHTML = ` 
            <img src="../image/${review.avatar}" alt="ava" class="marker__img" />
    `;

    return marker;
}

function switchSlide(btn) {
    let currentTranslateSlide = slidesWrap.style.translate || 0;
    let currentTranslateMarker = markersWrap.style.translate || 0;

    if (btn.classList.contains('right')) {
        if (currentSlide < slideCount) {
            leftBtn.disabled ? (leftBtn.disabled = false) : '';
            slidesWrap.style.translate = parseFloat(currentTranslateSlide) - 100 / slideCount + '%';
            markersWrap.style.translate = parseFloat(currentTranslateMarker) - 100 / slideCount + '%';
            currentSlide += 1;
            validateCurrentSlide();
            checkActiveMarker();
        }
    }
    if (btn.classList.contains('left')) {
        if (currentSlide > 1) {
            rightBtn.disabled ? (rightBtn.disabled = false) : '';
            slidesWrap.style.translate = parseFloat(currentTranslateSlide) + 100 / slideCount + '%';
            markersWrap.style.translate = parseFloat(currentTranslateMarker) + 100 / slideCount + '%';
            currentSlide -= 1;
            validateCurrentSlide();
            checkActiveMarker();
        }
    }
}

function validateCurrentSlide() {
    if (currentSlide === 1) {
        leftBtn.disabled = true;
    }
    if (currentSlide === 7) {
        rightBtn.disabled = true;
    }
}

function checkActiveMarker() {
    for (let i = 0; i < allMarkers.length; i++) {
        if (i + 1 === currentSlide) {
            allMarkers[i].classList.add('marker__active');
        } else {
            allMarkers[i].classList.remove('marker__active');
        }
    }
}

for (const btn of sliderBtns) {
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('right')) {
            switchSlide(e.target);
        } else {
            switchSlide(e.target);
        }
    });
}

function init() {
    slidesWrap.append(...reviews.map(createSlide));
    markersWrap.append(...reviews.map(createSliderMarkers));
    validateCurrentSlide();
    checkActiveMarker();
}

init();
