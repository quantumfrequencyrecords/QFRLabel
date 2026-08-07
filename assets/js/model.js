QFR.modal={

open(content){

const modal=document.getElementById("qfr-modal");

modal.querySelector(".modal-body").innerHTML=content;

modal.classList.add("open");

},

close(){

document

.getElementById("qfr-modal")

.classList.remove("open");

}

};
