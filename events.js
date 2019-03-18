let marvelEvents = document.getElementById('marvelEvents')      



function displayData(){
    fetch("https://gateway.marvel.com/v1/public/events?limit=20&ts=1&orderBy=-startDate&apikey=d11ae31dc048dbd19178f875e7dc3ddf&hash=1b14ced7bbcdb443b4ed46455253af59")
    .then(response => response.json())
    .then(data => {
            marvelEvents.innerHTML = `<li>`
        for(let i = 0; i < 21; i ++){
            marvelEvents.innerHTML = marvelEvents.innerHTML + 
            `<h1>${data.data.results[i].title}</h1>
            <p>${data.data.results[i].description}</p>
            <img src = ${data.data.results[i].thumbnail.path}/portrait_xlarge.jpg>
            <a href = '${data.data.results[i].urls[0].url}'>Read More</a>
            `}
            marvelEvents.innerHTML = marvelEvents.innerHTML + `</li>`

        }
        )
    }

