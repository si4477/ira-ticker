/* Set the base value, base date, and growth per
   second for economic output */
const output_base = 958588998.39,
      output_base_date = new Date("2025-04-21T16:15:00"),
      output_growth = 120.19;

/* Set the base value, base date, and growth per
   second for job-days */
const job_days_base = 1166497,
      job_days_base_date = new Date("2025-04-21T16:15:00"),
      job_days_growth = 0.1468;

/* Set the base value, base date, and growth per
   second for employment */
const employment_base = 4666,
      employment_base_date = new Date("2025-04-21T16:15:00"),
      employment_growth = 0.00059;

/* Set the base value, base date, and growth per
   second for labor income */
const labor_income_base = 344788750.15,
      labor_income_base_date = new Date("2025-04-21T16:15:00"),
      labor_income_growth = 43.34;

// Function to update the IRA ticker
function updateIRATicker() {
  
  // Calculate time difference in seconds
  const current_time = new Date();
  const time_difference_seconds = Math.floor((current_time - output_base_date) / 1000);

  // Calculate economic output loss
  const output_loss = output_base + (time_difference_seconds * output_growth);

  // Calculate job-days loss
  const job_days_loss = job_days_base + (time_difference_seconds * job_days_growth);

  // Calculate employment loss
  const employment_loss = employment_base + (time_difference_seconds * employment_growth);

  // Calculate labor income loss
  const labor_income_loss = labor_income_base + (time_difference_seconds * labor_income_growth);

  // Update the HTML elements
  document.getElementById("output_loss").innerHTML = '$' + output_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  document.getElementById("job_days_loss").innerHTML = job_days_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  document.getElementById("employment_loss").innerHTML = employment_loss.toLocaleString('en-US', {minimumFractionDigits: 3, maximumFractionDigits: 3});
  document.getElementById("labor_income_loss").innerHTML = '$' + labor_income_loss.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  
}

// Initialize the ticker values
updateIRATicker();

// Update the ticker every second
setInterval(updateIRATicker, 1000);
