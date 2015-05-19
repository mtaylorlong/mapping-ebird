//Javascript file

window.onload = function () {

    // Instantiate new map object, place it in 'map' element
    var map_object = new L.Map('map', {
        center: [44.98,-93.26], // Southern France
        zoom: 6
    });

    // Put layer data into a JS object
    var layerSource = {
        user_name: 'longx598',
        type: 'cartodb',
        sublayers: [{
            sql: "SELECT * FROM mnwi", // Basic point data
            cartocss: '#mnwi{marker-fill-opacity: 0.9; marker-line-color: #FFF; marker-line-width: 0.5; marker-line-opacity: 1; marker-placement: point; marker-type: ellipse; marker-width: 8; marker-fill: #B40903; marker-allow-overlap: true;}'
        }]
    };

    // For storing the sublayers
    var sublayers = [];

    // Pull tiles from OpenStreetMap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_object);

    // Add data layer to your map
    cartodb.createLayer(map_object,layerSource)
        .addTo(map_object)
        .done(function(layer) {
           for (var i = 0; i < layer.getSubLayerCount(); i++) {
               sublayers[i] = layer.getSubLayer(i);
               alert("Congrats, you added sublayer #" + i + "!");
           } 
        })
        .error(function(err) {
            console.log("error: " + err);
        });
    };