import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onCountrySearch, DEBOUNCE_DELAY)
);

function onCountrySearch(e) {
  e.preventDefault();
  let inputValues = refs.inputEl.value.trim();
  //console.log(inputValues);
  if (!inputValues) {
    resetRender();
    return;
  }

  fetchCountries(inputValues)
    .then(countries => {
      if (countries.length > 10) {
        specificNameInfo();
      } else if (countries.length <= 10 && countries.length > 1) {
        renderCountriesList(countries);
      } else if (countries.length === 1) {
        renderCountryCard(countries);
      } else {
        clearTemplate();
        errorWarn();
      }
    })
    .catch(error => console.log(error));
}

function renderCountriesList(element) {
  clearTemplate();
  const countryListTemplate = onCountriesListTemplate(element);
  refs.countryListEl.insertAdjacentHTML('beforeend', countryListTemplate);
}

function renderCountryCard(element) {
  clearTemplate();
  const countryCardTemplate = onCountryCardTemplete(element);
  refs.countryInfoEl.insertAdjacentHTML('beforeend', countryCardTemplate);
}

function onCountriesListTemplate(elements) {
  return elements
    .map(
      ({ name, flags }) => `
      <li class="country-list__item">
        <img
          src="${flags.svg}" 
          alt="${name.common}" 
          width="50" 
          height="30">
        <p class="country-list__title">${name.common}</p>
      </li>`
    )
    .join('');
}

function onCountryCardTemplete(element) {
  return element
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="country-info__container">
        <img src="${flags.svg}" alt="${name.common}" width="120" height="80" />
        <h1 class="country-info__title">${name.common}</h1>
      </div>
      <ul class="country-info__list">
        <li class="country-info__item">
          <span>Capital:</span>
          ${capital}
        </li>
        <li class="country-info__item">
          <span>Population:</span>
          ${population}
        </li>
        <li class="country-info__item">
          <span>Languages:</span>
          ${Object.values(languages)}
        </li>
      </ul>
  `
    )
    .join('');
}

function clearTemplate() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}

function specificNameInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function errorWarn() {
  Notify.failure(`Oops, there is no country with that name`);
}
