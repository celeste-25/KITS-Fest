const bgmiForm = document.forms['groupEventForm'];

bgmiForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(bgmiForm);

  let fr = new FileReader();
  fr.onloadend = () => {
    let base64Data = fr.result.split("base64,")[1];
    formData.append("base64", base64Data);
    formData.append("imageType", fileInput.files[0].type);
    formData.append("imageName", fileInput.files[0].name);

    fetch(bgmiForm.action, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.result === 'success') {
          bgmiForm.reset();
          preview.style.display = "none";
        }
      })
      .catch(error => {
        alert('Error submitting your registration. Please try again later.');
        console.error('Error!', error.message);
      });
  };
  fr.readAsDataURL(fileInput.files[0]);
});
