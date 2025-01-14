import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: 'pcsk_4Afp8P_3EcTyar4Avb5rLn4xQqBgDhS3fv5kBHX3oaFgtab3P8dHkUoXWP6SLCwMd7bKH6',
});

const index = pinecone.index('miamze');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Utilisateur non identifié.' });
  }

  try {
    const userVectorRes = await index.namespace('profile').fetch([userId]);
    const userRecord = userVectorRes.records[userId];

    if (!userRecord || !userRecord.values) {
      return res.status(404).json({ error: 'Aucun vecteur trouvé pour cet utilisateur.' });
    }

    const userVector = userRecord.values;

    const recipesRes = await index.namespace('recipe').query({
      vector: userVector,
      topK: 1,
      includeMetadata: true,
      filter: {
        recipe_id: { $exists: true },
      },
    });

    if (recipesRes.matches.length === 0) {
      return res.status(404).json({ error: 'Aucune recette correspondante trouvée.' });
    }

    const recipeId = recipesRes.matches[0].metadata.recipe_id;
    return res.status(200).json({ recipeId });
  } catch (error) {
    return res.status(500).json({ error: `Erreur : ${error.message}` });
  }
}
