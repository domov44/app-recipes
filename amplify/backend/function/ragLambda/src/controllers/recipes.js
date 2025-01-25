/* Amplify Params - DO NOT EDIT
    API_RECIPESAPP_GRAPHQLAPIENDPOINTOUTPUT
    API_RECIPESAPP_GRAPHQLAPIIDOUTPUT
    API_RECIPESAPP_GRAPHQLAPIKEYOUTPUT
    AUTH_RECIPESAPP4F20ED6A_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const { Pinecone } = require('@pinecone-database/pinecone');

const ENV = process.env.ENV;

const PINECONE_KEYS = {
    production: process.env.PINECONE_API_KEY_PRODUCTION,
    development: process.env.PINECONE_API_KEY_DEVELOPMENT,
    local: process.env.PINECONE_API_KEY_LOCAL,
};

const PINECONE_API_KEY = PINECONE_KEYS[ENV] || PINECONE_KEYS.local;

if (!PINECONE_API_KEY) {
    throw new Error('La clé API Pinecone est manquante. Veuillez la configurer dans les variables d\'environnement.');
}

const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
});

const index = pinecone.index('miamze');

exports.index = async (req, res) => {
    try {
        const { sub } = req.user;

        if (!sub) {
            return res.status(400).json({ error: 'Utilisateur non identifié.' });
        }

        console.log(`Fetching data for sub: ${sub}`);

        const userVectorRes = await index.namespace('profile').fetch([sub]);
        const userRecord = userVectorRes.records[sub];

        if (!userRecord || !userRecord.values) {
            return res.status(404).json({ error: 'Aucun vecteur trouvé pour cet utilisateur.' });
        }

        const userVector = userRecord.values;

        const recipesRes = await index.namespace('recipe').query({
            vector: userVector,
            topK: 3,
            includeMetadata: true,
            filter: {
                id: { $exists: true },
            },
        });

        if (recipesRes.matches.length === 0) {
            return res.status(404).json({ error: 'Aucune recette correspondante trouvée.' });
        }

        const matchingRecipes = recipesRes.matches.map(match => ({
            recipeId: match.metadata.id,
            score: match.score,
            metadata: match.metadata,
        }));

        console.log(`Recipes found for sub ${sub}:`, matchingRecipes);

        return res.status(200).json({ recipes: matchingRecipes });
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur et des recettes :', error);
        return res.status(500).json({ message: 'Une erreur est survenue', error: error.message });
    }
};

