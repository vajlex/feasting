/*
 * Custom configurations for Museum Feasting maps.
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


// get BRONZE layer data
var art_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_bronze_20180822.geojson';
var city_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_bronze_20180430.geojson';
var region_bronze = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_bronze_20180822.geojson';

// get IRON layer data
var art_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_iron_20180822.geojson';
var city_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_iron_20171222.geojson';
var region_iron = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_iron_20180822.geojson';

// get GREECE PERSIAN layer data
var art_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_greece_20180822.geojson';
var city_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_greece_20180430.geojson';
var region_greece = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_greece_20180822.geojson';

// get ROMAN PARTHIAN layer data
var art_roman = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_roman_20180822.geojson'; 
var city_roman = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_roman_20180430.geojson';
var region_roman = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_roman_20180822.geojson';

// get SASSANINAN layer data
var art_sassanian = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_sassanian_20180823.geojson';
var region_sassanian = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_sassasian_20180823_B.geojson';

// get LATER layer data
var art_later = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/art_later_20180823.geojson';
var city_later = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/city_later_20180822.geojson';
var region_later = 'https://raw.githubusercontent.com/vajlex/feasting/master/data/region_later_20180822.geojson';


// setup layergroup items
var ArtB = L.layerGroup();
var CitB = L.layerGroup();
var RegB = L.layerGroup();
var ArtI = L.layerGroup();
var CitI = L.layerGroup();
var RegI = L.layerGroup();
var ArtG = L.layerGroup();
var RegG = L.layerGroup();
var CitG = L.layerGroup();
var ArtR = L.layerGroup();
var RegR = L.layerGroup();
var CitR = L.layerGroup();
var ArtS = L.layerGroup();
var RegS = L.layerGroup();
var ArtL = L.layerGroup();
var RegL = L.layerGroup();
var CitL = L.layerGroup();


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

function regionR(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-7"}).openTooltip();
}

function regionS(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-11"}).openTooltip();
}

function regionL(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-4"}).openTooltip();
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

function cityLabelL(feature, layer) {
  layer.bindTooltip(label, {permanent: true, direction: "center", className: "label-12", offset: [0,20]}).openTooltip();
}

function artGeneric(feature, layer) {
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
$.getJSON(region_bronze, function (data) {
  var geojsonLayer1 = L.geoJson(data, {
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
              onEachFeature: regionI
            }).addTo(RegI);
});

$.getJSON(region_greece , function (data) {
  var geojsonLayer3 = L.geoJson(data, {
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

$.getJSON(region_roman , function (data) {
  var geojsonLayer4 = L.geoJson(data, {
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
              onEachFeature: regionR
            }).addTo(RegR);
});

$.getJSON(region_sassanian , function (data) {
  var geojsonLayer5 = L.geoJson(data, {
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
              onEachFeature: regionS
            }).addTo(RegS);
});

$.getJSON(region_later , function (data) {
  var geojsonLayer6 = L.geoJson(data, {
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
              onEachFeature: regionL
            }).addTo(RegL);
});

// adding CITY objects
$.getJSON(city_bronze, function (data) {
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
              onEachFeature: cityLabelB
            }).addTo(CitB);
});

$.getJSON(city_iron, function (data) {
  var geojsonLayer8 = L.geoJson(data, {
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
  var geojsonLayer10 = L.geoJson(data, {
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

$.getJSON(city_later, function (data) {
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
              onEachFeature: cityLabelL
            }).addTo(CitL);
});

// adding Artifact Point Objects
$.getJSON(art_bronze, function (data) {
  var geojsonLayer12 = L.geoJson(data, {
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
              onEachFeature: artGeneric
            }).addTo(ArtB);
});

$.getJSON(art_iron, function (data) {
  var geojsonLayer13 = L.geoJson(data, {
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
              onEachFeature: artGeneric
            }).addTo(ArtI);
});

$.getJSON(art_greece, function (data) {
  var geojsonLayer14 = L.geoJson(data, {
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
              onEachFeature: artGeneric
            }).addTo(ArtG);
});

$.getJSON(art_roman, function (data) {
  var geojsonLayer15 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  return new L.CircleMarker(latlng, {
                    radius: 6,
                    fillColor: "#008000",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: artGeneric
            }).addTo(ArtR);
});

$.getJSON(art_sassanian, function (data) {
  var geojsonLayer16 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  return new L.CircleMarker(latlng, {
                    radius: 6,
                    fillColor: "#CC0033",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: artGeneric
            }).addTo(ArtS);
});

$.getJSON(art_later, function (data) {
  var geojsonLayer17 = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  return new L.CircleMarker(latlng, {
                    radius: 6,
                    fillColor: "#FFFFFF",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }
                );
              },
              onEachFeature: artGeneric
            }).addTo(ArtL);
});
