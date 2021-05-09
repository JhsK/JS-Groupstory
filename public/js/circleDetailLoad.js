const circleTitle = document.querySelector("#Regist_name");
const circleMaster = document.querySelector("#Regist_vicerepcon");
const circleSubMaster = document.querySelector("#Regist_repcon");
const circleMember = document.querySelector("#Regist_member");
const circleInfo = document.querySelector("#Regist_info");
const circleImage = document.querySelector("#Regist_image");

fetch("/circleLoad")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    const resultJson = result[0];
    circleTitle.innerText = resultJson.Regist_name;
    circleMaster.innerText = "회장: " + resultJson.Regist_vicerepcon;
    circleSubMaster.innerText = "부회장: " + resultJson.Regist_repcon;
    circleMember.innerText = "인원 수: " + resultJson.Regist_member;
    circleInfo.innerText = resultJson.Regist_info;
    circleImage.src = resultJson.Regist_image;
  });
