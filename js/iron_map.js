/*
 * Custom configurations for Museum Feasting maps.
 * Iron Age Map
 * Lex Berman, 2017-2018, www.dbr.nu
 */
 
 //adding base layers
    var 
        esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; ESRI. &nbsp;  Webmap code: <a href="https://www.dbr.nu" target="_blank">Lex Berman</a>',
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


// get IRON layer data
var art_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_iron_20180822.geojson';
var city_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_iron_20171222.geojson';
var region_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_iron_20180822.geojson';

// setup layergroup items
var ArtI = L.layerGroup();
var RegI = L.layerGroup();
var CitI = L.layerGroup();

// tooltip and popup behavior
var popup = L.popup();  


function regionI(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-4"}).openTooltip();
}


function cityLabelI(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-5", offset: [0,20]}).openTooltip();
}

function onEachFeature(feature, layer) {
      var check1 = "";
      if(!feature.properties.Period){check1 += ""} 
      else {check1 += "Period: " + feature.properties.Period}
      var check2 = "";
      if(!feature.properties.Culture){check2 += ""} 
      else {check2 += "<br />Culture: " + feature.properties.Culture}
      var check3 = "";
      if(!feature.properties.Desc_text){check3 += ""} 
      else {check3 += "<hr>" + feature.properties.Desc_text + "<br />"}
  layer.bindPopup(
    "<strong><font size=+1>" + feature.properties.Desc_title + "</font></strong><hr>" + check1 + check2
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

function artIron(feature, layer) {
      var check1 = "";
      if(!feature.properties.Period){check1 += ""} 
      else {check1 += "Period: " + feature.properties.Period}
      var check2 = "";
      if(!feature.properties.Culture){check2 += ""} 
      else {check2 += "<br />Culture: " + feature.properties.Culture}
      var check3 = "";
      if(!feature.properties.Desc_text){check3 += ""} 
      else {check3 += feature.properties.Desc_text  + "<br />"}
      var check4 = "";    
      if(!feature.properties.Credit){check4 += ""} 
      else {check4 += "<p><em>Image: " + feature.properties.Credit + "</em>"}

  layer.bindPopup(
    "<strong><font size=+1>" + feature.properties.Desc_title + "</font></strong><hr>" + check3
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
$.getJSON(region_iron , function (data) {
  var geojsonLayer8 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  label = String(feature.properties.Title)
                  return new L.CircleMarker(latlng, {
                    radius: 0,
                    fillColor: "#000ff",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                    text : 'Leaflet.LabelTextCollision!!!!!!!!'
                  }
                );
              },
              onEachFeature: regionI
            }).addTo(RegI);
});

// adding CITY objects
$.getJSON(city_iron, function (data) {
  var geojsonLayer7 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  label = String(feature.properties.Title)
                  return new L.CircleMarker(latlng, {
                    radius: 2,
                    fillColor: "#000ff",
                    color: "#000",
                    weight: 1,
                    opacity: 0,
                    fillOpacity: 0
                  }
                );
              },
              onEachFeature: cityLabelI
            }).addTo(CitI);
});


// adding Artifact Point Objects
$.getJSON(art_iron, function (data) {
  var geojsonLayer6 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  return new L.CircleMarker(latlng, {
                    radius: 6,
                    fillColor: "#686868",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: artIron
            }).addTo(ArtI);
});


//  Label Collision see:  https://github.com/yakitoritabetai/Leaflet.LabelTextCollision

var labelTextCollision = new L.LabelTextCollision({
  collisionFlg : true
});