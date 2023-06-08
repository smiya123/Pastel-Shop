        // Sélectionner les deux divs
        var divChatbot = document.getElementById('divChatbot');
        var divIconeChatbot = document.getElementById('chatbot-logo');
        var divclose = document.getElementById('divclose');

        // Masquer la div2 initialement
        divChatbot.style.display = 'none';

        // Ajouter un gestionnaire d'événement pour le clic sur div1
        divIconeChatbot.addEventListener('click', function() {
          // Vérifier l'état actuel de div2 et changer son affichage
          if (divChatbot.style.display === 'none') {    
            divChatbot.style.display = 'block'; 
            divIconeChatbot.style.display = 'none';
          } 
        });
        divclose.addEventListener('click', function() {
            divIconeChatbot.style.display = 'block'; 
            divChatbot.style.display = 'none'; 
            
        });

       // afficher la premiere et masquer les autres 
       // Sélectionner la première div avec la classe "divA" et l'afficher
          var firstslide = document.querySelector('.slider');
          if (firstslide) {
            firstslide.style.display = 'flex';
          }
         

          // Sélectionner toutes les div avec la classe "divA" sauf la première et les masquer
          var otherDivAs = document.querySelectorAll('.slider:not(:first-child)');
          if(otherDivAs) {
          otherDivAs.forEach(function(ele) {
            ele.style.display = 'none';
          }); 
          }
          var divNewproducts=document.getElementById('divNewproducts');
          if (divNewproducts){
            divNewproducts.style.display='none';
          }

let numero = 0;
var nbrslide = document.querySelectorAll('.slider').length;
function ChangeSlide(sens) {
       // Cacher le slide actuel
        var currentSlideElement = document.getElementsByClassName('slider');
       // currentSlideElement[numero].classList.remove('visible');
       currentSlideElement[numero].style.display = 'none';
        // passer au slide suivant
    numero = numero + sens;
    if (numero < 0)
        numero = nbrslide - 1;
    if (numero > nbrslide - 1)
        numero = 0;
    var currentSlideElement = document.getElementsByClassName('slider');
        currentSlideElement[numero].style.display = 'flex';
}
var btn_Menu = document.getElementById('btn_Menu');
var sectionChat =document.getElementById('sectionChat');
var response1=document.getElementById('response1');
var bot_res=document.getElementById('bot_res');
var bot_subscribe=document.getElementById('bot_subscribe');
var email_registred=document.getElementById('email_registred');
var bot_issues=document.getElementById('bot_issues');
var issues_sent=document.getElementById('issues_sent');
var email1=document.getElementById('email');
var message1=document.getElementById('message');

function seeNewproduct(){
    btn_Menu.style.display='block';
    divNewproducts.style.display='block';
    sectionChat.innerHTML="";
    sectionChat.appendChild(divNewproducts);
    sectionChat.appendChild(btn_Menu);
}

function seeMenu(){
  response1.style.display='flex';
  sectionChat.innerHTML="";
  sectionChat.appendChild(bot_res);
  sectionChat.appendChild(response1);

}

function subscribe(){
  bot_subscribe.style.display='block';
  sectionChat.innerHTML="";
  sectionChat.appendChild(bot_subscribe);
  btn_Menu.style.display='block';
  sectionChat.appendChild(btn_Menu);
}


function SomeIssues(){
  bot_issues.style.display='block';
  sectionChat.innerHTML="";
  sectionChat.appendChild(bot_issues);
  btn_Menu.style.display='block';
  sectionChat.appendChild(btn_Menu);
}


IconSend.addEventListener("click",function()
{
  
  sectionChat.innerHTML="";
  issues_sent.style.display="block";
  sectionChat.appendChild(issues_sent);
  btn_Menu.style.display='block';
  sectionChat.appendChild(btn_Menu);
  var email = email1.value;
  var message = message1.value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/send-message');
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('E-mail envoyé avec succès');
    } else {
      console.error('Erreur lors de l\'envoi du message');
    }
  };
  
  xhr.send(JSON.stringify({ email: email, message:message }));
});


// pour newsletter
document.getElementById('icone').addEventListener('click', function() {
  bot_subscribe.style.display='block';
  sectionChat.innerHTML="";
  email_registred.style.display="block";
  sectionChat.appendChild(bot_subscribe);
  sectionChat.appendChild(email_registred);
  btn_Menu.style.display='block';
  sectionChat.appendChild(btn_Menu);

  var email = document.getElementById('mail').value; 
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/email');
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('E-mail enregistré avec succès');
    } else {
      console.error('Erreur lors de l\'enregistrement de l\'e-mail');
    }
  };
  
  xhr.send(JSON.stringify({ email: email }));
});