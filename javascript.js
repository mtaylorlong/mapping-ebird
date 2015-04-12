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

cssOrig = '#county_merge {polygon-fill:'+brkcol3+';'+
            'polygon-opacity: 0.8;'+
            'line-color: #FFFFFF;'+
            'line-width: 0.5;'+
            'line-opacity: 0.5;}'+

            '#county_merge [yr_obstotal <='+yrbreak3+'] {'+
            'polygon-fill:'+brkcol3+';}'+

            '#county_merge [yr_obstotal <='+yrbreak2+'] {'+
            'polygon-fill:'+brkcol2+';}'+

            '#county_merge [yr_obstotal <='+yrbreak1+'] {'+
            'polygon-fill:'+brkcol1+';}';

// A horribly cumbersome way to set up my infowindow template
var myInfoTemplateX = [
    '<div class="cartodb-popup">',
        '<a href="#close" class="cartodb-popup-close-button close">x</a>',
        '<div class="cartodb-popup-content-wrapper">',
            '<div class="cartodb-popup-header">',
                '<h2>{{content.data.name}} Co., {{content.data.state}}</h2>',
            '</div>',
            '<div class="cartodb-popup-content">',
                '<p style="font-size:1.5em"><strong>{{content.data.yr_obstotal}}</strong> lists in 2013</p>',
                '<p style="font-size:1.5em">Lists by month:</p>',
                '<canvas id="myChart" width="190" height="110">',
                    '<script>',
                        'var obsdata = {',
                            'labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],',
                            'datasets: [',
                            '{   label: "My First dataset",',
                                'fillColor: "rgba(0,0,0,1)",',
                                'highlightFill: "rgba(0,0,0,0.5)",',
                                'data: [',
                                    '{{jan_obstotal}}, ',
                                    '{{feb_obstotal}}, ',
                                    '{{mar_obstotal}}, ',
                                    '{{apr_obstotal}}, ',
                                    '{{may_obstotal}}, ',
                                    '{{jun_obstotal}}, ',
                                    '{{jul_obstotal}}, ',
                                    '{{aug_obstotal}}, ',
                                    '{{sep_obstotal}}, ',
                                    '{{oct_obstotal}}, ',
                                    '{{nov_obstotal}}, ',
                                    '{{dec_obstotal}}, ',
                                ']',
                            '}]};',
                        'var ctx = document.getElementById("myChart").getContext("2d");',
                        'var myNewChart = new Chart(ctx).Bar(obsdata, {',
                            'showScale: true,',
                            'scaleShowLabels: false,',
                            'barShowStroke: false,',
                            'scaleShowGridLines: false,',
                            'barValueSpacing: 1',
                        '});',
                    '</scr'+'ipt>',
                '</canvas>',
            '</div>',
        '</div>',
        '<div class="cartodb-popup-tip-container"></div>',
    '</div>'
].join('');

// Second try at simpler info template
var myInfoTemplate = '\
    <div class="cartodb-popup">\
        <a href="#close" class="cartodb-popup-close-button close">x</a>\
        <div class="cartodb-popup-content-wrapper">\
            <div class="cartodb-popup-header">\
                <h2>{{content.data.name}} Co., {{content.data.state}}</h2>\
            </div>\
            <div class="cartodb-popup-content">\
                <p style="font-size:1.5em"><strong>{{content.data.yr_obstotal}}</strong> lists in 2013</p>\
                <p style="font-size:1.5em">Lists by month:</p>\
                <canvas id="myChart" width="190" height="110">\
                    <script>\
                        var obsdata = {\
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],\
                            datasets: [\
                            {   label: "My First dataset",\
                                fillColor: "rgba(0,0,0,1)",\
                                highlightFill: "rgba(0,0,0,0.5)",\
                                data: [\
                                    {{jan_obstotal}},\
                                    {{feb_obstotal}},\ 
                                    {{mar_obstotal}},\ 
                                    {{apr_obstotal}},\ 
                                    {{may_obstotal}},\ 
                                    {{jun_obstotal}},\ 
                                    {{jul_obstotal}},\ 
                                    {{aug_obstotal}},\ 
                                    {{sep_obstotal}},\ 
                                    {{oct_obstotal}},\ 
                                    {{nov_obstotal}},\
                                    {{dec_obstotal}},\
                                ]\
                            }]};\
                        var ctx = document.getElementById("myChart").getContext("2d");\
                        var myNewChart = new Chart(ctx).Bar(obsdata, {\
                            showScale: true,\
                            scaleShowLabels: false,\
                            barShowStroke: false,\
                            scaleShowGridLines: false,\
                            barValueSpacing: 1\
                        });\
                    </script>\
                </canvas>\
            </div>\
        </div>\
        <div class="cartodb-popup-tip-container"></div>\
    </div>';

console.log(myInfoTemplate);
console.log(myInfoTemplateX);

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

        if(month !== 'yr') {
            css = '#county_merge {polygon-fill:'+brkcol3+';'+
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
cartodb.createVis('map', 'http://mtaylorlong.cartodb.com/api/v2/viz/67031608-c044-11e4-bbeb-0e0c41326911/viz.json', {
    center_lat: 40,
    center_lon: -98,
    zoom: 4
})
.done(function(vis, layers) {
    // layer 0 is the base layer, layer 1 is cartodb layer
    var subLayer = layers[1].getSubLayer(0);
    var sql = new cartodb.SQL({ user: 'mtaylorlong' });
    var query = "SELECT * FROM county_merge WHERE state != 'AK' AND name IS NOT NULL";
    subLayer.setSQL(query);
    subLayer.setCartoCSS(cssOrig);
    subLayer.infowindow.set('template', myInfoTemplate);
    createSelector(subLayer);
})
.error(function(err) {
    console.log(err);
    });
};

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