/* ==========================================================
   QFR UNIVERSAL ARTIST DIRECTORY
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadArtists
);


async function loadArtists(){

    const container =
        document.getElementById(
            "artists-list"
        );


    const ticker =
        document.getElementById(
            "artist-symbol-track"
        );


    try{

        const response =
            await fetch(
                "assets/data/artists/index.json"
            );


        if(!response.ok){

            throw new Error(
                "Artist index could not be loaded."
            );

        }


        const data =
            await response.json();


        let artists =
            data.artists || [];


        /*
         * Only active artists appear.
         */

        artists =
            artists.filter(
                artist => artist.active !== false
            );


        /*
         * Alphabetical order.
         */

        artists.sort(
            (a,b) =>
                a.name.localeCompare(b.name)
        );


        /*
         * Render artist cards.
         */

        container.innerHTML =
            artists
                .map(
                    (artist,index) =>
                        createArtistCard(
                            artist,
                            index
                        )
                )
                .join("");


        /*
         * Render ticker.
         */

        if(ticker){

            const symbols =
                artists
                    .map(
                        artist => `
                            <span class="artist-symbol">
                                ${escapeHTML(artist.name)}
                            </span>
                        `
                    )
                    .join("");


            /*
             * Duplicate the symbols so
             * the ticker loops smoothly.
             */

            ticker.innerHTML =
                symbols + symbols;

        }


    }catch(error){

        console.error(error);


        container.innerHTML = `

            <div class="error-message">

                <h2>
                    Artists unavailable
                </h2>

                <p>
                    We couldn't load the artist roster.
                </p>

            </div>

        `;

    }

}


/* ==========================================================
   ARTIST CARD
========================================================== */

function createArtistCard(
    artist,
    index
){

    const genres =
        Array.isArray(artist.genre)
            ? artist.genre
            : [artist.genre];


    return `

        <article
            class="artist-directory-card"
        >

            <div
                class="artist-directory-image"
            >

                <img
                    src="${artist.image}"
                    alt="${escapeHTML(artist.name)}"
                    loading="lazy"
                >

                <div
                    class="artist-directory-overlay"
                ></div>

            </div>


            <div
                class="artist-directory-info"
            >

                <span class="pill">
                    ARTIST
                </span>


                <h2>

                    ${escapeHTML(
                        artist.name
                    )}

                </h2>


                <div
                    class="artist-meta"
                >

                    ${
                        genres
                            .map(
                                genre =>
                                    `<span>
                                        ${escapeHTML(genre)}
                                    </span>`
                            )
                            .join("")
                    }

                    ${
                        artist.hometown
                            ? `
                                <span>
                                    ${escapeHTML(
                                        artist.hometown
                                    )}
                                </span>
                              `
                            : ""
                    }

                </div>


                <p>

                    Discover the music,
                    story and world of
                    ${escapeHTML(
                        artist.name
                    )}.

                </p>


                <div
                    class="artist-directory-buttons"
                >

                    <a
                        href="artist.html?artist=${encodeURIComponent(artist.id)}"
                        class="button"
                    >

                        Explore Artist

                    </a>

                </div>

            </div>

        </article>

    `;

}


/* ==========================================================
   SECURITY
========================================================== */

function escapeHTML(value){

    return String(value || "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}
