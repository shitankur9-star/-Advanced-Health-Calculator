let chart;

// BMI CALCULATOR
function calculateBMI() {

  let height =
    document.getElementById("height").value / 100;

  let weight =
    document.getElementById("weight").value;

  let bmi =
    (weight / (height * height)).toFixed(2);

  let status = "";

  if (bmi < 18.5) {
    status = "Underweight";
  }
  else if (bmi < 24.9) {
    status = "Normal";
  }
  else if (bmi < 29.9) {
    status = "Overweight";
  }
  else {
    status = "Obese";
  }

  document.getElementById("bmiResult")
    .innerHTML =
    `Your BMI is ${bmi} (${status})`;

  drawChart(bmi);

  saveHistory(bmi, status);

  speakText(`Your BMI is ${bmi} and your condition is ${status}`);
}

// WATER CALCULATOR
function calculateWater() {

  let weight =
    document.getElementById("waterWeight").value;

  let water =
    (weight * 0.033).toFixed(2);

  document.getElementById("waterResult")
    .innerHTML =
    `Drink ${water} Liters water daily`;

  speakText(`Drink ${water} liters of water daily`);
}

// CALORIE ESTIMATOR
function calculateCalories() {

  let age =
    document.getElementById("age").value;

  let weight =
    document.getElementById("calWeight").value;

  let height =
    document.getElementById("heightCal").value;

  let gender =
    document.getElementById("gender").value;

  let calories;

  if (gender === "male") {

    calories =
      88.36 +
      (13.4 * weight) +
      (4.8 * height) -
      (5.7 * age);

  } else {

    calories =
      447.6 +
      (9.2 * weight) +
      (3.1 * height) -
      (4.3 * age);
  }

  document.getElementById("calorieResult")
    .innerHTML =
    `Estimated Calories: ${Math.round(calories)} kcal`;

  speakText(`Your estimated calories are ${Math.round(calories)}`);
}

// BMI CHART
function drawChart(bmi) {

  const ctx =
    document.getElementById('bmiChart');

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {

    type: 'bar',

    data: {
      labels: ['BMI'],
      datasets: [{
        label: 'BMI Value',
        data: [bmi],
        borderWidth: 2
      }]
    },

    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

  });
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// AI HEALTH TIPS
function generateTip() {

  let tips = [

    "Drink more water every day 💧",

    "Exercise at least 30 minutes daily 🏃",

    "Sleep 7-8 hours every night 😴",

    "Eat more fruits and vegetables 🍎",

    "Avoid too much junk food 🍔",

    "Take care of your mental health 🧠"

  ];

  let randomTip =
    tips[Math.floor(Math.random() * tips.length)];

  document.getElementById("tipResult")
    .innerHTML = randomTip;

  speakText(randomTip);
}

// SAVE HISTORY
function saveHistory(bmi, status) {

  let history =
    JSON.parse(localStorage.getItem("bmiHistory")) || [];

  history.push(`BMI: ${bmi} (${status})`);

  localStorage.setItem(
    "bmiHistory",
    JSON.stringify(history)
  );

  showHistory();
}

// SHOW HISTORY
function showHistory() {

  let history =
    JSON.parse(localStorage.getItem("bmiHistory")) || [];

  let list =
    document.getElementById("historyList");

  list.innerHTML = "";

  history.forEach(item => {

    let li =
      document.createElement("li");

    li.textContent = item;

    list.appendChild(li);

  });
}

// VOICE ASSISTANT
function speakText(text) {

  let speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";

  window.speechSynthesis.speak(speech);
}

// LOAD HISTORY
showHistory();