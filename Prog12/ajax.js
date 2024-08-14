/*
    Name: Michael Steiger
    Date: July 12th 2024
    Prog12: AJAX & PHP
    File: ajax.js
*/

// global variables to keep track of the request
// and the function to call when done
var ajaxreq = false, ajaxCallback;

// ajaxRequest: Sets up a request
function ajaxRequest(filename) {
    try {
        //make a new request object
        ajaxreq = new XMLHttpRequest();
    } catch (error) {
        return false;
    }
    ajaxreq.open("GET", filename);
    ajaxreq.onreadystatechange = ajaxResponse;
    ajaxreq.send(null);
}

// ajaxResponse: Waits for response and calls a function
function ajaxResponse() {
    if (ajaxreq.readyState != 4) return;
    if (ajaxreq.status == 200) {
        // if the request succeeded...
        // These logs were useful for debugging
        console.log("Response Text:", ajaxreq.responseText);
        console.log("Response Headers:", ajaxreq.getAllResponseHeaders());

        if (ajaxCallback) ajaxCallback();
    } else alert("Request failed: " + ajaxreq.statusText);
    return true;
}

// showResult: Handles the search and displaying of results
function showResult(str) {
    if (str.length == 0) {
        document.getElementById("list").innerHTML = "<li>[Search results will display here.]</li>";
        return;
    }
    ajaxCallback = function () {
        const xmlDoc = ajaxreq.responseXML;
        const states = xmlDoc.getElementsByTagName("state");
        let result = "";
        for (let i = 0; i < states.length; i++) {
            const state = states[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            const capital = states[i].getElementsByTagName("capital")[0].childNodes[0].nodeValue;
            result += "<li>" + state + ": " + capital + "</li>";
        }
        document.getElementById("list").innerHTML = result;
    };
    ajaxRequest("search.php?query=" + str);
}
