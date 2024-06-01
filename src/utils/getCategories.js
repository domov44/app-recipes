import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';  // Assurez-vous que ce chemin est correct
import { listCategories } from '@/graphql/queries';  // Assurez-vous que ce chemin est correct

const categoryClient = generateClient();

function useCategoriesOptions() {
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    try {
      const categoryData = await categoryClient.graphql({
        query: listCategories,
        variables: {
          limit: 100
        },
      });
      setCategoriesOptions(categoryData.data.listCategories.items);
    } catch (error) {
      console.error('Erreur lors de la récupération des ingrédients:', error);
    }
  }

  return categoriesOptions;
}

export default useCategoriesOptions;
