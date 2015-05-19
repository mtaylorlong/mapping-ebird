//Javascript file

cssOrig = '#mnwi{'+
        'marker-fill: #BD0026;'+
    '}';

var query = ""

function main() {
    cartodb.createVis('map', 'https://longx598.cartodb.com/api/v2/viz/996c50ba-fdd3-11e4-a076-0e4fddd5de28/viz.json', {
        center_lat: 44.98,
        center_lon: -93.26,
        zoom: 8,
    })
    .done(function(vis, layers) {
        // layer 0 is the base layer, layer 1 is cartodb layer
        var subLayer = layers[1].getSubLayer(0);
        var sql = new cartodb.SQL({ user: 'longx598' });
        //var query = "SELECT * FROM mnwi WHERE month = 5";
        subLayer.setSQL(query);
        subLayer.setCartoCSS(cssOrig);
        //subLayer.infowindow.set('template', myInfoTemplate);
        // createSelector(subLayer);
    })
    .error(function(err) {
        console.log(err);
    });
};
window.onload = main;