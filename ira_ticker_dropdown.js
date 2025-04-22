/* Create variables to hold the economic output
   base and growth rate values */
var output_base,
    output_rate;

/* Create variables to hold the employment base
   and growth rate values */
var employment_base,
    employment_rate;

/* Create variables to hold the labor income
   base and growth rate values */
var labor_income_base,
    labor_income_rate;

// Set the base date and time
var base_date_time = new Date("2025-04-21T16:15:00")

/* Create a variable to hold the ticker values
   to be loaded from the .csv below */
var ticker_values;

// Set the current agency to be "All"
var current_agency = "All";

/* Function to set the base and growth rate values for
   economic output, employment, and labor income depending
   on which agency has been selected */
function initializeIRATicker() {

    // Set the economic output base and growth rate values
    output_base = parseFloat(ticker_values.filter(d => (d.agency === current_agency && d.variable === "base"))[0]["economic_output"]);
    output_rate = parseFloat(ticker_values.filter(d => (d.agency === current_agency && d.variable === "rate"))[0]["economic_output"]);

    // Set the employment base and growth rate values
    employment_base = parseFloat(ticker_values.filter(d => (d.agency === current_agency && d.variable === "base"))[0]["employment"]);
    employment_rate = parseFloat(ticker_values.filter(d => (d.agency === current_agency && d.variable === "rate"))[0]["employment"]);

    // Set the labor income base and growth rate values
    labor_income_base = parseFloat(ticker_values.filter(d => (d.agency === current_agency && d.variable === "base"))[0]["labor_income"]);
    labor_income_rate = parseFloat(ticker_values.filter(d => (d.agency === current_agency && d.variable === "rate"))[0]["labor_income"]);

}

/* Function to update the IRA ticker given the base
   and growth rate values set above */
function updateIRATicker() {
  
  // Calculate time difference in seconds
  var current_date_time = new Date();
  var time_difference_seconds = Math.floor((current_date_time - base_date_time) / 1000);

  // Calculate economic output loss
  var output_loss = output_base + (time_difference_seconds * output_rate);

  // Calculate employment loss
  var employment_loss = employment_base + (time_difference_seconds * employment_rate);

  // Calculate labor income loss
  var labor_income_loss = labor_income_base + (time_difference_seconds * labor_income_rate);

  // Update the HTML elements
  document.getElementById("output_loss").innerHTML = '$' + output_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  document.getElementById("employment_loss").innerHTML = employment_loss.toLocaleString('en-US', {minimumFractionDigits: 3, maximumFractionDigits: 3}) + ' jobs';
  document.getElementById("labor_income_loss").innerHTML = '$' + labor_income_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

}

// Load the ticker values and initialize the visualization
d3.csv("./ticker_values.csv").then(function(loaded_data) {

  // Store the loaded ticker values
  ticker_values = loaded_data;

  /* Initialize the base and growth rate values for economic
     output, employment, and labor income */
  initializeIRATicker();

  // Update the current values within the visualizaton
  updateIRATicker();

  // Set the ticker to update every second
  setInterval(updateIRATicker, 1000);

  // Add the event listener for the drop-down menu
  document.getElementById('ticker_agency').addEventListener('change', function(event) {
    // Store the name of the agency that was selected
    current_agency = event.target.value;

    /* Re-initialize the base and growth rate values for
       economic output, employment, and labor income */
    initializeIRATicker();

    // Update the current values within the visualization
    updateIRATicker();
  });

});
