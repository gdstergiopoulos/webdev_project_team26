// Ensure that the HTML element with id "map" exists

document.addEventListener("DOMContentLoaded", function() {
    // Ensure that the HTML element with id "map" exists
    var mapElement = document.getElementById("map");
    if (!mapElement) {
        console.error("Element with id 'map' not found.");
        return;
    }

    var map = L.map("map").setView([38.29, 21.7946], 14);

    

    var marker = L.marker([38.28864841960415, 21.788658751750393]).addTo(map);
    marker.bindPopup("FAGADIKO").addEventListener(this.onclick, function() {
        marker.bindPopup("FAGADIKO").openPopup();});

        var layer1=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZ2RzdGVyZ2lvcG91bG9zIiwiYSI6ImNsdW1wdWxhYzB4ZmkyaWxuaDFjZjhoYnUifQ.M331BKPLXLd5K1jl6nFHcQ'
          }).addTo(map);
        
          var layer2=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            accessToken: "pk.eyJ1IjoiZ2RzdGVyZ2lvcG91bG9zIiwiYSI6ImNsdW1wdWxhYzB4ZmkyaWxuaDFjZjhoYnUifQ.M331BKPLXLd5K1jl6nFHcQ"
        }).addTo(map);
        
          var layer3=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/satellite-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZ2RzdGVyZ2lvcG91bG9zIiwiYSI6ImNsdW1wdWxhYzB4ZmkyaWxuaDFjZjhoYnUifQ.M331BKPLXLd5K1jl6nFHcQ'
          }).addTo(map); 

        baseMap = {
            "OpenStreetMap": layer2,
            "Mapbox Satellite": layer3,
            "Mapbox Streets": layer1,

        };

        L.control.layers(baseMap).addTo(map);
});

    



