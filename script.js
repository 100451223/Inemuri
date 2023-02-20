const nav = navigator.geolocation;
let mymap;
let started = false;

let clickCoords;
let destUserInput;

let currentPosition = null;
let currentDestination = null;
let polyline;

let enterNextPhase = true;
let phase1 = false;
let phase2 = false;

const phase1Area = 300;
const vibrationDur1 = 1000;
const vibrationInt1 = vibrationDur1 + 1000;

const phase2Area = 100;
const vibrationDur2 = 500;
const vibrationInt2 = vibrationDur2 + 1000;

const destReachedThreshold = 30;
const destReachedVibDur = 5000;
const destReachedInt = destReachedVibDur + 1000;

let intervalId = null;

function setDistance(distance) {
  let dist = document.getElementById("distance");
  dist.style.visibility = "visible"
  dist.innerText = "Distancia: " + Math.floor(distance) + " m";
}

function resetEverything() {
  mymap.removeLayer(currentDestination.mrk);
  mymap.removeLayer(polyline);
  currentDestination = null;
  started = false;
  phase1 = false;
  phase2 = false;
  enterNextPhase = true;
  if (intervalId != null)
    clearInterval(intervalId);
  intervalId = null;

  const subtitle = document.getElementById("destination");
  subtitle.innerText = "Destino: ";

  document.getElementById("distance").style.visibility = "hidden";

  centerMap(currentPosition, mymap);
  document.getElementById("car").src = "img/laytonmobile.png";
}

nav.getCurrentPosition(setUpMap);

function startVibration(distance) {

  if (distance < phase1Area && enterNextPhase && !phase1) {
    phase1 = true;
    enterNextPhase = false;

    window.navigator.vibrate(0)
    intervalId = setInterval(() => {
      window.navigator.vibrate(vibrationDur1);
    }, vibrationInt1);

    setTimeout(() => {
      clearInterval(intervalId);
      enterNextPhase = true;
    }, 4 * vibrationInt1);

  } else if (distance < phase2Area && enterNextPhase && !phase2) {
    phase2 = true;
    enterNextPhase = false;

    window.navigator.vibrate(0)
    intervalId = setInterval(() => {
      window.navigator.vibrate(vibrationDur2);
    }, vibrationInt2);

    setTimeout(() => {
      clearInterval(intervalId);
      enterNextPhase = true;
    }, 8 * vibrationInt2);

  } else if (distance <= destReachedThreshold && enterNextPhase && phase1 && phase2) {
    enterNextPhase = false;
    window.navigator.vibrate(0);
    window.navigator.vibrate(destReachedVibDur);
    playSoundEffect("sounds/finish.mp3")
    resetEverything();
  }
}

nav.watchPosition((resp) => {
  /* If it is STARTED, update the map's current view AND the user's marker */

  latlngToAddr(resp.coords.latitude, resp.coords.longitude).then(resp => {
    if (started) {
      mymap.setView([currentPosition.lat, currentPosition.lng], 20);
      mymap.removeLayer(currentPosition.mrk)
      currentPosition = resp;
      currentPosition.mrk = addMarker(false, mymap, resp); // <-- chapuza addMarker(-> false <-, ..., ...)

      mymap.removeLayer(polyline);
      drawCurrentToDestPolyline(currentPosition, currentDestination, mymap);

    }
    document.getElementById("currentLocation").innerText = "Estas aquí:   " + currentPosition.add;

    if (started) {
      let distanceToDest = getCoordDistance(currentPosition, currentDestination, mymap);
      setDistance(distanceToDest);
      startVibration(distanceToDest);
    }
  }
  )
});

document.getElementById("reset").addEventListener("click", () => {
  if (mymap != undefined && currentDestination != null) {
    resetEverything()
    window.navigator.vibrate([0]);

    playSoundEffect("sounds/reset.mp3");

  } else {
    showNotif("Error", "No destination is set!", "red");
  }
})

document.getElementById("start").addEventListener("click", () => {
  if (currentDestination != null) {

    started = true;
    drawCurrentToDestPolyline(currentPosition, currentDestination, mymap);
    centerMap(currentPosition, mymap);

    playSoundEffect("sounds/start.mp3");

    let distance = getCoordDistance(currentPosition, currentDestination, mymap)
    setDistance(distance)


    document.getElementById("car").src = "img/laytonmobile.gif"
  } else {
    showNotif("Error", "Please, choose a location", "red")
  }
})

document.getElementById("centerButton").addEventListener("click", () => {
  centerMap(currentPosition, mymap);
})