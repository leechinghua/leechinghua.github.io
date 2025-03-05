const personName = document.querySelector("#name");
const delay = document.querySelector("#delay");
const setAlarm = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delayTime) {
  setTimeout(() => {
    output.innerHTML = person + "鬧鐘響了!";
  }, delayTime);
}

setAlarm.addEventListener("click", (e) => {
  alarm(personName.value, delay.value);
});
