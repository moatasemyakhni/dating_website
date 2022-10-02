const baseUrl = "http://127.0.0.1:8000/api";
const countrySelector = document.getElementById('country-selector');
const citySelector = document.getElementById('city-selector');

const countries = `${baseUrl}/get_countries`;
axios.get(countries)
.then(response => {
    response.data.forEach(country => {
        createOption(countrySelector, country);
    });
});


const cities = `${baseUrl}/get_countries_and_cities`;
countrySelector.addEventListener('change', () => {
    removeOptions(citySelector);
    axios.get(cities)
    .then(response => {
        response.data.filter(location => location.country.includes(countrySelector.value)).forEach(city => {
            const sentence = `${city.city}, ${city.country}`;
            createOption(citySelector, sentence);
        });
    });
});


const createOption = (selector, value) => {
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.textContent = value;
    selector.appendChild(option);
}

const removeOptions = (selector) => {
    while(selector.options.length > 0)
        selector.remove(0);
}