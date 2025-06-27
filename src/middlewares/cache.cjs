const cache = require('../../configs/cache.cjs');

function cacheMiddleware(key) {
    return (req, res, next) => {
        const cachedResponse = cache.get(key);
        if (cachedResponse) {
            cachedResponse.cached = true;
            console.log('Cache: ', cachedResponse.cached);
            res.status(200).json({ clients: cachedResponse });
        } else {
            next();
        }
    };
}

module.exports = cacheMiddleware;