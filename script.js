// Load header into every page
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

// Navigation
function goHome() {
  window.location.href = "index.html";
}
function goBack() {
  window.history.back();
}

// Counter logic with localStorage
let counterValue = parseInt(localStorage.getItem("counterValue")) || 0;

function updateDisplay() {
  let el = document.getElementById("counterDisplay");
  if (el) el.textContent = counterValue;
}

function addAmount() {
  let val = parseInt(document.getElementById("addAmount").value);
  if (!isNaN(val)) {
    counterValue += val;
    localStorage.setItem("counterValue", counterValue);
    updateDisplay();
  }
  document.getElementById("addAmount").value = "";
}

function subtractAmount() {
  let val = parseInt(document.getElementById("subtractAmount").value);
  if (!isNaN(val)) {
    counterValue -= val;
    localStorage.setItem("counterValue", counterValue);
    updateDisplay();
  }
  document.getElementById("subtractAmount").value = "";
}

document.addEventListener("DOMContentLoaded", updateDisplay);
