const searchBtn = document.querySelector(".searchBtn");
const searchView = document.querySelector(".searchSection");
const searchClose = document.querySelector(".searchClose");

searchBtn.addEventListener("click", () => {
  searchView.style.display = "block";
});

searchClose.addEventListener("click", () => {
  searchView.style.display = "none";
});
