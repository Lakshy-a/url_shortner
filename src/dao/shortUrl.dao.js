import { shortUrl } from "../models/urlShortner.model.js";

export const saveShortUrl = async (complete_url, short_url, user_id) => {

    const newUrl = new shortUrl({
        completeUrl: complete_url,
        shortUrl: short_url,
        clicks: 0
    });

    if (user_id) {
        newUrl.user_id = user_id;
    }

    await newUrl.save();
}