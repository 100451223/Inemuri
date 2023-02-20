// On searching on the input bar, add a marker and change the map's active view
// While the map view changes, the 'destination' only changes if there are no active markers!



/* Set the course when entering an address on the input bar and clicking on the search button */
document.getElementById("searchButton").addEventListener("click", () => {
  searchBar = document.getElementById("destInput");
  destUserInput = searchBar.value;
  searchBar.value = "";
  if(currentDestination != null) {
    mymap.removeLayer(currentDestination.mrk);
  }
  setCourse(destUserInput, mymap, started).then(resp => currentDestination = resp);
})

/* Set the course when entering an address on the input bar and clicking intro */
document.getElementById("destInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    destUserInput = event.target.value;
    event.target.value = "";
    if(currentDestination != null) {
      mymap.removeLayer(currentDestination.mrk);
    }
    setCourse(destUserInput, mymap, started).then(resp => currentDestination = resp);
  }
})

function setCourse(address, map, started) {
  // Add a marker to the location that the user inputted

  return addToLatlng(address).then(resp => {
    if (resp != undefined) {

      if (map != undefined) {
        map.setView([resp.lat, resp.lng], 20);

        if (!started) {
          let currentDest = resp;
          currentDest.mrk = addMarker(started, map, resp);

          const subtitle = document.getElementById("destination");
          subtitle.innerText = "Destino: " + resp.add;

          return currentDest;

        }
      }
    } else {
      showNotif("¡Lo sentimos! \nNo se ha encontrado la dirección que has introducido", "red")
      return;
    }
  })
}