const topBtn = document.querySelector(".topBtn");

window.addEventListener("scroll", (event) => {
  if (event.target.defaultView.scrollY === 0) {
    topBtn.style.color = "#000";
  } else {
    topBtn.style.color = "#aea1ea";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
