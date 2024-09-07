import { useState } from 'react';
import Hero from "@/components/ui/wrapper/Hero";
import { generateClient } from "aws-amplify/api";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { createCategory } from '@/graphql/mutations';
import { CategoryBySlug } from '@/graphql/queries';
import { notifySuccess, notifyError } from '@/components/ui/Toastify';
import Router from 'next/router';
import Form from '@/components/ui/form/Form';
import Stack from '@/components/ui/wrapper/Stack';
import Bento from '@/components/ui/wrapper/Bento';
import TextInput from '@/components/ui/form/TextInput';
import Button from '@/components/ui/button/Button';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import { slugify } from '@/utils/slugify';

const client = generateClient();

export default function AddCategory() {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function create() {
        try {
            setLoading(true);
            const slug = await slugify(title);

            const existingCategory = await client.graphql({
                query: CategoryBySlug,
                variables: { slug }
            });

            if (existingCategory.data.CategoryBySlug.items.length > 0) {
                notifyError("Une catégorie avec ce nom existe déjà");
                setLoading(false);
                return;
            }

            await client.graphql({
                query: createCategory,
                variables: {
                    input: {
                        name: title.toLowerCase(),
                        slug: slug
                    }
                }
            });
            notifySuccess("Catégorie ajoutée");
            Router.push("/administrateur/categories");
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
