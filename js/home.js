let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let mCarousel = document.querySelector('.mCarousel');
let listHTML = document.querySelector('.mCarousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');

nextButton.onclick = function(){
    showSlider('next');
    resetAutoSlide
}
prevButton.onclick = function(){
    showSlider('prev');
    resetAutoSlide
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    mCarousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.mCarousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        mCarousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        mCarousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        clearInterval(autoSlideInterval);
    }
});

let autoInterval;

const startAutoSlide = () => {
    autoInterval = setInterval(() =>{
        showSlider('next')
    }, 6500)
}

// Reset auto slide timer
const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto slide when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    startAutoSlide();
});


