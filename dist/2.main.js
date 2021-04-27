(self["webpackChunkJS_Groupstory"] = self["webpackChunkJS_Groupstory"] || []).push([[2],{

/***/ 27:
/***/ (() => {

const filterBtn = document.querySelectorAll("#js-filterBtn");

filterBtn.forEach((filterButton) => {
  filterButton.addEventListener("click", (event) => {
    const compressItem = event.target.nextElementSibling;

    if (compressItem.classList[1] === undefined) {
      compressItem.classList.add("filter-ul-b");
    } else {
      compressItem.classList.remove("filter-ul-b");
    }
  });
});


/***/ })

}]);
//# sourceMappingURL=2.main.js.map