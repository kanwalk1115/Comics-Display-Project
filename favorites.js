let marvelCharacters = document.getElementById('marvelCharacters')
let textSubmit = document.getElementById('textSubmit')
let database = firebase.database()
var heroArray = [] 

function arrayHeroes() {
    //ideally get the heroarray from the firebase
    let currentUser = getCurrentUser()
    database.ref(`users/${currentUser}/favorites`)
    .on('value',function(snapshot){
    snapshot.forEach((childSnapshot) => {
        heroArray.push(childSnapshot.val().hero)
    })
    })
    heroArray.forEach(item => {
        displayData(item, heroArray.indexOf(item))
    })
}

function getCurrentUser(){
    let user = firebase.auth().currentUser();
    return user
}

function createComicDetailsUniqueId(itemIndex) {
    return `${itemIndex}latestComicsDiv`
}

function displayData(item, itemIndex){
    fetch("https://gateway.marvel.com/v1/public/characters?name=" + item.replace(" ","%20") + "&ts=1&apikey=d11ae31dc048dbd19178f875e7dc3ddf&hash=1b14ced7bbcdb443b4ed46455253af59")
    .then(response => response.json())
    .then(data => {
        marvelCharacters.innerHTML = marvelCharacters.innerHTML + 
            `<li><h1>${data.data.results[0].name}</h1>
            <p>${data.data.results[0].description}</p>
            <img src = ${data.data.results[0].thumbnail.path}/portrait_xlarge.jpg>
            <a href = '${data.data.results[0].urls[1].url}'>Read More</a>
            <h3>Recent Comics that ${data.data.results[0].name}'s been in: </h3>
            <div id="${createComicDetailsUniqueId(itemIndex)}"></div></li>
            `
            displayDetails(data.data.results[0].id,itemIndex)
        }
        )
    }

function displayDetails(charId,itemIndex){
    fetch('https://gateway.marvel.com/v1/public/characters/' + charId + '/series?ts=1&orderBy=-startYear&apikey=d11ae31dc048dbd19178f875e7dc3ddf&hash=1b14ced7bbcdb443b4ed46455253af59')
    .then(response => response.json())
    .then(response2 => {

        let latestComicsDiv = document.getElementById(`${itemIndex}latestComicsDiv`)
        let content = []
        content.push(`<ul id = 'comicSeriesListUL'>Recent Comic Series lol`)
        for(let i = 0; i < 11; i ++){
            content.push(`<li><a href = '${response2.data.results[i].urls[0].url}'>${response2.data.results[i].title}</a></li>`)            
        }
        content.push(`</ul>`)
        latestComicsDiv.innerHTML = content.join('')
            
    })
}

textSubmit.addEventListener('click', () => {
    let textField = document.getElementById('textField')
    heroArray.push(textField.value)
    displayData(textField.value,heroArray.indexOf(textField.value))
    let favoritesAdd = database.ref(`users/${currentUser}/favorites`)    
    favoritesAdd.push({
      hero: textField.value
    })
})
