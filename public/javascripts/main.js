window.addEventListener('load', () => {
  const ironhackBCN = {
    lat: 48.5131,
    lng: 2.1739
  };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: ironhackBCN
  });
});
function getBikes() {
  axios
    .get('/bikes/api')
    .then(response => {
      placeBikes(response.data.bikes);
    })
    .catch(error => {
      console.log(error);
    });
}
function placeBikes(bikes) {
  for (let bike of bikes) {
    const center = {
      lat: bike.location.coordinates[1],
      lng: bike.location.coordinates[0]
    };
    const pin = new google.maps.Marker({
      position: center,
      map: map,
      title: bike.name
    });
    markers.push(pin);
  }
}