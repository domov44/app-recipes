const adminMiddleware = require('./middlewares/adminMiddleware');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

module.exports = { jwtMiddleware, adminMiddleware };