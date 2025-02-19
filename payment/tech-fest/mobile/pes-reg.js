const pesForm = document.forms['groupEventForm'];
pesForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(pesForm);
  
  let fr = new FileReader();
  fr.onloadend = () => {
    let base64Data = fr.result.split("base64,")[1];
    formData.append("base64", base64Data);
    formData.append("imageType", fileInput.files[0].type);
    formData.append("imageName", fileInput.files[0].name);
    
    fetch(pesForm.action, { method: 'POST', body: formData, mode: "no-cors" })
      .then(() => {
        alert("Thank you! Your E-Football registration details are submitted.");
        pesForm.reset();
        preview.style.display = "none";
      })
      .catch(error => console.error('Error!', error.message));
  };
  fr.readAsDataURL(fileInput.files[0]);
});
