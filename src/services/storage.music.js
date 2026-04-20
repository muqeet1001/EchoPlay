import ImageKit from "@imagekit/nodejs";
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
})
async function uploadMusic(file){
    try {
        const result = await imagekit.files.upload({
            file: file,
            fileName:"music_"+DataTransfer.now(),
            folder:"music",
        });
        return result
    }
    catch (error) {
        console.log(error);
    }
}

export { uploadMusic }