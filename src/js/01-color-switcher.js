const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.body,
};
const NOTIFICATION_CHANGE = 1000;

refs.stopBtn.setAttribute('disabled', true);

let setIntervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', changeBgcBody);
refs.stopBtn.addEventListener('click', stopChangeBgc);

function changeBgcBody(e) {
  setIntervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, NOTIFICATION_CHANGE);
  e.target.setAttribute('disabled', true);
  e.target.nextElementSibling.removeAttribute('disabled');
}

function stopChangeBgc(e) {
  clearTimeout(setIntervalId);
  e.target.setAttribute('disabled', true);
  e.target.previousElementSibling.removeAttribute('disabled');
}
