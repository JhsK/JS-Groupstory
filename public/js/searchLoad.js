const cardListContainer = document.querySelector(".cardListContainer");

fetch("/search/load")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    const divContent = document.createElement("div");
    const img = document.createElement("img");
    const divText = document.createElement("div");
    const divTitle = document.createElement("div");

    divContent.classList.add("cardListContent");
    divText.classList.add("cardListText");
    divTitle.classList.add("cardListTitle");

    divText.appendChild(divTitle);
    divContent.appendChild(img);
    divContent.appendChild(divText);
    cardListContainer.appendChild(divContent);

    img.src = result[0].Regist_image.img1;
    img.alt = result[0].Regist_name;
    divTitle.innerText = result[0].Regist_name;

    const mainList = document.querySelectorAll(".cardListContent");
    Array.from(mainList).forEach((item) => {
      item.addEventListener("click", (e) => {
        const query =
          e.target.localName === "img" ? e.target.alt : e.target.innerText;

        location.href = `/circle/${query}`;
      });
    });
  });
