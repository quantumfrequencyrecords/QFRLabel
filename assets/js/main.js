document.addEventListener("DOMContentLoaded",()=>{

const words=document.querySelectorAll("#animated-subtitle span");

let index=0;

function animateWords(){

words.forEach(word=>word.classList.remove("active"));

if(words[index]){

words[index].classList.add("active");

}

index++;

if(index>=words.length){

index=0;

}

}

animateWords();

setInterval(animateWords,2000);

});
