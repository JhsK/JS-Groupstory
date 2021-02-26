const navRoute = document.querySelectorAll(".nav-item");

const historyRouterPush = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  // renderHTML(content, routes[pathName]);
};

navRoute.forEach((element) => {
  element.addEventListener("click", (event) => {
    const pathName = event.target.getAttribute("route");
    historyRouterPush(pathName);
  });
});
