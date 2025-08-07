import express from 'express'
import dotenv from 'dotenv'
import { connectMongodb } from './src/config/mongodb.config.js';
import shortUrlRoutes from './src/routes/shortUrl.route.js';
import { redirectShortUrl } from './src/controllers/shortUrl.controller.js';
import globalErrorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';

const app = express();

app.use(cors());

dotenv.config();

app.use(express.json()); // body parser (req.body won't work without this)
app.use(express.urlencoded({ extended: true })); // to handle form data

const PORT = process.env.PORT;

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});
app.use("/api/create", shortUrlRoutes);
app.get("/:shortUrlId", redirectShortUrl);

app.use(globalErrorHandler);


app.listen(PORT,'0.0.0.0', () => {
    connectMongodb();
    console.log(`Server is running on port ${PORT}`)
})
