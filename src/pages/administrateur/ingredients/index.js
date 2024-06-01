import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listIngredients } from '@/graphql/queries';

const ingredientClient = generateClient();

function IngredientsPage() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchIngredients();
    }, []);

    async function fetchIngredients() {
        try {
            const ingredientData = await ingredientClient.graphql({
                query: listIngredients,
                variables: {
                    limit: 100
                },
            });
            setIngredients(ingredientData.data.listIngredients.items);
        } catch (error) {
            console.error('Erreur lors de la récupération des ingrédients:', error);
        }
    }

    return (
        <div>
            <h1>Liste des Ingrédients</h1>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientsPage;