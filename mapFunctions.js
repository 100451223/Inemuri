function centerMap(currentPos, map) {
  /* Center the map on the current position */

  map.setView([currentPos.lat, currentPos.lng], 20);
}

function getCoordDistance(posA, posB, map) {
  /* Get the distance between two coordinates */

  let posALatlng = L.latLng(posA.lat, posA.lng);
  let posBLatlng = L.latLng(posB.lat, posB.lng);
  return map.distance(posALatlng, posBLatlng)
}

function drawCurrentToDestPolyline(posA, posB, map) {
  /* Draw a polyline between two coordinates */

  let posALatlng = L.latLng(posA.lat, posA.lng);
  let posBLatlng = L.latLng(posB.lat, posB.lng);
  polyline = L.polyline([posALatlng, posBLatlng], { color: 'red' });
  map.addLayer(polyline);
}

function addMarker(started, map, loc) {
  /* Add a marker to the map */

  if (!started) {
    let mrk = L.marker([loc.lat, loc.lng]);
    map.addLayer(mrk);
    mrk.bindPopup(loc.add);

    started = !started;
    return mrk;
  }
  return null;
}

function setUpMap(pos) {
  /* Set up the map, centering it on the user's current location */

  mymap = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 20);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  }).addTo(mymap);

  // Change the users current location (*formatted*) that is being dispayed
  latlngToAddr(pos.coords.latitude, pos.coords.longitude).then(resp => {
    currentPosition = resp;
    currentPosition.mrk = addMarker(started, mymap, resp);
    document.getElementById("currentLocation").innerText = "Estas aquí:   " + resp.add;
  });

  // On click, add a marker and set the new destination
  // the 'destination' only changes if there are no active markers!

  mymap.on('click', function(clickLocation) {
    latlngToAddr(clickLocation.latlng.lat, clickLocation.latlng.lng).then(resp => {

      if (!started) {
        if (currentDestination != null) {
          mymap.removeLayer(currentDestination.mrk);
        }
        currentDestination = resp;
        currentDestination.mrk = addMarker(started, mymap, resp);

        const subtitle = document.getElementById("destination");
        subtitle.innerText = "Destino: " + resp.add;
      }

    });
  })
}