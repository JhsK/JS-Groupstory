const searchBtn = document.querySelector("#js-searchBtn");
const searchModal = document.querySelector(".search-container");
const searchClose = document.querySelector(".closeBtn");

searchBtn.addEventListener("click", () => {
  searchModal.style.display = "block";
});

searchClose.addEventListener("click", () => {
  searchModal.style.display = "none";
});
