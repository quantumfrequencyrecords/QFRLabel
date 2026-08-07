function animateValue(id,end){

const obj=document.getElementById(id);

let current=0;

const timer=setInterval(()=>{

current+=Math.ceil(end/120);

if(current>=end){

current=end;

clearInterval(timer);

}

obj.innerHTML=current.toLocaleString();

},20);

}

animateValue("stat-streams",1834251);

animateValue("stat-videos",324801);

animateValue("stat-songs",241);

animateValue("stat-artists",12);
