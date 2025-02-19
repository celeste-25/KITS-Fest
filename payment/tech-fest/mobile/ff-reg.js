const ffForm = document.forms['groupEventForm'];
ffForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(ffForm);
  
  let fr = new FileReader();
  fr.onloadend = () => {
    let base64Data = fr.result.split("base64,")[1];
    formData.append("base64", base64Data);
    formData.append("imageType", fileInput.files[0].type);
    formData.append("imageName", fileInput.files[0].name);
    
    fetch(ffForm.action, { method: 'POST', body: formData, mode: "no-cors" })
      .then(() => {
        alert("Thank you! Your Free Fire registration details are submitted.");
        ffForm.reset();
        preview.style.display = "none";
      })
      .catch(error => console.error('Error!', error.message));
  };
  fr.readAsDataURL(fileInput.files[0]);
});
