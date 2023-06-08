const formOrd = document.getElementById('orderForm');

formOrd.addEventListener('submit', (event) => {
  event.preventDefault();
  const fullName = formOrd.elements['fullName'].value;
  const address = formOrd.elements['address'].value;
  const phone = formOrd.elements['phone'].value;

  document.getElementById('loading-popup').style.display = 'flex';

  fetch('/order/submit-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullName, address, phone })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {

      
      document.getElementById('loading-popup').style.display = 'none';



      Swal.fire({
        title: 'Success!',
        text: 'your order was registered, you will receive a call in an instant',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = "/account";
      });
    } else if (data.errorMessage) {

      
      document.getElementById('loading-popup').style.display = 'none';
      Swal.fire({
        title: 'Error!',
        text: 'Cart expired, add elements to cart and try again .',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = "/shop";
      });
     }else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});