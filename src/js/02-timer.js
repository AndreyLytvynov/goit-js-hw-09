// Описан в документации
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const timerEl = document.querySelector('.timer');
const timerMark = document.querySelector('.timerok');
const timerStartBtn = document.querySelector('button');

let timeoutId = null;
let SetIntervalValue = false;
let countdownStartTime = 0;

function blockedBtn() {
  Notiflix.Block.arrows('button', {
    querySelectorLimit: 200,
    className: 'notiflix-block',
    position: 'absolute',
    zindex: 1000,
    backgroundColor: 'white',
    rtl: false,
    fontFamily: 'Quicksand',
    cssAnimation: true,
    cssAnimationDuration: 10,
    svgSize: '20px',
    svgColor: 'rgb(146, 146, 44)',
    messageID: 'NotiflixLoadingMessage',
    messageFontSize: '15px',
    messageMaxLength: 34,
    messageColor: '#dcdcdc',
  });
}

blockedBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: [
    function () {
      clearInterval(timeoutId);
      SetIntervalValue = false;
    },
    function (selectedDates) {
      if (selectedDates[0].getTime() < new Date().getTime()) {
        // window.alert('Please choose a date in the future');
        Notiflix.Notify.warning('Please choose a date in the future', {
          timeout: 3000,
          position: 'center-center',
        });
        blockedBtn();

        return;
      }
      Notiflix.Block.remove('button');

      countdownStartTime = selectedDates[0].getTime();
      //   console.log(countdownStartTime);
    },
  ],
};

flatpickr(timerEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(numb) {
  return numb.toString().padStart(2, '00');
}

function changeMarkupTimer({ days, hours, minutes, seconds }) {
  timerMark.innerHTML = `
  <div class="timer timerok">
    <div class="field">
      <span class="value" data-days>${days}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-hours>${hours}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-minutes>${minutes}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
      <span class="value" data-seconds>${seconds}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
    `;
}

timerStartBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  if (SetIntervalValue) {
    return;
  }
  renderingOfMarkup();
  timeoutId = setInterval(renderingOfMarkup, 1000);
  blockedBtn();
}

function renderingOfMarkup() {
  SetIntervalValue = true;
  let changeTime = countdownStartTime - Date.now();
  if (changeTime <= 0) {
    clearInterval(changeTime);
    SetIntervalValue = false;
    return;
  }
  const objTime = convertMs(changeTime);
  changeMarkupTimer(objTime);
}
