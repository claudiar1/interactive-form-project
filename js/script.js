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

  let checkboxList = document.querySelectorAll("[type=checkbox");
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
  let sections = document.getElementsByTagName("fieldset");
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
