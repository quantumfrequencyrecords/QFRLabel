/* ==========================================================
   Quantum Frequency Records
   Core Application
========================================================== */

const QFR = {

    version: "1.0.0",

    state: {

        currentArtist: null,

        currentAlbum: null,

        currentSong: null,

        isPlaying: false,

        theme: "dark",

        volume: 80

    },

    init(){

        console.log(

            "Quantum Frequency Records Initialized"

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        QFR.init();

    }

);
