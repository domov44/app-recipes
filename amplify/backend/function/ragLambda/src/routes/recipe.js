const express = require('express');
const recipe = require('../controllers/recipes');
const middleware = require('../middleware');

const router = express.Router();

router.get('/recipes', middleware.jwtMiddleware, recipe.index);

module.exports = router;