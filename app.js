import express from 'express'
import dotenv from 'dotenv'
import { connectMongodb } from './src/config/mongodb.config.js';
import shortUrlRoutes from './src/routes/shortUrl.route.js';
import { redirectShortUrl } from './src/controllers/shortUrl.controller.js';
import globalErrorHandler from './src/middlewares/errorHandler.js';

const app = express();

dotenv.config();

app.use(express.json()); // body parser (req.body won't work without this)
app.use(express.urlencoded({ extended: true })); // to handle form data

const PORT = process.env.PORT;

app.use("/api/create", shortUrlRoutes);
app.get("/:shortUrlId", redirectShortUrl);

app.use(globalErrorHandler);


app.listen(PORT, () => {
    connectMongodb();
    console.log(`Server is running on port http://localhost:${PORT}`)
})