import { saveShortUrl } from "../dao/shortUrl.dao.js";
import { shortUrl } from "../models/urlShortner.model.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlService = async (url) => {
    const shortUrlId = generateNanoId(7);

    await saveShortUrl(url, shortUrlId);

    return `${process.env.APP_URL}/${shortUrlId}`;
}

export const redirectShortUrlService = async (shortUrlId) => {
    const urlData = await shortUrl.findOneAndUpdate({ shortUrl: shortUrlId }, { $inc: { clicks: 1 } }, { new: true });
    if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return await urlData.save();
}