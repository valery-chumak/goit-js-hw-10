export function fetchCountries(name) {
    const BASE_URL = "https://restcountries.com/v3.1";
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Error fetching data');
        })
        .catch(() => console.log('Error'));
}