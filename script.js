"use strict";

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');
const highlightArea = document.getElementById('highlight-area');

// Устанавливаем начальное значение при загрузке страницы
const initialValue = slider.value;
const initialSize = (initialValue / 10000) * 450;
highlightArea.style.width = `${initialSize}px`;
highlightArea.style.height = `${initialSize}px`;
sliderValue.textContent = initialValue;

// Получить все элементы с классом "openModal" и модальное окно
const openModalButtons = document.querySelectorAll('.openModal');
const calculatorModal = document.getElementById('calculatorModal');
const modalBackground = document.getElementById('modal-background');

// Функция для открытия модального окна
function openModal() {
    // Отключение скролла на странице
    document.body.style.overflow = 'hidden';
    // Открытие модального окна и фона
    calculatorModal.style.display = 'block';
    modalBackground.style.display = 'block';
}

// Функция для закрытия модального окна и фона
function closeModal() {
    // Включение скролла на странице при закрытии модального окна
    document.body.style.overflow = 'auto';
    // Закрытие модального окна и фона
    calculatorModal.style.display = 'none';
    modalBackground.style.display = 'none';
}

// Добавить обработчик события click к каждой кнопке "openModal"
openModalButtons.forEach(function(button) {
    button.addEventListener('click', openModal);
});

// Добавить обработчик события click для закрытия модального окна и фона
document.querySelector('.close').addEventListener('click', closeModal);
modalBackground.addEventListener('click', closeModal);

// Обработчик изменения значения слайдера
slider.addEventListener('input', () => {
    const value = slider.value;
    sliderValue.textContent = value;

    // Рассчитываем ширину и высоту области на основе значения слайдера
    const imageSize = 450; // Размер изображения
    const areaSize = (value / 10000) * imageSize; // Размер области

    // Устанавливаем новые размеры и позицию области
    highlightArea.style.width = `${areaSize}px`;
    highlightArea.style.height = `${areaSize}px`;

    // Вызываем функцию для пересчета стоимости при изменении площади
    calculate();
});

// Выбор сложности
document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const complexityOptions = document.querySelectorAll('.dropdown-content a');

    dropdownBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Предотвращаем стандартное действие перехода по ссылке
    
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    // Обработчик выбора сложности
    complexityOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            const selectedOption = e.target.textContent;
            dropdownBtn.innerText = selectedOption;
            dropdownContent.style.display = 'none';

            // Вызываем функцию для пересчета стоимости при изменении сложности
            calculate();
        });
    });
});

// Функция для пересчета стоимости
function calculate() {
    const area = parseFloat(slider.value);
    const baseCost = 100; // Базовая стоимость единицы площади (ваша базовая стоимость)
    const complexityDropdown = document.querySelector('.dropdown-btn');
    let complexityFactor = 1; // Фактор сложности по умолчанию

    // Определяем фактор сложности на основе выбора из выпадающего списка
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

    // Вычисляем стоимость заказа с учетом площади и фактора сложности
    const totalCost = area * baseCost * complexityFactor;

    // Выводим результат на страницу
    const resultElement = document.getElementById('result');
    const baseCostText = document.getElementById('baseCost');
    baseCostText.innerText = `Базовая стоимость: ${Math.round(baseCost * complexityFactor)} руб.`;
    resultElement.innerText = `Стоимость заказа: ${Math.round(totalCost)} руб.`;
}

// Обработчик клика на все ссылки с якорями
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault(); // Отменяем стандартное действие перехода по ссылке

        const targetId = e.target.getAttribute('href').substring(1); // Получаем id элемента

        // Ищем элемент с соответствующим id
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Прокручиваем страницу к элементу с плавностью
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

//Генерация случайного ID
const randomId = Math.random().toString(36).substring(2, 8); // Пример случайного ID

// Находим элемент с id "id-order" и вставляем в него текст с сгенерированным ID
const idOrderElement = document.getElementById('id-order');
idOrderElement.textContent = `ID-Заказа: ${randomId}`;

calculate()