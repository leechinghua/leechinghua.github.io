const personName = document.querySelector("#name");
const delay = document.querySelector("#delay");
const setAlarm = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delayTime) {
  return new Promise((resolve, reject) => {
    if (person === "" || delayTime === "") {
      reject("請填名字跟時間");
    } else {
      setTimeout(() => {
        resolve(person + "，時間到了！");
      }, delayTime);
    }
  });
}

setAlarm.addEventListener("click", (e) => {
  alarm(personName.value, delay.value)
    .then((res) => {
      output.innerHTML = res;
    })
    .catch((err) => {
      output.innerHTML = err;
    });
});
