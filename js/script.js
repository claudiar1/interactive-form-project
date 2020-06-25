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
let creditCardNumber = document.getElementById("cc-num");
let zipInput = document.getElementById("zip");
cvvInput = document.getElementById("cvv");
let errorMessageCounter = 0;

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

function cardNumberRegex(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}

function zipRegex(zip) {
  return /^\d{5}$/.test(zip);
}

function cvvRegex(cvv) {
  return /^\d{3}$/.test(cvv);
}

function formValidation() {
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
  } else if (nameValidation(nameField.value) && nameErrorPresent !== null) {
    nameField.className = "";
    bioInfo.removeChild(nameErrorPresent);
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
  } else if (emailValidation(emailField.value) && emailErrorPresent !== null) {
    emailField.className = "";
    bioInfo.removeChild(emailErrorPresent);
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
  } else if (activitiesValidation() && activitiesErrorPresent !== null) {
    activitiesSection[0].removeChild(activitiesErrorPresent);
  }

  let emailErrorPresentNow = document.getElementById("emailError");
  let nameErrorPresentNow = document.getElementById("nameError");
  let activitiesErrorPresentNow = document.getElementById("activitiesError");
  if (
    nameErrorPresentNow !== null ||
    emailErrorPresentNow !== null ||
    activitiesErrorPresentNow !== null
  ) {
    return false;
  }
  return true;
}

function cardNumberValidation() {
  let cardNumberMessage = document.createElement("p");
  cardNumberMessage.className = "error-message";
  cardNumberMessage.id = "cardNumberError";
  let cardNumberMessagePresent = document.getElementById("cardNumberError");
  let cardNumberParent = document.getElementById("card-number");
  if (
    cardNumberRegex(creditCardNumber.value) === false &&
    creditCardNumber.value.length === 0
  ) {
    if (cardNumberMessagePresent === null) {
      creditCardNumber.className = "error";
      cardNumberMessage.textContent = "Please enter a credit card number.";
      cardNumberParent.insertBefore(
        cardNumberMessage,
        creditCardNumber.nextElementSibling
      );
    } else if (cardNumberMessagePresent !== null) {
      creditCardNumber.className = "error";
      cardNumberParent.removeChild(cardNumberMessagePresent);
      cardNumberMessage.textContent = "Please enter a credit card number.";
      cardNumberParent.insertBefore(
        cardNumberMessage,
        creditCardNumber.nextElementSibling
      );
    }
  } else if (
    cardNumberRegex(creditCardNumber.value) === false &&
    creditCardNumber.value.length > 0
  ) {
    if (cardNumberMessagePresent !== null) {
      creditCardNumber.className = "error";
      cardNumberParent.removeChild(cardNumberMessagePresent);
      cardNumberMessage.textContent =
        "Please enter a number that is between 13 and 16 digits long.";
      cardNumberParent.insertBefore(
        cardNumberMessage,
        creditCardNumber.nextElementSibling
      );
    } else {
      creditCardNumber.className = "error";
      cardNumberMessage.textContent =
        "Please enter a number that is between 13 and 16 digits long.";
      cardNumberParent.insertBefore(
        cardNumberMessage,
        creditCardNumber.nextElementSibling
      );
    }
  } else if (
    cardNumberRegex(creditCardNumber.value) &&
    cardNumberMessagePresent !== null
  ) {
    creditCardNumber.className = "";
    cardNumberParent.removeChild(cardNumberMessagePresent);
  }
  let cardNumberMessagePresentNow = document.getElementById("cardNumberError");

  if (cardNumberMessagePresent !== null) {
    return false;
  }
  return true;
}

function zipValidation() {
  let zipMessage = document.createElement("p");
  zipMessage.className = "error-message";
  zipMessage.id = "zipError";
  let zipMessagePresent = document.getElementById("zipError");
  let zipInputParent = document.getElementById("zip-code");
  if (zipRegex(zipInput.value) === false) {
    zipInput.className = "error";
    zipMessage.textContent = "Please enter your 5 digit billing zip code.";
    if (zipMessagePresent === null) {
      zipInputParent.insertBefore(zipMessage, zipInput.nextElementSibling);
    } else if (zipMessagePresent !== null) {
      zipInputParent.removeChild(zipMessagePresent);
      zipInputParent.insertBefore(zipMessage, zipInput.nextElementSibling);
    }
  } else if (zipRegex(zipInput.value) && zipMessagePresent !== null) {
    zipInput.className = "";
    zipInputParent.removeChild(zipMessagePresent);
  }

  let zipMessagePresentNow = document.getElementById("zipError");

  if (zipMessagePresentNow !== null) {
    return false;
  }
  return true;
}

function cvvValidation() {
  let cvvMessage = document.createElement("p");
  cvvMessage.className = "error-message";
  cvvMessage.id = "cvvError";
  let cvvMessagePresent = document.getElementById("cvvError");
  let cvvInputParent = document.getElementById("cvv-input");
  if (cvvRegex(cvvInput.value) === false) {
    cvvInput.className = "error";
    cvvMessage.textContent = "Please enter your card's 3 digit CVV.";
    if (cvvMessagePresent === null) {
      cvvInputParent.appendChild(cvvMessage);
    } else if (cvvMessagePresent !== null) {
      cvvInputParent.removeChild(cvvMessagePresent);
      cvvInputParent.appendChild(cvvMessage);
    }
  } else if (cvvRegex(cvvInput.value) && cvvMessagePresent !== null) {
    cvvInput.className = "";
    cvvInputParent.removeChild(cvvMessagePresent);
  }
  let cvvMessagePresentNow = document.getElementById("cvvError");

  if (cvvMessagePresentNow !== null) {
    return false;
  }
  return true;
}

function submitValidation(e) {
  let form = formValidation();
  let card = cardNumberValidation();
  let zip = zipValidation();
  let cvv = cvvValidation();
  if (form === false || card === false || zip === false || cvv === false) {
    e.preventDefault();
  }
}

creditCardNumber.addEventListener("keyup", cardNumberValidation);
zipInput.addEventListener("keyup", zipValidation);
cvvInput.addEventListener("keyup", cvvValidation);
submitButton.addEventListener("click", submitValidation);
