let signOutSelect = document.getElementById('signOutSelect')


firebase.auth().onAuthStateChanged(user => {
    if(user == null){
        signOutSelect.style.display = 'none'
        
    }
  })

signOutSelect.addEventListener('click', function(){
    firebase.auth().signOut().then(function(){
        alert('Signing Out Now')
      }).catch(function () {
          console.log("unable to sign out?")
      })
    window.location = "login-comic.html"
})