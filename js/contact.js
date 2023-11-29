
const form = document.querySelector("#contact_form");

const yourName = document.querySelector("#your_name");
const nameError = document.querySelector("#name_error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email_error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject_error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message_error");
const successMessage = document.querySelector("#success_message");



function validateForm(event) {
  event.preventDefault();

  let isValid = true; 

  if (checkLength(yourName.value, 6)) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }


  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    isValid = false;
  }

  if (checkLength(subject.value, 16)) {
    subjectError.style.display = "block";
    isValid = false;
  } else {
    subjectError.style.display = "none";
  }

  if (checkLength(message.value, 26)) {
    messageError.style.display = "block";
    isValid = false;
  } else {
    messageError.style.display = "none";
  }

  if (isValid) {
    
    yourName.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";

    
    successMessage.style.display = "block";

}

}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length < len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
} 
