import express from 'express'
import dotenv from 'dotenv'
import { connectMongodb } from './src/config/mongodb.config.js';
import shortUrlRoutes from './src/routes/shortUrl.route.js';
import { shortUrl } from './src/models/urlShortner.model.js';

const app = express();

dotenv.config();

app.use(express.json()); // body parser (req.body won't work without this)
app.use(express.urlencoded({ extended: true })); // to handle form data

const PORT = process.env.PORT;

app.use("/api/create", shortUrlRoutes);

app.get("/:shortUrlId", async (req, res) => {
    const { shortUrlId } = req.params;
    console.log("Short URL ID:", req.params);
    const urlData = await shortUrl.findOne({ shortUrl: shortUrlId });
    if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
    }
    console.log("Found URL Data:", urlData);

    urlData.clicks += 1;
    await urlData.save();
    res.redirect(urlData.completeUrl);
});

app.listen(PORT, () => {
    connectMongodb();
    console.log(`Server is running on port http://localhost:${PORT}`)
})