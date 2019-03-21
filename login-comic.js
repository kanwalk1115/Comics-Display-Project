let database = firebase.database()

let emailTextBox = document.getElementById('emailTextBox')
let passwordTextBox = document.getElementById('passwordTextBox')
let register = document.getElementById('register')

let loginTextBox = document.getElementById('loginTextBox')
let loginPasswordBox = document.getElementById('loginPasswordBox')
let loginButton = document.getElementById('loginButton')
let wrongPassword = document.getElementById('wrongPassword')
let registerNotification = document.getElementById('registerNotification')
let signOutButton = document.getElementById('signOutButton')
signOutButton.addEventListener('click', function(){

  firebase.auth().signOut().then(function(){
    console.log('signed out')
    console.log(firebase.auth().currentUser)
  }).catch(function () {

  })
})

loginButton.addEventListener('click' , function(){
  let email = loginTextBox.value
  let password = loginPasswordBox.value

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (response){
    wrongPassword.innerHTML = 'Logging in now. Welcome!'
    window.location = "homePage.html"
  })
  .catch(function(error){
    wrongPassword.innerHTML = 'Incorrect username/password combination.'

  });
})

register.addEventListener('click', function(){
  let email = emailTextBox.value
  let password = passwordTextBox.value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user) {
    registerNotification.innerHTML = `Username ${email} has been created. Sign in below!` 
  })
    .catch(function(error) {
    registerNotification.innerHTML = `Your account wasn\'t created. Make sure your password is more than 6 characters and you have a valid email.` 
      


});
})
