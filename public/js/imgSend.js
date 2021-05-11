const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

img1.addEventListener("change", (e) => {
  console.log(e.target.files);
  const formData = new FormData();
  formData.append("img", e.target.files[0]);
  axios
    .post("/auth/img1", formData)
    .then((res) => {
      document.getElementById("img-url").value = res.data.url;
    })
    .catch((err) => {
      console.error(err);
    });
});

img2.addEventListener("change", (e) => {
  console.log(e.target.files);
  const formData = new FormData();
  formData.append("img", e.target.files[0]);
  axios
    .post("/auth/img2", formData)
    .then((res) => {
      document.getElementById("img-url2").value = res.data.url;
    })
    .catch((err) => {
      console.error(err);
    });
});
