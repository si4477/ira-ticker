/* Create variables to hold the economic output
   base and growth rate values */
let output_base, output_rate;

/* Create variables to hold the job-days base
   and growth rate values */
let job_days_base, job_days_rate;

/* Create variables to hold the labor income
   base and growth rate values */
let labor_income_base, labor_income_rate;

// Set the base date and time
const base_date_time = new Date("2025-04-21T16:15:00")

/* Create a variable to hold the ticker loss values
   to be loaded from the .csv below */
let ticker_loss_values;

/* Create a variable to hold the ticker at-risk
   values to be loaded from the .csv below */
let ticker_atrisk_values;

// Set the current agency to be "All"
let current_agency = "All";

/* Function to set the base and growth rate values for
   economic output, job-days, employment, and labor income
   depending on which agency has been selected; also sets
   the at-risk values below the drop-down depending on
   which agency has been selected */
function initializeIRATicker() {

  // Set the economic output base and growth rate values
  output_base = parseFloat(ticker_loss_values.filter(d => (d.agency === current_agency && d.variable === "base"))[0]["economic_output"]);
  output_rate = parseFloat(ticker_loss_values.filter(d => (d.agency === current_agency && d.variable === "rate"))[0]["economic_output"]);

  // Set the job-days base and growth rate values
  job_days_base = parseFloat(ticker_loss_values.filter(d => (d.agency === current_agency && d.variable === "base"))[0]["job_days"]);
  job_days_rate = parseFloat(ticker_loss_values.filter(d => (d.agency === current_agency && d.variable === "rate"))[0]["job_days"]);

  // Set the labor income base and growth rate values
  labor_income_base = parseFloat(ticker_loss_values.filter(d => (d.agency === current_agency && d.variable === "base"))[0]["labor_income"]);
  labor_income_rate = parseFloat(ticker_loss_values.filter(d => (d.agency === current_agency && d.variable === "rate"))[0]["labor_income"]);

  // Update the total funds at risk value
  let funds_atrisk = parseFloat(ticker_atrisk_values.filter(d => d.agency === current_agency)[0]["funds"]);
  document.getElementById("funds_atrisk").innerHTML = '$' + funds_atrisk.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

  // Update the total economic benefits at risk value
  let output_atrisk = parseFloat(ticker_atrisk_values.filter(d => d.agency === current_agency)[0]["economic_output"]);
  document.getElementById("output_atrisk").innerHTML = '$' + output_atrisk.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

  // Update the total work days at risk value
  let job_days_atrisk = parseFloat(ticker_atrisk_values.filter(d => d.agency === current_agency)[0]["job_days"]);
  document.getElementById("job_days_atrisk").innerHTML = job_days_atrisk.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

  // Update the total worker income at risk value
  let labor_income_atrisk = parseFloat(ticker_atrisk_values.filter(d => d.agency === current_agency)[0]["labor_income"]);
  document.getElementById("labor_income_atrisk").innerHTML = '$' + labor_income_atrisk.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

}

/* Function to update the IRA ticker given the base
   and growth rate values set above */
function updateIRATicker() {
  
  // Calculate time difference in seconds
  const current_date_time = new Date();
  const time_difference_seconds = Math.floor((current_date_time - base_date_time) / 1000);

  // Calculate economic output loss
  const output_loss = output_base + (time_difference_seconds * output_rate);

  // Calculate job-days loss
  const job_days_loss = job_days_base + (time_difference_seconds * job_days_rate);

  // Calculate labor income loss
  const labor_income_loss = labor_income_base + (time_difference_seconds * labor_income_rate);

  // Update the HTML elements
  document.getElementById("output_loss").innerHTML = '$' + output_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  document.getElementById("job_days_loss").innerHTML = job_days_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  document.getElementById("labor_income_loss").innerHTML = '$' + labor_income_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  
}

// Load the ticker loss values
d3.csv("./ticker_loss_values.csv").then(function(loaded_loss_data) {

  // Store the loaded ticker loss values
  ticker_loss_values = loaded_loss_data;

  // Load the ticker at-risk values
  d3.csv("./ticker_atrisk_values.csv").then(function(loaded_atrisk_data) {
   
    // Store the loaded ticker at-risk values
    ticker_atrisk_values = loaded_atrisk_data;

    /* Initialize the base and growth rate values for economic
       output, job-days, and labor income, and update the
       at-risk values below the agency drop-down */
    initializeIRATicker();

    // Update the current loss values within the visualizaton
    updateIRATicker();

    // Set the ticker to update every second
    setInterval(updateIRATicker, 1000);

    // Add the event listener for the drop-down menu
    document.getElementById('ticker_agency').addEventListener('change', function(event) {
         
      // Store the name of the agency that was selected
      current_agency = event.target.value;

      /* Re-initialize the base and growth rate values for economic
         output, job-days, and labor income, and update the at-risk
         values below the agency drop-down */
      initializeIRATicker();

      // Update the current loss values within the visualization
      updateIRATicker();
         
    });

  });

});
