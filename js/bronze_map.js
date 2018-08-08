/*
 * Custom configurations for Museum Feasting maps.
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


// get BRONZE layer data
var art_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_bronze_20180808_redo.geojson';
var city_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_bronze_20180430.geojson';
var region_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_bronze_20171219.geojson';

// setup layergroup items
var ArtB = L.layerGroup();
var RegB = L.layerGroup();
var CitB = L.layerGroup();

// tooltip and popup behavior
var popup = L.popup();  


function regionB(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-2"}).openTooltip();
}

function cityLabelB(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-3", offset: [0,20]}).openTooltip();
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

function artBronze(feature, layer) {
      var check1 = "";
      if(!feature.properties.Period){check1 += ""} 
      else {check1 += "Period: " + feature.properties.Period}
      var check2 = "";
      if(!feature.properties.Culture){check2 += ""} 
      else {check2 += "<br />Culture: " + feature.properties.Culture}
      var check3 = "";
      if(!feature.properties.Desc_text){check3 += ""} 
      else {check3 += "<hr>" + feature.properties.Desc_text  + "<br />"}
      var check4 = "";    
      if(!feature.properties.Credit){check4 += ""} 
      else {check4 += "<p><em>Image: " + feature.properties.Credit + "</em>"}

  layer.bindPopup(
    "<strong>" + feature.properties.Title + "</strong><hr>" + check1 + check2
    + check3
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
$.getJSON(region_bronze, function (data) {
  var geojsonLayer2 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  label = String(feature.properties.Title)
                  return new L.CircleMarker(latlng, {
                    radius: 0,
                    fillColor: "#000ff",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: regionB
            }).addTo(RegB);
});

// adding CITY objects
$.getJSON(city_bronze, function (data) {
  var geojsonLayer3 = L.geoJson(data, {
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
              onEachFeature: cityLabelB
            }).addTo(CitB);
});


// adding Artifact Point Objects
$.getJSON(art_bronze, function (data) {
  var geojsonLayer5 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  return new L.CircleMarker(latlng, {
                    radius: 6,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: artBronze
            }).addTo(ArtB);
});
