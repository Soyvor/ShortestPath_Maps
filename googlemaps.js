let map, directionsService, directionsRenderer;

function initMap() {
  // Create a new map object centered on the United States
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 4
  });

  // Create a new DirectionsService object to interact with the Google Maps API
  directionsService = new google.maps.DirectionsService();

  // Create a new DirectionsRenderer object to display the shortest route on the map
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

  // Attach an event listener to the search form
  document.querySelector('#search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values of the origin and destination input fields
    let origin = document.querySelector('#origin').value;
    let destination = document.querySelector('#destination').value;

    // Create a DirectionsRequest object and set the origin, destination, and travel mode
    let request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    };

    // Call the DirectionsService.route() method to calculate the shortest route
    directionsService.route(request, function(result, status) {
      if (status === 'OK') {
        // Display the shortest route on the map
        directionsRenderer.setDirections(result);

        // Get the distance of the shortest route and display it in the result section
        let distance = result.routes[0].legs[0].distance.text;
        document.querySelector('#distance').textContent = distance;
      } else {
        // Display an error message if the search was unsuccessful
        alert('Error: ' + status);
      }
    });
  });
}
