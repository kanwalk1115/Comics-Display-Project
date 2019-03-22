let videoTrailers = document.getElementById('videoTrailers')
let trailerBox = document.getElementById('trailerBox')
let trailerDescription = document.getElementById('trailerDescription')
let loadMore = document.getElementById('loadMore')

trailerBox.style.width = '500px'
trailerBox.style.height = 0
function displayVideos(limit){
    let URLS = returnMovieURLS()
    let liArray = []
    for(i = 0; i < limit; i++){
        let videoID = URLS[i].URL.split('v=')[1]
        let imageSRC = 'http://i.ytimg.com/vi/' + videoID + '/maxresdefault.jpg'
        liArray.push(`<li class = li-class><a href=# id = '${videoID}' onclick = "playVideo(this.id,'${URLS[i].movie}','${URLS[i].movieURL}')"><img src = '${imageSRC}'></a>
        <h3>${URLS[i].movie}</h3>
        </li>`)
    }
    videoTrailers.innerHTML = liArray.join('')
}


function playVideo(videoID,movie,movieURL){
    let URL = 'https://www.youtube.com/embed/' + videoID
    trailerBox.src = URL
    trailerBox.style.visibility = 'visible'
    trailerBox.style.height = '370px'
    trailerDescription.innerHTML = `You are only watching the trailer. <a target = '_blank' href = "${movieURL}"><u>Watch ${movie} here!</u></a>`
}

function displayMore(){
    loadMore.style.visibility = 'hidden'
    displayVideos(returnMovieURLS().length)
    videoTrailers.style.height = '1em'
}

