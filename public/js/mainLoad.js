const cardListContainer = document.querySelector(".cardListContainer");

fetch("/main")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result[0].Circle_image.img1);
    for (let i = 0; i < result.length; i++) {
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

      img.src = result[i].Circle_image.img1;
      img.alt = result[i].Circle_name;
      divTitle.innerText = result[i].Circle_name;
    }

    const mainList = document.querySelectorAll(".cardListContent");
    Array.from(mainList).forEach((item) => {
      item.addEventListener("click", (e) => {
        const query =
          e.target.localName === "img" ? e.target.alt : e.target.innerText;

        location.href = `/circle/${query}`;
      });
    });
  });
