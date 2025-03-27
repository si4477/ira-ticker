/* Set the base value, base date, and growth rate per
   second for output */
var output_base = 100,
    output_base_date = new Date("2025-03-26T20:00:00"),
    output_growth = 0.0001;

/* Set the base value and growth rate per
   second for employment */
var employment_base = 200,
    employment_base_date = new Date("2025-03-26T20:00:00"),
    employment_growth = 0.0001;

// Function to update the IRA ticker
function updateIRATicker() {
  // Calculate time difference in seconds
  var current_time = new Date();
  var time_difference_seconds = Math.floor((current_time - output_base_date) / 1000);

  // Calculate output loss
  var output_loss = output_base * (1 + output_growth) ** time_difference_seconds;

  // Calculate employment loss
  var employment_loss = employment_base * (1 + employment_growth) ** time_difference_seconds;

  // Update the HTML elements
  document.getElementById("output_loss").innerHTML = '$' +output_loss.toFixed(2);
  document.getElementById("employment_loss").innerHTML = employment_loss.toFixed(0) + ' jobs';
}

// Initialize the ticker values
updateIRATicker();

// Update the ticker every second
setInterval(updateIRATicker, 1000);
