import cache from '../../configs/cache.js';
import chalk from 'chalk';

function cacheMiddleware(key) {
    return (req, res, next) => {
        const cachedResponse = cache.get(key);
        if (cachedResponse) {
            cachedResponse.cached = true
            console.log(chalk.red('Cache: ',cachedResponse.cached));

            res.render('clients', { clients: cachedResponse });
        } else {
            next();
        }
    };
}

export default cacheMiddleware;