const formzi = document.querySelectorAll('.favForm');

formzi.forEach(favForm => {
favForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());


  fetch('/add-to-fav', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    
    if (data.errorMessage) {
      messageDiv.classList.remove('error-message');
      messageDiv.classList.remove('success-message');
      messageDiv.innerHTML = `<i class="far fa-exclamation-triangle"></i> ${data.errorMessage}`;
      messageDiv.classList.add('error-message');

      setTimeout(() => {
        messageDiv.style.opacity = 1;
        messageDiv.style.transform = 'translateY(0)';
        }, 100);

      event.target.reset();
      setTimeout(() => {
        messageDiv.style.transform = 'translateY(-10px)';
        messageDiv.style.opacity = 0;
      }, 5000);
    } else if (data.message){
        messageDiv.classList.remove('success-message');
        messageDiv.classList.remove('error-message');
        messageDiv.innerHTML = `<i class="far fa-check-square"></i> ${data.message}`;
        messageDiv.classList.add('success-message');
        setTimeout(() => {
          messageDiv.style.opacity = 1;
          messageDiv.style.transform = 'translateY(0)';
          }, 100);
        
        
        event.target.reset();
        setTimeout(() => {
          messageDiv.style.transform = 'translateY(-10px)';
          messageDiv.style.opacity = 0;
        }, 5000);
    }
  })
    .catch(error => {
    console.error(error);
    
    messageDiv.classList.remove('success-message');
    messageDiv.classList.remove('error-message');
    messageDiv.innerHTML = '<i class="far fa-exclamation-triangle"></i> An error occurred while processing your request. Please try again later.';
    messageDiv.classList.add('error-message');

    setTimeout(() => {
      messageDiv.style.opacity = 1;
      messageDiv.style.transform = 'translateY(0)';
      }, 100);

    event.target.reset();setTimeout(() => {
      messageDiv.style.transform = 'translateY(-10px)';
      messageDiv.style.opacity = 0;
    }, 5000);
})})});



function deleteFavItem(productId) {
  fetch(`/account/delete-fav/${productId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
      },
  })
  .then(response => response.json())
  .then(data => {

      if (data.success) {
        document.getElementById(`fav-item-${productId}`).remove();
      }
  })
  .catch(error => console.error('Error:', error));
  return false;
}