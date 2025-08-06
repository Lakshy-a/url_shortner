import { shortUrl } from "../models/urlShortner.model.js";
import { createShortUrlService } from "../services/createShortUrl.service.js";

export const createShortUrl = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const existingUrl = await shortUrl.findOne({ completeUrl: url });
    if (existingUrl) {
        return res.status(200).json({ shortUrl: `${process.env.APP_URL}/${existingUrl.shortUrl}` });
    }

    const newUrl = await createShortUrlService(url)

    if (!newUrl) {
        return res.status(500).json({ error: 'Error creating short URL' });
    }

    res.status(201).json({ shortUrl: newUrl });
}

export const redirectShortUrl = async (req, res) => {
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
}