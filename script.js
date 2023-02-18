const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContianer = document.querySelector('#progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const play = document.getElementById('play');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Ravi Singh',
        img: 'https://picsum.photos/600/700'
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill Machine',
        artist: 'Ravi Singh',
        img: 'https://picsum.photos/600/701'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine',
        artist: 'Ravi Singh',
        img: 'https://picsum.photos/600/702'
    }
]


let isPlaying = false;

// play
function playSong() {
    isPlaying = true
    play.classList.replace('fa-play', 'fa-pause');
    play.setAttribute('title', 'Play')
    music.play()
}

function pauseSong() {
    isPlaying = false;
    play.classList.replace('fa-pause', 'fa-play')
    play.setAttribute('title', 'Pause')
    music.pause()
}

play.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = song.img
}

let songIndex = 0;

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}

// on load - select first song

loadSong(songs[songIndex])

prev.addEventListener('click', prevSong)
next.addEventListener('click', nextSong)


function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        // calculate dispay for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // calculate dispay for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX;
    const { duration } = music;
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration

}


music.addEventListener('timeupdate', updateProgressBar)

music.addEventListener('ended', nextSong)

progressContianer.addEventListener('click', setProgressBar)