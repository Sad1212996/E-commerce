/**
 * Middleware to sanitize request body, query, and params from NoSQL injection operator keys (keys starting with $ or containing .)
 */
const sanitizeValue = (data) => {
    if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.map(sanitizeValue);
        }
        const cleanObj = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // Strip NoSQL operators like $ne, $gt, etc.
                if (key.startsWith('$') || key.includes('.')) {
                    continue;
                }
                cleanObj[key] = sanitizeValue(data[key]);
            }
        }
        return cleanObj;
    }
    return data;
};

const sanitizeInput = (req, res, next) => {
    if (req.body) req.body = sanitizeValue(req.body);
    if (req.query) req.query = sanitizeValue(req.query);
    if (req.params) req.params = sanitizeValue(req.params);
    next();
};

export default sanitizeInput;
