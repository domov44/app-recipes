import { useState } from 'react';
import Hero from "@/components/ui/wrapper/Hero";
import { useUser } from '@/utils/UserContext';
import { generateClient } from "aws-amplify/api";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { createCategory } from '@/graphql/mutations';
import { notifySuccess, notifyError } from '@/components/ui/Toastify';
import Router from 'next/router';
import useTypesOptions from '@/utils/getTypes';
import SelectSearchable from '@/components/ui/form/SelectSearchable';
import Form from '@/components/ui/form/Form';
import Stack from '@/components/ui/wrapper/Stack';
import Bento from '@/components/ui/wrapper/Bento';
import TextInput from '@/components/ui/form/TextInput';
import Button from '@/components/ui/button/Button';
import FormContainer from '@/components/ui/wrapper/FormContainer';

const client = generateClient();

export default function AddRecipes() {
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const typesOptions = useTypesOptions();

    async function create() {
        try {
            setLoading(true);
            const category = await client.graphql({
                query: createCategory,
                variables: {
                    input: {
                        name: title,
                    }
                }
            });
            notifySuccess("Catégorie ajoutée");
            Router.push("/administrateur/categories")
            setTitle('');
        } catch (error) {
            notifyError("Erreur lors de la création");
            console.error("Erreur lors de la création de la catégorie :", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProtectedRoutes>
            <Hero>
                <FormContainer>
                    <Bento width="450px" highlight="highlight" padding="40px"
                        responsive={{
                            mobilePadding: "20px"
                        }}>
                        <Form onSubmit={(e) => { e.preventDefault(); create(); }}>
                            <Stack animationType="animateFadeIn" direction="column">
                                <TextInput
                                    type="text"
                                    label="Catégorie"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value); }}
                                    required
                                    autoComplete="OFF"
                                    variant="blue"
                                />
                                <Button width="full-width" variant="primary" type="submit" disable={loading}>
                                    Valider
                                </Button>
                                {error && <p>Error: {error}</p>}
                            </Stack>
                        </Form>
                    </Bento>
                </FormContainer>
            </Hero>
        </ProtectedRoutes>
    );
}
