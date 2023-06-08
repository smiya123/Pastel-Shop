const formSetUser = document.getElementsByClassName('userSetForm')[0];
const messageDiv = document.getElementById('userSet-message');

formSetUser.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch('/account/update-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    
    if (data.errorMessage) {
      messageDiv.innerHTML = `<i class="far fa-exclamation-triangle"></i> ${data.errorMessage}`;
      messageDiv.classList.add('error-message');
      setTimeout(() => {
      messageDiv.style.opacity = 1;
      messageDiv.style.transform = 'translateX(0)';
      }, 100);
      
      event.target.reset();
      setTimeout(() => {
        messageDiv.style.transform = 'translateX(-10px)';
        messageDiv.style.opacity = 0;
      }, 5000);
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.classList.remove('error-message');
      }, 5400);
    } else if (data.message) {

      messageDiv.innerHTML = `<i class="far fa-check-square"></i> ${data.message}`;
      messageDiv.classList.add('success-message');
      setTimeout(() => {
        messageDiv.style.opacity = 1;
        messageDiv.style.transform = 'translateX(0)';
        }, 100);
      
      
      event.target.reset();
      setTimeout(() => {
        messageDiv.style.transform = 'translateX(-10px)';
        messageDiv.style.opacity = 0;
      }, 5000);
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.classList.remove('success-message');
      }, 5400);
    }
  })
  .catch(error => {
    console.error(error);
    messageDiv.innerHTML = '<i class="far fa-exclamation-triangle"></i> An error occurred while processing your request. Please try again later.';
    messageDiv.classList.add('error-message');
    
    setTimeout(() => {
      messageDiv.style.opacity = 1;
      messageDiv.style.transform = 'translateX(0)';
      }, 100);

    event.target.reset();
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(-10px)';
        messageDiv.style.opacity = 0;
      }, 5000);
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.classList.remove('error-message');
      }, 5400);
  });
});
