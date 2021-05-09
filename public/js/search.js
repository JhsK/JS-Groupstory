const searchBtn = document.querySelector(".searchBtn");
const searchView = document.querySelector(".searchSection");
const searchClose = document.querySelector(".searchClose");

const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchFormInput");

let inputValue;

searchBtn.addEventListener("click", () => {
  searchView.style.display = "block";
});

searchClose.addEventListener("click", () => {
  searchView.style.display = "none";
});

searchInput.addEventListener("input", (e) => {
  inputValue = e.target.value;
});

searchForm.addEventListener("submit", () => {
  searchForm.action = `/search/${inputValue}`;
});
