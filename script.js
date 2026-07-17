/* =====================================================
   GLORY TO GOD v2.0
   Toddy Official
===================================================== */

const songs = [

{
title:"Pasti Ada Kemenangan",
file:"music/Pasti Ada Kemenangan.mp3"
},

{
title:"Tuhan Pasti Tolong",
file:"music/TUHAN PASTI TOLONG.mp3"
},

{
title:"Dengarlah Doaku",
file:"music/Dengarlah Doaku.mp3"
},

{
title:"Rancangan Mulia",
file:"music/Rancangan Mulia.mp3"
},

{
title:"Yesaya 40",
file:"music/Yesaya 40.mp3"
},

{
title:"Engkau Baik Tuhan",
file:"music/Engkau Baik Tuhan.mp3"
},

{
title:"Hidup Dalam Kasih-Mu",
file:"music/Hidup Dalam Kasih-Mu.mp3"
},

{
title:"Cukuplah Kasih Karunia-Mu",
file:"music/Cukuplah Kasih Karunia-Mu.mp3"
},

{
title:"Rencana Tuhan",
file:"music/Rencana Tuhan.mp3"
},

{
title:"Demi Aku Kau Rela Tersalib",
file:"music/Demi Aku Kau Rela Tersalib.mp3"
},

{
title:"Engkau Sangat Mengasihiku",
file:"music/Engkau Sangat Mengasihiku.mp3"
},

{
title:"Kau Yang Terindah",
file:"music/Kau Yang Terindah.mp3"
},

{
title:"Tidak Ada Yang Mustahil",
file:"music/Tidak Ada Yang Mustahil.mp3"
},

{
title:"Sampai Jumpa Di Keabadian",
file:"music/Sampai Jumpa Di Keabadian.mp3"
}

];

const audio=document.getElementById("audio");
const cover=document.getElementById("cover");
const disc=document.getElementById("disc");

const playBtn=document.getElementById("playBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");

const progress=document.getElementById("progress");
const volume=document.getElementById("volume");

const songTitle=document.getElementById("songTitle");
const artist=document.getElementById("artist");

const currentTime=document.getElementById("currentTime");
const duration=document.getElementById("duration");

const playlist=document.querySelectorAll("#playlist li");

const shareBtn=document.getElementById("shareBtn");
const downloadBtn=document.getElementById("downloadBtn");

const loading=document.getElementById("loading");

let currentSong=0;

function formatTime(sec){

if(isNaN(sec)) return "00:00";

let m=Math.floor(sec/60);

let s=Math.floor(sec%60);

return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}

function loadSong(index){

currentSong=index;

audio.src=songs[index].file;

songTitle.textContent=songs[index].title;

artist.textContent="Toddy Official";

downloadBtn.href=songs[index].file;

downloadBtn.download=songs[index].title+".mp3";

playlist.forEach((item,i)=>{

item.classList.toggle("active",i===index);

});

audio.load();

}
/* =====================================================
   PLAYER CONTROL
===================================================== */

function playSong(){

audio.play();

playBtn.innerHTML="⏸";

disc.classList.add("playing");

}

function pauseSong(){

audio.pause();

playBtn.innerHTML="▶";

disc.classList.remove("playing");

}

playBtn.addEventListener("click",()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

});

/* =====================================================
   NEXT & PREVIOUS
===================================================== */

function nextSong(){

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

}

function prevSong(){

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

}

nextBtn.addEventListener("click",nextSong);

prevBtn.addEventListener("click",prevSong);

/* =====================================================
   PLAYLIST
===================================================== */

playlist.forEach((item,index)=>{

item.addEventListener("click",()=>{

loadSong(index);

playSong();

});

});

/* =====================================================
   PROGRESS BAR
===================================================== */

audio.addEventListener("timeupdate",()=>{

if(audio.duration){

progress.value=(audio.currentTime/audio.duration)*100;

}

currentTime.textContent=formatTime(audio.currentTime);

duration.textContent=formatTime(audio.duration);

});

progress.addEventListener("input",()=>{

if(audio.duration){

audio.currentTime=(progress.value/100)*audio.duration;

}

});

/* =====================================================
   VOLUME
===================================================== */

audio.volume=1;

volume.value=100;

volume.addEventListener("input",()=>{

audio.volume=volume.value/100;

});

/* =====================================================
   AUTO NEXT
===================================================== */

audio.addEventListener("ended",()=>{

nextSong();

});
/* =====================================================
   SHARE ALBUM
===================================================== */

shareBtn.addEventListener("click", async () => {

const shareData = {
title: "GLORY TO GOD",
text: "Dengarkan album rohani GLORY TO GOD oleh Toddy Official.",
url: window.location.href
};

if (navigator.share) {

try{
await navigator.share(shareData);
}catch(e){}

}else{

navigator.clipboard.writeText(window.location.href);

alert("Link album telah disalin ke clipboard.");

}

});

/* =====================================================
   DOWNLOAD
===================================================== */

downloadBtn.addEventListener("click",()=>{

// atribut href dan download sudah diatur
// pada fungsi loadSong()

});

/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loading.style.opacity="0";

loading.style.transition="opacity .8s";

setTimeout(()=>{

loading.style.display="none";

},800);

},1500);

});

/* =====================================================
   KEYBOARD SHORTCUT
===================================================== */

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

if(audio.paused){

playSong();

}else{

pauseSong();

}

}

if(e.code==="ArrowRight"){

nextSong();

}

if(e.code==="ArrowLeft"){

prevSong();

}

});

/* =====================================================
   INITIALIZE
===================================================== */

loadSong(currentSong);

progress.value=0;

currentTime.textContent="00:00";

duration.textContent="00:00";

playBtn.innerHTML="▶";
