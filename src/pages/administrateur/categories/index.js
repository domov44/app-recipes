import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listCategories } from '@/graphql/queries';

const categorieClient = generateClient();

function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const categorieData = await categorieClient.graphql({
                query: listCategories,
                variables: {
                    limit: 100
                },
            });
            setCategories(categorieData.data.listCategories.items);
        } catch (error) {
            console.error('Erreur lors de la récupération des ingrédients:', error);
        }
    }

    return (
        <div>
            <h1>Liste des catégories</h1>
            <ul>
                {categories.map(categorie => (
                    <li key={categorie.id}>{categorie.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesPage;