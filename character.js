let marvelCharacters = document.getElementById('marvelCharacters')


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
          console.log(data)
           let literalArray=data.data.result.map((character)=>{
             return`<li><h1>${character.name}</h1>
            <p>${character.description}</p>
            <img src = ${character.thumbnail.path}/portrait_xlarge.jpg>
            <a href = '${character.urls[1].url}'>Read More</a>
            <h3>Recent Comics that ${character.name}'s been in: </h3>
            <div id="${createComicDetailsUniqueId(itemIndex)}"></div></li>
            `})
            marvelCharacters.innerHTML=literalArray
          //  displayDetails(character.id,itemIndex)
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
            if(response2.data.results[i].thumbnail.path != 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            content.push(`<img src = ${response2.data.results[i].thumbnail.path}/portrait_xlarge.jpg>`)}

        }
        content.push(`</ul>`)
        latestComicsDiv.innerHTML = content.join('')

    })
}
