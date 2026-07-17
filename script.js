/* ==========================================================
   GLORY TO GOD v3.1
   Professional Edition
   Part 1
========================================================== */

/* ==========================
   SONG LIST
========================== */

const songs = [
  { title: "Pasti Ada Kemenangan", artist: "Toddy Official", file: "music/Pasti Ada Kemenangan.mp3" },
  { title: "Tuhan Pasti Tolong", artist: "Toddy Official", file: "music/Tuhan Pasti Tolong.mp3" },
  { title: "Dengarlah Doaku", artist: "Toddy Official", file: "music/Dengarlah Doaku.mp3" },
  { title: "Rancangan Mulia", artist: "Toddy Official", file: "music/Rancangan Mulia.mp3" },
  { title: "Yesaya 40", artist: "Toddy Official", file: "music/Yesaya 40.mp3" },
  { title: "Engkau Baik Tuhan", artist: "Toddy Official", file: "music/Engkau Baik Tuhan.mp3" },
  { title: "Hidup Dalam Kasih-Mu", artist: "Toddy Official", file: "music/Hidup Dalam Kasih-Mu.mp3" },
  { title: "Cukuplah Kasih Karunia-Mu", artist: "Toddy Official", file: "music/Cukuplah Kasih Karunia-Mu.mp3" },
  { title: "Rencana Tuhan", artist: "Toddy Official", file: "music/Rencana Tuhan.mp3" },
  { title: "Demi Aku Kau Rela Tersalib", artist: "Toddy Official", file: "music/Demi Aku Kau Rela Tersalib.mp3" },
  { title: "Engkau Sangat Mengasihiku", artist: "Toddy Official", file: "music/Engkau Sangat Mengasihiku.mp3" },
  { title: "Kau Yang Terindah", artist: "Toddy Official", file: "music/Kau Yang Terindah.mp3" },
  { title: "Tidak Ada Yang Mustahil", artist: "Toddy Official", file: "music/Tidak Ada Yang Mustahil.mp3" },
  { title: "Sampai Jumpa Di Keabadian", artist: "Toddy Official", file: "music/Sampai Jumpa Di Keabadian.mp3" }
];

/* ==========================
   ELEMENTS
========================== */

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const favoriteBtn = document.getElementById("favoriteBtn");

const shareBtn = document.getElementById("shareBtn");
const downloadBtn = document.getElementById("downloadBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");

const disc = document.getElementById("disc");

const loading = document.getElementById("loading");

const playlistItems = document.querySelectorAll("#playlist li");

/* ==========================
   PLAYER STATE
========================== */

let currentSong = 0;
let isShuffle = false;
let repeatMode = "off";

/* ==========================
   FORMAT TIME
========================== */

function formatTime(seconds){

    if(isNaN(seconds)) return "00:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return (
        String(min).padStart(2,"0") +
        ":" +
        String(sec).padStart(2,"0")
    );

}

/* ==========================
   LOAD SONG
========================== */

function loadSong(index){

    currentSong = index;

    audio.src = songs[index].file;

    songTitle.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    downloadBtn.href = songs[index].file;

    downloadBtn.download =
        songs[index].title + ".mp3";

    playlistItems.forEach((item,i)=>{

        item.classList.toggle(
            "active",
            i===index
        );

    });

}

/* ==========================
   PLAY
========================== */

function playSong(){

    audio.play();

    playBtn.textContent = "⏸";

    disc.classList.add("playing");

}

/* ==========================
   PAUSE
========================== */

function pauseSong(){

    audio.pause();

    playBtn.textContent = "▶";

    disc.classList.remove("playing");

}

/* ==========================
   PLAY BUTTON
========================== */

playBtn.addEventListener("click",()=>{

    if(audio.paused){

        playSong();

    }else{

        pauseSong();

    }

});

/* ==========================
   INITIAL SONG
========================== */

loadSong(currentSong);
/* ==========================================================
   GLORY TO GOD v3.1
   Professional Edition
   Part 2
========================================================== */

/* ==========================
   NEXT SONG
========================== */

function nextSong(){

    if(isShuffle){

        let random;

        do{

            random = Math.floor(
                Math.random()*songs.length
            );

        }while(random===currentSong);

        loadSong(random);

    }else{

        currentSong++;

        if(currentSong>=songs.length){

            currentSong=0;

        }

        loadSong(currentSong);

    }

    playSong();

}

/* ==========================
   PREVIOUS SONG
========================== */

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

/* ==========================
   PLAYLIST CLICK
========================== */

playlistItems.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        loadSong(index);

        playSong();

    });

});

/* ==========================
   PROGRESS BAR
========================== */

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value =
        (audio.currentTime/audio.duration)*100;

    }

    currentTime.textContent =
    formatTime(audio.currentTime);

    duration.textContent =
    formatTime(audio.duration);

});

progress.addEventListener("input",()=>{

    if(audio.duration){

        audio.currentTime =
        (progress.value/100)*audio.duration;

    }

});

/* ==========================
   VOLUME
========================== */

audio.volume=1;

volume.value=100;

volume.addEventListener("input",()=>{

    audio.volume=volume.value/100;

});

/* ==========================
   SHUFFLE
========================== */

shuffleBtn.addEventListener("click",()=>{

    isShuffle=!isShuffle;

    shuffleBtn.classList.toggle(
        "active",
        isShuffle
    );

});

/* ==========================
   REPEAT
========================== */

repeatBtn.addEventListener("click",()=>{

    if(repeatMode==="off"){

        repeatMode="all";

        repeatBtn.textContent="🔁";

    }else if(repeatMode==="all"){

        repeatMode="one";

        repeatBtn.textContent="🔂";

    }else{

        repeatMode="off";

        repeatBtn.textContent="🔁";

    }

});

/* ==========================
   SONG FINISHED
========================== */

audio.addEventListener("ended",()=>{

    if(repeatMode==="one"){

        audio.currentTime=0;

        playSong();

        return;

    }

    nextSong();

});

/* ==========================
   KEYBOARD SHORTCUT
========================== */

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
/* ==========================================================
   GLORY TO GOD v3.1
   Professional Edition
   Part 3
========================================================== */

/* ==========================
   FAVORITE SONG
========================== */

const favoriteKey = "gtg_favorites";

let favorites =
JSON.parse(localStorage.getItem(favoriteKey)) || [];

function updateFavoriteButton(){

    const currentFile = songs[currentSong].file;

    if(favorites.includes(currentFile)){

        favoriteBtn.innerHTML="❤️ Favorit";

    }else{

        favoriteBtn.innerHTML="🤍 Favorit";

    }

}

favoriteBtn.addEventListener("click",()=>{

    const currentFile = songs[currentSong].file;

    if(favorites.includes(currentFile)){

        favorites =
        favorites.filter(item=>item!==currentFile);

    }else{

        favorites.push(currentFile);

    }

    localStorage.setItem(
        favoriteKey,
        JSON.stringify(favorites)
    );

    updateFavoriteButton();

});

/* ==========================
   SHARE
========================== */

shareBtn.addEventListener("click",async()=>{

    const data={

        title:"GLORY TO GOD",

        text:"Dengarkan album GLORY TO GOD oleh Toddy Official.",

        url:window.location.href

    };

    if(navigator.share){

        try{

            await navigator.share(data);

        }catch(e){}

    }else{

        await navigator.clipboard.writeText(window.location.href);

        alert("Link album berhasil disalin.");

    }

});

/* ==========================
   LOADING SCREEN
========================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loading.style.opacity="0";

        loading.style.transition="opacity .8s";

        setTimeout(()=>{

            loading.style.display="none";

        },800);

    },1500);

});

/* ==========================
   WEB AUDIO API
========================== */

const AudioContextClass =
window.AudioContext ||
window.webkitAudioContext;

const audioContext =
new AudioContextClass();

const source =
audioContext.createMediaElementSource(audio);

const analyser =
audioContext.createAnalyser();

source.connect(analyser);

analyser.connect(audioContext.destination);

analyser.fftSize = 64;

const dataArray =
new Uint8Array(analyser.frequencyBinCount);

/* ==========================
   VISUALIZER
========================== */

const bars =
document.querySelectorAll(".visualizer span");

function animateVisualizer(){

    analyser.getByteFrequencyData(dataArray);

    bars.forEach((bar,index)=>{

        const value =
        dataArray[index] || 10;

        bar.style.height =
        (10 + value/3) + "px";

    });

    requestAnimationFrame(
        animateVisualizer
    );

}

/* aktifkan visualizer saat lagu diputar */

audio.addEventListener("play",()=>{

    if(audioContext.state==="suspended"){

        audioContext.resume();

    }

    animateVisualizer();

});

/* ==========================
   UPDATE FAVORITE
========================== */

audio.addEventListener("loadeddata",()=>{

    updateFavoriteButton();

});
/* ==========================================================
   GLORY TO GOD v3.1
   Professional Edition
   Part 4 (FINAL)
========================================================== */

/* ==========================
   LYRICS
========================== */

const lyricsData = {

"Pasti Ada Kemenangan":
"🎵 Lirik akan ditambahkan pada versi berikutnya.",

"Tuhan Pasti Tolong":
"🎵 Lirik akan ditambahkan pada versi berikutnya.",

"Dengarlah Doaku":
"🎵 Lirik akan ditambahkan pada versi berikutnya."

};

const lyricsBox =
document.getElementById("lyricsBox");

function updateLyrics(){

    const title = songs[currentSong].title;

    lyricsBox.innerHTML =
    "<p>" +
    (lyricsData[title] ||
    "Lirik belum tersedia.") +
    "</p>";

}

audio.addEventListener(
"loadedmetadata",
updateLyrics
);

/* ==========================
   QR CODE
========================== */

const qr =
document.getElementById("qrcode");

if(qr){

qr.innerHTML="";

const img=document.createElement("img");

img.src=
"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="
+
encodeURIComponent(window.location.href);

img.alt="QR Code";

img.style.width="100%";

qr.appendChild(img);

}

/* ==========================
   BARCODE
========================== */

const barcode =
document.getElementById("barcode");

if(barcode){

barcode.textContent=
"TOD-GTG-2026-001";

}

/* ==========================
   CONNECTION STATUS
========================== */

window.addEventListener("online",()=>{

console.log("Online");

});

window.addEventListener("offline",()=>{

alert(
"Koneksi internet terputus."
);

});

/* ==========================
   INITIALIZE
========================== */

window.addEventListener("load",()=>{

loadSong(currentSong);

updateFavoriteButton();

updateLyrics();

progress.value=0;

currentTime.textContent="00:00";

duration.textContent="00:00";

playBtn.textContent="▶";

});

/* ==========================================================
   END
========================================================== */
