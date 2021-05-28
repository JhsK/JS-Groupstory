const cardListContainer = document.querySelector(".cardListContainer");
const reg = /(#[^\s#]+)/g;

fetch("/main")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    // console.log(result[0].Circle_image.img1);
    for (let i = 0; i < result.length; i++) {
      const divContent = document.createElement("div");
      const img = document.createElement("img");
      const divText = document.createElement("div");
      const divTitle = document.createElement("div");
      const divStatus = document.createElement("div");
      const divTagContainer = document.createElement("div");

      divContent.classList.add("cardListContent");
      divText.classList.add("cardListText");
      divTitle.classList.add("cardListTitle");
      divStatus.classList.add("cardListStatus");
      divTagContainer.classList.add("cardTagContainer");

      divText.appendChild(divTitle);
      divText.appendChild(divStatus);
      divContent.appendChild(img);
      divContent.appendChild(divText);
      divContent.appendChild(divTagContainer);
      cardListContainer.appendChild(divContent);

      img.src = result[i].Circle_image.img1;
      img.alt = result[i].Circle_name;
      divTitle.innerText = result[i].Circle_name;
      divStatus.innerText = result[i].Circle_recruit;

      const tag = result[i].Circle_info;
      const tagArray = tag.match(reg);

      if (tagArray) {
        tagArray.map((item) => {
          const tags = document.createElement("span");
          tags.innerText = item;
          divTagContainer.appendChild(tags);
        });
      }

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
