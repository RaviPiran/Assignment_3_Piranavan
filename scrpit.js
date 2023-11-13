
// Dark mode

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  // Get the image element by its ID
  var image = document.getElementById('modeIcon');

  // Get the current source of the image
  var currentSrc = image.src;

  // Check the current source and change it based on the mode
  if (currentSrc.includes('moon(dark)')) {
      // If it's in dark mode, switch to light mode image
      image.src = './Assets/img/sun(dark).svg';
  } else {
      // If it's in light mode, switch to dark mode image
      image.src = './Assets/img/moon(dark).svg';
  }
}


//  fQAs
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// map
function initMap() {
  var options= {
    zoom:20,
    center:{lat:9.704851,lng:80.069853}
  }
  var googlemap = new google.maps.Map(document.getElementById("map"), options);
}

