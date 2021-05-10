console.log("test");
const joinForm = document.querySelector("#joinForm");
const password = document.querySelector("#joinPassword");
const Repassword = document.querySelector("#joinRePassword");
const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", () => {
  if (!(password.value === Repassword.value)) {
    alert("비밀번호가 일치하지 않습니다.");
  } else {
    submitBtn.type = "submit";
  }
});
