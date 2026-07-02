// Пока что сделаем 5 классных вопросов, ты можешь добавить еще!
const quizQuestions = [
    {
        q: "Какая твоя самая сильная папина сторона?",
        answers: ["Всегда поддерживает меня", "Лучшее чувство юмора", "Умеет решать любые проблемы", "Просто гений"]
    },
    {
        q: "Кто в доме самый крутой компьютерщик и мастер?",
        answers: ["Папа, без вариантов", "Конечно Папочка", "Тот, у кого сейчас день рождения", "Папуля"]
    },
    {
        q: "Идеальные выходные для лучшего папы — это...",
        answers: ["Отдохнуть с семьей", "Залечь спасть всей семьей 😂", "Поиграть или посмотреть фильм", "Все варианты сразу!"]
    },
    {
        q: "На сколько процентов ты выглядишь в свои 39?",
        answers: ["Максимум на 18!", "На 18", "На 18", "На 18"]
    },
    {
        q: "Кто самый лучший папа во Вселенной?",
        answers: ["Папуля!", "Мой любимый папа", "Человек, проходящий этот тест", "Тот кому 39 но выгледет на 18! 🎉"]
    }
];

let currentIdx = 0;

// Находим элементы на странице
const startBtn = document.getElementById('start-quiz-btn');
const triggerZone = document.getElementById('quiz-trigger-zone');
const quizSection = document.getElementById('quiz-display-section');

const qText = document.getElementById('question-text');
const optionsBox = document.getElementById('options-box');
const currentNumSign = document.getElementById('current-number');

const quizBlockElement = document.getElementById('quiz-block');
const resultBlockElement = document.getElementById('result-block');
const restartBtn = document.getElementById('restart-btn');

// Нажатие на кнопку запуска теста
startBtn.addEventListener('click', () => {
    triggerZone.classList.add('hidden');
    quizSection.classList.remove('hidden');
    showStep();
    quizSection.scrollIntoView({ behavior: 'smooth' });
});

// Функция показа вопроса
function showStep() {
    const data = quizQuestions[currentIdx];
    
    currentNumSign.innerText = currentIdx + 1;
    qText.innerText = data.q;
    optionsBox.innerHTML = ''; 
    
    data.answers.forEach(text => {
        const btn = document.createElement('button');
        btn.innerText = text;
        btn.classList.add('quiz-btn');
        btn.addEventListener('click', handleAnswerClick);
        optionsBox.appendChild(btn);
    });
}

// Переключение вопроса + Запуск Конфетти
function handleAnswerClick() {
    currentIdx++;
    if (currentIdx < quizQuestions.length) {
        showStep();
    } else {
        quizBlockElement.classList.add('hidden');
        resultBlockElement.classList.remove('hidden');
        celebrate(); 
    }
}

// Кнопка возврата в начало
restartBtn.addEventListener('click', () => {
    currentIdx = 0; 
    
    resultBlockElement.classList.add('hidden');
    quizBlockElement.classList.remove('hidden');
    quizSection.classList.add('hidden');
    triggerZone.classList.remove('hidden');
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ==========================================
// 2. ЖИВОЙ ТАЙМЕР ОТ ТВОЕГО ДНЯ РОЖДЕНИЯ
// ==========================================
const birthDate = new Date(2013, 4, 22, 10, 0, 0); 

function updateTimer() {
    const now = new Date();
    const difference = now - birthDate; 

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const timerElement = document.getElementById('live-timer');
    if (timerElement) {
        timerElement.innerText = `${days}дн. ${hours}ч. ${minutes}мин. ${seconds}сек.`;
    }
}
setInterval(updateTimer, 1000);
updateTimer();


// ==========================================
// 3. ЭФФЕКТ КОНФЕТТИ (ПРАЗДНИЧНЫЙ САЛЮТ)
// ==========================================
function celebrate() {
    const duration = 3 * 1000; 
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}


// ==========================================
// 4. КИБЕРПАНК РЕЖИМ (RGB ТРИГГЕР)
// ==========================================
const cyberBtn = document.getElementById('cyber-mode-btn');

cyberBtn.addEventListener('click', () => {
    // Включаем или выключаем класс rgb-mode у тега body
    document.body.classList.toggle('rgb-mode');
    
    // Меняем текст кнопки в зависимости от режима
    if(document.body.classList.contains('rgb-mode')) {
        cyberBtn.innerText = "Выключить RGB 🕶️";
    } else {
        cyberBtn.innerText = "Включить RGB 🕶️";
    }
});

// ==========================================
// 5. МОДАЛЬНОЕ ОКНО ДЛЯ КЛИКА ПО ФОТО
// ==========================================
const modal = document.getElementById('cyber-modal');
const modalImg = document.getElementById('modal-target-img');
const modalClose = document.querySelector('.modal-close');
const timelineImages = document.querySelectorAll('.zoomable-img');

// Перебираем все картинки с таймлайна и вешаем клик
timelineImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.remove('hidden'); // Показываем оверлей
        modalImg.src = img.src; // Перекидываем путь картинки во всплывающее окно
    });
});

// Закрытие окна при клике на крестик
modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Закрытие окна при клике на любое пустое место на затемнении
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// ==========================================
// УНИВЕРСАЛЬНОЕ ОТКРЫТИЕ КАРТИНОК ПО КЛИКУ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById('cyber-modal');
    const modalTargetImg = document.getElementById('modal-target-img');
    const modalCloseBtn = document.querySelector('.modal-close');
    
    // Ищем вообще все картинки в блоках с фото
    const images = document.querySelectorAll('.timeline-img img');

    images.forEach(img => {
        img.addEventListener('click', () => {
            if (modalOverlay && modalTargetImg) {
                modalOverlay.classList.remove('hidden');
                modalTargetImg.src = img.src; // Открываем ту картинку, на которую кликнули
            }
        });
    });

    // Закрытие на крестик
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
        });
    }

    // Закрытие при клике на пустое место вокруг фотки
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
            }
        });
    }
});