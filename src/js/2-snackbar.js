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

let delayValueNum = 0;
let radioValue = '';

// Функция для получения значения выбранной радиокнопки

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault(); // Предотвращаем отправку формы по умолчанию

  const selectedRadio = Array.from(refs.radioEl).find(radio => radio.checked);
  delayValueNum = Number(refs.delayEl.value);
  radioValue = selectedRadio.value; // Сохраняем значение выбранной радиокнопки

  makePromise({
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
/* refs.delayEl.addEventListener('change', () => {
  delayValueNum = Number(refs.delayEl.value);
}); */

// Promice
const makePromise = ({ delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};
