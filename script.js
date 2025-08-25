// Load header
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

// Navigation
function goHome() { window.location.href = "index.html"; }
function goBack() { window.history.back(); }
function goHelp() { window.location.href = "help.html"; }

// Counter logic
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

// Homepage: create new counter
function createCounter() {
  // Generate a unique id for new counter
  const id = "counter_" + Date.now();
  // Save counter in localStorage
  localStorage.setItem(id, 0);

  // Redirect to counter page (for now using counter.html as template)
  window.location.href = "counter.html";
}
