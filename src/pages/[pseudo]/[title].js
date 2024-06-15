import React from 'react';
import Stack from '@/components/ui/wrapper/Stack';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Container from '@/components/ui/wrapper/Container';
import Section from '@/components/ui/wrapper/Section';
import Head from 'next/head';
import { RecipeByTitle, profileByPseudo } from '@/graphql/customQueries';
import { generateClient } from 'aws-amplify/api';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import Chip from '@/components/ui/textual/Chip';
import Column from '@/components/ui/wrapper/Column';
import Bento from '@/components/ui/wrapper/Bento';
import { PiClock, PiMapPin } from 'react-icons/pi';
import Hero from '@/components/ui/wrapper/Hero';
import IconButton from '@/components/ui/button/IconButton';
import { handleTypeIngredientVariant } from '@/utils/typeIngredientHandler';

const client = generateClient();

const RecipePage = ({ pseudo, title, recipe, error, profile }) => {
    if (error) {
        return <p>Erreur: {error}</p>;
    }

    const steps = recipe?.[0]?.steps ? JSON.parse(recipe[0].steps) : [];
    const totalDuration = steps.reduce((total, step) => total + parseInt(step.duration, 10), 0);

    return (
        <>
            <Head>
                <title>{`Recette ${recipe?.[0]?.title} de ${pseudo}`}</title>
                <meta name="description" content={`Recette ${recipe?.[0]?.title} de ${pseudo}`} />
                <meta property="og:image" content={recipe?.[0]?.image || 'URL_de_votre_image'} />
            </Head>
            <Hero>
                <Stack direction="column" spacing="5px">
                    <Title level={1}>{recipe?.[0]?.title}</Title>
                    <Text>{`Publiée le ${convertirFormatDate(recipe?.[0]?.createdAt)}`}</Text>
                    <Chip icon={PiClock} variant="success">Durée totale : {totalDuration} minutes</Chip>
                </Stack>
                {recipe?.[0]?.image && <img className="recette-image" src={recipe?.[0]?.image} alt={recipe?.[0]?.title} />}
                <Container direction="row">
                    <Column width="40%">
                        <Bento highlight="highlight">
                            <Stack justify="space-between" align="center">
                                <Stack>
                                    <img className="user-picture" alt={profile.name} src={profile.avatar}></img>
                                    <Stack direction="column" spacing="0px">
                                        <Title fontfamily="medium" level={2}>
                                            {profile.pseudo}
                                        </Title>
                                        <Text>
                                            {profile.name}
                                        </Text>
                                    </Stack>
                                </Stack>
                                <Chip variant="success">
                                    25 ans
                                </Chip>
                            </Stack>
                            <Text>{profile.description}</Text>
                        </Bento>
                    </Column>
                    <Column width="60%">
                        <Bento highlight="highlight">
                            <Title level={3}>{recipe?.[0]?.title}</Title>
                            <Text>{recipe?.[0]?.description}</Text>
                            <Stack>
                                <IconButton variant="action" href={`/categories/${recipe?.[0]?.category.name}`}>{recipe?.[0]?.category.name}</IconButton>
                                <Chip icon={PiMapPin} variant="success">Oran, Algérie</Chip>
                            </Stack>
                        </Bento>
                    </Column>
                </Container>
            </Hero>
            <Section>
                <Container>
                    <Stack direction="column">
                        <Title level={4}>Ce dont vous allez avoir besoin :</Title>
                        {recipe?.[0]?.ingredients.items.length > 0 ? (
                            <Stack>
                                {recipe?.[0]?.ingredients.items.map((ingredient) => (
                                    <Chip key={ingredient.id} variant={handleTypeIngredientVariant(ingredient.ingredient.type.name)}>
                                        {ingredient.ingredient.name} - {ingredient.quantity}
                                    </Chip>
                                ))}
                            </Stack>
                        ) : (
                            <Text>Cette recette ne nécessite aucun ingrédient.</Text>
                        )}
                    </Stack>
                    <Title level={4}>Étapes à suivre :</Title>
                    {steps.length > 0 ? (
                        <Stack direction="column">
                            {steps.map((step, index) => (
                                <Bento highlight="highlight" padding="15px" key={index}>
                                    <Chip icon={PiClock} variant="success">{step.duration} minutes</Chip>
                                    <Text>Étape {step.step_number} : {step.description}</Text>
                                </Bento>
                            ))}
                        </Stack>
                    ) : (
                        <Text>Aucune étape n&apos;est présente pour cette recette.</Text>
                    )}
                </Container>
            </Section>
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
                profile,
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
