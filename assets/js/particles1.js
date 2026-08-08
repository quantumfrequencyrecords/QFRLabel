/* ============================================================
   QUANTUM FREQUENCY RECORDS
   LANDING PAGE PARTICLES
============================================================ */

document.addEventListener("DOMContentLoaded", async () => {

    const container =
        document.getElementById("particles-js");

    if (!container) {
        return;
    }

    if (typeof tsParticles === "undefined") {

        console.warn(
            "QFR: tsParticles library was not loaded."
        );

        return;

    }

    try {

        await tsParticles.load({

            id: "particles-js",

            options: {

                fullScreen: {
                    enable: false
                },

                background: {
                    color: {
                        value: "transparent"
                    }
                },

                detectRetina: true,

                fpsLimit: 60,

                particles: {

                    number: {

                        value: 85,

                        density: {

                            enable: true,

                            area: 1100

                        }

                    },

                    color: {

                        value: [
                            "#FFFFFF",
                            "#A875FF",
                            "#62DFFF"
                        ]

                    },

                    opacity: {

                        value: {
                            min: 0.12,
                            max: 0.45
                        }

                    },

                    size: {

                        value: {
                            min: 1,
                            max: 3
                        }

                    },

                    links: {

                        enable: true,

                        distance: 145,

                        color: "#8C6BFF",

                        opacity: 0.12,

                        width: 1

                    },

                    move: {

                        enable: true,

                        direction: "none",

                        random: true,

                        speed: {
                            min: 0.15,
                            max: 0.65
                        },

                        straight: false,

                        outModes: {

                            default: "out"

                        }

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

                                    value: 42

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

        console.error(
            "QFR particle system failed:",
            error
        );

    }

});
