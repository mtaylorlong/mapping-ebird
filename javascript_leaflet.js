//Javascript file
window.onload = function() {

    // Instantiate new map object, place it in 'map' element
    // var map = new L.Map('map', {
    //     center: [44.98,-93.26], // Southern France
    //     zoom: 6
    // });

    // Put layer data into a JS object
    // var layerSource = {
    //     user_name: 'longx598',
    //     type: 'cartodb',
    //     sublayers: [{
    //         sql: "SELECT * FROM mnwi", // Basic point data
    //         cartocss: '#mnwi{marker-fill-opacity: 0.9; marker-line-color: #FFF; marker-line-width: 0.5; marker-line-opacity: 1; marker-placement: point; marker-type: ellipse; marker-width: 8; marker-fill: #B40903; marker-allow-overlap: true;}'
    //     }]
    // }

    // var layerURL = 'https://longx598.cartodb.com/api/v2/viz/996c50ba-fdd3-11e4-a076-0e4fddd5de28/viz.json';

    // For storing the sublayers
    // var sublayers = [];

    // Pull tiles from OpenStreetMap
    // L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    //       attribution: 'Stamen'
    //     }).addTo(map, 0);

    // Add data layer to your map
    // cartodb.createLayer(map,'http://longx598.cartodb.com/api/v2/viz/996c50ba-fdd3-11e4-a076-0e4fddd5de28/viz.json')
    //     .addTo(map)
    //     .done(function(layer) {
    //        for (var i = 0; i < layer.getSubLayerCount(); i++) {
    //            sublayers[i] = layer.getSubLayer(i);
    //            console.log("Congrats, you added sublayer #" + i + "!");
    //        } 
    //     })
    //     .error(function(err) {
    //         console.log("my error: " + err);
    //     });
    // };

    // cartodb.createLayer(map, 'https://longx598.cartodb.com/api/v2/viz/996c50ba-fdd3-11e4-a076-0e4fddd5de28/viz.json')
    //     .addTo(map)
    //     .on('done', function(layer) {
    //         //do stuff
    //     })
    // .on('error', function(err) {
    //     alert("some error occurred: " + err);
    // });
    cartodb.createVis('map', 'https://longx598.cartodb.com/api/v2/viz/996c50ba-fdd3-11e4-a076-0e4fddd5de28/viz.json');
}

}