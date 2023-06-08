const loginButton = document.getElementById("login");
const container = document.getElementById("sign-contain");


loginButton.addEventListener("click", () =>{
  container.classList.remove("right-panel-active");
});


const messageDivLog = document.getElementById('login-message');

//login notifs

const Logform = document.getElementById('login-form');


Logform.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  console.log(data);

  fetch('/crm/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    
    if (data.errorMessage) {
      messageDivLog.innerHTML = `<i class="far fa-exclamation-triangle"></i> ${data.errorMessage}`;
      messageDivLog.classList.add('error-message');

      setTimeout(() => {
        messageDivLog.style.opacity = 1;
        messageDivLog.style.transform = 'translateY(0)';
        }, 100);

      event.target.reset();
      setTimeout(() => {
        messageDivLog.style.transform = 'translateY(-10px)';
        messageDivLog.style.opacity = 0;
      }, 5000);
      setTimeout(() => {
        messageDivLog.innerHTML = '';
        messageDivLog.classList.remove('error-message');
      }, 5400);
    } else if (data.Message1){
      window.location.href = '/cart?message=' + encodeURIComponent(data.Message1);

    }else if (data.Message){
      window.location.href = '/account';

    }
  })
    .catch(error => {
    console.error(error);
    messageDivLog.innerHTML = '<i class="far fa-exclamation-triangle"></i> An error occurred while processing your request. Please try again later.';
    messageDivLog.classList.add('error-message');

    setTimeout(() => {
      messageDivLog.style.opacity = 1;
      messageDivLog.style.transform = 'translateY(0)';
      }, 100);

    event.target.reset();setTimeout(() => {
      messageDivLog.style.transform = 'translateY(-10px)';
      messageDivLog.style.opacity = 0;
    }, 5000);
    setTimeout(() => {
      messageDivLog.innerHTML = '';
      messageDivLog.classList.remove('error-message');
    }, 5400);
})});



//static notifs close


var closeSign = document.getElementById("staticSignClose");
var signStaticMes = document.getElementById("signMessage")
closeSign.addEventListener('click', function() {
  signStaticMes.style.transform = 'translateY(-10px)';
  signStaticMes.style.opacity = 0;
});
