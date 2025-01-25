import { useState } from 'react';
import Hero from "@/components/ui/wrapper/Hero";
import { post } from "aws-amplify/api";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { notifySuccess, notifyError } from '@/components/ui/Toastify';
import Form from '@/components/ui/form/Form';
import Bento from '@/components/ui/wrapper/Bento';
import Button from '@/components/ui/button/Button';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import { fetchAuthSession } from 'aws-amplify/auth';


export default function Seed() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const seedRagProfiles = async () => {
        setLoading(true);
        try {
            const session = await fetchAuthSession();
            const accessToken = session.tokens.accessToken.toString();

            const restOperation = await post({
                apiName: 'ragApi',
                path: '/rag/seed/profile',
                options: {
                    headers: {
                        Token: `user_token ${accessToken}`,
                    },
                },
            });

            const response = await restOperation.response;
            const data = await response.body.json();
            notifySuccess('Seed success')
            console.log(data)
        } catch (e) {
            notifyError('Seed error')
            console.error('Error seeding RAG profiles:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoutes>
            <Hero>
                <FormContainer>
                    <Bento
                        width="450px"
                        highlight="highlight"
                        padding="40px"
                        responsive={{
                            mobilePadding: "20px",
                        }}
                    >
                        <Form onSubmit={(e) => { e.preventDefault(); seedRagProfiles(); }}>
                            <Button width="full-width" variant="primary" type="submit" disable={loading}>
                                Seed
                            </Button>
                            {error && <p>Error: {error}</p>}
                        </Form>
                    </Bento>
                </FormContainer>
            </Hero>
        </ProtectedRoutes>
    );
}