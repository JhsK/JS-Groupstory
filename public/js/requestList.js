const tbody = document.querySelector("tbody");

const CreateTag = () => {};
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

      tr.appendChild(tdCircle);
      tr.appendChild(tdWriter);
      tr.appendChild(tdEnroll);

      tbody.appendChild(tr);

      tdCircle.innerText = result[i].Regist_name;
      tdWriter.innerText = result[i].User_id;
      tdEnroll.innerText = result[i].Regist_enroll;
    }
  });
