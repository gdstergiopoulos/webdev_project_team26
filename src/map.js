// Ensure that the HTML element with id "map" exists

document.addEventListener("DOMContentLoaded", function() {
    // Ensure that the HTML element with id "map" exists
    var mapElement = document.getElementById("map");
    if (!mapElement) {
        console.error("Element with id 'map' not found.");
        return;
    }

    var map = L.map("map").setView([38.2866, 21.7946], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        accessToken: "pk.eyJ1IjoiZ2RzdGVyZ2lvcG91bG9zIiwiYSI6ImNsdW1wdWxhYzB4ZmkyaWxuaDFjZjhoYnUifQ.M331BKPLXLd5K1jl6nFHcQ"
    }).addTo(map);

    var marker = L.marker([38.28864841960415, 21.788658751750393]).addTo(map);
    marker.bindPopup("FAGADIKO").openPopup();
});

    



