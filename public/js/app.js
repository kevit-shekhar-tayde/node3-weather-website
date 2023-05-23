console.log("Hello JS script");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:8000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = "";
        messageTwo.textContent = data.error;
        return;
      }
      messageOne.textContent = data.place;
      messageTwo.textContent = data.forecastData;
    });
});
