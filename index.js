const claimButton = document.getElementById("claim_button");
const formInputs = Array.from(document.querySelectorAll("form input"));
const formLabels = Array.from(document.querySelectorAll("form label"));
const errorImages = Array.from(document.querySelectorAll("form img"));

claimButton.addEventListener("click", (e) => {
  e.preventDefault();
  for (let i in formInputs) {
    let passed = true;

    // Returns a special error for email inputs.
    if (formInputs[i].getAttribute("data-error") === "Email") {
      email = sanitizeInput(formInputs[i].value);
      if (validateEmail(email) == false) {
        formLabels[i].textContent = "Looks like this is not an email";
        errorImages[i].style.display = "block";
        passed = false;
      }
    }

    // Checks if the value is empty and returns an error message.
    if (sanitizeInput(formInputs[i].value) === "") {
      formInputs[i].className = "error";
      formLabels[i].textContent = `${formInputs[i].getAttribute(
        "data-error"
      )} cannot be empty`;
      errorImages[i].style.display = "block";
      passed = false;
    }

    // Checks if an input passes and removes the error messages and stylings.
    if (passed) {
      for (let i in formInputs) {
        formInputs[i].className = "";
        formLabels[i].textContent = "";
        errorImages[i].style.display = "none";
      }
    }
  }
});

// Validates if the email has a "." and a "@" character in it
function validateEmail(email) {
  if (!email.includes("@")) {
    return false;
  }
  if (!email.includes(".")) return false;
  return true;
}

// Removes spaces at the front and at the back of the string
function sanitizeInput(input) {
  return String(input).slice();
}
