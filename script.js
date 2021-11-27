var earth = new WE.map("earth_div", {
  center: [0, 0],
  zoom: 3,
  dragging: true,
  scrollWheelZoom: true,
});

WE.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(earth);

var points = [];
var lastmark;
var markerr;
function fetchupdate() {
  if (lastmark) {
    lastmark.removeFrom(earth);
  }
  fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((data) => {
      points.push(data.iss_position);
    })
    .then(() => {
      if (points.length != 0) {
        for (let index = 0; index < points.length; index++) {
          WE.marker(
            [points[index].latitude, points[index].longitude],
            "./marker.png",
            64,
            64
          ).addTo(earth);

          earth.setView([points[index].latitude, points[index].longitude]);
        }
        lastmark = WE.marker(
          [
            points[points.length - 1].latitude,
            points[points.length - 1].longitude,
          ],
          "./iss.png",
          64,
          64
        ).addTo(earth);
      }
    });
}

fetchupdate();

const interval = setInterval(function () {
  fetchupdate();
}, 10000);

//