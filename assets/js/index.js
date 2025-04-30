"use strict";

const photoDogUrl = "https://dog.ceo/api/breeds/image/random";
const photoDog = document.createElement("img");
document.body.append(photoDog);

function updatePhotoDog({ message }) {
  photoDog.src = message;
  photoDog.classList.add("photoDog");
}

function randomPhotoBtn() {
  fetch(photoDogUrl)
    .then((response) => response.json())
    .then((data) => updatePhotoDog(data))
    .catch((err) => console.log(err));
}

document.querySelector("button").addEventListener("click", randomPhotoBtn);
