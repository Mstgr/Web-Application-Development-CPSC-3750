/*
  Name: Michael Steiger
  Date: July 13th 2024
  Prog13: AJAX & Handlebars
  File: script.js
*/
var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var petsContainer = document.getElementById("pets-container");
var btn = document.getElementById("btn");

// Here we make the AJAX call & everytime a button is clicked we make a new AJAX call and receive more data
btn.addEventListener("click", function () {
  var ourRequest = new XMLHttpRequest();
  // Here we get the data from the json file
  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  };

  // Here we handle connection errors
  ourRequest.onerror = function () {
    console.log("Connection error");
  };

  ourRequest.send();
  pageCounter++;
});

// Here we create the Handlebar to render the html
function renderHTML(data) {
  var rawTemplate = document.getElementById("petsTemplate").innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  var ourGeneratedHTML = compiledTemplate(data);

  animalContainer.insertAdjacentHTML('beforeend', ourGeneratedHTML);
}
