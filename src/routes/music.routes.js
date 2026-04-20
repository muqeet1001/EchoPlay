import express from 'express'
import { createMusic } from '../controllers/music.controller.js';
import multer from 'multer'

const upload = multer({
    storage:multer.memoryStorage()
})
const musicRoutes = express.Router();

musicRoutes.post('/upload',upload.single("music"),createMusic)


export default musicRoutes;

