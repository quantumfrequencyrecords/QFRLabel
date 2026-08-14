/* ============================================================
   QUANTUM FREQUENCY RECORDS
   HOMEPAGE JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       MOBILE NAVIGATION
    ======================================================== */

    const menuButton =
        document.getElementById("qfr-menu-button");

    const mobileMenu =
        document.getElementById("qfr-mobile-menu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove("open");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation"
                    );

                });

            });

    }


    /* ========================================================
       HEADER SCROLL EFFECT
    ======================================================== */

    const header =
        document.querySelector(".qfr-header");


    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* ========================================================
       PARTICLES
    ======================================================== */

    const particleContainer =
        document.getElementById("home-particles");


    async function initializeParticles() {

        if (
            !particleContainer ||
            typeof tsParticles === "undefined"
        ) {

            return;

        }


        try {

            await tsParticles.load({

                id: "home-particles",

                options: {

                    fullScreen: {
                        enable: false
                    },

                    detectRetina: true,

                    fpsLimit: 60,

                    particles: {

                        number: {

                            value: 65,

                            density: {

                                enable: true,

                                area: 1200

                            }

                        },

                        color: {

                            value: [
                                "#FFFFFF",
                                "#A774FF",
                                "#64DFFF"
                            ]

                        },

                        opacity: {

                            value: {

                                min: .08,

                                max: .35

                            }

                        },

                        size: {

                            value: {

                                min: 1,

                                max: 2.5

                            }

                        },

                        move: {

                            enable: true,

                            direction: "none",

                            random: true,

                            speed: {

                                min: .1,

                                max: .45

                            },

                            straight: false,

                            outModes: {

                                default: "out"

                            }

                        },

                        links: {

                            enable: true,

                            distance: 160,

                            color: "#8B68E8",

                            opacity: .07,

                            width: 1

                        }

                    },

                    interactivity: {

                        detectsOn: "window",

                        events: {

                            resize: true

                        }

                    },

                    responsive: [

                        {

                            maxWidth: 700,

                            options: {

                                particles: {

                                    number: {

                                        value: 28

                                    },

                                    links: {

                                        enable: false

                                    }

                                }

                            }

                        }

                    ]

                }

            });

        }

        catch (error) {

            console.warn(
                "QFR particles could not initialize:",
                error
            );

        }

    }


    initializeParticles();


    /* ========================================================
       PULSE COUNTERS
    ======================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) {
            return;
        }

        countersStarted = true;


        counters.forEach((counter) => {

            const target =
                Number(
                    counter.dataset.counter
                );

            if (!Number.isFinite(target)) {
                return;
            }


            const duration = 1200;

            const startTime =
                performance.now();


            function updateCounter(now) {

                const progress =
                    Math.min(
                        (now - startTime) / duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const value =
                    Math.floor(
                        eased * target
                    );


                counter.textContent =
                    target >= 100
                        ? `${value}+`
                        : value;


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }


    const pulseSection =
        document.querySelector(
            ".pulse-section"
        );


    if (
        pulseSection &&
        "IntersectionObserver" in window
    ) {

        const pulseObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounters();

                                pulseObserver.disconnect();

                            }

                        }
                    );

                },
                {
                    threshold: .25
                }
            );


        pulseObserver.observe(
            pulseSection
        );

    }


    /* ========================================================
       SURPRISE ME
    ======================================================== */

    const surpriseButton =
        document.getElementById(
            "surprise-button"
        );

    const surpriseResult =
        document.getElementById(
            "surprise-result"
        );


    const discoveries = [

        {
            name: "Firewall Nation",
            type: "Industrial Rock",
            url: "artist.html?id=firewall-nation"
        },

        {
            name: "Fractal Hearts",
            type: "Alternative",
            url: "artist.html?id=fractal-hearts"
        },

        {
            name: "Buckshot Bourbon",
            type: "Country Rock",
            url: "artist.html?id=buckshot-bourbon"
        },

        {
            name: "Moonflower Radio",
            type: "Indie / Dream Pop",
            url: "artist.html?id=moonflower-radio"
        },

        {
            name: "Find/Replace",
            type: "Electronic",
            url: "artist.html?id=find-replace"
        },

        {
            name: "Immortal Prophets",
            type: "Alternative",
            url: "artist.html?id=immortal-prophets"
        }

    ];


    if (
        surpriseButton &&
        surpriseResult
    ) {

        surpriseButton.addEventListener(
            "click",
            () => {

                const random =
                    discoveries[
                        Math.floor(
                            Math.random() *
                            discoveries.length
                        )
                    ];


                surpriseResult.innerHTML =

                    `Your next frequency:
                    <a
                        href="${random.url}"
                        style="
                            color:#ffffff;
                            text-decoration:underline;
                        "
                    >
                        ${random.name}
                    </a>
                    — ${random.type}`;

            }
        );

    }


    /* ========================================================
       NEWSLETTER
    ======================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletter-form"
        );

    const newsletterMessage =
        document.getElementById(
            "newsletter-message"
        );


    if (
        newsletterForm &&
        newsletterMessage
    ) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const emailInput =
                    document.getElementById(
                        "newsletter-email"
                    );


                if (
                    !emailInput ||
                    !emailInput.value
                ) {

                    return;

                }


                newsletterMessage.textContent =
                    "You're tuned in. Newsletter integration will be connected here.";

                newsletterForm.reset();

            }
        );

    }


    /* ========================================================
       NOW PLAYING UI
    ======================================================== */

    const player =
        document.getElementById(
            "now-playing"
        );

    const playerPlay =
        document.getElementById(
            "player-play"
        );

    const playerClose =
        document.getElementById(
            "player-close"
        );

    const playerTitle =
        document.getElementById(
            "player-title"
        );


    let playerPlaying = false;


    if (playerPlay && player) {

        playerPlay.addEventListener(
            "click",
            () => {

                playerPlaying =
                    !playerPlaying;


                player.classList.toggle(
                    "playing",
                    playerPlaying
                );


                const icon =
                    playerPlay.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        playerPlaying
                            ? "fa-solid fa-pause"
                            : "fa-solid fa-play";

                }


                if (playerPlaying) {

                    playerTitle.textContent =
                        "Demo Player — No Track Selected";

                } else {

                    playerTitle.textContent =
                        "Nothing Playing";

                }

            }
        );

    }


    if (playerClose && player) {

        playerClose.addEventListener(
            "click",
            () => {

                player.classList.add(
                    "hidden"
                );

            }
        );

    }


    /* ========================================================
       ACTIVE NAVIGATION
    ======================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(
            ".qfr-navigation a"
        )
        .forEach((link) => {

            const href =
                link
                    .getAttribute("href")
                    ?.split("?")[0]
                    .toLowerCase();


            if (
                href === currentPage ||
                (
                    currentPage === "" &&
                    href === "home.html"
                )
            ) {

                link.classList.add(
                    "active"
                );

            } else {

                link.classList.remove(
                    "active"
                );

            }

        });


});
