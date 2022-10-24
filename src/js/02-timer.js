// Описан в документации
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const timerEl = document.querySelector('.timer');
const timerMark = document.querySelector('.timerok');
const timerStartBtn = document.querySelector('button');

let timeoutId = null;
let SetIntervalValue = false;
let countdownStartTime = 0;

function blockedBtn() {
  Notiflix.Block.standard('button', '', {
    width: '100px',
    height: '100px',
    backgroundColor: '#f8f8f8',
    cssAnimationDuration: 1881,
    svgSize: '20px',
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
      //   console.log('Закрыл модалку');
      clearInterval(timeoutId);
      SetIntervalValue = false;
    },
    function (selectedDates) {
      if (selectedDates[0].getTime() < new Date().getTime()) {
        // window.alert('Please choose a date in the future');
        Notiflix.Notify.warning('Please choose a date in the future');
        // Notiflix.Block.standard('button', '', {
        //   width: '100px',
        //   height: '100px',
        //   backgroundColor: '#f8f8f8',
        //   cssAnimationDuration: 1881,
        //   svgSize: '20px',
        // });
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
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
  timeoutId = setInterval(() => {
    SetIntervalValue = true;
    let changeTime = countdownStartTime - Date.now();
    if (changeTime <= 0) {
      clearInterval(changeTime);
      SetIntervalValue = false;
      return;
    }
    // console.log(changeTime);
    const objTime = convertMs(changeTime);
    changeMarkupTimer(objTime);
  }, 1000);
}
