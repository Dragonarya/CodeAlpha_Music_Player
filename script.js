const input = document.querySelector(".search input");
const searchbtn = document.querySelector(".search i");
const songName = document.querySelector(".songname");

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const ctrlicon = document.getElementById("ctrlicon");
const artist = document.querySelector(".artistname")

let songs = [];
let currentIndex = 0;

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;

};

song.ontimeupdate = function () {
    progress.value = song.currentTime;
};

progress.oninput = function () {
    song.currentTime = progress.value;
    song.onvolumechange
};

function playPause() {
    if (ctrlicon.classList.contains("fa-play")) {
        song.play();
        ctrlicon.classList.add("fa-pause");
        ctrlicon.classList.remove("fa-play");
    } else {
        song.pause();
        ctrlicon.classList.remove("fa-pause");
        ctrlicon.classList.add("fa-play");
    }
}
if(song.play()){
    setInterval(() => {
        progress.value = song.currentTime
    }, 500);
}
progress.onchange = function(){
    song.play()
    song.currentTime = progress.value
    ctrlicon.classList.add("fa-pause");
    ctrlicon.classList.remove("fa-play");
}

searchbtn.addEventListener("click", async () => {
    const searchText = input.value.trim();

    if (!searchText) return;

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchText)}&entity=song&limit=20`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
        alert("Song not found");
        return;
    }

    const music = data.results[0];

    // Show song name
    songName.innerText = music.trackName;

    artist.innerHTML = music.artistName

    song.src = music.previewUrl;
    song.load();

    ctrlicon.classList.remove("fa-play");
    ctrlicon.classList.add("fa-pause");

    songs = data.results;
    currentIndex = 0;

    loadSong(currentIndex);
});


function loadSong(index) {
    const music = songs[index];

    song.src = music.previewUrl;
    song.load();

    songName.innerText = music.trackName;

    song.play();

    ctrlicon.classList.remove("fa-play");
    ctrlicon.classList.add("fa-pause");
}

const next = document.getElementById("next");

next.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= songs.length) {
        currentIndex = 0;
    }

    loadSong(currentIndex);
});

const prev = document.getElementById("prev");

prev.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }

    loadSong(currentIndex);
});

song.addEventListener("ended", () => {
    currentIndex++;

    if (currentIndex >= songs.length) {
        currentIndex = 0;
    }

    loadSong(currentIndex);
});