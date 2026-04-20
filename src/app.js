import cookieParser from 'cookie-parser';
import express from 'express'
import router from './routes/auth.routes.js';
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/', router);
export default app;
