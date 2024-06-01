import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api'; 
import { listIngredients } from '@/graphql/queries';

const ingredientClient = generateClient();

function useIngredientsOptions() {
  const [ingredientsOptions, setIngredientsOptions] = useState([]);

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
      setIngredientsOptions(ingredientData.data.listIngredients.items);
    } catch (error) {
      console.error('Erreur lors de la récupération des ingrédients:', error);
    }
  }

  return ingredientsOptions;
}

export default useIngredientsOptions;
