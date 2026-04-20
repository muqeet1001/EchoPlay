import cookieParser from 'cookie-parser';
import express from 'express'
import router from './routes/auth.routes.js';
import musicRoutes from './routes/music.routes.js';
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/auth', router);
app.use('/music',musicRoutes)
export default app;
