// pages/[pseudo]/[title].js

import React from 'react';
import BackgroundContainer from '@/components/ui/wrapper/BackgroundContainer';
import Stack from '@/components/ui/wrapper/Stack';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Container from '@/components/ui/wrapper/Container';
import Section from '@/components/ui/wrapper/Section';
import Head from 'next/head';
import { RecipeByTitle, profileByPseudo } from '@/graphql/queries';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const RecipePage = ({ pseudo, title, recipe, error }) => {
    if (error) {
        return <p>Erreur: {error}</p>;
    }

    return (
        <>
            <Head>
                <title>{`Recette ${recipe?.[0]?.title} de ${pseudo}`}</title>
                <meta name="description" content={`Recette ${recipe?.[0]?.title} de ${pseudo}`} />
                <meta property="og:image" content={recipe?.[0]?.image || 'URL_de_votre_image'} />
            </Head>
            <BackgroundContainer>
                <Container>
                    <Section>
                        <Stack>
                            <Title>{recipe?.[0]?.title}</Title>
                            {recipe?.[0]?.image && <img src={recipe?.[0]?.image} alt={recipe?.[0]?.title} />}
                            <Text>{recipe?.[0]?.steps}</Text>
                            {/* Ajoutez d'autres informations de recette ici */}
                        </Stack>
                    </Section>
                </Container>
            </BackgroundContainer>
        </>
    );
};

export async function getServerSideProps(context) {
    const { pseudo, title } = context.params;

    try {
        const profileResult = await client.graphql({
            query: profileByPseudo,
            variables: { pseudo },
            authMode: "apiKey"
        });

        const profile = profileResult.data.profileByPseudo.items[0];

        if (!profile) {
            return {
                notFound: true,
            };
        }

        const owner = profile.id;

        const recipeResult = await client.graphql({
            query: RecipeByTitle,
            variables: { title, filter: { owner: { eq: owner } } },
            authMode: "apiKey"
        });

        const recipe = recipeResult.data.RecipeByTitle.items;

        return {
            props: {
                pseudo,
                title,
                recipe,
            },
        };
    } catch (error) {
        return {
            props: {
                error: 'Failed to fetch data',
            },
        };
    }
}

export default RecipePage;
