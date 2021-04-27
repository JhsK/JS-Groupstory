(self["webpackChunkJS_Groupstory"] = self["webpackChunkJS_Groupstory"] || []).push([[3],{

/***/ 28:
/***/ (() => {

const sectionHTML = document.querySelector(".section");
const ulHTML = document.createElement("ul");

ulHTML.className = "card-ul";

const insertPost = (title, tag) => {
  const ulHTML_element = `
                <li class ="card-item">
                    <figure class="card-img">
                        <img alt="test">
                    </figure>
                    <div class="card-content">
                        <span class="cardTitle">${title}</span>
                        <ul class=card-content-ul">
                            <li class="card-content-item">${tag}</li>
                        </ul>
                    </div>
              </li>`;
  ulHTML.innerHTML += ulHTML_element;
  sectionHTML.appendChild(ulHTML);
};

fetch("http://localhost:3000/posts/")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    myJson.forEach((item) => {
      insertPost(item.title, item.tag);
      console.log("record");
    });
  });

// fetch("http://localhost:3000/posts/")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (myJson) {
//     myJson.map((item) => {
//       console.log(item.title);
//     });
//   });


/***/ })

}]);
//# sourceMappingURL=3.main.js.map