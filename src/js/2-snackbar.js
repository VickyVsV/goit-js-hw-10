// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  btnEl: document.querySelector('.btn-submit'),
  formEl: document.querySelector('.form'),
  radioEl: document.querySelectorAll("input[type='radio']"),
  delayEl: document.querySelector('.input-delay'),
};

let delayValueStr = '';
let delayValueNum = 0;
let radioValue = '';

// Функция для получения значения выбранной радиокнопки

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault(); // Предотвращаем отправку формы по умолчанию

  const selectedRadio = Array.from(refs.radioEl).find(radio => radio.checked);
  radioValue = selectedRadio.value; // Сохраняем значение выбранной радиокнопки
  console.log(`Selected radio value: ${radioValue}`);

  makePromise({
    value: delayValueStr,
    delay: delayValueNum,
    shouldResolve: radioValue,
  })
    .then(value =>
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
      })
    )
    .catch(error =>
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      })
    );
});

// Получение значения задержки
refs.delayEl.addEventListener('change', () => {
  delayValueStr = refs.delayEl.value;
  delayValueNum = Number(refs.delayEl.value);
  console.log(
    `Final delay value: ${delayValueStr} and Number ${delayValueNum}`
  );
});

// Promice
const makePromise = ({ value, delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((shouldResolve === "fulfilled")) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};
