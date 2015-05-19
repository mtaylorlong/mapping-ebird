// use your initial zoom size to set a base grid size
// it doesn't need to change on zoom or anything...
var zoom = 7; // init zoom
var gridSize = 2000;
var queryOrig = "WITH hgrid AS (SELECT ST_Transform(CDB_HexagonGrid(ST_Transform(ST_SetSRID(ST_Envelope(ST_Extent(the_geom_webmercator)::geometry),3857),42303), "+gridSize+"),3857) as cell FROM mnwi) "+
  "SELECT hgrid.cell as the_geom_webmercator, count(i.cartodb_id) as points, sum(i.complete) as complete, sum(i.complete)::REAL/count(i.cartodb_id) as complete_pct, count(DISTINCT i.observer_id) as observers, count(DISTINCT i.observer_id)::REAL/count(i.cartodb_id) as observers_pct, min(i.cartodb_id) as cartodb_id "+
  "FROM hgrid, (SELECT * FROM mnwi) i WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) GROUP BY hgrid.cell ";
var cartoCSSOrig = '#mnwi{ polygon-fill: #FFFFB2; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1; } '+
  '#mnwi [ points <= 4162] { polygon-fill: #BD0026; } '+
  '#mnwi [ points <= 427] { polygon-fill: #F03B20; } '+
  '#mnwi [ points <= 225] { polygon-fill: #FD8D3C; } '+
  '#mnwi [ points <= 120] { polygon-fill: #FECC5C; } '+
  '#mnwi [ points <= 55] { polygon-fill: #FFFFB2; } '

// add cartodb layer with one sublayer
  var sublayer;

// function createBinStyle(tablename, multiplier, ramp){
//   // setup SQL client
//   var sql = cartodb.SQL({ user: 'longx598' });
//   // get the extents of a new grid
//   sql.execute("WITH hgrid AS (SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(CDB_XYZ_Resolution("+zoom+")) * "+multiplier+"), CDB_XYZ_Resolution("+zoom+") * "+multiplier+") as cell), aggs AS (SELECT count(i.cartodb_id)/power( "+multiplier+" * CDB_XYZ_Resolution("+zoom+"), 2 ) as points_density FROM hgrid, (select * from "+tablename+") i where ST_Intersects(i.the_geom_webmercator, hgrid.cell) GROUP BY hgrid.cell) SELECT min(points_density) mn, max(points_density) mx FROM aggs")
//     .done(function(data){
//       // calculate the new steps for CartoCSS
//       var step = (data.rows[0].mx - data.rows[0].mn) / ramp.length;
//       if (step==0) step = 1;
//       var newstyle = "#"+tablename+"{polygon-opacity: 0.8; line-color: #FFF; line-width: 1; line-opacity: 1; ";
//       for(var i = data.rows[0].mx; i>data.rows[0].mn; i=i-step){
//         var fill = ramp.pop();
//         newstyle += "[points <= "+i+"] {polygon-fill: "+fill+";} ";
//       }
//       newstyle+= "}";
//       // Set new style
//       sublayer.setCartoCSS(cartoCSSOrig)
//     })

// }
function main() {

  // create leaflet map
  var map = L.map('map', { 
    zoomControl: true,
    center: [44.98, -93.26],
    zoom: zoom
  })

  // add a base layer
  L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Stamen'
  }).addTo(map);

  

  // !pxel_width! and !pixel_height! are provided by the tiler
  cartodb.createLayer(map, {
    user_name: 'longx598',
    type: 'cartodb',
    sublayers: [{
       //sql: 'WITH hgrid AS (SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 15), greatest(!pixel_width!,!pixel_height!) * 15) as cell) SELECT hgrid.cell as the_geom_webmercator, count(i.cartodb_id) as points_count, count(i.cartodb_id)/power( 15 * CDB_XYZ_Resolution('+zoom+'), 2 ) as points_density, 1 as cartodb_id FROM hgrid, (select * from mnwi) i where ST_Intersects(i.the_geom_webmercator, hgrid.cell) GROUP BY hgrid.cell',
       sql: queryOrig,
       //cartocss: '#mnwi{ polygon-fill: #BD0026; polygon-opacity: 0.8; line-color: #FFF; line-width: 1; line-opacity: 1; } #mnwi{ [points_density <= 2.03359309142757e-7] { polygon-fill: #BD0026; } [points_density <= 7.54008032072687e-8] { polygon-fill: #F03B20; } [points_density <= 5.49720141609644e-8] { polygon-fill: #FD8D3C; } [points_density <= 3.95575642442075e-8] { polygon-fill: #FECC5C; } [points_density <= 2.21002354228201e-8] { polygon-fill: #FFFFB2; } }',
       cartocss: cartoCSSOrig,
       interactivity: 'cartodb_id, points',
       infowindow: true
    }]
  })
  .addTo(map)
  .done(function(layer) {

    sublayer = layer.getSubLayer(0);
    sublayer.setInteraction(true);


    // var infobox = new cdb.geo.ui.InfoBox({
    //   width: 300,
    //   layer: layer,
    //   template: '<p>points: {{points_count}}</p>'
    // });

    // $("body").append(infobox.render().el);

    // setTimeout(function(){
    // // table we are visualizing
    // var tablename = "mnwi";
    // // the smaller the smaller the grid
    // var multiplier = 10; //note: originally it was 15
    // // our color ramp
    // var ramp = ['#BD0026','#F03B20','#FD8D3C','#FECC5C','#FFFFB2'];

    // // custom function
    // createBinStyle(tablename, multiplier, ramp)

    //   // Set new SQL (see "* 5" instead of "* 15" in original)
    // sublayer.setSQL("WITH hgrid AS (SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * "+multiplier+"), greatest(!pixel_width!,!pixel_height!) * "+multiplier+") as cell) SELECT hgrid.cell as the_geom_webmercator, count(i.cartodb_id) as points_count, count(i.cartodb_id)/power( "+multiplier+" * CDB_XYZ_Resolution("+zoom+"), 2 ) as points_density, 1 as cartodb_id FROM hgrid, (select * from mnwi) i where ST_Intersects(i.the_geom_webmercator, hgrid.cell) GROUP BY hgrid.cell");
    // },2000)
  });


}

      // you could use $(window).load(main);
      window.onload = main;