import { shortUrl } from "../models/urlShortner.model.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlService = async (url) => {
    const shortUrlId = generateNanoId(7);

    const newUrl = new shortUrl({
        completeUrl: url,
        shortUrl: shortUrlId,
        clicks: 0
    });

    await newUrl.save()
    
    return `${process.env.APP_URL}/${shortUrlId}`;
}