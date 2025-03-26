import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  btnEl: document.querySelector('.buttonStart'),
  inputEl: document.querySelector('.input'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let differenceTime = null;
let timerId = null;
refs.btnEl.disabled = true;
refs.inputEl.disabled = false;
refs.btnEl.addEventListener('click', onBtnStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentData = new Date();
    if (currentData < selectedDates[0]) {
      refs.btnEl.disabled = false;
    } else {
      refs.btnEl.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      console.log('selectedDates[0]');
    }
  },
};

userSelectedDate = flatpickr('#datetime-picker', options);

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

function onBtnStart() {
  refs.btnEl.disabled = true;
  timerId = setInterval(() => {
    refs.inputEl.disabled = true;
    onChangeTime()
  }, 1000);
  
}

function onChangeTime(){
  const dataNow = Date.now();
  differenceTime = userSelectedDate.selectedDates[0] - dataNow;
  console.log(differenceTime);

  if(differenceTime > 0){
    const convertData = convertMs(differenceTime);
    console.log(convertData.days, convertData.hours, convertData.minutes, convertData.seconds);
  
    refs.daysEl.textContent = addLeadingZero(convertData.days);
    refs.minutesEl.textContent = addLeadingZero(convertData.minutes);
    refs.hoursEl.textContent = addLeadingZero(convertData.hours);
    refs.secondsEl.textContent = addLeadingZero(convertData.seconds);
  } else {
    refs.inputEl.disabled = false;
    refs.daysEl.textContent = "00";
    refs.minutesEl.textContent = "00";
    refs.hoursEl.textContent = "00";
    refs.secondsEl.textContent = "00";
  }
}

function addLeadingZero(value){
  //return String(value).padStart(2, 0);
  return value.toString().padStart(2, 0);
}