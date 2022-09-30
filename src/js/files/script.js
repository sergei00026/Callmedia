import { isMobile } from "./functions.js";
import { flsModules } from "./modules.js";

// Текущая дата
const now = new Date();

// Установка полуночи для указанной даты. Возвращает Дедлайн
function setMidNight(date) {
	let midNight = date;
	midNight.setHours(24);
	midNight.setMinutes(0);
	midNight.setSeconds(0);

	const deadline = midNight;

	return deadline;
}

// Функция для вычисления значений таймера: аргумент - Дедлайн	
function getTimeRemaining(endTime) {
	// Разница в миллисекундах между Дедлайном и текущей датой
	const t = Date.parse(endTime) - Date.parse(new Date());

	let hours,
		minutes,
		seconds,
		hours2,
		minutes2,
		seconds2;

	if (t <= 0) {
		hours = 0;
		minutes = 0;
		seconds = 0;
		hours2 = 0;
		minutes2 = 0;
		seconds2 = 0;
	}
	else {
		hours = Math.floor(t / (1000 * 60 * 60) % 24); // ОСТАТОК часов
		minutes = Math.floor(t / (1000 * 60) % 60); // ОСТАТОК минут
		seconds = Math.floor(t / 1000 % 60); // ОСТАТОК секунд
		hours2 = Math.floor(t / (1000 * 60 * 60) % 24); // ОСТАТОК часов
		minutes2 = Math.floor(t / (1000 * 60) % 60); // ОСТАТОК минут
		seconds2 = Math.floor(t / 1000 % 60); // ОСТАТОК секунд
	}

	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds,
		'hours2': hours2,
		'minutes2': minutes2,
		'seconds2': seconds2
	};

}

// Добавляется 0 к числу, если оно меньше 10
function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	}
	else {
		return num;
	}
}

// Установка времени и обновление Таймера
function setClock(selector, endTime) {

	// получаем доступ к блоку "Таймер" и дочерним элементам
	const timer = document.querySelector('.main-page__timer'), // '.timer'
		hours = timer.querySelector('.main-page__hours-num'),
		minutes = timer.querySelector('.main-page__minutes-num'),
		seconds = timer.querySelector('.main-page__seconds-num'),
		timer2 = document.querySelector('.main-page__timer2'), // '.timer'
		hours2 = timer2.querySelector('.main-page__hours-num2'),
		minutes2 = timer2.querySelector('.main-page__minutes-num2'),
		seconds2 = timer2.querySelector('.main-page__seconds-num2'),

		// Функция обновления таймера запускается каждую секунду
		timeInterval = setInterval(updateClock, 1000);

	updateClock(); // Функция первый раз запускается через 1 секунду - см. код выше
	// Поэтому в 1-ю секунду на странице отображаются значения таймера из верстки.
	// Чтобы этого не было - функция updateClock вызывается здесь

	// Функция обновления таймера
	function updateClock() {
		// Заносим в переменную t объект, который возвращает функция getTimeRemaining
		const t = getTimeRemaining(endTime);

		// Вставка значений на страницу
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);
		hours2.innerHTML = getZero(t.hours2);
		minutes2.innerHTML = getZero(t.minutes2);
		seconds2.innerHTML = getZero(t.seconds2);

		// Если разница в миллисекундах между Дедлайном и текущей датой <= 0
		// Функция обновления таймера - СТОП
		if (t.total <= 0) {
			clearInterval(timeInterval);
		}
	}

}

setClock('.timer', setMidNight(now));


// Появление окон по времени
const purchasesBuyButton = document.querySelectorAll('.purchases__buy > button');
const purchasesBuy = document.querySelectorAll('.purchases__buy');

purchasesBuyButton.forEach((element, index) => {
	element.addEventListener("click", function (e) {
		purchasesBuy[index].classList.add('_active-look')
		purchasesBuy[index].classList.remove('_active-view')
	});
});

function show_item() {
	const index = Math.floor(Math.random() * purchasesBuy.length);
	const visible_purchasesBuy = [];
	const purchases = document.querySelector('.purchases');

	if (!visible_purchasesBuy.find(key => key === index)) {

		purchasesBuy[index].style.display = 'flex';
		purchasesBuy[index].style.top = 0;

		return;
	}

	show_item();

}

function close_item() {
	const index = Math.floor(Math.random() * purchasesBuy.length);

	purchasesBuy[index].style.display = 'none';
}

setInterval(() => {
	show_item();
}, 10000);

setInterval(() => {
	close_item();
}, 40000);