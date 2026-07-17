/* GLORY TO GOD - script.js */

const songs = [
 {title:"Pasti Ada Kemenangan",file:"music/Pasti Ada Kemenangan.mp3"},
 {title:"Tuhan Pasti Tolong",file:"music/TUHAN PASTI TOLONG.mp3"},
 {title:"Dengarlah Doaku",file:"music/Dengarlah Doaku.mp3"},
 {title:"Rancangan Mulia",file:"music/Rancangan Mulia-mc.mp3"},
 {title:"Yesaya 40",file:"music/Yesaya 40.mp3"},
 {title:"Engkau Baik Tuhan",file:"music/Engkau Baik Tuhan.mp3"},
 {title:"Hidup Dalam Kasih-Mu",file:"music/Hidup Dalam Kasih-Mu.mp3"},
 {title:"Cukuplah Kasih Karunia-Mu",file:"music/Cukuplah Kasih Karunia-Mu.mp3"},
 {title:"Rencana Tuhan",file:"music/Rencana Tuhan.mp3"},
 {title:"Demi Aku Kau Rela Tersalib",file:"music/Demi Aku Kau Rela Tersalib.mp3"},
 {title:"Engkau Sangat Mengasihiku",file:"music/Engkau Sangat Mengasihiku.mp3"},
 {title:"Kau Yang Terindah",file:"music/Kau Yang Terindah.mp3"},
 {title:"Tidak Ada Yang Mustahil",file:"music/Tidak Ada Yang Mustahil.mp3"},
 {title:"Sampai Jumpa Di Keabadian",file:"music/Sampai Jumpa Di Keabadian.mp3"}
];

const audio=document.getElementById("audio");
const title=document.getElementById("songTitle");
const cover=document.getElementById("cover");
const playBtn=document.getElementById("playBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const progress=document.getElementById("progress");
const volume=document.getElementById("volume");
const current=document.getElementById("currentTime");
const duration=document.getElementById("duration");
const share=document.getElementById("shareBtn");
const download=document.getElementById("downloadBtn");

let index=0;

function fmt(s){
 if(isNaN(s)) return "00:00";
 let m=Math.floor(s/60),sec=Math.floor(s%60);
    return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

function loadSong(i){
 index=i;
 audio.src=songs[i].file;
 title.textContent=songs[i].title;

 if(download){
   download.href=songs[i].file;
   download.download=songs[i].title+".mp3";
 }

 document.querySelectorAll("#playlist li").forEach((li,n)=>{
   li.classList.toggle("active",n===i);
 });

 audio.load();
}

playBtn.onclick=()=>{
 if(audio.paused){
   audio.play();
   playBtn.textContent="⏸";
   if(cover) cover.classList.add("playing");
 }else{
   audio.pause();
   playBtn.textContent="▶";
   if(cover) cover.classList.remove("playing");
 }
};

prevBtn.onclick=()=>{
 index=(index-1+songs.length)%songs.length;
 loadSong(index);
 audio.play();
 playBtn.textContent="⏸";
 if(cover) cover.classList.add("playing");
};

nextBtn.onclick=()=>{
 index=(index+1)%songs.length;
 loadSong(index);
 audio.play();
 playBtn.textContent="⏸";
 if(cover) cover.classList.add("playing");
};

audio.addEventListener("timeupdate",()=>{
 if(audio.duration){
   progress.value=(audio.currentTime/audio.duration)*100;
   current.textContent=fmt(audio.currentTime);
   duration.textContent=fmt(audio.duration);
 }
});

progress.oninput=()=>{
 if(audio.duration){
   audio.currentTime=(progress.value/100)*audio.duration;
 }
};

volume.oninput=()=>{
 audio.volume=volume.value;
};

audio.onended=()=>{
 nextBtn.click();
};

document.querySelectorAll("#playlist li").forEach((li,i)=>{
 li.onclick=()=>{
   loadSong(i);
   audio.play();
   playBtn.textContent="⏸";
   if(cover) cover.classList.add("playing");
 };
});

if(share){
 share.onclick=async()=>{
   if(navigator.share){
     try{
       await navigator.share({
         title:"GLORY TO GOD",
         text:"Official Digital Album - Toddy Official",
         url:location.href
       });
     }catch(e){}
   }else{
     navigator.clipboard.writeText(location.href);
     alert("Link album berhasil disalin.");
   }
 };
}

loadSong(0);
audio.volume=1;
