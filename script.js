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

let scrollTimeout;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    max += 1;
    return Math.floor(Math.random() * (max - min)) + min;
}

const randomAnswer = () => {
    switch (getRandomInt(1, 3)) {
        case 1:
            return 'Здравствуйте, занимаюсь вашим вопросом, ожидайте.'
        case 2:
            return 'Здравствуйте, опишите подробней вашу проблему.'
        case 3:
            return 'АААААААААААА, ПРИВЕТ!!!!!!'
        case 4:
            return 'Здравствуйте, можете позвонить по номеру - 8(964)733-04-22, чтобы решить Вашу проблему.'
    }   
}

$('.open_wrapper')[0].addEventListener('click', (e) => {
    e.preventDefault()
    $('.open_chat').css('display', 'flex')
})

$('.close_chat')[0].addEventListener('click', (e) => {
    e.preventDefault()
    $('.open_chat').css('display', 'none')
})

$('.send_message')[0].addEventListener('click', (e) => {
    e.preventDefault();
    if (document.getElementById('message').value == null || document.getElementById('message').value == undefined || document.getElementById('message').value == '' || document.getElementById('message').value == ' ') {
        document.getElementById('message').style = 'border: 1px solid red';
        document.getElementById('message').ariaPlaceholder = 'Введите сообщение'
    } else {
        let message = document.getElementById('message').value;
        const areaMessages = document.querySelector('.history');
        let p = document.createElement('p');
        p.classList = 'customer';
        p.innerText = message;
        areaMessages.prepend(p);
        document.getElementById('message').value = '';
        document.getElementById('message').style = 'border: none';
        setTimeout(() => { 
            const areaMessages = document.querySelector('.history');
            let p = document.createElement('p');
            p.classList = 'support';
            p.innerText = randomAnswer();
            areaMessages.prepend(p);
        }, getRandomInt(5000, 15000));
    }
})

$(".history").on('wheel', function(e) {
    document.body.classList.add('no-scroll');
    this.scrollTop += e.originalEvent.deltaY;

    // Очистить предыдущий таймер, если он существует
    clearTimeout(scrollTimeout);

    // Установить новый таймер
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('no-scroll');
    }, 75);
});

const openModal = () => {
    document.body.style.overflow = 'hidden';
    calculatorModal.style.display = 'block';
    modalBackground.style.display = 'block';
    const idOrderElement = document.getElementById('id-order');
    idOrderElement.textContent = `ID-Заказа: ${Math.random().toString(36).substring(2, 8)}`;
};

const closeModal = () => {
    document.body.style.overflow = 'auto';
    calculatorModal.style.display = 'none';
    modalBackground.style.display = 'none';
    document.querySelector('.modalWrapper').reset();
    calculate();
    sliderValue.textContent = initialValue;
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
        }
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
            }
        });
    } else if (w < 1200) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    } else if (w > 1920) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
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

});

const calculate = () => {
    const area = parseFloat(slider.value);
    const baseCost = 100;
    const complexityDropdown = document.querySelector('.dropdown-btn');
    let complexityFactor = 1;

    switch (complexityDropdown.innerText) {
        case "Болото":
            complexityFactor = 1.2;
            break;
        case "Высотные измерения":
            complexityFactor = 1.15;
            break;
        case "Канавы":
            complexityFactor = 1.1;
            break;
        case "Горная местность":
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

calculate();

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
    }
});

const setDynamicWidth = () => {
    const calcBtnDynamicBlock = document.getElementById('3reason').offsetWidth;
    document.querySelector('.calculator-btn').style.width = calcBtnDynamicBlock + 'px';
};

window.addEventListener('resize', () => {  
    setDynamicWidth();
    let w = window.innerWidth;;
    if (w > 1750) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            }
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
            }
        });
    } else if (w < 1200) {
            swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 500,
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            }
        });
    }
})

let swiper2 = new Swiper(".mySwiper2", {
    effect: "cards",
    grabCursor: true,
});

const validateForm = () => {
    const tel = document.getElementById('tel').value;
    const surname = document.getElementById("surname").value;
    const name = document.getElementById("name").value;
    const town = document.getElementById("town").value;
    const size = document.getElementById("slider").value;

    if (tel.trim() === '' || surname.trim() === '' || name.trim() === '' || town.trim() === '' || size.trim() === '') {
        showErrorToast('Заполните все поля!!!');
        return;
    }

    sendForm();
    closeModal();
};

const showErrorToast = (message) => {
    Toastify({
        text: message,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
        stopOnFocus: true,
    }).showToast();
};

document.querySelector('.calculator-btn-submit').addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
}); 

const sendForm = () => {
    const id = document.getElementById('id-order').textContent.match(/ID-Заказа: (\S+)/);
    const price = document.getElementById('result').textContent.match(/Стоимость заказа: (\S+)/);
    const phone = document.getElementById("tel").value;
    const surname = document.getElementById("surname").value;
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const town = document.getElementById("town").value;
    const size = document.getElementById("slider").value;
    const hard = document.querySelector('.dropdown-btn').textContent;

    const orderData = {
        id: id[1],
        price: price[1],
        phone: phone,
        surname: surname,
        name: name,
        lastname: lastname,
        town: town,
        size: size,
        hard: hard,
    };

    fetch('http://localhost:3000/saveOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then((response) => response.text())
    .then((data) => {
        Toastify({
            text: "Спасибо за оформление заказа!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
        }).showToast();
    })
    .catch((error) => {
        Toastify({
            text: "Произошла ошибка при отправке данных!",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
            stopOnFocus: true,
        }).showToast();
    });
};

document.getElementById('tel').addEventListener('input', function(event) {
    const startsWithPlus = event.target.value.startsWith('+');

    event.target.value = event.target.value.replace(/[^\d]/g, '');

    if (startsWithPlus) {
        event.target.value = '+' + event.target.value;
    }
});

const inputs = ['lastname', 'town', 'name', 'surname'];

inputs.forEach(inputId => {
    document.getElementById(inputId).addEventListener('input', function(event) {
        event.target.value = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    });
});