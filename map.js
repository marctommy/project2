// 1. Initialize GeoCoder
const geocoder = new google.maps.Geocoder();

// 2. The text address that you want to convert to coordinates
let address = "Plaza de Bolívar de Bogotá";

// 3. Obtain coordinates from the API
geocoder.geocode({ address: address }, (results, status) => {
  if (status === "OK") {
    // Display response in the console
    console.log(results);
  } else {
    alert("Geocode error: " + status);
  }
});

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {
      lat: 52.52,
      lng: 13.405,
    },
  });

  // 2. Initialize the GeoCoder API
  const geocoder = new google.maps.Geocoder();

  // 3. So when the user clicks on the submit BTN, geocode the given address if possible
  document.getElementById("submit-btn").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;

  // Search for the address with the API
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      // Display response in the console
      console.log(results);

      // Set the location of the map obtained by the API
      resultsMap.setCenter(results[0].geometry.location);

      // Add the marker with the obtained location
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode error: " + status);
    }
  });
}
