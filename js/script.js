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

/**
 * Places focus on name field and removes "select payment method" optionm, thereby setting "credit card" as the default upon page load.
 */
window.onload = function loadFocus() {
  document.getElementById("name").focus();
  selectPaymentMethod.removeChild(selectPaymentMethod.firstElementChild);
  this.paymentSection();
};

otherRoleInput.style.visibility = "hidden";

/**
 * Provides text input box for user to specify their role if "other" is selected.
 *
 * @param {event} e - used to specify the event target in order to get the value of the user's selection.
 */
function showOtherRoleInput(e) {
  if (e.target.value === "other") {
    otherRoleInput.style.visibility = "visible";
  } else {
    otherRoleInput.style.visibility = "hidden";
  }
}

roleSelector.addEventListener("change", showOtherRoleInput);

/**
 * buildColorList compiles a list of all of the "I heart JS" shirts and a list of all of the "JS Puns" shirts, stored in variables.
 *
 * @param {string} keyword - if shirt color choice contains a given keyword, that shirt color choice is added to an array of shirt color choices that also contain the given keyword.
 */
function buildColorList(keyword) {
  let colors = [];
  for (let i = 0; i < colorSelector.length; i += 1) {
    if (colorSelector[i].textContent.includes(keyword)) {
      colors.push(colorSelector[i]);
    }
  }
  return colors;
}

/**
 * showColorOptions sets the color selector to visible, and adds to it the availble color options for a given shirt design.
 *
 * @param {array} design - an array of the available shirt color options for a given shirt design.
 */
function showColorOptions(design) {
  colorListDiv.style.visibility = "visible";
  colorSelector.length = 0;
  for (var i = 0; i < design.length; i += 1) {
    colorSelector.appendChild(design[i]);
  }
}

/**
 * tShirtColor only shows the color selector when a design has been selected by the user, and then only shows the color options that correspond with the selected design.
 */
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

/**
 * Totals the cost of the user's selected activities and displays this cost below the list of activities and does not allow a user to select activities with conflicting days and times.
 */
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

/**
 * removePaymentSections is used to remove the payment information that is not relevant to the user's selected payment method.
 *
 * @param {node} sectionOne - a given HTML node to remove from the DOM.
 * @param {node} sectionTwo - a second given HTML node to remove from the DOM.
 */
function removePaymentSections(sectionOne, sectionTwo) {
  let paymentFieldset = sections[3];
  paymentFieldset.appendChild(creditCard);
  paymentFieldset.appendChild(paypal);
  paymentFieldset.appendChild(bitcoin);
  paymentFieldset.removeChild(sectionOne);
  paymentFieldset.removeChild(sectionTwo);
}

/**
 * paymentSection removes specific payment sections depending upon the user's selected payment method.
 */
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

/**
 * Validates that the user has entered a first and last name.
 *
 * @param {string} name - user's input
 */
function nameValidation(name) {
  return /^[A-Za-z]+ [A-Za-z]+$/.test(name);
}

/**
 * Validates that user has entered a correctly formatted email address.
 *
 * @param {string} email - user's input
 */
function emailValidation(email) {
  return /^\w+@\w+\.\w+/i.test(email);
}

/**
 * Checks that user has checked off at least one activity.
 */
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

/**
 * Checks that user has entered a credit card number between 13 and 16 digits long.
 *
 * @param {string} cardNumber - user's input
 */
function cardNumberRegex(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}

/**
 * Checks that user has entered a 5 digit zip code.
 *
 * @param {string} zip - user's input
 */
function zipRegex(zip) {
  return /^\d{5}$/.test(zip);
}

/**
 * Checks that user has entered 3 digit CVV.
 *
 * @param {string} cvv - user's input
 */
function cvvRegex(cvv) {
  return /^\d{3}$/.test(cvv);
}

/**
 * Checks if user has completed the name, email, and activities fields and, if not, displays error messages.
 */
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

/**
 * Checks that user has fully completed the credit card number field, and if not, provides conditional error messages.
 */
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

/**
 * Checks if user has completed the zip code field and, if not, displays error message.
 */
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

/**
 * Checks that user has completed the CVV field, and, if not, displays an error message.
 */
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

/**
 * Checks all necessary validations.
 *
 * @param {event} e - passed the event it's called on in order to prevent its default action
 */
function submitValidation(e) {
  let card;
  let zip;
  let cvv;
  let form = formValidation();
  if (selectPaymentMethod.value === "credit card") {
    card = cardNumberValidation();
    zip = zipValidation();
    cvv = cvvValidation();
  }

  if (form === false || card === false || zip === false || cvv === false) {
    e.preventDefault();
  }
}

creditCardNumber.addEventListener("keyup", cardNumberValidation);
zipInput.addEventListener("keyup", zipValidation);
cvvInput.addEventListener("keyup", cvvValidation);
submitButton.addEventListener("click", submitValidation);
