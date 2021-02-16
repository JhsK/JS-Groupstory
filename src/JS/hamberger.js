const hambergerMenu = document.querySelector(".mobileNav");
const navUl = document.querySelector(".nav__ul");

hambergerMenu.addEventListener("click", () => {
  if (navUl.style.top === "-100%") {
    navUl.style.top = "0px";
  } else {
    navUl.style.top = "-100%";
  }
});

// if (navUl.style.display === "none") {
//     navUl.style.display = "flex";
//   } else {
//     navUl.style.display = "none";
//   }
