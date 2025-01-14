import { useState } from 'react';
import Hero from "@/components/ui/wrapper/Hero";
import { generateClient } from "aws-amplify/api";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { notifySuccess, notifyError } from '@/components/ui/Toastify';
import Form from '@/components/ui/form/Form';
import Bento from '@/components/ui/wrapper/Bento';
import Button from '@/components/ui/button/Button';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import { listRecipes } from '@/graphql/customQueries';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { Pinecone } from '@pinecone-database/pinecone';

const client = generateClient();

const groq = createGroq({
    apiKey: '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',
});

const model = groq('llama-3.2-90b-vision-preview');

const pc = new Pinecone({
    apiKey: `pcsk_4Afp8P_3EcTyar4Avb5rLn4xQqBgDhS3fv5kBHX3oaFgtab3P8dHkUoXWP6SLCwMd7bKH6`
});
const index = pc.index('miamze');

export default function Seed() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
            });
            const recipesList = recipeData.data.listRecipes.items;
            setRecipes(recipesList);
            notifySuccess("Seed réussi");
            console.log(recipesList);

            for (const recipe of recipesList) {
                try {
                    console.log(recipe);
                    const { text } = await generateText({
                        model: model,
                        messages: [
                            {
                                role: 'system',
                                content: `Tu es dans une application de recette qui consiste à mettre en avant la communauté, et les traditions culinaires durant le ramadan. Ton rôle est de résumer une recette pour qu'elle soit optimisée pour du rag, dont son origine, sa description, ses ingrédients, ses étapes, l'auteur, sa durée totale, sans autres commentaires.`,
                            },
                            {
                                role: 'user',
                                content: `${JSON.stringify(recipe)}`,
                            },
                        ],
                    });

                    console.log(text);

                    await vectorizeWithJina(text, recipe.id);

                } catch (error) {
                    console.error(`Erreur pour la recette ${recipe.title}:`, error);
                    notifyError(`Erreur lors de la génération pour ${recipe.title}`);
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des recettes:", error);
            notifyError("Le seed a planté");
        } finally {
            setLoading(false);
        }
    };

    const vectorizeWithJina = async (text, id) => {
        try {
            const response = await fetch('https://api.jina.ai/v1/embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer jina_76a6ba7597264e81ab24862f4e3423dasVuB4xtvYjApFRhlZUlpY8Vhq2PG',
                },
                body: JSON.stringify({
                    model: "jina-embeddings-v3",
                    task: "text-matching",
                    late_chunking: false,
                    dimensions: 1024,
                    embedding_type: "float",
                    input: [text],
                }),
            });
    
            const data = await response.json();
            console.log("Réponse complète de l'API Jina :", data);
    
            const embeddingVector = data?.data?.[0]?.embedding;
            if (response.ok && Array.isArray(embeddingVector) && embeddingVector.length === 1024) {
                console.log(`Vecteur généré pour l'id ${id}:`, embeddingVector);
    
                await insertVectorToPinecone(embeddingVector, id);
    
                notifySuccess(`Vectorisation réussie pour l'id ${id}`);
            } else {
                console.error("Réponse incorrecte ou vecteur non valide :", data);
                notifyError("Erreur lors de la vectorisation : Réponse vide ou incorrecte.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API Jina :", error);
            notifyError("Erreur lors de la vectorisation.");
        }
    };

    const insertVectorToPinecone = async (embeddingVector, id) => {
        try {
            await index.namespace("recipe").upsert([
                {
                    id: id.toString(),
                    values: embeddingVector,
                    metadata: {
                        recipe_id: id
                    }
                }
            ]);
    
            notifySuccess(`Insertion réussie`);
        } catch (error) {
            console.error("Erreur lors de l'insertion dans Pinecone:", error);
            notifyError("Erreur lors de l'insertion dans Pinecone");
        }
    };
    
    return (
        <ProtectedRoutes>
            <Hero>
                <FormContainer>
                    <Bento
                        width="450px"
                        highlight="highlight"
                        padding="40px"
                        responsive={{
                            mobilePadding: "20px",
                        }}
                    >
                        <Form onSubmit={(e) => { e.preventDefault(); fetchRecipes(); }}>
                            <Button width="full-width" variant="primary" type="submit" disable={loading}>
                                Seed
                            </Button>
                            {error && <p>Error: {error}</p>}
                        </Form>
                    </Bento>
                </FormContainer>
            </Hero>
        </ProtectedRoutes>
    );
}
