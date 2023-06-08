const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("sign-contain");

registerButton.addEventListener("click", () =>{
  container.classList.add("right-panel-active");
});


loginButton.addEventListener("click", () =>{
  container.classList.remove("right-panel-active");
});


//register notifs

const form = document.getElementById('registration-form');
const messageDiv = document.getElementById('registration-message');
const messageDivLog = document.getElementById('login-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch('/sign/register', {
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
      messageDiv.style.transform = 'translateY(0)';
      }, 100);
      
      event.target.reset();
      setTimeout(() => {
        messageDiv.style.transform = 'translateY(-10px)';
        messageDiv.style.opacity = 0;
      }, 5000);
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.classList.remove('error-message');
      }, 5400);
    } else if (data.message) {
      container.classList.remove("right-panel-active");

      messageDivLog.innerHTML = `<i class="far fa-check-square"></i> ${data.message}`;
      messageDivLog.classList.add('success-message');
      setTimeout(() => {
        messageDivLog.style.opacity = 1;
        messageDivLog.style.transform = 'translateY(0)';
        }, 450);
      
      
      event.target.reset();
      setTimeout(() => {
        messageDivLog.style.transform = 'translateY(-10px)';
        messageDivLog.style.opacity = 0;
      }, 5000);
      setTimeout(() => {
        messageDivLog.innerHTML = '';
        messageDivLog.classList.remove('success-message');
      }, 5400);
    }
  })
  .catch(error => {
    console.error(error);
    messageDiv.innerHTML = '<i class="far fa-exclamation-triangle"></i> An error occurred while processing your request. Please try again later.';
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
      setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.classList.remove('error-message');
      }, 5400);
  });
});


//login notifs



const Logform = document.getElementById('login-form');


Logform.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch('/sign/login', {
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
