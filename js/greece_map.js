/*
 * Custom configurations for Museum Feasting maps.
 * Greece - Persian Age Map
 * Lex Berman, 2017-2018, www.dbr.nu
 */

 //adding base layers
    var 
        esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; ESRI.  &nbsp;  Map design: <a href="https://www.dbr.nu" target="_blank">Lex Berman</a>',
        maxZoom: 16, opacity: 0.8}),

        natGeo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16, opacity: 0.6})
    ;  

 // base layer select options
    var basemaps = {
        "Terrain": esri, 
        "Modern Map": natGeo,
    };

//  conventions
//  raw data variables abbreviated in lower case:  rgn1, rgn2, art1
//  layer group items with single letter caps:  R1, R2, A1


// get GREECE PERSIAN layer data
var art_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_greece_20180723.geojson';
var city_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_greece_20180430.geojson';
var region_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_greece_20180430.geojson';

// setup layergroup items
var ArtG = L.layerGroup();
var RegG = L.layerGroup();
var CitG = L.layerGroup();

// tooltip and popup behavior
var popup = L.popup();  


function regionG(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-7"}).openTooltip();
}

function cityLabelG(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-6", offset: [0,20]}).openTooltip();
}

function onEachFeature(feature, layer) {
      var check1 = "";
      if(!feature.properties.Period){check1 += ""} 
      else {check1 += "Period: " + feature.properties.Period}
      var check2 = "";
      if(!feature.properties.Culture){check2 += ""} 
      else {check2 += "<br />Culture: " + feature.properties.Culture}
      var check3 = "";
      if(!feature.properties.Description){check3 += ""} 
      else {check3 += "<hr>" + feature.properties.Description + "<br />"}
  layer.bindPopup(
    "<strong>" + feature.properties.Title + "</strong><hr>" + check1 + check2
    + check3     
    + "<br><img src='thumbnails/" 
    + feature.properties.Image_File + "'>", {maxWidth: "200px"}
    );
/*  drop mouseover for IOS ipad click to work
    layer.on('mouseover', function(e) {
    popup.setLatLng(e.latlng)
    this.openPopup();
});
*/
}

//function for Greece artifacts
function artGreece(feature, layer) {
      var check1 = "";
      if(!feature.properties.Period){check1 += ""} 
      else {check1 += "Period: " + feature.properties.Period}
      var check2 = "";
      if(!feature.properties.Culture){check2 += ""} 
      else {check2 += "<br />Culture: " + feature.properties.Culture}
      var check5 = "";
      if(!feature.properties.Location){check5 += ""} 
      else {check5 += "<br />Location: " + feature.properties.Location}
      var check3 = "";
      if(!feature.properties.Desc_text){check3 += ""} 
      else {check3 += "<hr>" + feature.properties.Desc_text  + "<br />"}
      var check4 = "";    
      if(!feature.properties.Credit){check4 += ""} 
      else {check4 += "<p><em>Image: " + feature.properties.Credit + "</em>"}

  layer.bindPopup(
    "<strong>" + feature.properties.Title + "</strong><hr>" + check1 + check2
    + check5 + check3
    + "<br><a href='800px/" + feature.properties.Image_File +  "' target='_blank' title='get larger image'><img src='thumbnails/" 
    + feature.properties.Image_File + "'></a>"
    + check4
    );
/*  drop mouseover for IOS ipad click to work
    layer.on('mouseover', function(e) {
    popup.setLatLng(e.latlng)
    this.openPopup();
});
*/
}

// adding REGION objects
$.getJSON(region_greece , function (data) {
  var geojsonLayer10 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  label = String(feature.properties.Title)
                  return new L.CircleMarker(latlng, {
                    radius: 0,
                    fillColor: "#0000ff",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: regionG
            }).addTo(RegG);
});

// adding CITY objects
$.getJSON(city_greece, function (data) {
  var geojsonLayer9 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  label = String(feature.properties.Title)
                  return new L.CircleMarker(latlng, {
                    radius: 2,
                    fillColor: "#0000ff",
                    color: "#000",
                    weight: 1,
                    opacity: 0,
                    fillOpacity: 0
                  }
                );
              },
              onEachFeature: cityLabelG
            }).addTo(CitG);
});


// adding Artifact Point Objects
$.getJSON(art_greece, function (data) {
  var geojsonLayer5 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  return new L.CircleMarker(latlng, {
                    radius: 6,
                    fillColor: "#0000FF",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: artGreece
            }).addTo(ArtG);
});

//  Label Collision see:  https://github.com/yakitoritabetai/Leaflet.LabelTextCollision
/*
var labelTextCollision = new L.LabelTextCollision({
  collisionFlg : true
});
*/