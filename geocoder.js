const apiKey = "AIzaSyCJpNFFTo0pxttm2VOptCbLPS_nYI8YGcU";

function Location(add, lat, lng, mrk = null) {
  this.add = add;
  this.lat = lat;
  this.lng = lng;
  this.marker = mrk;
}

function addToLatlng(destAddress) {
  /* Get latitud and longitude from un-formatted address */

  let formatedAddress;
  let latitude;
  let longitude;
  let result;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${destAddress}&key=${apiKey}`;
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Hubo un error al hacer la solicitud a la API.");
      }
    })

    .then(data => {
      console.log(data)
      if (data.status === "OK") {
        formatedAddress = data.results[0].formatted_address;
        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng;

        return new Location(formatedAddress, latitude, longitude);
      } else {
        console.log("La dirección no fue encontrada");
      }
    })

    .catch(error => console.log(error));

}

function latlngToAddr(lat, lng) {
  /* Get formatted address from latitude and longitude */

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Hubo un error al hacer la solicitud a la API.");
      }
    })

    .then(data => {
      if (data.status === "OK") {
        const formattedAddress = data.results[0].formatted_address;
        return new Location(formattedAddress, lat, lng)
      } else {
        console.log("La dirección no fue encontrada");
      }
    })

    .catch(error => console.log(error));
}