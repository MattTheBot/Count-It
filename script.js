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

// Homepage logic
function loadCounters() {
  const container = document.getElementById("counterList");
  container.innerHTML = ""; // clear

  const counters = JSON.parse(localStorage.getItem("counters") || "[]");

  counters.forEach(counter => {
    const div = document.createElement("div");
    div.className = "counter-card";
    div.textContent = counter.name;
    div.onclick = () => openCounter(counter.id);
    container.appendChild(div);
  });

  // Add Counter button always at the end
  const addDiv = document.createElement("div");
  addDiv.className = "add-counter";
  addDiv.innerHTML = `<i class="fas fa-plus"></i><span>Create Counter</span>`;
  addDiv.onclick = createCounter;
  container.appendChild(addDiv);
}

// Create a new counter
function createCounter() {
  const counters = JSON.parse(localStorage.getItem("counters") || "[]");
  const id = "counter_" + Date.now();
  const name = "Counter " + (counters.length + 1);
  counters.push({ id, name, value: 0 });
  localStorage.setItem("counters", JSON.stringify(counters));

  // redirect to counter page
  localStorage.setItem("activeCounter", id);
  window.location.href = "counter.html";
}

// Open existing counter
function openCounter(id) {
  localStorage.setItem("activeCounter", id);
  window.location.href = "counter.html";
}

// On homepage load
if(document.getElementById("counterList")) {
  loadCounters();
}

// Counter page logic
let counterValue = 0;
let activeCounterId = localStorage.getItem("activeCounter");

function updateDisplay() {
  const el = document.getElementById("counterDisplay");
  if(el) el.textContent = counterValue;
}

function loadCounterPage() {
  if(!activeCounterId) return;
  const counters = JSON.parse(localStorage.getItem("counters") || "[]");
  const counter = counters.find(c => c.id === activeCounterId);
  if(counter) {
    counterValue = counter.value;
    updateDisplay();
  }
}

function saveCounter() {
  const counters = JSON.parse(localStorage.getItem("counters") || "[]");
  const counter = counters.find(c => c.id === activeCounterId);
  if(counter) {
    counter.value = counterValue;
    localStorage.setItem("counters", JSON.stringify(counters));
  }
}

function addAmount() {
  const val = parseInt(document.getElementById("addAmount").value);
  if(!isNaN(val)) {
    counterValue += val;
    saveCounter();
    updateDisplay();
  }
  document.getElementById("addAmount").value = "";
}

function subtractAmount() {
  const val = parseInt(document.getElementById("subtractAmount").value);
  if(!isNaN(val)) {
    counterValue -= val;
    saveCounter();
    updateDisplay();
  }
  document.getElementById("subtractAmount").value = "";
}

document.addEventListener("DOMContentLoaded", loadCounterPage);
