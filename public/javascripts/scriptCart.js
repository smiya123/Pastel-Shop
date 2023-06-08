
const forms = document.querySelectorAll('.proForm');
const messageDiv = document.getElementById('cartMessage');

forms.forEach(CartForm => {
CartForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());


  fetch('/add-to-cart', {
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

//cart delete element



function deleteCartItem(productId) {
  fetch(`/cart/delete-cart/${productId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
      },
  })
  .then(response => response.json())
  .then(data => {

      if (data.success) {
        document.getElementById(`cart-item-${productId}`).remove();
        document.getElementById('totalCart').innerHTML = `$ ${data.total}`; 
        document.getElementById('totalCartS').innerHTML = `$ ${data.total}`;
      }
  })
  .catch(error => console.error('Error:', error));
  return false;
}


function minusqty(productId, qtyId, subtotId) {
  fetch(`/cart/minus-qty/${productId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
      },
  })
  .then(response => response.json())
  .then(data => {

      if (data.success) {
          document.getElementById(qtyId).innerHTML = `${data.qty}`;
          document.getElementById(subtotId).innerHTML = `$ ${data.sub}`;
          document.getElementById('totalCart').innerHTML = `$ ${data.total}`;
          document.getElementById('totalCartS').innerHTML = `$ ${data.total}`;
        }else if(data.errorMessage){
          messageDiv.innerHTML = `<i class="far fa-exclamation-triangle"></i> ${data.errorMessage}`;
          messageDiv.classList.add('error-message');

          setTimeout(() => {
            messageDiv.style.opacity = 1;
            messageDiv.style.transform = 'translateY(0)';
          }, 100);

          setTimeout(() => {
            messageDiv.style.transform = 'translateY(-10px)';
            messageDiv.style.opacity = 0;
          }, 5000);
        }
      }
  )
  .catch(error => console.error('Error:', error));
  return false;
}



function addqty(productId, qtyId, subtotId) {
  fetch(`/cart/add-qty/${productId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
      },
  })
  .then(response => response.json())
  .then(data => {

      if (data.success) {
        document.getElementById(qtyId).innerHTML = `${data.qty}`;
        document.getElementById(subtotId).innerHTML = `$ ${data.sub}`;
        document.getElementById('totalCart').innerHTML = `$ ${data.total}`;
        document.getElementById('totalCartS').innerHTML = `$ ${data.total}`;       
      }else if(data.errorMessage){
        messageDiv.innerHTML = `<i class="far fa-exclamation-triangle"></i> ${data.errorMessage}`;
        messageDiv.classList.add('error-message');

        setTimeout(() => {
          messageDiv.style.opacity = 1;
          messageDiv.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
          messageDiv.style.transform = 'translateY(-10px)';
          messageDiv.style.opacity = 0;
        }, 5000);
      }

  })
  .catch(error => console.error('Error:', error));
  return false;
}






//static notifs close


var closeCart = document.getElementById("staticCartClose");
var cartStaticMes = document.getElementById("cartStaticMessage")
closeCart.addEventListener('click', function() {
  cartStaticMes.style.transform = 'translateY(-10px)';
  cartStaticMes.style.opacity = 0;
});


