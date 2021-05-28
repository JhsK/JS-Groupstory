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
      const divStatus = document.createElement("div");

      divContent.classList.add("cardListContent");
      divText.classList.add("cardListText");
      divTitle.classList.add("cardListTitle");
      divStatus.classList.add("cardListStatus");

      divText.appendChild(divTitle);
      divText.appendChild(divStatus);
      divContent.appendChild(img);
      divContent.appendChild(divText);
      cardListContainer.appendChild(divContent);

      img.src = result[i].Circle_image.img1;
      img.alt = result[i].Circle_name;
      divTitle.innerText = result[i].Circle_name;
      divStatus.innerText = result[i].Circle_recruit;

      if (result[i].Circle_recruit === "모집중") {
        divStatus.style.color = "#83cbff";
      } else {
        divStatus.style.color = "red";
      }
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
