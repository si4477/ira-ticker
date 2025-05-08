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

  // Update the total funding at risk value
  let funding_atrisk = parseFloat(ticker_atrisk_values.filter(d => d.agency === current_agency)[0]["funding"]);
  document.getElementById("funding_atrisk").innerHTML = '$' + funding_atrisk.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

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

  // Load the ticker at-risk values
  d3.csv("./ticker_atrisk_values.csv").then(function(loaded_atrisk_data) {
   
    // Store the loaded ticker at-risk values
    ticker_atrisk_values = loaded_atrisk_data;

    /* Initialize the base and growth rate values for economic
       output, job-days, and labor income, and update the
       at-risk values below the agency drop-down */
    initializeIRATicker();



    // Add the event listener for the drop-down menu
    document.getElementById('ticker_agency').addEventListener('change', function(event) {
         
      // Store the name of the agency that was selected
      current_agency = event.target.value;

      /* Re-initialize the base and growth rate values for economic
         output, job-days, and labor income, and update the at-risk
         values below the agency drop-down */
      initializeIRATicker();
         
    });

  });

