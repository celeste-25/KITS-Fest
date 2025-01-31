document.getElementById('payment-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch('http://localhost:3000/submit', {
    method: 'POST',
    body: formData, 
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Something went wrong!');
  });
});
