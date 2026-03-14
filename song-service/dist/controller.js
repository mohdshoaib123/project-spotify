import { tryCatch } from "./tryCatch.js";
import { sql } from "./config/db.js";
import { redisClient } from "./index.js";
export const getAllAlbum = tryCatch(async (req, res) => {
    let albums;
    const CACHE_EXPIRY = 1800;
    if (redisClient?.isReady) {
        try {
            albums = await redisClient.get("albums");
        }
        catch (err) {
            console.log(err);
        }
    }
    if (albums) {
        return res.json(JSON.parse(albums));
    }
    else {
        albums = await sql `SELECT * FROM albums`;
        if (albums.length === 0) {
            return res.status(403).json({ message: "no album exist" });
        }
        if (redisClient?.isReady) {
            try {
                await redisClient.set('albums', JSON.stringify(albums), { EX: CACHE_EXPIRY });
            }
            catch (err) {
                console.log(err);
            }
        }
        res.status(200).json(albums);
    }
});
export const getAllSongs = tryCatch(async (req, res) => {
    let songs;
    const CACHE_EXPIRY = 1800;
    if (redisClient?.isReady) {
        try {
            songs = await redisClient.get("songs");
        }
        catch (err) {
            console.log(err);
        }
    }
    if (songs) {
        return res.json(JSON.parse(songs));
    }
    else {
        songs = await sql `SELECT * FROM songs`;
        if (songs.length === 0) {
            return res.status(400).json({ message: "no songs exist" });
        }
        await redisClient.set('songs', JSON.stringify(songs), { EX: CACHE_EXPIRY });
        res.status(200).json(songs);
    }
});
export const getAllSongsOfAlbum = tryCatch(async (req, res) => {
    const { id } = req.params;
    let album, songs;
    const CACHE_EXPIRY = 1800;
    album = await sql `SELECT * FROM albums WHERE id=${id}`;
    if (album.length === 0) {
        return res.status(403).json({ message: "no album exist with this id" });
    }
    if (redisClient?.isReady) {
        try {
            songs = await redisClient.get(`album_song_${id}`);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (songs) {
        return res.status(200).json({ songs: JSON.parse(songs), album: album[0] });
    }
    else {
        songs = await sql `SELECT * FROM songs WHERE album_id=${id}`;
        if (songs.length === 0) {
            return res.status(400).json({ message: "no songs exist in this album" });
        }
        if (redisClient?.isReady) {
            try {
                await redisClient.set(`album_song_${id}`, JSON.stringify(songs), { EX: CACHE_EXPIRY });
            }
            catch (err) {
                console.log(err);
            }
        }
        const response = { songs, album: album[0] };
        console.log(response);
        res.status(200).json(response);
    }
});
export const getSingleSong = tryCatch(async (req, res) => {
    const id = req.params.id;
    let song;
    const CACHE_EXPIRY = 1800;
    if (redisClient?.isReady) {
        try {
            song = await redisClient.get(`song_${id}`);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (song) {
        return res.status(200).json(JSON.parse(song));
    }
    else {
        song = await sql `SELECT * FROM songs WHERE id=${id}`;
        if (song.length === 0) {
            return res.status(403).json({ message: "no song exist with this id" });
        }
        await redisClient.set(`song_${id}`, JSON.stringify(song[0]), { EX: CACHE_EXPIRY });
        res.status(200).json(song[0]);
    }
});
//# sourceMappingURL=controller.js.map