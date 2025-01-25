import React from 'react';
import Stack from '@/components/ui/wrapper/Stack';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Container from '@/components/ui/wrapper/Container';
import Section from '@/components/ui/wrapper/Section';
import Head from 'next/head';
import { RecipeBySlug, profileByPseudo } from '@/graphql/customQueries';
import { generateClient } from 'aws-amplify/api';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import Chip from '@/components/ui/textual/Chip';
import Column from '@/components/ui/wrapper/Column';
import Bento from '@/components/ui/wrapper/Bento';
import { PiClock, PiMapPin } from 'react-icons/pi';
import Hero from '@/components/ui/wrapper/Hero';
import IconButton from '@/components/ui/button/IconButton';
import { handleTypeIngredientVariant } from '@/utils/typeIngredientHandler';
import { getS3Path } from '@/utils/getS3Path';

const client = generateClient();

const RecipePage = ({ pseudo, title, recipe, error, profile, imageUrl, profileUrl }) => {
    if (error) {
        return <p>Erreur: {error}</p>;
    }

    const steps = recipe?.[0]?.steps ? JSON.parse(recipe[0].steps) : [];
    const totalDuration = steps.reduce((total, step) => total + parseInt(step.duration, 10), 0);

    return (
        <>
            <Head>
                <title>{`Recette ${recipe?.[0]?.title} de ${pseudo}`}</title>
                <meta name="description" content={`${recipe?.[0]?.description}`} />
                <meta property="og:image" content={imageUrl || 'URL_de_votre_image_par_défaut'} />
            </Head>
            <Hero>
                <Stack direction="column" spacing="5px">
                    <Title level={1}>{recipe?.[0]?.title}</Title>
                    <Text>{`Publiée le ${convertirFormatDate(recipe?.[0]?.createdAt)}`}</Text>
                    <Chip icon={PiClock} variant="success">Durée totale : {totalDuration} minutes</Chip>
                </Stack>
                {imageUrl && <img className="recette-image" src={imageUrl} alt={recipe?.[0]?.title} />}
                <Container direction="row">
                    <Column width="40%">
                        <Bento highlight="highlight">
                            <Stack justify="space-between" align="center">
                                <Stack>
                                    <img className="user-picture" alt={profile.name} src={profileUrl}></img>
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
                                <IconButton variant="action" href={`/categories/${recipe?.[0]?.category.slug}`}>{recipe?.[0]?.category.name}</IconButton>
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
    const { res, params } = context;
    const { pseudo, slug } = params;

    try {
        const profileResult = await client.graphql({
            query: profileByPseudo,
            variables: { pseudo },
            authMode: "identityPool"
        });

        const profile = profileResult.data.profileByPseudo.items[0];

        if (!profile) {
            return {
                notFound: true,
            };
        }

        const recipeResult = await client.graphql({
            query: RecipeBySlug,
            variables: {
                slug: 'paves-de-saumon-au-four',
                owner: pseudo 
                },
            authMode: "identityPool"
        });

        const recipe = recipeResult.data.RecipeBySlug.items;
        console.log(recipe)

        let imageUrl = '';
        let profileUrl = '';

        if (recipe?.[0]?.image) {
            const imageUrlObject = await getS3Path(recipe[0].image);
            imageUrl = imageUrlObject.href;
        }

        if (profile.avatar) {
            const imageUrlObject = await getS3Path(profile.avatar);
            profileUrl = imageUrlObject.href;
        }

        return {
            props: {
                pseudo,
                slug,
                recipe,
                profile,
                imageUrl,
                profileUrl
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                error: 'Failed to fetch data' + error,
            },
        };
    }
}

export default RecipePage;
