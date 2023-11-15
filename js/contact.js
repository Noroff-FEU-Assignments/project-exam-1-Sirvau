
const fieldset = document.querySelector("fieldset");
const firstName = document.querySelector("#first_name");
const nameError = document.querySelector(".form_error");


function validateForm() {

    if (firstName.value.length > 0) {
        nameError.style.display = "none";
    } else {
        nameError.style.display ="block";
    }
}

fieldset.addEventListener("submit", validateForm);

validateForm();