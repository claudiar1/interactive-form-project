let roleSelector = document.getElementById("title");
let otherRoleInput = document.getElementById("other-title");

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
