import express from 'express';
import { isAuth, uploadfile } from './middleware.js';
import { addAlbum, addSong, addThumbnail, deleteAlbum, deleteSong } from './controller.js';
const router = express.Router();
router.post('/album/new', isAuth, uploadfile, addAlbum);
router.post('/song/new', isAuth, uploadfile, addSong);
router.post('/song/thumbnail/:id', isAuth, uploadfile, addThumbnail);
router.delete('/album/delete/:id', isAuth, deleteAlbum);
router.delete('/song/delete/:id', isAuth, deleteSong);
export default router;
//# sourceMappingURL=route.js.map