/* Set the base value, base date, and growth per
   second for economic output */
var output_base = 828785346.01,
    output_base_date = new Date("2025-04-06T12:00:00"),
    output_growth = 124.58;

/* Set the base value, base date, and growth per
   second for employment (jobs) */
var employment_base = 4010,
    employment_base_date = new Date("2025-04-06T12:00:00"),
    employment_growth = 0.0006;

/* Set the base value, base date, and growth per
   second for labor income */
var labor_income_base = 297259264.51,
    labor_income_base_date = new Date("2025-04-06T12:00:00"),
    labor_income_growth = 44.68;

// Function to update the IRA ticker
function updateIRATicker() {
  // Calculate time difference in seconds
  var current_time = new Date();
  var time_difference_seconds = Math.floor((current_time - output_base_date) / 1000);

  // Calculate economic output loss
  var output_loss = output_base + (time_difference_seconds * output_growth);

  // Calculate employment loss
  var employment_loss = employment_base + (time_difference_seconds * employment_growth);

  // Calculate labor income loss
  var labor_income_loss = labor_income_base + (time_difference_seconds * labor_income_growth);

  // Update the HTML elements
  document.getElementById("output_loss").innerHTML = '$' + output_loss.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById("employment_loss").innerHTML = employment_loss.toLocaleString('en-US', {minimumFractionDigits: 3, maximumFractionDigits: 3}) + ' jobs';
  document.getElementById("labor_income_loss").innerHTML = '$' + labor_income_loss.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// Initialize the ticker values
updateIRATicker();

// Update the ticker every second
setInterval(updateIRATicker, 1000);
