import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchField = document.querySelector('input#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let searchedCountry;

searchField.addEventListener('input', debounce(onSearchFieldInput, DEBOUNCE_DELAY));

function onSearchFieldInput(event) {
    clear();
    
    searchedCountry = event.target.value.trim().toLowerCase();
    if (searchedCountry === '') {
      clear();
      return;
    }

    fetchCountries(searchedCountry)
    .then(insertContent)
    .catch(error => console.log(error));
}

function clear() {
  list.innerHTML = '';
  countryInfo.innerHTML = '';
}

function createListItem(item) {
    return `<li class="country-list__item">
    <img src="${item.flags.svg}">
    <h3>${item.name.official}</h3>
    </li>`;
}

function createCountryInfo(item) {
  return `<div class="box">
  <img src="${item.flags.svg}">
  <h1 class="country-name">${item.name.official}</h1>
  </div>
  <p><b>Capital:</b> ${item.capital}</p>
  <p><b>Population:</b> ${item.population}</p>
  <p><b>Languages:</b> ${Object.values(item.languages)}</p>`
}

const generateContentList = (array) => array.reduce((acc,item) => acc + createListItem(item),'');


const insertContent = (array) => {
  clear();
  if (array.length == 1) {
    const result = createCountryInfo(array[0]);
    countryInfo.insertAdjacentHTML("beforeend", result);
  }
  else if (array.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    return;
  }
  else if (array.length >= 2 || array.length <= 10) {
    const result = generateContentList(array);
    list.insertAdjacentHTML("beforeend", result);
  }
  else {
    Notiflix.Notify.failure("Oops, there is no country with that name");
  }
  
};