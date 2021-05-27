const circleTitle = document.querySelector("#Circle_name");
const circleMaster = document.querySelector("#Circle_vicerepcon");
const circleSubMaster = document.querySelector("#Circle_repcon");
const circleMember = document.querySelector("#Circle_member");
const circleInfo = document.querySelector("#Circle_info");
const circleImage1 = document.querySelector("#Circle_image1");
const circleImage2 = document.querySelector("#Circle_image2");
const circleRecruit = document.querySelector("#Circle_recurit");

fetch("/circleLoad")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result[0]);
    const resultJson = result[0];
    circleTitle.innerText = resultJson.Circle_name;
    circleMaster.innerText = "회장: " + resultJson.Circle_vicerepcon;
    circleSubMaster.innerText = "부회장: " + resultJson.Circle_repcon;
    circleMember.innerText = "인원 수: " + resultJson.Circle_member;
    circleInfo.innerText = resultJson.Circle_info;
    circleImage1.src = resultJson.Circle_image.img1;
    circleImage2.src = resultJson.Circle_image.img2;
    circleRecruit.innerText = resultJson.Circle_recruit;
  });
