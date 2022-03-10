function initMap() {
  const options = { zoom: 12, center: { lat: 52.52, lng: 13.405 } };
  const map = new google.maps.Map(document.getElementById("map"), options);
  const marker = new google.maps.Marker({
    position: { lat: 52.51317, lng: 13.44951 },
    map: map,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "{{party.name}}",
  });
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}
