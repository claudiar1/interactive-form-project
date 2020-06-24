let roleSelector = document.getElementById("title");
let otherRoleInput = document.getElementById("other-title");
let colorSelector = document.getElementById("color");
let designSelector = document.getElementById("design");
let colorListDiv = document.getElementById("colors-js-puns");
let puns = buildColorList("Puns");
let heart = buildColorList("♥");
let totalActivityCost = 0;
let totalCostMessage = document.createElement("p");
let activitiesSection = document.getElementsByClassName("activities");
let selectPaymentMethod = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
let bitcoin = document.getElementById("bitcoin");
let checkboxList = document.querySelectorAll("[type=checkbox");
let sections = document.getElementsByTagName("fieldset");
let buttons = document.getElementsByTagName("button");
let submitButton = buttons[0];

window.onload = function loadFocus() {
  document.getElementById("name").focus();
  selectPaymentMethod.removeChild(selectPaymentMethod.firstElementChild);
  this.paymentSection();
};

otherRoleInput.style.visibility = "hidden";

function showOtherRoleInput(e) {
  if (e.target.value === "other") {
    otherRoleInput.style.visibility = "visible";
  } else {
    otherRoleInput.style.visibility = "hidden";
  }
}

roleSelector.addEventListener("change", showOtherRoleInput);

function buildColorList(keyword) {
  let colors = [];
  for (let i = 0; i < colorSelector.length; i += 1) {
    if (colorSelector[i].textContent.includes(keyword)) {
      colors.push(colorSelector[i]);
    }
  }
  return colors;
}

function showColorOptions(design) {
  colorListDiv.style.visibility = "visible";
  colorSelector.length = 0;
  for (var i = 0; i < design.length; i += 1) {
    colorSelector.appendChild(design[i]);
  }
}

function tShirtColor() {
  if (designSelector.value === "Select Theme") {
    colorListDiv.style.visibility = "hidden";
  } else if (designSelector.value === "js puns") {
    showColorOptions(puns);
  } else if (designSelector.value === "heart js") {
    showColorOptions(heart);
  }
}

tShirtColor();
designSelector.addEventListener("change", tShirtColor);

activitiesSection[0].addEventListener("change", e => {
  let checkbox = e.target;
  let cost = parseInt(checkbox.dataset.cost);
  let checked = checkbox.checked;

  if (checked) {
    totalActivityCost += cost;
  } else {
    totalActivityCost -= cost;
  }
  if (totalActivityCost > 0) {
    activitiesSection[0].appendChild(totalCostMessage);
  } else if (totalActivityCost === 0) {
    activitiesSection[0].removeChild(totalCostMessage);
  }

  totalCostMessage.textContent = `Total Cost: $${totalActivityCost}`;

  let checkedActivityDayAndTime = checkbox.dataset.dayAndTime;
  let checkedActivityName = checkbox.name;

  for (let i = 0; i < checkboxList.length; i += 1) {
    let iteration = checkboxList[i];
    let iterationDayAndTime = iteration.dataset.dayAndTime;
    let iterationName = iteration.name;

    if (
      checkedActivityDayAndTime === iterationDayAndTime &&
      checkedActivityName !== iterationName
    ) {
      if (checked) {
        iteration.disabled = true;
      } else {
        iteration.disabled = false;
      }
    }
  }
});

function removePaymentSections(sectionOne, sectionTwo) {
  let paymentFieldset = sections[3];
  paymentFieldset.appendChild(creditCard);
  paymentFieldset.appendChild(paypal);
  paymentFieldset.appendChild(bitcoin);
  paymentFieldset.removeChild(sectionOne);
  paymentFieldset.removeChild(sectionTwo);
}

function paymentSection() {
  if (selectPaymentMethod.value === "credit card") {
    removePaymentSections(paypal, bitcoin);
  } else if (selectPaymentMethod.value === "paypal") {
    removePaymentSections(creditCard, bitcoin);
  } else if (selectPaymentMethod.value === "bitcoin") {
    removePaymentSections(creditCard, paypal);
  }
}

selectPaymentMethod.addEventListener("change", paymentSection);

function nameValidation(name) {
  return /^[A-Za-z]+ [A-Za-z]+$/.test(name);
}

function emailValidation(email) {
  return /^\w+@\w+\.\w+/i.test(email);
}

function activitiesValidation() {
  let checkedOffBoxes = [];
  for (let i = 0; i < checkboxList.length; i += 1) {
    if (checkboxList[i].checked) {
      checkedOffBoxes.push(checkboxList[i]);
    }
  }
  if (checkedOffBoxes.length === 0) {
    return false;
  } else {
    return true;
  }
}

function cardNumberValidation(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}

function zipValidation(zip) {
  return /^\d{5}$/.test(zip);
}

function cvvValidation(cvv) {
  return /^\d{3}$/.test(cvv);
}

function formValidation(e) {
  e.preventDefault();
  let nameField = document.getElementById("name");
  let emailField = document.getElementById("mail");
  let bioInfo = sections[0];
  let emailErrorPresent = document.getElementById("emailError");
  let nameErrorPresent = document.getElementById("nameError");
  let activitiesErrorPresent = document.getElementById("activitiesError");

  if (nameValidation(nameField.value) === false && nameErrorPresent === null) {
    let nameMessage = document.createElement("p");
    nameMessage.className = "error-message";
    nameMessage.textContent = "Please enter your first and last name.";
    nameMessage.id = "nameError";
    nameField.className = "error";
    bioInfo.insertBefore(nameMessage, nameField.nextElementSibling);
  } else {
    nameField.className = "";
    if (nameErrorPresent !== null) {
      bioInfo.removeChild(nameErrorPresent);
    }
  }

  if (
    emailValidation(emailField.value) === false &&
    emailErrorPresent === null
  ) {
    let emailMessage = document.createElement("p");
    emailMessage.className = "error-message";
    emailMessage.textContent =
      "Please enter a correctly formatted email address. Ex: name@company.com";
    emailMessage.id = "emailError";
    emailField.className = "error";
    bioInfo.insertBefore(emailMessage, emailField.nextElementSibling);
  } else {
    emailField.className = "";
    if (emailErrorPresent !== null) {
      bioInfo.removeChild(emailErrorPresent);
    }
  }

  if (activitiesValidation() === false && activitiesErrorPresent === null) {
    let activitiesMessage = document.createElement("p");
    activitiesMessage.className = "error-message";
    activitiesMessage.id = "activitiesError";
    activitiesMessage.textContent = "Please select at least one activity.";
    let activitiesTitle = document.getElementById("activities-title");
    activitiesSection[0].insertBefore(
      activitiesMessage,
      activitiesTitle.nextElementSibling
    );
  } else {
    if (activitiesErrorPresent !== null) {
      activitiesSection[0].removeChild(activitiesErrorPresent);
    }
  }
}
submitButton.addEventListener("click", formValidation);
