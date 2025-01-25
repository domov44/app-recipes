/* Amplify Params - DO NOT EDIT
    API_RECIPESAPP_RECIPETABLE_NAME
    REGION
Amplify Params - DO NOT EDIT */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { Pinecone } = require('@pinecone-database/pinecone');
const { generateText } = require('ai');

const region = process.env.REGION;
const recipesTableName = process.env.API_RECIPESAPP_RECIPETABLE_NAME;
const profileTableName = process.env.API_RECIPESAPP_PROFILETABLE_NAME;

const dynamoDbClient = new DynamoDBClient({ region });
const dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

const ENV = process.env.ENV;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const JINA_API_KEY = process.env.JINA_API_KEY;

const PINECONE_KEYS = {
    production: process.env.PINECONE_API_KEY_PRODUCTION,
    development: process.env.PINECONE_API_KEY_DEVELOPMENT,
    local: process.env.PINECONE_API_KEY_LOCAL,
};

const PINECONE_API_KEY = PINECONE_KEYS[ENV] || PINECONE_KEYS.local;
if (!PINECONE_API_KEY) {
    throw new Error('La clé API Pinecone est manquante. Veuillez la configurer dans les variables d\'environnement.');
}

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.index('miamze');

exports.recipe = async (req, res) => {
    try {
        console.log('Scanning recipes from DynamoDB...');
        const scanResult = await dynamoDbDocumentClient.send(
            new ScanCommand({
                TableName: recipesTableName,
                Limit: 50,
                Select: 'ALL_ATTRIBUTES',
            })
        );

        const recipesList = scanResult.Items;

        if (!recipesList || recipesList.length === 0) {
            return res.status(404).json({ message: 'Aucune recette trouvée dans la table.' });
        }

        console.log(`Nombre de recettes récupérées : ${recipesList.length}`);

        const groq = require('@ai-sdk/groq').createGroq({ apiKey: GROQ_API_KEY });
        const model = groq('llama-3.2-90b-vision-preview');

		console.log(recipesList)

        for (const recipe of recipesList) {
            try {
                const { text } = await generateText({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: `Tu es dans une application de recette qui consiste à mettre en avant la communauté et les traditions culinaires durant le ramadan. Ton rôle est de résumer une recette pour qu'elle soit optimisée pour du rag, dont son origine, sa description, ses ingrédients, ses étapes, l'auteur, sa durée totale, sans autres commentaires.`,
                        },
                        {
                            role: 'user',
                            content: `${JSON.stringify(recipe)}`,
                        },
                    ],
                });

                console.log(`Résumé généré pour la recette ${recipe.id} : ${text}`);

                await vectorizeWithJina(text, recipe.id, 'recipe');
            } catch (error) {
                console.error(`Erreur pour la recette ${recipe.id} :`, error);
            }
        }

        res.status(200).json({
            message: 'Traitement des recettes terminé avec succès.',
            recipesProcessed: recipesList.length,
        });
    } catch (error) {
        console.error('Erreur lors du traitement des recettes :', error);
        res.status(500).json({ message: 'Une erreur est survenue.', error: error.message });
    }
};

const vectorizeWithJina = async (text, id, namespace) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://api.jina.ai/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JINA_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'jina-embeddings-v3',
                task: 'text-matching',
                late_chunking: false,
                dimensions: 1024,
                embedding_type: 'float',
                input: [text],
            }),
        });

        const data = await response.json();

        const embeddingVector = data?.data?.[0]?.embedding;
        if (response.ok && Array.isArray(embeddingVector) && embeddingVector.length === 1024) {
            await insertVectorToPinecone(embeddingVector, id, namespace);
        } else {
            console.error('Réponse incorrecte ou vecteur non valide :', data);
        }
    } catch (error) {
        console.error('Erreur lors de la vectorisation avec Jina :', error);
    }
};

const insertVectorToPinecone = async (embeddingVector, id, namespace) => {
    try {
        await index.namespace(namespace).upsert([
            {
                id: id.toString(),
                values: embeddingVector,
                metadata: {
                    id: id,
                },
            },
        ]);
        console.log(`Vecteur inséré avec succès pour l'élément ${id} dans le namespace ${namespace}`);
    } catch (error) {
        console.error('Erreur lors de l\'insertion dans Pinecone :', error);
    }
};

exports.profile = async (req, res) => {
    try {
        const scanResult = await dynamoDbDocumentClient.send(
            new ScanCommand({
                TableName: profileTableName,
                Limit: 50,
                Select: 'ALL_ATTRIBUTES',
            })
        );

        const profilesList = scanResult.Items;

        if (!profilesList || profilesList.length === 0) {
            return res.status(404).json({ message: 'Aucun profil trouvé dans la table.' });
        }

        console.log(`Nombre de profils récupérés : ${profilesList.length}`);

        const groq = require('@ai-sdk/groq').createGroq({ apiKey: GROQ_API_KEY });
        const model = groq('llama-3.2-90b-vision-preview');

		console.log(profilesList)

        for (const profile of profilesList) {
            try {
                const { text } = await generateText({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: `Tu es dans une application qui consiste à mettre en avant les utilisateurs. Ton rôle est de résumer un profil utilisateur pour qu'il soit optimisé pour du rag, dont sa description et d'autres informations pertinentes.`,
                        },
                        {
                            role: 'user',
                            content: `${JSON.stringify(profile)}`,
                        },
                    ],
                });

                console.log(`Résumé généré pour le profil ${profile.id}: ${text}`);

                await vectorizeWithJina(text, profile.id, 'profile');
            } catch (error) {
                console.error(`Erreur pour le profil ${profile.id} :`, error);
            }
        }

        res.status(200).json({
            message: 'Traitement des profils terminé avec succès.',
            profilesProcessed: profilesList.length,
        });
    } catch (error) {
        console.error('Erreur lors du traitement des profils :', error);
        res.status(500).json({ message: 'Une erreur est survenue.', error: error.message });
    }
};
