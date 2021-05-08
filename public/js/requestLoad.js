const name = document.querySelector("#Regist_name");
const vicerepcon = document.querySelector("#Regist_vicerepcon");
const repcon = document.querySelector("#Regist_repcon");
const member = document.querySelector("#Regist_member");
const info = document.querySelector("#Regist_info");
const image = document.querySelector("#Regist_image");

fetch("/request/load")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    const resultJson = result[0];
    name.value = resultJson.Regist_name;
    vicerepcon.value = resultJson.Regist_vicerepcon;
    repcon.value = resultJson.Regist_repcon;
    member.value = resultJson.Regist_member;
    info.value = resultJson.Regist_info;
    image.src = resultJson.Regist_image;
  });
