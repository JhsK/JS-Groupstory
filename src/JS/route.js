import introHTML from "../html/indexUI.html";
import recuritHTML from "../html/recurit.html";

const INIT_URL = "/#";
const insertElement = document.querySelector(".js-content");
const navRoute = document.querySelectorAll(".nav-item");

const renderHTML = (src) => {
  insertElement.innerHTML = "";
  insertElement.innerHTML = src;
};

window.onload = () => {
  window.history.pushState({}, "main", window.location.origin + INIT_URL);
  renderHTML(introHTML);
};

window.onpopstate = () => {
  console.log(window.location.pathname);
  switch (window.location.pathname) {
    case "/":
      renderHTML(introHTML);
      break;
    case "/recurit":
      renderHTML(recuritHTML);
      break;
    default:
      null;
  }
};

const historyRouterPush = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);

  if (pathName === "/recurit") {
    import("./hambergerBtn");
    import("./filter");
    renderHTML(recuritHTML);
  }
};

navRoute.forEach((element) => {
  element.addEventListener("click", (event) => {
    const pathName = event.target.getAttribute("route");
    historyRouterPush(pathName);
  });
});
