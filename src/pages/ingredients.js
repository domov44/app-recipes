import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listIngredients } from '@/graphql/queries';

const ingredientClient = generateClient();

export default function IngredientsPage({ ingredients }) {
    return (
        <div>
            <h1>Liste des Ingrédients</h1>
            {ingredients.length === 0 ? (
                <p>Aucun ingrédient trouvé.</p>
            ) : (
                <ul>
                    {ingredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export async function getServerSideProps() {
    let ingredients = [];

    try {
        const ingredientData = await ingredientClient.graphql({
            query: listIngredients,
            variables: {
                limit: 100
            }
        });
        ingredients = ingredientData.data.listIngredients.items;
    } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients:', error);
    }

    return {
        props: {
            ingredients
        }
    };
}



