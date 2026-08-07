/* ==========================================================
   QUANTUM FREQUENCY RECORDS
   UNIVERSAL DATA ENGINE

   File:
   assets/js/qfr-data.js

   PURPOSE:
   ----------------------------------------------------------
   This file is the central data system for the QFR website.

   Instead of every page independently figuring out how to
   load artists, albums, songs, videos, etc., pages can use:

       QFRData.getArtist()
       QFRData.getAlbum()
       QFRData.getSong()
       QFRData.getArtists()
       QFRData.getAlbums()
       QFRData.getSongs()

   This keeps the website:

   - Lean
   - Easy to maintain
   - Data-driven
   - Expandable
   - Consistent
   - Easier to update

   IMPORTANT:
   ----------------------------------------------------------
   JSON remains the source of truth.

========================================================== */


/* ==========================================================
   GLOBAL QFR DATA OBJECT
========================================================== */

window.QFRData = {

    /* ------------------------------------------------------
       CONFIGURATION
    ------------------------------------------------------ */

    config: {

        paths: {

            artists:
                "assets/data/artists",

            albums:
                "assets/data/albums",

            songs:
                "assets/data/songs",

            lyrics:
                "assets/data/lyrics",

            videos:
                "assets/data/videos",

            news:
                "assets/data/news",

            gallery:
                "assets/data/gallery"

        }

    },


    /* ------------------------------------------------------
       CACHE
       ------------------------------------------------------
       Data loaded once during a page visit is stored here.
       This prevents unnecessary repeated downloads.
    */

    cache: {

        artists: null,

        albums: null,

        songs: null,

        videos: null,

        news: null,

        gallery: null,

        individualArtists: {},

        individualAlbums: {},

        individualSongs: {}

    },


    /* ======================================================
       GENERIC FETCH
    ====================================================== */

    async fetchJSON(url) {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                `QFR Data Error: ${url}`
            );

        }


        return await response.json();

    },


    /* ======================================================
       ARTISTS
    ====================================================== */

    async getArtists(options = {}) {

        /*
         * Return cached data when available.
         */

        if (this.cache.artists) {

            return this.filterArtists(
                this.cache.artists,
                options
            );

        }


        const url =
            `${this.config.paths.artists}/index.json`;


        const data =
            await this.fetchJSON(url);


        this.cache.artists =
            data.artists || [];


        return this.filterArtists(
            this.cache.artists,
            options
        );

    },


    /* ------------------------------------------------------
       GET ONE ARTIST
    ------------------------------------------------------ */

    async getArtist(artistId) {

        if (!artistId) {

            throw new Error(
                "QFRData.getArtist requires an artist ID."
            );

        }


        /*
         * Check cache first.
         */

        if (
            this.cache.individualArtists[artistId]
        ) {

            return this.cache.individualArtists[
                artistId
            ];

        }


        const url =
            `${this.config.paths.artists}/${artistId}.json`;


        const artist =
            await this.fetchJSON(url);


        this.cache.individualArtists[
            artistId
        ] = artist;


        return artist;

    },


    /* ------------------------------------------------------
       FILTER ARTISTS
    ------------------------------------------------------ */

    filterArtists(
        artists,
        options = {}
    ) {

        let result =
            [...artists];


        /*
         * Active artists only.
         */

        if (
            options.activeOnly !== false
        ) {

            result =
                result.filter(
                    artist =>
                        artist.active !== false
                );

        }


        /*
         * Genre.
         */

        if (options.genre) {

            const genre =
                options.genre.toLowerCase();


            result =
                result.filter(
                    artist => {

                        const genres =
                            Array.isArray(
                                artist.genre
                            )
                            ?
                            artist.genre
                            :
                            [artist.genre];


                        return genres.some(
                            item =>
                                String(item)
                                    .toLowerCase()
                                    .includes(genre)
                        );

                    }
                );

        }


        /*
         * Featured.
         */

        if (
            options.featured === true
        ) {

            result =
                result.filter(
                    artist =>
                        artist.featured === true
                );

        }


        /*
         * Alphabetical.
         */

        if (
            options.sort === "alphabetical" ||
            options.sort === "alpha"
        ) {

            result.sort(
                (a,b) =>
                    String(a.name)
                        .localeCompare(
                            String(b.name)
                        )
            );

        }


        /*
         * Sort order.
         */

        else {

            result.sort(
                (a,b) =>
                    Number(
                        a.sortOrder || 9999
                    )
                    -
                    Number(
                        b.sortOrder || 9999
                    )
            );

        }


        return result;

    },


    /* ======================================================
       ALBUMS
    ====================================================== */

    async getAlbums(options = {}) {

        if (this.cache.albums) {

            return this.filterAlbums(
                this.cache.albums,
                options
            );

        }


        const url =
            `${this.config.paths.albums}/index.json`;


        const data =
            await this.fetchJSON(url);


        this.cache.albums =
            data.albums || [];


        return this.filterAlbums(
            this.cache.albums,
            options
        );

    },


    /* ------------------------------------------------------
       GET ONE ALBUM
    ------------------------------------------------------ */

    async getAlbum(albumId) {

        if (!albumId) {

            throw new Error(
                "QFRData.getAlbum requires an album ID."
            );

        }


        if (
            this.cache.individualAlbums[albumId]
        ) {

            return this.cache.individualAlbums[
                albumId
            ];

        }


        const url =
            `${this.config.paths.albums}/${albumId}.json`;


        const album =
            await this.fetchJSON(url);


        this.cache.individualAlbums[
            albumId
        ] = album;


        return album;

    },


    /* ------------------------------------------------------
       FILTER ALBUMS
    ------------------------------------------------------ */

    filterAlbums(
        albums,
        options = {}
    ) {

        let result =
            [...albums];


        /*
         * Artist.
         */

        if (options.artistId) {

            result =
                result.filter(
                    album =>
                        album.artistId ===
                        options.artistId
                );

        }


        /*
         * Featured.
         */

        if (
            options.featured === true
        ) {

            result =
                result.filter(
                    album =>
                        album.featured === true
                );

        }


        /*
         * Status.
         */

        if (options.status) {

            result =
                result.filter(
                    album =>
                        album.status ===
                        options.status
                );

        }


        /*
         * Genre.
         */

        if (options.genre) {

            const genre =
                options.genre.toLowerCase();


            result =
                result.filter(
                    album => {

                        const genres =
                            Array.isArray(
                                album.genre
                            )
                            ?
                            album.genre
                            :
                            [album.genre];


                        return genres.some(
                            item =>
                                String(item)
                                    .toLowerCase()
                                    .includes(
                                        genre
                                    )
                        );

                    }
                );

        }


        /*
         * Newest first.
         */

        result.sort(
            (a,b) =>
                new Date(
                    b.releaseDate || 0
                )
                -
                new Date(
                    a.releaseDate || 0
                )
        );


        return result;

    },


    /* ======================================================
       SONGS
    ====================================================== */

    async getSongs(options = {}) {

        if (this.cache.songs) {

            return this.filterSongs(
                this.cache.songs,
                options
            );

        }


        const url =
            `${this.config.paths.songs}/index.json`;


        const data =
            await this.fetchJSON(url);


        this.cache.songs =
            data.songs || [];


        return this.filterSongs(
            this.cache.songs,
            options
        );

    },


    /* ------------------------------------------------------
       GET ONE SONG
    ------------------------------------------------------ */

    async getSong(songId) {

        if (!songId) {

            throw new Error(
                "QFRData.getSong requires a song ID."
            );

        }


        if (
            this.cache.individualSongs[songId]
        ) {

            return this.cache.individualSongs[
                songId
            ];

        }


        const url =
            `${this.config.paths.songs}/${songId}.json`;


        const song =
            await this.fetchJSON(url);


        this.cache.individualSongs[
            songId
        ] = song;


        return song;

    },


    /* ------------------------------------------------------
       FILTER SONGS
    ------------------------------------------------------ */

    filterSongs(
        songs,
        options = {}
    ) {

        let result =
            [...songs];


        /*
         * Artist.
         */

        if (options.artistId) {

            result =
                result.filter(
                    song =>
                        song.artistId ===
                        options.artistId
                );

        }


        /*
         * Album.
         */

        if (options.albumId) {

            result =
                result.filter(
                    song =>
                        song.albumId ===
                        options.albumId
                );

        }


        /*
         * Featured.
         */

        if (
            options.featured === true
        ) {

            result =
                result.filter(
                    song =>
                        song.featured === true
                );

        }


        /*
         * Status.
         */

        if (options.status) {

            result =
                result.filter(
                    song =>
                        song.status ===
                        options.status
                );

        }


        /*
         * Genre.
         */

        if (options.genre) {

            const genre =
                options.genre.toLowerCase();


            result =
                result.filter(
                    song => {

                        const genres =
                            Array.isArray(
                                song.genre
                            )
                            ?
                            song.genre
                            :
                            [song.genre];


                        return genres.some(
                            item =>
                                String(item)
                                    .toLowerCase()
                                    .includes(
                                        genre
                                    )
                        );

                    }
                );

        }


        /*
         * Newest first.
         */

        result.sort(
            (a,b) =>
                new Date(
                    b.releaseDate || 0
                )
                -
                new Date(
                    a.releaseDate || 0
                )
        );


        return result;

    },


    /* ======================================================
       RELATIONSHIPS
    ====================================================== */


    /* ------------------------------------------------------
       GET ARTIST ALBUMS
    ------------------------------------------------------ */

    async getArtistAlbums(
        artistId
    ) {

        const artist =
            await this.getArtist(
                artistId
            );


        const albums =
            await this.getAlbums();


        const artistAlbumIds =
            artist.albums || [];


        return albums.filter(
            album =>
                album.artistId === artistId ||
                artistAlbumIds.includes(
                    album.id
                )
        );

    },


    /* ------------------------------------------------------
       GET ARTIST SONGS
    ------------------------------------------------------ */

    async getArtistSongs(
        artistId
    ) {

        const songs =
            await this.getSongs();


        return songs.filter(
            song =>
                song.artistId === artistId
        );

    },


    /* ------------------------------------------------------
       GET ALBUM SONGS
    ------------------------------------------------------ */

    async getAlbumSongs(
        albumId
    ) {

        const album =
            await this.getAlbum(
                albumId
            );


        const songs =
            await this.getSongs();


        const trackIds =
            album.tracks || [];


        return trackIds
            .map(
                id =>
                    songs.find(
                        song =>
                            song.id === id
                    )
            )
            .filter(Boolean);

    },


    /* ======================================================
       RELEASE / DATE HELPERS
    ====================================================== */


    /* ------------------------------------------------------
       LATEST ARTISTS
    ------------------------------------------------------ */

    async getLatestArtists(
        limit = 5
    ) {

        const artists =
            await this.getArtists({
                activeOnly: true
            });


        return artists
            .sort(
                (a,b) =>
                    new Date(
                        b.signingDate || 0
                    )
                    -
                    new Date(
                        a.signingDate || 0
                    )
            )
            .slice(
                0,
                limit
            );

    },


    /* ------------------------------------------------------
       LATEST ALBUMS
    ------------------------------------------------------ */

    async getLatestAlbums(
        limit = 5
    ) {

        const albums =
            await this.getAlbums();


        return albums
            .slice(
                0,
                limit
            );

    },


    /* ------------------------------------------------------
       LATEST SONGS
    ------------------------------------------------------ */

    async getLatestSongs(
        limit = 5
    ) {

        const songs =
            await this.getSongs();


        return songs
            .slice(
                0,
                limit
            );

    },


    /* ======================================================
       FEATURED CONTENT
    ====================================================== */

    async getFeaturedArtists() {

        return await this.getArtists({

            featured: true,

            activeOnly: true

        });

    },


    async getFeaturedAlbums() {

        return await this.getAlbums({

            featured: true

        });

    },


    async getFeaturedSongs() {

        return await this.getSongs({

            featured: true

        });

    },


    /* ======================================================
       SEARCH
    ====================================================== */

    async search(
        query
    ) {

        if (!query) {

            return {

                artists: [],

                albums: [],

                songs: []

            };

        }


        const searchTerm =
            query
                .toLowerCase()
                .trim();


        const [
            artists,
            albums,
            songs
        ] =
            await Promise.all([

                this.getArtists(),

                this.getAlbums(),

                this.getSongs()

            ]);


        return {

            artists:
                artists.filter(
                    artist =>
                        this.searchObject(
                            artist,
                            searchTerm
                        )
                ),

            albums:
                albums.filter(
                    album =>
                        this.searchObject(
                            album,
                            searchTerm
                        )
                ),

            songs:
                songs.filter(
                    song =>
                        this.searchObject(
                            song,
                            searchTerm
                        )
                )

        };

    },


    /* ------------------------------------------------------
       SEARCH OBJECT
    ------------------------------------------------------ */

    searchObject(
        object,
        searchTerm
    ) {

        const searchable =
            JSON.stringify(
                object
            )
            .toLowerCase();


        return searchable.includes(
            searchTerm
        );

    },


    /* ======================================================
       LYRICS
    ====================================================== */

    async getLyrics(
        songId
    ) {

        const song =
            await this.getSong(
                songId
            );


        if (
            !song.lyrics ||
            !song.lyrics.file
        ) {

            return null;

        }


        const response =
            await fetch(
                song.lyrics.file
            );


        if (!response.ok) {

            return null;

        }


        return await response.text();

    },


    /* ======================================================
       ARTIST + SONG COMBINED DATA
    ====================================================== */

    async getSongWithArtist(
        songId
    ) {

        const song =
            await this.getSong(
                songId
            );


        let artist =
            null;


        if(song.artistId){

            artist =
                await this.getArtist(
                    song.artistId
                );

        }


        return {

            song,

            artist

        };

    },


    /* ======================================================
       ALBUM + ARTIST COMBINED DATA
    ====================================================== */

    async getAlbumWithArtist(
        albumId
    ) {

        const album =
            await this.getAlbum(
                albumId
            );


        let artist =
            null;


        if(album.artistId){

            artist =
                await this.getArtist(
                    album.artistId
                );

        }


        return {

            album,

            artist

        };

    },


    /* ======================================================
       CLEAR CACHE
    ====================================================== */

    clearCache() {

        this.cache = {

            artists: null,

            albums: null,

            songs: null,

            videos: null,

            news: null,

            gallery: null,

            individualArtists: {},

            individualAlbums: {},

            individualSongs: {}

        };

    }

};


/* ==========================================================
   QFR READY EVENT
========================================================== */

/*
 * Other scripts can listen for this event if necessary.
 */

document.dispatchEvent(
    new CustomEvent(
        "qfr-data-ready"
    )
);
