/*coding the mobile navbar*/

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


//email popup

const form = document.getElementById('newsletter-form');
if (form){
form.addEventListener('submit', (event) => {
  event.preventDefault();


  const email = form.emailGet.value;

  fetch('/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
  .then(response => response.json())
  .then(data => {
    
    if (data.errorMessage) {
      Swal.fire({
        title: 'Error!',
        text: 'Email already signed up.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        event.target.reset();
      });
    } else if (data.message){
      Swal.fire({
        title: 'Success!',
        text: 'Email submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        event.target.reset();
      });

    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

}


//product box click redirect id


document.querySelectorAll('.product-link').forEach(function(product) {
  product.addEventListener('click', function() {
    const productId = this.getAttribute('data-product-id');
    window.location.href = '/product/' + productId;
  });
});

//product images switch


var main = document.getElementById("MainImg");
var smallimg = document.getElementsByClassName("small-img");
if(smallimg[0]){
smallimg[0].onclick=function(){
  console.log("yes");
  main.src = smallimg[0].src;
}
}

if(smallimg[1]){
smallimg[1].onclick=function(){
  console.log("yes");
  main.src = smallimg[1].src;
}
}
if(smallimg[2]){
smallimg[2].onclick=function(){
  main.src = smallimg[2].src;
}
}
if(smallimg[3]){
smallimg[3].onclick=function(){
  main.src = smallimg[3].src;
}
}


