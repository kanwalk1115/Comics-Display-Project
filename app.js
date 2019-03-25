let marvelCharacters = document.getElementById('marvelCharacters')
let searchSubmit = document.getElementById('searchSubmit')

document.body.onload = function() {
  arrayHeroes()
}


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



function arrayHeroes() {
    heroArray = ['iron man','captain america','thor','black widow', 'black panther','spider-man']
    heroArray.forEach(item => {
        displayData(item, heroArray.indexOf(item))
    })
}


function createComicDetailsUniqueId(itemIndex) {
    return `${itemIndex}latestComicsDiv`
}

function displayData(item, itemIndex){
    fetch("https://gateway.marvel.com/v1/public/characters?name=" + item.replace(" ","%20") + "&ts=1&apikey=d11ae31dc048dbd19178f875e7dc3ddf&hash=1b14ced7bbcdb443b4ed46455253af59")
    .then(response => response.json())
    .then(data => {
      if(data.data.results.length != 0){
        marvelCharacters.innerHTML = marvelCharacters.innerHTML +
           `<div class="card hero" style="width: 18rem;">
                    <img src="${data.data.results[0].thumbnail.path}/portrait_xlarge.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.data.results[0].name}</h5>
                      <p class="card-text">${data.data.results[0].description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item clear">Recent Comics that ${data.data.results[0].name}'s been in (click comic to read more): </li>
                    </ul>
                    <div class="card-body" id="${createComicDetailsUniqueId(itemIndex)}">
                      <a href="${data.data.results[0].urls[1].url}" class="card-link">Read More</a>
                    </div>
              </div>
            `
            displayDetails(data.data.results[0].id,itemIndex)
    }
    else{
      marvelCharacters.innerHTML = "This hero isn\'t in the database. Are you sure you spelled the name correctly?"
    }
        }
        )
    }

function displayDetails(charId,itemIndex){
    fetch('https://gateway.marvel.com/v1/public/characters/' + charId + '/series?ts=1&orderBy=-startYear&apikey=d11ae31dc048dbd19178f875e7dc3ddf&hash=1b14ced7bbcdb443b4ed46455253af59')
    .then(response => response.json())
    .then(response2 => {

        let latestComicsDiv = document.getElementById(`${itemIndex}latestComicsDiv`)
        let content = []
        content.push(`<ul id = 'comicSeriesListUL'>`)
        for(let i = 0; i < 11; i ++){
            content.push(`<li><a href = '${response2.data.results[i].urls[0].url}'>${response2.data.results[i].title}</a></li>`)
            if(response2.data.results[i].thumbnail.path != 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            content.push(`<img src = ${response2.data.results[i].thumbnail.path}/portrait_xlarge.jpg>`)}

        }
        content.push(`</ul>`)
        latestComicsDiv.innerHTML = content.join('')

    })
}

searchSubmit.addEventListener('click', function(){
  marvelCharacters.innerHTML = ''
  let searchText = document.getElementById('searchText').value
  try{
  displayData(searchText,0)
  }
  catch{
    alert('hi')
  }
})
