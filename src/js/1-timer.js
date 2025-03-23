import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputEl: document.querySelector(".input"),
  btnEl: document.querySelector(".button"),
}

let userSelectedDate;

refs.btnEl.addEventListener('click', () => console.log("START"));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);