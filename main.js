//-------------------------Player---------------------------

let currentSong = 0;

//DOM player
const music = document.querySelector('#audio');
const barTime = document.querySelector('.bar');
const songName = document.querySelector('.song');
const artistName = document.querySelector('.artist');
const coverPhoto = document.querySelector('.cover');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-b');
const forwardBtn = document.querySelector('.forward');
const backBtn = document.querySelector('.back');

//push or pull the pause label to play button
playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')) {
        music.play();
    } else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
})

//setup music
const setMusic = (i) => {
    barTime.value = 0;

    //access song data from songs array
    let song = songs[i];
    currentSong = i; 

    //input information from the data.js file
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverPhoto.style.backgroundImage = `url('${song.cover}')`;

    //initialize the current time at zero
    currentTime.innerHTML = '0:00';

    //set the limit to the seek bar and also defines the music duration from the file
    setTimeout(() => {
        barTime.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
}

//initialize the function setMusic from the first song in the array songs data.js
setMusic(0);

//put the song time in the good format
const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`
}

//set seek bar current time and ald also go to next song
setInterval(() => {
    barTime.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(barTime.max)) {
        forwardBtn.click();
    }
}, 500)

//set the song current time by using the position of the seek bar
barTime.addEventListener('change', () => {
    music.currentTime = barTime.value;
})

//defining the behavior of forward button
forwardBtn.addEventListener('click', () => {
    if(currentSong >= songs.length - 1){
        currentSong = 0;
    } else {
        currentSong++;
    }
    setMusic(currentSong);
    playMusic();
})

//defining the behavior of back button
backBtn.addEventListener('click', () => {
    if(currentSong <=0){
        currentSong = songs.length - 1;
    } else {
        currentSong--;
    }
    setMusic(currentSong);
    playMusic();
})

//additional function so the music plays everytime we press forward or backward
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
}