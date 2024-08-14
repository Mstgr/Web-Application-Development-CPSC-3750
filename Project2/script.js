/*
    Name: Michael Steiger
    Date: July 19th 2024
    Project 2: Collection App Phase 1
    File: script.js
*/

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');
    const statsContainer = document.getElementById('stats');
    const countryDetailsContainer = document.getElementById('country-details');
    // Add event listener to search form
    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const query = searchInput.value.trim();
            fetchCountries(query);
        });

        // Load previous search results if available
        const previousResults = localStorage.getItem('searchResults');
        const previousQuery = localStorage.getItem('searchQuery');
        if (previousResults && previousQuery) {
            searchInput.value = previousQuery;
            displayCountries(JSON.parse(previousResults));
        }
    }

    // Fetch country data from API call
    function fetchCountries(query) {
        const url = query ? `https://restcountries.com/v3.1/name/${query}` : 'https://restcountries.com/v3.1/all';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // show a max of 100 results
                const countries = query ? data : data.slice(0, 100);
                localStorage.setItem('searchResults', JSON.stringify(countries));
                localStorage.setItem('searchQuery', query);
                displayCountries(countries);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Show country details from API call
    function displayCountries(countries) {
        const table = document.createElement('table');
        const headerRow = table.insertRow();
        headerRow.insertCell().textContent = 'Name';
        headerRow.insertCell().textContent = 'Region';
        headerRow.insertCell().textContent = 'Population';

        countries.forEach(country => {
            const row = table.insertRow();
            const nameCell = row.insertCell();
            nameCell.innerHTML = `<a href="country.html?name=${country.name.common}">${country.name.common}</a>`;
            row.insertCell().textContent = country.region;
            row.insertCell().textContent = country.population.toLocaleString();
        });

        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);
    }
    // Load country details
    if (countryDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const countryName = urlParams.get('name');

        if (countryName) {
            fetch(`https://restcountries.com/v3.1/name/${countryName}`)
                .then(response => response.json())
                .then(data => {
                    const country = data[0];
                    showCountryDetails(country);
                })
                .catch(error => {
                    console.error('Error fetching country details:', error);
                });
        }
    }

    // Display more information about the country
    function showCountryDetails(country) {
        if (countryDetailsContainer) {
            // Display Country details
            const details = `
                <div class="left">
                    <h2>${country.name.common}</h2>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Area:</strong> ${country.area.toLocaleString()} km<sup>2</sup></p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                    <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                </div>
                <div class="right">
                    <p><strong>Flag:</strong></p>
                    <img src="${country.flags.png}" alt="Flag">
                    <p><strong>Coat of Arms:</strong></p>
                    <img src="${country.coatOfArms.png}" alt="Coat of Arms">
                </div> 
            `;
            countryDetailsContainer.innerHTML = details;

            // Add back button outside of the countryDetailsContainer
            const backButtonContainer = document.createElement('div');
            backButtonContainer.id = 'back-button';
            backButtonContainer.innerHTML = '<button onclick="goBack()">Back to Search</button>';
            countryDetailsContainer.parentElement.appendChild(backButtonContainer);
        } else {
            console.error('Country details container not found.');
        }
    }

    // Stats Page Logic
    if (statsContainer) {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                // Calculate some of the stats
                const totalCountries = data.length;
                const totalPopulation = data.reduce((sum, country) => sum + country.population, 0);
                const totalArea = data.reduce((sum, country) => sum + country.area, 0);
                const averagePopulation = (totalPopulation / totalCountries).toFixed(3);
                const averageArea = (totalArea / totalCountries).toFixed(2);

                // Display stats
                const stats = `
                    <div class="left">
                        <p><strong>Total Countries:</strong> ${totalCountries}</p>
                        <p><strong>Total Population: </strong>${totalPopulation.toLocaleString()}</p>
                        <p><strong>Total Area: </strong>${totalArea.toLocaleString()} sq km</p>
                        <p><strong>Population Density:</strong> ${(totalPopulation / totalArea).toFixed(4)} people per sq km</p>
                        <p><strong>Avg. Population: </strong>${averagePopulation} people per Country</p>
                        <p><strong>Avg. Area: </strong>${averageArea} sq km per Country</p>
                    </div>
                    <div class="right">
                        <p><strong>Most Populated Country: </strong>${data[0].name.common}</p>
                        <p><strong>Least Populated Country: </strong>${data[data.length - 1].name.common}</p>
                        <p><strong>Most Populated Region: </strong>${data[0].region}</p>
                        <p><strong>Least Populated Region: </strong>${data[data.length - 1].region}</p>
                        <p><strong>Most Populated Capital: </strong>${data[0].capital}</p>
                        <p><strong>Least Populated Capital: </strong>${data[data.length - 1].capital}</p>
                    </div>
                `;
                statsContainer.innerHTML = stats;
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
            });
    }
});
// Back button logic
function goBack() {
    window.history.back();
}

// Load the navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
});
