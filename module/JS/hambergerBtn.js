const hambergerBtn = document.querySelector(".hambergerBtn");
const filterDisplay = document.querySelector(".aside");
const filterCloseBtn = document.querySelector(".filter-closeBtn");

hambergerBtn.addEventListener("click", () => {
  filterDisplay.style.display = "flex";
  filterCloseBtn.style.display = "inline";
});

filterCloseBtn.addEventListener("click", () => {
  filterDisplay.style.display = "none";
  filterCloseBtn.style.display = "none";
});
