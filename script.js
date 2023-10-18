"use strict";

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');
const highlightArea = document.getElementById('highlight-area');

const openModalButtons = document.querySelectorAll('.openModal');
const calculatorModal = document.getElementById('calculatorModal');
const modalBackground = document.getElementById('modal-background');

const initialValue = slider.value;
const initialSize = (initialValue / 10000) * 450;
highlightArea.style.width = `${initialSize}px`;
highlightArea.style.height = `${initialSize}px`;
sliderValue.textContent = initialValue;

const openModal = () => {
    document.body.style.overflow = 'hidden';
    calculatorModal.style.display = 'block';
    modalBackground.style.display = 'block';
};

const closeModal = () => {
    document.body.style.overflow = 'auto';
    calculatorModal.style.display = 'none';
    modalBackground.style.display = 'none';
};

openModalButtons.forEach((button) => {
    button.addEventListener('click', openModal);
});

document.querySelector('.close').addEventListener('click', closeModal);
modalBackground.addEventListener('click', closeModal);

slider.addEventListener('input', () => {
    const value = slider.value;
    sliderValue.textContent = value;
    const imageSize = 450;
    const areaSize = (value / 10000) * imageSize;
    highlightArea.style.width = `${areaSize}px`;
    highlightArea.style.height = `${areaSize}px`;
    calculate();
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const complexityOptions = document.querySelectorAll('.dropdown-content a');
    const w = window.innerWidth;
    
    if (w > 1750) {
        swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 500,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 20000,
            disableOnInteraction: false,
        },
    });
    } else if (w < 1750 && w > 1200) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            },
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
        });
    } else if (w < 1200) {
        let swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            },
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
        });
    } else if (w > 1920) {
        let swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            },
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
        });
    }

    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    complexityOptions.forEach((option) => {
        option.addEventListener('click', (e) => {
            const selectedOption = e.target.textContent;
            dropdownBtn.innerText = selectedOption;
            dropdownContent.style.display = 'none';
            calculate();
        });
    });

    let loading = document.getElementById('loading');
    loading.style.display = 'none';
  
    let content = document.getElementById('content');
    content.style.display = 'block';
});

const calculate = () => {
    const area = parseFloat(slider.value);
    const baseCost = 100;
    const complexityDropdown = document.querySelector('.dropdown-btn');
    let complexityFactor = 1;

    switch (complexityDropdown.innerText) {
        case "Болото +20%":
            complexityFactor = 1.2;
            break;
        case "Высотные измерения +15%":
            complexityFactor = 1.15;
            break;
        case "Канавы +10%":
            complexityFactor = 1.1;
            break;
        case "Горная местность +25%":
            complexityFactor = 1.25;
            break;
        case "Без сложностей":
            complexityFactor = 1;
            break;
    }

    const totalCost = area * baseCost * complexityFactor;

    const resultElement = document.getElementById('result');
    const baseCostText = document.getElementById('baseCost');
    baseCostText.innerText = `Базовая стоимость: ${Math.round(baseCost * complexityFactor)} руб.`;
    resultElement.innerText = `Стоимость заказа: ${Math.round(totalCost)} руб.`;
};

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

const randomId = Math.random().toString(36).substring(2, 8);
const idOrderElement = document.getElementById('id-order');
idOrderElement.textContent = `ID-Заказа: ${randomId}`;

calculate();

// const carousel = document.querySelector(".bottom-images");
// const firstImg = document.querySelector(".bottom-images img");
// const arrowIcons = document.querySelectorAll(".slider-wrapper p");

// let isDragStart = false, prevPageX, prevScrollLeft;
// let firstImgWidth = firstImg.clientWidth + 20;

// arrowIcons.forEach((icon) => {
//     icon.addEventListener('click', () => {
//         carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
//     });
// });

// const dragStart = (e) => {
//     isDragStart = true;
//     prevPageX = e.pageX;
//     prevScrollLeft = carousel.scrollLeft;
// };

// const dragging = (e) => { 
//     if (!isDragStart) return;
//     e.preventDefault();
//     carousel.classList.add("dragging");
//     let positionDiff = e.pageX - prevPageX;
//     carousel.scrollLeft = prevScrollLeft - positionDiff;
// };

// const dragStop = () => {
//     isDragStart = false;
//     carousel.classList.remove("dragging");
// };

// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("mousemove", dragging);
// carousel.addEventListener("mouseup", dragStop);

function onEntry(entry) {
    entry.forEach((change) => {
        if (change.target.id == 'sec-anim' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInLeft');   
        } else if (change.target.id == 'head' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInDown');
        } else if (change.target.id == 'gallery' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeIn');
        } else if (change.target.id == 'image2' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInDown');
        } else if (change.target.id == 'image3' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeInDown');
            },200);
        } else if (change.target.id == 'image4' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeInDown');
            },400);;
        } else if (change.target.id == 'image5' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeInDown');
            },600);
        } else if (change.target.id == 'review1' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeInUp');
            },200);
        } else if (change.target.id == 'review2' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeInUp');
            },400);;
        } else if (change.target.id == 'review3' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeInUp');
            },600);
        } else if (change.target.id == 'calc-text' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInLeft');
        } else if (change.target.id == 'review' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInRight');
        } else if (change.target.id == '1reason' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInLeft');
        } else if (change.target.id == '2reason' && change.isIntersecting) {
            setTimeout(() => { 
                change.target.classList.add('animate__animated');
                change.target.classList.add('animate__fadeIn');
            },50);
        } else if (change.target.id == '3reason' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInRight');
        } else if (change.target.id == 'try-calc' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInDown');
        } else if (change.target.id == 'calc-btn' && change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInUp');
        } else if (change.isIntersecting) {
            change.target.classList.add('animate__animated');
            change.target.classList.add('animate__fadeInRight');
        }
    });
}

let options = { threshold: [0.3] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.title-anim');

for (let elm of elements) {
    observer.observe(elm);
}

let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 500,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
        delay: 20000,
        disableOnInteraction: false,
    },
});

window.addEventListener('resize', () => {
    let w = window.innerWidth;
    console.log(w);
    if (w > 1750) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
        });
    } else if (w < 1750 && w > 1200) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
        });
    } else if (w < 1200) {
        let swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
        });
    }
})

let swiper2 = new Swiper(".mySwiper2", {
    effect: "cards",
    grabCursor: true,
});

const setDynamicWidth = () => {
    const calcBtnDynamicBlock = document.querySelector('.calc-reason').offsetWidth;
    document.querySelector('.calculator-btn').style.width = calcBtnDynamicBlock + 'px';
};

setDynamicWidth();