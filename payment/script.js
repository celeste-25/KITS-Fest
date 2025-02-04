const scriptURL = 'https://script.google.com/macros/s/AKfycbwfuel8Q3p07r90k9r4aJ9cOSOmnqHJ6KNkLVWy-H5leSuG2-hlfpctnJKUOa8PQz53/exec';
const form = document.forms['celeste25'];

form.addEventListener('submit', e => {
  e.preventDefault();

  // Create a FormData object to hold the form data, including the file
  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => alert("Thank you! Form is submitted"))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message));
});
