import express from 'express'

import { getAllAlbum, getAllSongs, getAllSongsOfAlbum, getSingleSong } from './controller.js';

const router=express.Router();


router.get('/getalbum/all',getAllAlbum)
router.get('/getsong/all',getAllSongs)


router.get('/getsingle/song/:id',getSingleSong)
router.get('/album/:id',getAllSongsOfAlbum)
router.get('/song/:id',getSingleSong)
export default router;
