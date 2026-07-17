/* ===========================================
   GLORY TO GOD
   Toddy Official
=========================================== */

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
file:"music/Rancangan Mulia-mc.mp3"
},

{
title:"Yesaya 40",
file:"music/YESAYA 40-mc.mp3"
},

{
title:"Engkau Baik Tuhan",
file:"music/Engkau Baik Tuhan-mc.mp3"
},

{
title:"Hidup Dalam KasihMu",
file:"music/Hidup Dalam KasihMu-mc.mp3"
},

{
title:"Cukuplah Kasih Karunia-Mu",
file:"music/Cukuplah Kasih Karunia-Mu-mc.mp3"
},

{
title:"Rencana Tuhan",
file:"music/Rencana Tuhan-mc.mp3"
},

{
title:"Demi Aku Kau Rela Tersalib",
file:"music/DEMI AKU, KAU RELA TERSALIB.mp3"
},

{
title:"Engkau Sangat Mengasihiku",
file:"music/Engkau Sangat Mengasihiku.mp3"
},

{
title:"Kau Yang Terindah",
file:"music/KAU YANG TERINDAH.mp3"
},

{
title:"Tidak Ada Yang Mustahil",
file:"music/TIDAK ADA YANG MUSTAHIL.mp3"
},

{
title:"Sampai Jumpa Dikeabadian",
file:"music/SAMPAI JUMPA DIKEABADIAN.mp3"
}

];

let currentSong = 0;

const audio = document.getElementById("audio");

const title = document.getElementById("songTitle");

const playlist = document.querySelectorAll(".playlist li");

function loadSong(index){

currentSong=index;

audio.src=songs[index].file;

title.innerText=songs[index].title;

playlist.forEach(item=>item.style.color="white");

playlist[index].style.color="gold";

}

playlist.forEach((item,index)=>{

item.addEventListener("click",()=>{

loadSong(index);

audio.play();

});

});

audio.addEventListener("ended",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

audio.play();

});

const enterBtn=document.getElementById("enterBtn");

enterBtn.addEventListener("click",()=>{

document.getElementById("player").scrollIntoView({

behavior:"smooth"

});

});

loadSong(0);
