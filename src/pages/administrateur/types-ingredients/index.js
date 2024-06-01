import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listIngredientTypes } from '@/graphql/queries';

const typeClient = generateClient();

function TypesPage() {
    const [types, setTypes] = useState([]);

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
            setTypes(typeData.data.listIngredientTypes.items);
        } catch (error) {
            console.error('Erreur lors de la récupération des types ingrédients:', error);
        }
    }

    return (
        <div>
            <h1>Liste des types d`&apos;ingrédients</h1>
            <ul>
                {types.map(type => (
                    <li key={type.id}>{type.name} {type.id}</li>
                ))}
            </ul>
        </div>
    );
}

export default TypesPage;