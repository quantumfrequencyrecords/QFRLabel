/* ============================================================
   QFR LANDING PAGE
   Subtitle animation + page initialization
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const words = document.querySelectorAll(
        "#animated-subtitle .subtitle-word"
    );

    if (!words.length) {
        return;
    }

    let currentIndex = 0;

    function activateWord(index) {

        words.forEach((word) => {

            word.classList.remove("active");

        });

        words[index].classList.add("active");

    }

    function cycleWords() {

        activateWord(currentIndex);

        currentIndex++;

        if (currentIndex >= words.length) {

            currentIndex = 0;

        }

    }

    /*
        Start immediately.
        Each word remains highlighted
        for approximately 2 seconds.
    */

    cycleWords();

    window.setInterval(
        cycleWords,
        2000
    );

});
