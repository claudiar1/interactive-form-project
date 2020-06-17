let roleSelector = document.getElementById("title");
let otherRoleInput = document.getElementById("other-title");
let colorSelector = document.getElementById("color");
let designSelector = document.getElementById("design");
let removedColorList = [];

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

function tShirtColor() {
  let colorList = colorSelector.children;
  let removedColor;
  let message;
  if (designSelector.value === "Select Theme") {
    while (colorSelector.length > 0) {
      removedColor = colorSelector.removeChild(colorList[0]);
      removedColorList.push(removedColor);
    }
    message = document.createElement("option");
    message.textContent = "Please select a T-shirt design";
    colorSelector.appendChild(message);
  } else {
    colorSelector.removeChild(colorList[0]);
    for (let i = 0; i < removedColorList.length; i += 1) {
      colorSelector.appendChild(removedColorList[i]);
    }
  }
}

tShirtColor();
designSelector.addEventListener("change", tShirtColor);
