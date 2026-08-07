/* ==========================================================
   QUANTUM FREQUENCY RECORDS
   UNIVERSAL ARTIST ENGINE
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);

    const artistId = params.get("artist");

    if (!artistId) {

        showArtistError(
            "No artist was selected."
        );

        return;

    }

    try {

        const response = await fetch(
            `assets/data/artists/${artistId}.json`
        );

        if (!response.ok) {

            throw new Error(
                "Artist data could not be found."
            );

        }

        const artist = await response.json();

        QFR.artist = artist;

        renderArtist(artist);

    } catch (error) {

        console.error(error);

        showArtistError(
            "We couldn't load this artist."
        );

    }

});


function renderArtist(artist) {

    document.title =
        `${artist.name} | Quantum Frequency Records`;


    /* HERO */

    const hero =
        document.querySelector(".artist-hero");

    const heroBackground =
        document.querySelector(
            ".artist-hero-background"
        );

    if (heroBackground) {

        heroBackground.style.backgroundImage =
            `url("${artist.heroImage}")`;

    }


    setText(
        "artist-name",
        artist.name
    );


    setText(
        "artist-tagline",
        artist.tagline
    );


    setText(
        "artist-genre",
        artist.genre.join(" • ")
    );


    const logo =
        document.getElementById("artist-logo");

    if (logo) {

        logo.src = artist.logo;

        logo.alt = `${artist.name} logo`;

    }


    /* PROFILE */

    const profileImage =
        document.getElementById(
            "artist-profile-image"
        );

    if (profileImage) {

        profileImage.src =
            artist.profileImage;

        profileImage.alt =
            artist.name;

    }


    setText(
        "artist-short-bio",
        artist.shortBio
    );


    setHTML(
        "artist-biography",
        `<p>${artist.biography}</p>`
    );


    /* SOCIALS */

    renderSocials(
        artist.socials
    );


    /* STATS */

    setText(
        "album-count",
        artist.albums?.length || 0
    );

    setText(
        "song-count",
        calculateSongCount(artist)
    );

    setText(
        "video-count",
        artist.videos?.length || 0
    );

    setText(
        "member-count",
        artist.members?.length || 0
    );


    /* NEWS */

    renderNews(
        artist.news || []
    );


    /* ALBUMS */

    loadArtistAlbums(
    artist.albums || []
);


    /* VIDEOS */

    renderVideos(
        artist.videos || []
    );


    /* MEMBERS */

    renderMembers(
        artist.members || []
    );


    /* GALLERY */

    renderGallery(
        artist.gallery || {}
    );


    /* BIO BUTTON */

    setupBiographyToggle();

}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value || "";

    }

}


function setHTML(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerHTML =
            value || "";

    }

}


/* ==========================================================
   SOCIALS
========================================================== */

function renderSocials(socials) {

    const container =
        document.getElementById(
            "artist-socials"
        );

    if (!container) return;

    container.innerHTML = "";

    const icons = {

        instagram:
            "fa-brands fa-instagram",

        facebook:
            "fa-brands fa-facebook",

        youtube:
            "fa-brands fa-youtube",

        spotify:
            "fa-brands fa-spotify",

        tiktok:
            "fa-brands fa-tiktok"

    };

    Object.entries(socials || {})
        .forEach(([platform, url]) => {

            if (!url || url === "#") return;

            const link =
                document.createElement("a");

            link.href = url;

            link.target = "_blank";

            link.rel = "noopener";

            link.innerHTML =
                `<i class="${icons[platform] || "fa-solid fa-link"}"></i>`;

            container.appendChild(link);

        });

}


/* ==========================================================
   NEWS
========================================================== */

function renderNews(news) {

    const container =
        document.getElementById(
            "artist-news-list"
        );

    if (!container) return;

    if (!news.length) {

        container.innerHTML =
            "<p class='text-gray'>No news available yet.</p>";

        return;

    }

    container.innerHTML =
        news.map(item => `

            <article
                class="artist-news-card glass-panel"
            >

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.title)}"
                >

                <div>

                    <span class="pill">

                        ${formatDate(item.date)}

                    </span>

                    <h3>

                        ${escapeHTML(item.title)}

                    </h3>

                    <p>

                        ${escapeHTML(item.summary)}

                    </p>

                </div>

            </article>

        `).join("");

}


/* ==========================================================
   ALBUMS
========================================================== */

function renderAlbums(albums) {

    const container =
        document.getElementById(
            "artist-albums"
        );

    if (!container) return;

    if (!albums.length) {

        container.innerHTML =
            "<p class='text-gray'>No releases available yet.</p>";

        return;

    }

    container.innerHTML =
        albums.map((album, albumIndex) => `

            <article
                class="artist-album glass-panel"
            >

                <div
                    class="artist-album-header"
                >

                    <img
                        class="artist-album-art"
                        src="${album.artwork}"
                        alt="${escapeHTML(album.title)}"
                    >

                    <div>

                        <span class="pill">

                            ${escapeHTML(album.type)}

                        </span>

                        <h3>

                            ${escapeHTML(album.title)}

                        </h3>

                        <p>

                            ${album.year}

                        </p>

                        <p class="text-gray">

                            ${escapeHTML(album.description || "")}

                        </p>

                    </div>

                    <button
                        class="button-secondary"
                        onclick="toggleAlbum(${albumIndex})"
                    >

                        Songs

                    </button>

                </div>


                <div
                    id="album-songs-${albumIndex}"
                    class="artist-album-songs"
                    hidden
                >

                    <p class="text-gray">

                        Songs will be loaded from the
                        song database in the next stage.

                    </p>

                </div>

            </article>

        `).join("");

}


/* ==========================================================
   ALBUM TOGGLE
========================================================== */

function toggleAlbum(index) {

    const element =
        document.getElementById(
            `album-songs-${index}`
        );

    if (!element) return;

    element.hidden =
        !element.hidden;

}


/* ==========================================================
   VIDEOS
========================================================== */

function renderVideos(videos) {

    const container =
        document.getElementById(
            "artist-videos-grid"
        );

    if (!container) return;

    if (!videos.length) {

        container.innerHTML =
            "<p class='text-gray'>No videos available yet.</p>";

        return;

    }

    container.innerHTML =
        videos.map(video => `

            <article
                class="artist-video glass-panel"
            >

                <div class="artist-video-thumbnail">

                    <img
                        src="${video.thumbnail}"
                        alt="${escapeHTML(video.title)}"
                    >

                    <div class="artist-video-play">

                        <span>

                            <i class="fa-solid fa-play"></i>

                        </span>

                    </div>

                </div>

                <div class="card-body">

                    <h3>

                        ${escapeHTML(video.title)}

                    </h3>

                    <p>

                        ${video.year}

                    </p>

                </div>

            </article>

        `).join("");

}


/* ==========================================================
   MEMBERS
========================================================== */

function renderMembers(members) {

    const container =
        document.getElementById(
            "artist-members-grid"
        );

    if (!container) return;

    container.innerHTML =
        members.map(member => `

            <article
                class="artist-member glass-panel"
            >

                <img
                    src="${member.image}"
                    alt="${escapeHTML(member.name)}"
                >

                <div class="artist-member-info">

                    <h3>

                        ${escapeHTML(member.name)}

                    </h3>

                    <p>

                        ${escapeHTML(member.role)}

                    </p>

                    <p>

                        ${escapeHTML(member.hometown)}

                    </p>

                    <button
                        class="text-button"
                        onclick='openMemberBiography(${JSON.stringify(member)})'
                    >

                        Meet ${escapeHTML(member.name)} +

                    </button>

                </div>

            </article>

        `).join("");

}


/* ==========================================================
   MEMBER MODAL
========================================================== */

function openMemberBiography(member) {

    if (!window.QFR || !QFR.modal) {

        alert(member.biography);

        return;

    }

    QFR.modal.open(`

        <div class="member-modal">

            <div>

                <img
                    src="${member.image}"
                    alt="${escapeHTML(member.name)}"
                    style="width:100%;border-radius:18px;"
                >

            </div>

            <div>

                <span class="pill">

                    ${escapeHTML(member.role)}

                </span>

                <h2>

                    ${escapeHTML(member.name)}

                </h2>

                <p class="text-gray">

                    ${escapeHTML(member.hometown)}

                </p>

                <p>

                    ${escapeHTML(member.biography)}

                </p>

            </div>

        </div>

    `);

}


/* ==========================================================
   GALLERY
========================================================== */

function renderGallery(gallery) {

    const container =
        document.getElementById(
            "artist-gallery-grid"
        );

    if (!container) return;

    const images = [];

    Object.values(gallery || {})
        .forEach(group => {

            if (Array.isArray(group)) {

                images.push(...group);

            }

        });

    if (!images.length) {

        container.innerHTML =
            "<p class='text-gray'>Gallery coming soon.</p>";

        return;

    }

    container.innerHTML =
        images.map(image => `

            <div
                class="artist-gallery-item"
            >

                <img
                    src="${image}"
                    alt="Artist gallery"
                    loading="lazy"
                >

            </div>

        `).join("");

}


/* ==========================================================
   BIOGRAPHY
========================================================== */

function setupBiographyToggle() {

    const button =
        document.getElementById(
            "bio-toggle"
        );

    const biography =
        document.getElementById(
            "artist-biography"
        );

    if (!button || !biography) return;

    button.addEventListener(
        "click",
        () => {

            biography.classList.toggle(
                "collapsed"
            );

            biography.classList.toggle(
                "expanded"
            );

            button.textContent =
                biography.classList.contains("expanded")
                    ? "Show Less −"
                    : "Full Bio +";

        }
    );

}


/* ==========================================================
   SONG COUNT
========================================================== */

function calculateSongCount(artist) {

    if (!artist.albums) return 0;

    return artist.albums.reduce(
        (total, album) =>
            total + (album.songCount || 0),
        0
    );

}


/* ==========================================================
   DATE
========================================================== */

function formatDate(date) {

    if (!date) return "";

    return new Date(date)
        .toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

}


/* ==========================================================
   ESCAPE HTML
========================================================== */

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================================
   ERROR
========================================================== */

function showArtistError(message) {

    const page =
        document.getElementById(
            "artist-page"
        );

    if (!page) return;

    page.innerHTML = `

        <section
            style="
                min-height:70vh;
                display:flex;
                align-items:center;
                justify-content:center;
                text-align:center;
            "
        >

            <div>

                <h1>

                    Artist Not Found

                </h1>

                <p>

                    ${escapeHTML(message)}

                </p>

                <a
                    href="artists.html"
                    class="button"
                >

                    Return To Artists

                </a>

            </div>

        </section>

    `;

}
