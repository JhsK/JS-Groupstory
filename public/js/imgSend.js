const img = document.getElementById("img");

img.addEventListener("change", (e) => {
  console.log(e.target.files);
  const formData = new FormData();
  console.log(this, this.files);
  formData.append("img", e.target.files[0]);
  axios
    .post("/auth/img", formData)
    .then((res) => {
      document.getElementById("img-url").value = res.data.url;
    })
    .catch((err) => {
      console.error(err);
    });
});
