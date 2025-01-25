const express = require('express');
const seed = require('../controllers/seeds');
const middleware = require('../middleware');

const router = express.Router();

router.post('/seed/recipe', middleware.adminMiddleware, seed.recipe);
router.post('/seed/profile', middleware.adminMiddleware, seed.profile);

module.exports = router;