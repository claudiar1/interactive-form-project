let roleSelector = document.getElementById("title");
let otherRoleInput = document.getElementById("other-title");
let colorSelector = document.getElementById("color");
let designSelector = document.getElementById("design");
let colorListDiv = document.getElementById("colors-js-puns");
let puns = buildColorList("Puns");
let heart = buildColorList("♥");

window.onload = function loadFocus() {
  document.getElementById("name").focus();
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
