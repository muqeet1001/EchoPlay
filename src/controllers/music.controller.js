import musicModel from "../models/music.model.js";
import { uploadMusic } from "../services/storage.music.js";
async function createMusic(req, res) {

    const token = req.cookies.token;
    if (!token) {
        return res.staus(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'artist') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const file = req.file;
        if(!file){
            return res.status(400).json({ message: "File is required" });
        }
        const result = await uploadMusic(file);
        if(!result){
            return res.status(400).json({ message: "Failed to upload music" });
        }
        const music = await musicModel.create({
            uri:result.uri,
            title,
            artist:decoded.id
        });
        res.status(201).json({
            message:"music created successfully",
            music:{
                id:music._id,
                uri:music.uri,
                title:music.title,
                artist:music.artist
            }
        })


    }
    catch (err) {   
        console.log(err);
    }



}

export {createMusic}