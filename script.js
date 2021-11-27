var earth = new WE.map("earth_div", {
  center: [0, 0],
  zoom: 3,
  dragging: true,
  scrollWheelZoom: true,
  atmosphere: true,
  // sky: true,
});

WE.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(earth);

var lastmark;
var lastissicon;

function fetchupdate() {
  fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((data) => {
      if (lastmark) {
        // if it's not first fetch
        //remove last iss icon
        lastissicon.removeFrom(earth);
        earth.setView([
          data.iss_position.latitude,
          data.iss_position.longitude,
        ]);

        //add new red marker
        lastmark = WE.marker(
          [data.iss_position.latitude, data.iss_position.longitude],
          "./marker.png",
          64,
          64
        ).addTo(earth);

        //add iss icon for new location
        lastissicon = WE.marker(
          [data.iss_position.latitude, data.iss_position.longitude],
          "./iss.png",
          64,
          64
        ).addTo(earth);
      } else {
        // if it's first fetch
        earth.setView([
          data.iss_position.latitude,
          data.iss_position.longitude,
        ]);

        lastmark = WE.marker(
          [data.iss_position.latitude, data.iss_position.longitude],
          "./marker.png",
          64,
          64
        ).addTo(earth);

        lastissicon = WE.marker(
          [data.iss_position.latitude, data.iss_position.longitude],
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

// Clock code
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
startTime();
