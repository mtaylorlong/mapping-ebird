//Javascript file

//LEAFLET STAMEN BASEMAP
// var map = new L.map('map').setView([40,-98], 4);

// var layer = new L.StamenTileLayer("toner-lite");
// map.addLayer(layer);

// CARTODB EASY MAP
// get the viz.json url from the CartoDB Editor
// - click on visualize
// - create new visualization
// - make visualization public
// - click on publish
// - go to API tab
// window.onload = function() {
//   cartodb.createVis('map', 'http://mtaylorlong.cartodb.com/api/v2/viz/81f31a2a-8021-11e4-8fc1-0e4fddd5de28/viz.json', {
//         cartodb_logo: false
//   });
// }

// Set Variables
var break1 = '0';
var break2 = '5';
var break3 = '10';

var yrbreak1 = '12';
var yrbreak2 = '60';
var yrbreak3 = '120';

// var brkcol1 = '#253494'; //dark blue
// var brkcol2 = '#41B6C4'; //turquoise
// var brkcol3 = '#FFFFCC'; //yellow

var brkcol1 = 'rgba(153,0,0,0.8)'; //red
var brkcol2 = 'rgba(204,183,0,0.8)'; //yellow
var brkcol3 = 'rgba(0,153,0,0.25)'; //green translucent

// cssOrig = '#mnwi {polygon-fill:'+brkcol3+';'+
//             'polygon-opacity: 0.8;'+
//             'line-color: #FFFFFF;'+
//             'line-width: 0.5;'+
//             'line-opacity: 0.5;}'+

//             '#mnwi [yr_obstotal <='+yrbreak3+'] {'+
//             'polygon-fill:'+brkcol3+';}'+

//             '#mnwi [yr_obstotal <='+yrbreak2+'] {'+
//             'polygon-fill:'+brkcol2+';}'+

//             '#mnwi [yr_obstotal <='+yrbreak1+'] {'+
//             'polygon-fill:'+brkcol1+';}';

cssOrig = '#mnwi{'+
        'polygon-fill: #BD0026;'+
        'polygon-opacity: 0.8;'+
        'line-color: #FFF;'+
        'line-width: 0.5;'+
        'line-opacity: 1;'+
    '}'+
    '#mnwi{'+
        '[points_density <= 0.00000390301300542847] { polygon-fill: #BD0026;  }'+
        '[points_density <= 1.32229980008806e-7] { polygon-fill: #F03B20;  }'+
        '[points_density <= 3.71432528114624e-8] { polygon-fill: #FD8D3C;  }'+
        '[points_density <= 1.70858962932727e-8] { polygon-fill: #FECC5C;  }'+
        '[points_density <= 5.94292044983399e-9] { polygon-fill: #FFFFB2;  }'+
    '}'
// create layer selector
function createSelector(layer) {
    //var sql = new cartodb.SQL({ user: 'mtaylorlong' });
    var $options = $('#month-filter li');
   
    $options.click(function(e) {
        // get the area of the selected layer
        var $li = $(e.target);
        var month = $li.attr('data');
    
        // deselect all and select the clicked one
        $options.removeClass('selected');
        $li.addClass('selected');
    
        // create query based on data from the layer
        //var query = "SELECT * FROM county_merge";
        var css = '';

        if(month !== '0') {
            css = '#mnwi {polygon-fill:'+brkcol3+';'+
            'polygon-opacity: 0.8;'+
            'line-color: #FFFFFF;'+
            'line-width: 0.5;'+
            'line-opacity: 0.5;}'+
            '#county_merge ['+month+'_obstotal <='+break3+'] {'+
            'polygon-fill:'+brkcol3+';}'+
            '#county_merge ['+month+'_obstotal <='+break2+'] {'+
            'polygon-fill:'+brkcol2+';}'+
            '#county_merge ['+month+'_obstotal <='+break1+'] {'+
            'polygon-fill:'+brkcol1+';}'
        } else {
            css = cssOrig   
        };

        // Reset the CartoCSS on the layer
        layer.setCartoCSS(css);
        });
};

//----------------------
// Create main function
//----------------------
function main() {
cartodb.createVis('map', 'https://longx598.cartodb.com/api/v2/viz/428f7696-fd97-11e4-8817-0e4fddd5de28/viz.json', {
    center_lat: 44.98,
    center_lon: -93.26,
    zoom: 8
})
.done(function(vis, layers) {
    // layer 0 is the base layer, layer 1 is cartodb layer
    // var subLayer = layers[1].getSubLayer(0);
    // var sql = new cartodb.SQL({ user: 'longx598' });
    // var query = "SELECT * FROM mnwi";
    //subLayer.setSQL(query);
    //subLayer.setCartoCSS(cssOrig);
    //subLayer.infowindow.set('template', myInfoTemplate);
    // createSelector(subLayer);
})
.error(function(err) {
    console.log(err);
    });
};

cartodb.createLayer(map, {
  user_name: 'longx598',
  type: 'cartodb',
  sublayers: [{
    sql: "SELECT * FROM mnwi WHERE month = 1",
    cartocss: '#mnwi {marker-fill: #B81609; marker-width: 15;}'
  }]
})
.addTo(map);

// Execute Main function
window.onload = main;

//-----------------------------------------------------
// create a layer with 1 sublayer
// function main() {

// }
// window.onload = main;

// cartodb.createLayer(map, {
//   user_name: 'mtaylorlong',
//   type: 'cartodb',
//   sublayers: [{
//     sql: "SELECT * FROM county",
//     cartocss: '#county {marker-fill: #F0F0F0;}'
//   }]
// })
// .addTo(map) // add the layer to our map which already contains 1 sublayer
// .done(function(layer) {

//   // create and add a new sublayer
//   layer.createSubLayer({
//     sql: "SELECT * FROM county limit 200",
//     cartocss: '#county {marker-fill: #F0F0F0;}'
//   });

//   // change the query for the first layer
//   // layer.getSubLayer(0).setSQL("SELECT * FROM #county limit 10");
// });