/* ==========================================================
   QUANTUM FREQUENCY RECORDS
   UNIVERSAL ARTIST PAGE ENGINE

   File:
   assets/js/artist.js

   Purpose:
   - Load an artist from the URL
   - Load artist JSON data
   - Display artist profile
   - Display artist biography
   - Display artist members
   - Display artist albums
   - Load album songs
   - Open individual song information
   - Load lyrics
   - Support Spotify links
   - Support artist navigation
   - Support future artist expansion

   URL FORMAT:

   artist.html?artist=firewall-nation

========================================================== */


/* ==========================================================
   GLOBAL ARTIST STATE
========================================================== */

let currentArtist = null;

let currentArtistId = null;

let currentArtistAlbums = [];

let currentArtistSongs = [];


/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeArtistPage
);


async function initializeArtistPage(){

    /*
     * Get artist ID from URL.
     */

    const params =
        new URLSearchParams(
            window.location.search
        );


    currentArtistId =
        params.get("artist");


    /*
     * If no artist was supplied,
     * show an error instead of breaking.
     */

    if(!currentArtistId){

        showArtistError(
            "No artist was selected."
        );

        return;

    }


    /*
     * Load the artist.
     */

    await loadArtist(
        currentArtistId
    );

}


/* ==========================================================
   LOAD ARTIST
========================================================== */

async function loadArtist(
    artistId
){

    try{

        /*
         * Load the individual artist JSON.
         */

        const response =
            await fetch(
                `assets/data/artists/${artistId}.json`
            );


        if(!response.ok){

            throw new Error(
                `Artist JSON not found: ${artistId}`
            );

        }


        currentArtist =
            await response.json();


        /*
         * Render all artist sections.
         */

        renderArtistProfile();

        renderArtistBiography();

        renderArtistMembers();

        renderArtistSocials();

        await loadArtistAlbums();


        /*
         * Update page title.
         */

        document.title =
            `${currentArtist.name} | Quantum Frequency Records`;


    }catch(error){

        console.error(
            "QFR Artist Error:",
            error
        );


        showArtistError(
            "We couldn't load this artist."
        );

    }

}


/* ==========================================================
   ARTIST PROFILE
========================================================== */

function renderArtistProfile(){

    if(!currentArtist){
        return;
    }


    /*
     * Artist name
     */

    setText(
        "artist-name",
        currentArtist.name
    );


    /*
     * Artist genre
     */

    const genre =
        Array.isArray(
            currentArtist.genre
        )
        ?
        currentArtist.genre.join(" • ")
        :
        currentArtist.genre || "";


    setText(
        "artist-genre",
        genre
    );


    /*
     * Artist hometown
     */

    setText(
        "artist-hometown",
        currentArtist.hometown || ""
    );


    /*
     * Artist summary
     */

    setText(
        "artist-summary",
        currentArtist.summary ||
        currentArtist.shortBio ||
        ""
    );


    /*
     * Artist image
     */

    const image =
        document.getElementById(
            "artist-image"
        );


    if(
        image &&
        currentArtist.image
    ){

        image.src =
            currentArtist.image;

        image.alt =
            currentArtist.name;

    }


    /*
     * Artist logo
     */

    const logo =
        document.getElementById(
            "artist-logo"
        );


    if(
        logo &&
        currentArtist.logo
    ){

        logo.src =
            currentArtist.logo;

        logo.alt =
            currentArtist.name;

    }


    /*
     * Artist quote
     */

    setText(
        "artist-quote",
        currentArtist.quote || ""
    );

}


/* ==========================================================
   ARTIST BIOGRAPHY
========================================================== */

function renderArtistBiography(){

    if(!currentArtist){
        return;
    }


    const biography =
        currentArtist.biography ||
        currentArtist.bio ||
        currentArtist.fullBio ||
        "";


    const element =
        document.getElementById(
            "artist-biography"
        );


    if(element){

        element.innerHTML =
            formatText(
                biography
            );

    }

}


/* ==========================================================
   ARTIST MEMBERS
========================================================== */

function renderArtistMembers(){

    const container =
        document.getElementById(
            "artist-members"
        );


    if(!container){
        return;
    }


    const members =
        currentArtist.members || [];


    if(!members.length){

        container.innerHTML = `

            <div class="empty-state">

                <p>
                    Member information coming soon.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        members
            .map(
                (member,index) =>
                    createMemberCard(
                        member,
                        index
                    )
            )
            .join("");

}


/* ==========================================================
   MEMBER CARD
========================================================== */

function createMemberCard(
    member,
    index
){

    const name =
        member.name || "Band Member";


    const role =
        member.role || "";


    const hometown =
        member.hometown || "";


    const image =
        member.image ||
        "assets/images/placeholder-member.jpg";


    const biography =
        member.biography ||
        member.bio ||
        "";


    return `

        <article
            class="artist-member-card"
        >

            <div
                class="artist-member-image"
            >

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    loading="lazy"
                >

            </div>


            <div
                class="artist-member-info"
            >

                <span class="pill">

                    ${escapeHTML(role)}

                </span>


                <h3>

                    ${escapeHTML(name)}

                </h3>


                ${
                    hometown
                    ?
                    `
                    <p class="member-hometown">

                        ${escapeHTML(hometown)}

                    </p>
                    `
                    :
                    ""
                }


                <button
                    class="button-secondary"
                    type="button"
                    onclick="openMemberBiography(${index})"
                >

                    Meet Member

                </button>

            </div>

        </article>

    `;

}


/* ==========================================================
   OPEN MEMBER BIOGRAPHY
========================================================== */

function openMemberBiography(
    memberIndex
){

    const members =
        currentArtist.members || [];


    const member =
        members[memberIndex];


    if(!member){
        return;
    }


    const name =
        member.name || "Band Member";


    const role =
        member.role || "";


    const hometown =
        member.hometown || "";


    const image =
        member.image ||
        "assets/images/placeholder-member.jpg";


    const biography =
        member.biography ||
        member.bio ||
        "Biography coming soon.";


    const html = `

        <div class="member-modal">

            <div class="member-modal-image">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                >

            </div>


            <div class="member-modal-content">

                <span class="pill">

                    ${escapeHTML(role)}

                </span>


                <h2>

                    ${escapeHTML(name)}

                </h2>


                ${
                    hometown
                    ?
                    `
                    <p class="text-gray">

                        ${escapeHTML(hometown)}

                    </p>
                    `
                    :
                    ""
                }


                <div
                    class="member-biography"
                >

                    ${formatText(biography)}

                </div>

            </div>

        </div>

    `;


    openQFRModal(
        html
    );

}


/* ==========================================================
   SOCIAL MEDIA
========================================================== */

function renderArtistSocials(){

    const container =
        document.getElementById(
            "artist-socials"
        );


    if(!container){
        return;
    }


    const socials =
        currentArtist.socials ||
        currentArtist.socialMedia ||
        {};


    const links = [];


    if(socials.instagram){

        links.push({

            name: "Instagram",

            icon: "fa-brands fa-instagram",

            url: socials.instagram

        });

    }


    if(socials.facebook){

        links.push({

            name: "Facebook",

            icon: "fa-brands fa-facebook",

            url: socials.facebook

        });

    }


    if(socials.youtube){

        links.push({

            name: "YouTube",

            icon: "fa-brands fa-youtube",

            url: socials.youtube

        });

    }


    if(socials.tiktok){

        links.push({

            name: "TikTok",

            icon: "fa-brands fa-tiktok",

            url: socials.tiktok

        });

    }


    if(socials.x){

        links.push({

            name: "X",

            icon: "fa-brands fa-x-twitter",

            url: socials.x

        });

    }


    if(socials.spotify){

        links.push({

            name: "Spotify",

            icon: "fa-brands fa-spotify",

            url: socials.spotify

        });

    }


    if(!links.length){

        container.innerHTML =
            "";

        return;

    }


    container.innerHTML =
        links
            .map(
                social => `

                    <a
                        href="${escapeHTML(social.url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="artist-social-link"
                        aria-label="${escapeHTML(social.name)}"
                    >

                        <i
                            class="${social.icon}"
                        ></i>

                    </a>

                `
            )
            .join("");

}


/* ==========================================================
   LOAD ARTIST ALBUMS
========================================================== */

async function loadArtistAlbums(){

    const container =
        document.getElementById(
            "artist-albums"
        );


    if(!container){
        return;
    }


    const albumIds =
        currentArtist.albums || [];


    if(!albumIds.length){

        container.innerHTML = `

            <div class="empty-state">

                <p>
                    No releases available yet.
                </p>

            </div>

        `;

        return;

    }


    try{

        /*
         * Load master album index.
         */

        const response =
            await fetch(
                "assets/data/albums/index.json"
            );


        if(!response.ok){

            throw new Error(
                "Album index could not be loaded."
            );

        }


        const data =
            await response.json();


        /*
         * Match the artist's album IDs.
         */

        currentArtistAlbums =
            (data.albums || [])
                .filter(
                    album =>
                        albumIds.includes(
                            album.id
                        )
                );


        /*
         * Sort chronologically.
         */

        currentArtistAlbums.sort(
            (a,b) =>
                new Date(
                    b.releaseDate || 0
                )
                -
                new Date(
                    a.releaseDate || 0
                )
        );


        renderAlbums();


    }catch(error){

        console.error(
            "Album loading error:",
            error
        );


        container.innerHTML = `

            <div class="error-message">

                <p>
                    Unable to load releases.
                </p>

            </div>

        `;

    }

}


/* ==========================================================
   RENDER ALBUMS
========================================================== */

function renderAlbums(){

    const container =
        document.getElementById(
            "artist-albums"
        );


    if(!container){
        return;
    }


    if(!currentArtistAlbums.length){

        container.innerHTML = `

            <div class="empty-state">

                <p>
                    No releases available yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        currentArtistAlbums
            .map(
                (album,index) =>
                    createAlbumCard(
                        album,
                        index
                    )
            )
            .join("");

}


/* ==========================================================
   CREATE ALBUM CARD
========================================================== */

function createAlbumCard(
    album,
    index
){

    return `

        <article
            class="artist-album glass-panel"
        >

            <div
                class="artist-album-header"
            >

                <img
                    class="artist-album-art"
                    src="${escapeHTML(
                        album.artwork ||
                        "assets/images/placeholder-album.jpg"
                    )}"
                    alt="${escapeHTML(album.title)}"
                    loading="lazy"
                >


                <div
                    class="artist-album-details"
                >

                    <span class="pill">

                        ${escapeHTML(
                            album.type ||
                            "RELEASE"
                        )}

                    </span>


                    <h3>

                        ${escapeHTML(
                            album.title
                        )}

                    </h3>


                    ${
                        album.year
                        ?
                        `
                        <p>

                            ${escapeHTML(
                                album.year
                            )}

                        </p>
                        `
                        :
                        ""
                    }


                    ${
                        album.description
                        ?
                        `
                        <p class="text-gray">

                            ${escapeHTML(
                                album.description
                            )}

                        </p>
                        `
                        :
                        ""
                    }

                </div>


                <button
                    class="button-secondary"
                    type="button"
                    onclick="loadAlbumSongs(
                        '${escapeHTML(album.id)}',
                        ${index}
                    )"
                >

                    <i
                        class="fa-solid fa-music"
                    ></i>

                    Songs

                </button>

            </div>


            <div
                id="album-songs-${index}"
                class="artist-album-songs"
                hidden
            >

                <div class="loading">

                    Loading songs...

                </div>

            </div>

        </article>

    `;

}


/* ==========================================================
   LOAD ALBUM SONGS
========================================================== */

async function loadAlbumSongs(
    albumId,
    albumIndex
){

    const container =
        document.getElementById(
            `album-songs-${albumIndex}`
        );


    if(!container){
        return;
    }


    /*
     * Toggle visibility.
     */

    if(!container.hidden){

        container.hidden = true;

        return;

    }


    container.hidden = false;


    container.innerHTML = `

        <div class="loading">

            Loading songs...

        </div>

    `;


    try{

        /*
         * Load album JSON.
         */

        const albumResponse =
            await fetch(
                `assets/data/albums/${albumId}.json`
            );


        if(!albumResponse.ok){

            throw new Error(
                `Album JSON not found: ${albumId}`
            );

        }


        const album =
            await albumResponse.json();


        /*
         * Load song index.
         */

        const songResponse =
            await fetch(
                "assets/data/songs/index.json"
            );


        if(!songResponse.ok){

            throw new Error(
                "Song index could not be loaded."
            );

        }


        const songData =
            await songResponse.json();


        /*
         * Find songs belonging
         * to this album.
         */

        const songs =
            (album.tracks || [])
                .map(
                    songId =>
                        songData.songs.find(
                            song =>
                                song.id === songId
                        )
                )
                .filter(Boolean);


        /*
         * Save songs globally.
         */

        currentArtistSongs =
            songs;


        if(!songs.length){

            container.innerHTML = `

                <div class="empty-state">

                    <p>
                        No songs available yet.
                    </p>

                </div>

            `;

            return;

        }


        /*
         * Render songs.
         */

        container.innerHTML =
            songs
                .map(
                    (song,index) =>
                        createSongRow(
                            song,
                            index
                        )
                )
                .join("");


    }catch(error){

        console.error(
            "Song loading error:",
            error
        );


        container.innerHTML = `

            <div class="error-message">

                <p>
                    Unable to load songs.
                </p>

            </div>

        `;

    }

}


/* ==========================================================
   SONG ROW
========================================================== */

function createSongRow(
    song,
    index
){

    return `

        <div
            class="artist-song"
        >

            <span
                class="artist-song-number"
            >

                ${index + 1}

            </span>


            <div
                class="artist-song-main"
            >

                <span
                    class="artist-song-title"
                >

                    ${escapeHTML(
                        song.title
                    )}

                </span>


                ${
                    song.duration
                    ?
                    `
                    <span
                        class="artist-song-duration"
                    >

                        ${escapeHTML(
                            song.duration
                        )}

                    </span>
                    `
                    :
                    ""
                }

            </div>


            <button
                class="song-action"
                type="button"
                onclick="openSong(
                    '${escapeHTML(song.id)}'
                )"
                aria-label="Open song"
            >

                <i
                    class="fa-solid fa-play"
                ></i>

            </button>

        </div>

    `;

}


/* ==========================================================
   OPEN SONG
========================================================== */

async function openSong(
    songId
){

    try{

        /*
         * Load complete song JSON.
         */

        const response =
            await fetch(
                `assets/data/songs/${songId}.json`
            );


        if(!response.ok){

            throw new Error(
                `Song JSON not found: ${songId}`
            );

        }


        const song =
            await response.json();


        /*
         * Load lyrics.
         */

        let lyrics =
            "Lyrics unavailable.";


        if(
            song.lyrics &&
            song.lyrics.file
        ){

            try{

                const lyricsResponse =
                    await fetch(
                        song.lyrics.file
                    );


                if(
                    lyricsResponse.ok
                ){

                    lyrics =
                        await lyricsResponse.text();

                }

            }catch(lyricsError){

                console.warn(
                    "Lyrics could not be loaded:",
                    lyricsError
                );

            }

        }


        /*
         * Build genre text.
         */

        const genres =
            Array.isArray(song.genre)
            ?
            song.genre.join(" • ")
            :
            song.genre || "";


        /*
         * Spotify button.
         */

        let spotifyButton =
            "";


        if(
            song.streaming &&
            song.streaming.spotify &&
            song.streaming.spotify.enabled &&
            song.streaming.spotify.url
        ){

            spotifyButton = `

                <a
                    href="${escapeHTML(
                        song.streaming.spotify.url
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button"
                >

                    <i
                        class="fa-brands fa-spotify"
                    ></i>

                    Listen on Spotify

                </a>

            `;

        }


        /*
         * YouTube button.
         */

        let youtubeButton =
            "";


        if(
            song.streaming &&
            song.streaming.youtube &&
            song.streaming.youtube.enabled &&
            song.streaming.youtube.url
        ){

            youtubeButton = `

                <a
                    href="${escapeHTML(
                        song.streaming.youtube.url
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button-secondary"
                >

                    <i
                        class="fa-brands fa-youtube"
                    ></i>

                    Watch on YouTube

                </a>

            `;

        }


        /*
         * Native audio player.
         *
         * This only appears if an audio
         * file has actually been supplied.
         */

        let audioPlayer =
            "";


        if(
            song.audio &&
            song.audio.enabled &&
            song.audio.file
        ){

            audioPlayer = `

                <div
                    class="song-audio-player"
                >

                    <audio
                        controls
                        preload="metadata"
                    >

                        <source
                            src="${escapeHTML(
                                song.audio.file
                            )}"
                            type="audio/mpeg"
                        >

                        Your browser does not
                        support audio playback.

                    </audio>

                </div>

            `;

        }


        /*
         * Build modal.
         */

        const html = `

            <div
                class="song-modal"
            >

                <div
                    class="song-modal-art"
                >

                    <img
                        src="${escapeHTML(
                            song.artwork ||
                            "assets/images/placeholder-song.jpg"
                        )}"
                        alt="${escapeHTML(
                            song.title
                        )}"
                    >

                </div>


                <div
                    class="song-modal-content"
                >

                    <span class="pill">

                        ${escapeHTML(
                            genres
                        )}

                    </span>


                    <h2>

                        ${escapeHTML(
                            song.title
                        )}

                    </h2>


                    ${
                        song.duration
                        ?
                        `
                        <p class="text-gray">

                            ${escapeHTML(
                                song.duration
                            )}

                        </p>
                        `
                        :
                        ""
                    }


                    ${audioPlayer}


                    <div
                        class="song-actions"
                    >

                        ${spotifyButton}

                        ${youtubeButton}

                    </div>


                    <div
                        class="song-lyrics"
                    >

                        <h3>
                            Lyrics
                        </h3>


                        <pre>${escapeHTML(
                            lyrics
                        )}</pre>

                    </div>

                </div>

            </div>

        `;


        openQFRModal(
            html
        );


    }catch(error){

        console.error(
            "Song loading error:",
            error
        );


        alert(
            "Unable to load this song."
        );

    }

}


/* ==========================================================
   QFR MODAL
========================================================== */

function openQFRModal(
    content
){

    /*
     * If the universal QFR modal engine
     * already exists, use it.
     */

    if(
        window.QFR &&
        QFR.modal &&
        typeof QFR.modal.open === "function"
    ){

        QFR.modal.open(
            content
        );

        return;

    }


    /*
     * Otherwise create a temporary modal.
     */

    let modal =
        document.getElementById(
            "qfr-dynamic-modal"
        );


    if(modal){

        modal.remove();

    }


    modal =
        document.createElement(
            "div"
        );


    modal.id =
        "qfr-dynamic-modal";


    modal.className =
        "qfr-modal-overlay";


    modal.innerHTML = `

        <div
            class="qfr-modal"
            role="dialog"
            aria-modal="true"
        >

            <button
                class="qfr-modal-close"
                type="button"
                aria-label="Close"
            >

                ×

            </button>


            <div
                class="qfr-modal-body"
            >

                ${content}

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    /*
     * Close button.
     */

    const closeButton =
        modal.querySelector(
            ".qfr-modal-close"
        );


    closeButton.addEventListener(
        "click",
        () => modal.remove()
    );


    /*
     * Close by clicking outside.
     */

    modal.addEventListener(
        "click",
        event => {

            if(
                event.target === modal
            ){

                modal.remove();

            }

        }
    );


    /*
     * Close with Escape.
     */

    const escapeHandler =
        event => {

            if(
                event.key === "Escape"
            ){

                modal.remove();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        };


    document.addEventListener(
        "keydown",
        escapeHandler
    );

}


/* ==========================================================
   ARTIST ERROR
========================================================== */

function showArtistError(
    message
){

    const page =
        document.querySelector(
            "main"
        );


    if(!page){
        return;
    }


    page.innerHTML = `

        <section
            class="artist-error"
        >

            <div class="container">

                <span class="pill">
                    QUANTUM FREQUENCY RECORDS
                </span>


                <h1>
                    Artist Unavailable
                </h1>


                <p>
                    ${escapeHTML(message)}
                </p>


                <a
                    href="artists.html"
                    class="button"
                >

                    Back To Artists

                </a>

            </div>

        </section>

    `;

}


/* ==========================================================
   GENERIC TEXT HELPER
========================================================== */

function setText(
    id,
    value
){

    const element =
        document.getElementById(
            id
        );


    if(element){

        element.textContent =
            value || "";

    }

}


/* ==========================================================
   FORMAT TEXT
========================================================== */

function formatText(
    text
){

    if(!text){
        return "";
    }


    /*
     * Escape HTML first.
     */

    const safe =
        escapeHTML(
            text
        );


    /*
     * Convert line breaks
     * into paragraphs.
     */

    return safe
        .split(/\n\s*\n/)
        .map(
            paragraph =>
                `<p>${paragraph
                    .replace(/\n/g,"<br>")
                }</p>`
        )
        .join("");

}


/* ==========================================================
   ESCAPE HTML
========================================================== */

function escapeHTML(
    value
){

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* ==========================================================
   OPTIONAL ARTIST NAVIGATION
========================================================== */

function setupArtistNavigation(){

    const links =
        document.querySelectorAll(
            "[data-artist-section]"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const section =
                        link.dataset.artistSection;


                    const target =
                        document.getElementById(
                            section
                        );


                    if(target){

                        target.scrollIntoView({

                            behavior:"smooth",

                            block:"start"

                        });

                    }

                }
            );

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    setupArtistNavigation
);


/* ==========================================================
   GLOBAL FUNCTIONS
   These are intentionally exposed because
   HTML onclick attributes use them.
========================================================== */

window.openSong =
    openSong;

window.openMemberBiography =
    openMemberBiography;

window.loadAlbumSongs =
    loadAlbumSongs;
