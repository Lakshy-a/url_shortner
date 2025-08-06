import { shortUrl } from "../models/urlShortner.model.js";
import { createShortUrlService, redirectShortUrlService } from "../services/createShortUrl.service.js";
import AppError from "../utils/appError.js";

export const createShortUrl = async (req, res, next) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const existingUrl = await shortUrl.findOne({ completeUrl: url });
        if (existingUrl) {
            return res.status(200).json({ shortUrl: `${process.env.APP_URL}/${existingUrl.shortUrl}` });
        }

        let user;
        let newUrl;
        if (user) {
            newUrl = await createShortUrlService(url, user._id);
        } else {
            newUrl = await createShortUrlService(url);
        }

        if (!newUrl) {
            return res.status(500).json({ error: 'Error creating short URL' });
        }

        res.status(201).json({ shortUrl: newUrl });
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const redirectShortUrl = async (req, res, next) => {
    try {
        const { shortUrlId } = req.params;
        const urlData = await redirectShortUrlService(shortUrlId);

        if (!urlData) {
            return next(new AppError('Short URL not found', 404));
        }

        res.redirect(urlData.completeUrl);
    } catch (error) {
        console.error('Error redirecting short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}