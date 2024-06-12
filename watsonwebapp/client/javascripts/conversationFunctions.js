/*
Constants
TO-DO: refactor these variables to another configuration file?
*/
avatar_img_src = '/images/person1_avatar.png';
watson_img_src = '/images/watson_avatar.png';

var username = prompt('Enter your username');

/*
This function runs when the user clicks the "Send" button.
It will grab the message from the input text box (user_retrieve_message())
then display that message into the chat logs (user_display_message())
*/
async function button_send() {
  var user_message = user_retrieve_message();
  if (user_message.length > 0) {
    user_display_message(user_message);
    auto_scroll_chatMsgs();
    $.post('', {text: user_message, user: username},
      function(data, status, xhr) {
        watson_message(data[0]);
        auto_scroll_chatMsgs();
      }
    );
  }
  return user_message;
}

function auto_scroll_chatMsgs() {
  var chatMsgs = document.getElementsByClassName("chatMsgs")[0];
  chatMsgs.scrollTop = chatMsgs.scrollHeight;  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
Returns the message and clears it from input text box
*/
function user_retrieve_message() {
  var userInputText = document.getElementById("user_input").value;
  document.getElementById("user_input").value = "";
  return userInputText;
}

/*
Displays the input message into the chat logs
*/
function user_display_message(userInputText) {
  // create new div for chat message
  var newDiv = document.createElement('div');
  newDiv.className = "container darker";

  // create the avatar img
  var newImg = document.createElement('img');
  newImg.setAttribute("src", avatar_img_src);
  newImg.setAttribute("alt", "Avatar");
  newImg.setAttribute("class", "right");
  newImg.setAttribute("style", "width:100%");
  newDiv.appendChild(newImg);
  
  // create the paragraph
  var newP = document.createElement('p')
  newP.setAttribute("margin", "10px 0");
  newP.appendChild(document.createTextNode(userInputText));
  newDiv.appendChild(newP);

  // put up the user's new message
  var body = document.getElementsByClassName('chatMsgs')[0];
  body.appendChild(newDiv);
}

/*
This function currently just displays some text to be delivered by Watson
*/
function watson_message(watsonText) {
  // create div for Watson's message
  var responseDiv = document.createElement('div');
  responseDiv.className = "container";

  // create Watson's avatar img
  var responseImg = document.createElement('img');
  responseImg.setAttribute("src", watson_img_src);
  responseImg.setAttribute("alt", "Avatar");
  responseImg.setAttribute("class", "left");
  responseImg.setAttribute("style", "width:100%");
  responseDiv.appendChild(responseImg);
  
  // create Watson's paragraph
  var responseP = document.createElement('p')
  responseP.setAttribute("margin", "10px 0");
  responseP.appendChild(document.createTextNode(watsonText));
  responseDiv.appendChild(responseP);

  // put up Watson's new message
  var body = document.getElementsByClassName('chatMsgs')[0];
  body.appendChild(responseDiv);
}
