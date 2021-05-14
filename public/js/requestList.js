const tbody = document.querySelector("tbody");

fetch("/request/list")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const tr = document.createElement("tr");
      const tdCircle = document.createElement("td");
      const tdWriter = document.createElement("td");
      const tdEnroll = document.createElement("td");

      tr.classList.add(`list`);
      tdCircle.classList.add("query");
      tr.appendChild(tdCircle);
      tr.appendChild(tdWriter);
      tr.appendChild(tdEnroll);

      tbody.appendChild(tr);

      tdCircle.innerText = result[i].Regist_name;
      tdWriter.innerText = result[i].User_id;
      tdEnroll.innerText = result[i].Regist_enroll;
    }

    const tdCircle = document.querySelector(".query");
    const CircleList = document.querySelectorAll(".list");
    Array.from(CircleList).forEach((item) => {
      item.addEventListener("click", () => {
        const query = tdCircle.innerText;
        location.href = `/request/detail/${query}`;
      });
    });
  });
