/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: collection.js
*/
/* 
This file is responsible for displaying the collection.
It also has functions to add and remove countries from the collection.
*/
document.addEventListener('DOMContentLoaded', function () {
    fetch('get_collection.php')
        .then(response => response.json())
        .then(data => {
            const collectionContainer = document.getElementById('collection');
            if (data.success) {
                const table = document.createElement('table');
                const headerRow = table.insertRow();
                headerRow.insertCell().textContent = 'Name';
                headerRow.insertCell().textContent = 'Region';
                headerRow.insertCell().textContent = 'Population';
                headerRow.insertCell().textContent = 'Flag';
                headerRow.insertCell().textContent = 'Added At';
                headerRow.insertCell().textContent = 'Action';

                const fetchCountryDetails = (countryName) => {
                    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
                        .then(response => response.json())
                        .then(countryData => {
                            if (countryData && countryData.length > 0) {
                                const country = countryData[0];
                                return {
                                    name: country.name.common,
                                    region: country.region,
                                    population: country.population,
                                    flag: country.flags.png,
                                    countryName: countryName
                                };
                            } else {
                                throw new Error('Country not found');
                            }
                        });
                };

                const countryPromises = data.countries.map(item => fetchCountryDetails(item.country_name).then(country => ({...country, added_at: item.added_at})));

                Promise.all(countryPromises)
                    .then(countries => {
                        countries.forEach(country => {
                            const row = table.insertRow();
                            const nameCell = row.insertCell();
                            nameCell.innerHTML = `<a href="country.html?name=${country.name}">${country.name}</a>`;
                            row.insertCell().textContent = country.region;
                            row.insertCell().textContent = country.population.toLocaleString();
                            const flagCell = row.insertCell();
                            const img = document.createElement('img');
                            img.src = country.flag;
                            img.alt = `${country.name} flag`;
                            img.style.width = '50px';
                            img.style.height = '30px';
                            flagCell.appendChild(img);
                            row.insertCell().textContent = new Date(country.added_at).toLocaleString();

                            const actionCell = row.insertCell();
                            const removeButton = document.createElement('button');
                            removeButton.textContent = 'Remove Card';
                            removeButton.className = 'remove-card';
                            removeButton.dataset.country = country.countryName;
                            removeButton.addEventListener('click', function () {
                                removeFromCollection(country.countryName, row);
                            });
                            actionCell.appendChild(removeButton);
                        });
                        collectionContainer.innerHTML = '';
                        collectionContainer.appendChild(table);
                    })
                    .catch(error => {
                        console.error('Error loading country details:', error);
                        collectionContainer.textContent = 'Error loading collection.';
                    });
            } else {
                collectionContainer.textContent = 'Error loading collection.';
            }
        })
        .catch(error => {
            console.error('Error loading collection:', error);
            collectionContainer.textContent = 'Error loading collection.';
        });
});

function removeFromCollection(countryName, row) {
    fetch('remove_from_collection.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country: countryName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            row.remove();
            alert(`${countryName} has been removed from your collection.`);
        } else {
            alert(`Error: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error removing from collection:', error);
    });
}
