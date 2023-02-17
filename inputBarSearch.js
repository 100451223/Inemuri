// On searching on the input bar, add a marker and change the map's active view
// While the map view changes, the 'destination' only changes if there are no active markers!

document.getElementById("destInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    destUserInput = event.target.value;
    event.target.value = "";
    setCourse();
  }
})

document.getElementById("searchButton").addEventListener("click", () => {
  searchBar = document.getElementById("destInput");
  destUserInput = searchBar.value;
  searchBar.value = "";
  setCourse();
})

function setCourse() {
  // Add a marker to the location that the user inputted

  getDestCoord(destUserInput).then(resp => {
    if (resp != undefined) {

      if (mymap != undefined) {
        mymap.setView([resp.lat, resp.lng], 20);

        if (!started && currentDestination == null) {
          currentDestination = resp;
          currentDestination.mrk = addMarker(started, mymap, resp);

          const subtitle = document.getElementById("destination");
          subtitle.innerText = "Destino: " + resp.add;
        }
      }
    } else {
      alert("¡Lo siento! No se ha encontrado la dirección que has introducido...");
      return;
    }
  })
}