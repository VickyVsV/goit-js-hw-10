const urlAPI = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(
    `${urlAPI}${name}${filter}`
  ).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
