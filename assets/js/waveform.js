const waveform=document.getElementById("player-waveform");

let size=40;

setInterval(()=>{

size=Math.random()*100;

waveform.style.opacity=(Math.random()*0.5)+0.3;

waveform.style.width=(220+size)+"px";

},300);
