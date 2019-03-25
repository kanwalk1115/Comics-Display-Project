let marvelEvents = document.getElementById('marvelEvents')



function displayData(){
    fetch("https://gateway.marvel.com/v1/public/events?limit=20&ts=1&orderBy=-startDate&apikey=d11ae31dc048dbd19178f875e7dc3ddf&hash=1b14ced7bbcdb443b4ed46455253af59")
    .then(response => response.json())
    .then(data => {
            marvelEvents.innerHTML = `<li>`
        for(let i = 0; i < 21; i ++){
            marvelEvents.innerHTML = marvelEvents.innerHTML +
            `<div class = "container">
            
                <br>
                <br>
                <br>
                <div class="card mb-3" style="max-width: 540px;">
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <img src="${data.data.results[i].thumbnail.path}/portrait_xlarge.jpg" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="">${data.data.results[i].title}</h5>
                        <p class="card-text">${data.data.results[i].description}</p>
                        <a href = '${data.data.results[i].urls[0].url}'>Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
                <br>
                <br>
                <hr width="75%">
            </div>
      `}


        }
        )
    }

    firebase.auth().onAuthStateChanged(user => {
      if(user == null){
        introText.innerHTML = 'Remember to Sign In!'
      }
      else{
        introText.innerHTML = ``
      }
    })