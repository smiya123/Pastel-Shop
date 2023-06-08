const formCon = document.getElementById('contactForm');

formCon.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = formCon.elements['name'].value;
  const email = formCon.elements['email'].value;
  const subject = formCon.elements['subject'].value;
  const message = formCon.elements['message'].value;

  document.getElementById('loading-popup').style.display = 'flex';
  
  fetch('/contact/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, subject, message })
  })
  .then(response => {
    if (response.ok) {

      document.getElementById('loading-popup').style.display = 'none';


      Swal.fire({
        title: 'Success!',
        text: 'Email submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        event.target.reset();
      });
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});