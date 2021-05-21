console.log("test");
const joinForm = document.querySelector("#joinForm");
const password = document.querySelector("#joinPassword");
const Repassword = document.querySelector("#joinRePassword");
const submitBtn = document.querySelector("#submitBtn");

const inspection =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

submitBtn.addEventListener("click", () => {
  if (!inspection.test(password.value)) {
    alert(
      "비밀번호 작성 시 숫자, 영문, 특수문자 각 1자리 이상이며 8자 이상 작성해주세요"
    );
  } else {
    if (!(password.value === Repassword.value)) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      submitBtn.type = "submit";
    }
  }
});
