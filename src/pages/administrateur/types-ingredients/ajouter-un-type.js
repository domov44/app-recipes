

import { useState } from 'react';
import Hero from "@/components/ui/wrapper/Hero";
import { useUser } from '@/utils/UserContext';
import { generateClient } from "aws-amplify/api";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { createIngredientType } from '@/graphql/mutations';
import { notifySuccess, notifyError } from '@/components/ui/Toastify';

const client = generateClient();

export default function AddTypes() {
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function create() {
        try {
            setLoading(true);
            const recipe = await client.graphql({
                query: createIngredientType,
                variables: {
                    input: {
                        name: title,
                    }
                }
            });
            notifySuccess("Type ajouté");
            setTitle('');
        } catch (error) {
            notifyError("Erreur lors de la création");
            console.error("Erreur lors de la création du type :", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProtectedRoutes>
            <Hero>
                <form onSubmit={(e) => { e.preventDefault(); create(); }}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {error && <p>Error: {error}</p>}
                </form>
            </Hero>
        </ProtectedRoutes>
    );
}
