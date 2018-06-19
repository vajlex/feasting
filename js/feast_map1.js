/*
 * Custom configurations for Museum Feasting maps.
 * Lex Berman, 2017-2018
 */


 //adding base layers
    var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxleGZvcnR1bmEiLCJhIjoiZmJjNzA5YzVkZTkzZjU5MzRjNTA4NDkxNjI2MGJlYjgifQ.ZxI0M3tinJFDw7F5oQwseQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap<\/a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA<\/a>, Imagery © <a href="http://mapbox.com">Mapbox<\/a>',
        maxZoom: 18, opacity: 0.6,
        id: 'alexfortuna.mn58gf63',
        accessToken: 'pk.eyJ1IjoiYWxleGZvcnR1bmEiLCJhIjoiZmJjNzA5YzVkZTkzZjU5MzRjNTA4NDkxNjI2MGJlYjgifQ.ZxI0M3tinJFDw7F5oQwseQ'}),

        carto_light = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: 'code &raquo; <a href="http://www.dbr.nu/bio" target="_new">Lex Berman</a>',
            maxZoom: 19, opacity: 0.8}),

        natGeo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16, opacity: 0.6});
    


    // base maps for control
    var basemaps = {
        "Gray": carto_light,
//        "Natl Geo": natGeo,
        "Terrain": streets
    };


//  conventions
//  raw data variables abbreviated in lower case:  rgn1, rgn2, art1
//  layer group items with single letter caps:  R1, R2, A1


// get BRONZE layer data
var art_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_bronze_20180618.geojson';
var city_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_bronze_20180430.geojson';
var region_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_bronze_20171219.geojson';

// get IRON layer data
var art_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_iron_20180618.geojson';
var city_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_iron_20171222.geojson';
var region_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_iron_20171222.geojson';

// get GREECE PERSIAN layer data
var city_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_greece_20180430.geojson';
var region_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_greece_20180430.geojson';

// get ROMAN PARTHIAN layer data
var city_roman = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_roman_20180430.geojson';

// setup layergroup items
var ArtB = L.layerGroup();
var CitB = L.layerGroup();
var RegB = L.layerGroup();
var ArtI = L.layerGroup();
var CitI = L.layerGroup();
var RegI = L.layerGroup();
var CitG = L.layerGroup();
var RegG = L.layerGroup();
var CitR = L.layerGroup();


// tooltip and popup behavior
var popup = L.popup();  

function regionA(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-1"}).openTooltip();
}
function regionB(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-2"}).openTooltip();
}
function regionI(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-4"}).openTooltip();
}

function regionG(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-7"}).openTooltip();
}

function cityLabelB(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-3", offset: [0,20]}).openTooltip();
}
function cityLabelI(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-5", offset: [0,20]}).openTooltip();
}

function cityLabelG(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-6", offset: [0,20]}).openTooltip();
}

function cityLabelR(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-8", offset: [0,20]}).openTooltip();
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
      if(!feature.properties.Description){check3 += ""} 
      else {check3 += "<hr>" + feature.properties.Description  + "<br />"}
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
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: regionI
            }).addTo(RegI);
});

$.getJSON(region_greece , function (data) {
  var geojsonLayer10 = L.geoJson(data, {
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
              onEachFeature: regionG
            }).addTo(RegG);
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

$.getJSON(city_greece, function (data) {
  var geojsonLayer9 = L.geoJson(data, {
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
              onEachFeature: cityLabelG
            }).addTo(CitG);
});

$.getJSON(city_roman, function (data) {
  var geojsonLayer11 = L.geoJson(data, {
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
              onEachFeature: cityLabelR
            }).addTo(CitR);
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
              onEachFeature: artBronze
            }).addTo(ArtI);
});