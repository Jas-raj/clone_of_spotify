//initialisation of variables
let songIndex = 0;
let audioElement = new Audio("songs/song1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songName = document.getElementById('songName');

let songs = [ //=> these are the elements here
    { songName: "May be my soulmate died - iamthone", filePath: "songs/song1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Butter - BTS", filePath: "songs/song2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Let me love you - Justin biber", filePath: "songs/song3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Excuses - AP Dhillon", filePath: "songs/song4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Let me down slowly - Samon", filePath: "songs/song5.mp3", coverPath: "covers/cover5.jpg" },
    { songName: "Rock-A-Baby - Annie Mary", filePath: "songs/song6.mp3", coverPath: "covers/cover6.jpg" },
]
//to dispay song names and it's coverPath 
songItem.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songNames")[0].innerText = songs[i].songName;

}) 

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        songName.innerText = songs[songIndex].songName;

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
});

//lsiten to events
audioElement.addEventListener('timeupdate', () => {
    // console.log("timeupdate");
    //update seekBar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); //it will give value in percentage
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//to play and pause songs inside the element

//to pause the the song if another one is clicked
const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
} 
//to make the songs play from element
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target)
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        gif.style.opacity = 1;

        //to make the song playing currently
        audioElement.src = `songs/song${songIndex+1}.mp3`;
        songName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        // document.getElementById('songName')[0].innerText = songs.songName;
    })
})
//to play pervious and next song 

document.getElementById('pervious').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    } else{
        songIndex += 1;
    }
    audioElement.src = `songs/song${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    } else{
        songIndex -= 1;
    }
    audioElement.src = `songs/song${songIndex+1}.mp3`;
    songName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})