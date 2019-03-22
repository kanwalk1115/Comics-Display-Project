let introText = document.getElementById('introText')

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  try{document.getElementById("main").style.marginLeft = "250px"}
  catch{console.log('Video page doesn\'t shift content when opening/closing nav bar.')}
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  try{document.getElementById("main").style.marginLeft = "0"}
  catch{console.log('Video page doesn\'t shift content when opening/closing nav bar.')}
}

firebase.auth().onAuthStateChanged(user => {
  if(user == null){
    try{introText.innerHTML = 'Diehard Marvel Fans Only. <u>Click Here</u> to Sign In.'}
    catch{console.log("Intro text doesn't load on this page.")}
  }
  else{
    try{
      introText.innerHTML = `Welcome, ${user.email}! <u>Click Here</u> to Add Your Favorite Heroes.`
      introText.href = 'favorites.html'
  }
    catch{console.log("Intro text doesn't load on this page.")}
  }
})