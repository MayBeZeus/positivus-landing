const buttons = document.querySelectorAll('.work-card-button');
const prevButton = document.querySelector('.arrow-left');
const nextButton = document.querySelector('.arrow-right');
const cards = document.querySelectorAll('.review-box');
const dots = document.querySelectorAll('.dot');
const track = document.querySelector('.review-track');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.work-card');

        card.classList.toggle('active');
    });
});

let currentSlide = 0;

function moveSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 50;
    const windowWidth = document.querySelector('.review-window').offsetWidth;

    let translateX;

    if (currentSlide === 0) {

        translateX = 0;

    } else if (currentSlide === cards.length - 1) {

        translateX = track.scrollWidth - windowWidth;

    } else {

        translateX =
            currentSlide * (cardWidth + gap)
            - (windowWidth - cardWidth) / 2;

    }

    track.style.transform = `translateX(-${translateX}px)`;

    updateDots();
}

nextButton.addEventListener('click', () => {
    if (currentSlide < cards.length - 1) {
        currentSlide++;
        moveSlider();
    }
});

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        moveSlider();
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        moveSlider();
    });
});

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

track.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;

    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -50) {
        if (currentSlide < cards.length - 1) {
            currentSlide++;
            moveSlider();
        }
    }

    if (swipeDistance > 50) {
        if (currentSlide > 0) {
            currentSlide--;
            moveSlider();
        }
    }
});

moveSlider();

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.header-nav a');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});