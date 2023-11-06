//Christmas countdown

const countDownDate = new Date("Dec 24, 2023 00:00:01").getTime();
const countdownContainer = document.querySelector(".christmas_countdown_container");
const daysElement = document.createElement("span");
const hoursElement = document.createElement("span");
const minutesElement = document.createElement("span");
const secondsElement = document.createElement("span");
const christmasCountdownText = document.createElement("p");

daysElement.className = "christmas_countdown_clock";
hoursElement.className = "christmas_countdown_clock";
minutesElement.className = "christmas_countdown_clock";
secondsElement.className = "christmas_countdown_clock";

countdownContainer.appendChild(daysElement);
countdownContainer.appendChild(hoursElement);
countdownContainer.appendChild(minutesElement);
countdownContainer.appendChild(secondsElement);
countdownContainer.appendChild(christmasCountdownText);

const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);


  daysElement.textContent = days + " d ";
  hoursElement.textContent = " - " + hours + " h ";
  minutesElement.textContent = " - " + minutes + " m ";
  secondsElement.textContent = " - " + seconds + " s ";
  christmasCountdownText.className = "christmas_countdown_text";
  christmasCountdownText.textContent = "Until Christmas";

  // Countdown finish message
  if (distance < 0) {
    clearInterval(x);
    countdownContainer.textContent = "Christmas was here";
    christmasCountdownText.textContent = "";
  }
}, 1000);
