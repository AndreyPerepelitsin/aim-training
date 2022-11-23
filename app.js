const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#00FF00', '#B22222', '#B22222', '#00FA9A', '#FF8C00', '#F0E68C', '#8A2BE2', '#7B68EE'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
        screens[1].classList.add('up');
    }
});
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decrreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}
function decrreaseTime() {
    if (time === 0) {
        finishGame();
        } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`;
}
function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}