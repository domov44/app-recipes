import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listIngredientTypes } from '@/graphql/queries';

const typeClient = generateClient();

function useTypesOptions() {
  const [typesOptions, setTypesOptions] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  async function fetchTypes() {
    try {
      const typeData = await typeClient.graphql({
        query: listIngredientTypes,
        variables: {
          limit: 100
        },
      });
      setTypesOptions(typeData.data.listIngredientTypes.items);
    } catch (error) {
      console.error('Erreur lors de la récupération des types:', error);
    }
  }

  return typesOptions;
}

export default useTypesOptions;