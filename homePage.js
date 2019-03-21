let introText = document.getElementById('introText')

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

firebase.auth().onAuthStateChanged(user => {
  if(user == null){
    introText.innerHTML = 'Welcome to MarvelFanatic! Click Here to Sign In.'
  }
  else{
    introText.innerHTML = `Welcome, ${user.email}! Click Here to Add Your Favorite Heroes.`
    introText.href = 'favorites.html'
  }
})