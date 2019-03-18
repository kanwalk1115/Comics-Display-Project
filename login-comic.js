let database = firebase.database()

let emailTextBox = document.getElementById('emailTextBox')
let passwordTextBox = document.getElementById('passwordTextBox')
let register = document.getElementById('register')

let loginTextBox = document.getElementById('loginTextBox')
let loginPasswordBox = document.getElementById('loginPasswordBox')
let loginButton = document.getElementById('loginButton')

let signOutButton = document.getElementById('signOutButton')
signOutButton.addEventListener('click', function(){

  firebase.auth().signOut().then(function(){
    console.log('signed out')
    console.log(firebase.auth().currentUser)
  }).catch(function () {

  })
})

loginButton.addEventListener('click' , function(){
  let email = emailTextBox.value
  let password = passwordTextBox.value

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (response){
    window.location = "home-page.html"
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;

  });
})

register.addEventListener('click', function(){
  let email = emailTextBox.value
  let password = passwordTextBox.value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user) {
    console.log(user)
  })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)


});
})
