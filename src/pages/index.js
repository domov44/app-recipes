import React, { useEffect, useState } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Button from '@/components/ui/button/Button';
import { PiPlus, PiTimer } from 'react-icons/pi';
import { generateClient } from 'aws-amplify/api';
import { listRecipes } from '@/graphql/customQueries';
import IconButton from '@/components/ui/button/IconButton';
import Chip from '@/components/ui/textual/Chip';
import Column from '@/components/ui/wrapper/Column';
import Container from '@/components/ui/wrapper/Container';
import Stack from '@/components/ui/wrapper/Stack';
import InvisibleLink from '@/components/ui/button/InvisibleLink';

const client = generateClient();

function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
                authMode: "apiKey"
            });
            const recipesList = recipeData.data.listRecipes.items;
            setRecipes(recipesList);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    return (
        <>
            <Head>
                <title>L&apos;application de recipe Miamze</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <Button
                    zindex="2"
                    variant="primary"
                    position="fixed"
                    right="20px"
                    bottom="20px"
                    href="/ajouter-une-recette"
                    icon={PiPlus}
                >
                    Ajouter une recette
                </Button>
                <Container direction="row" responsive="yes">
                    <Column width="60%" gap="30px">
                        {recipes.length > 0 && (
                            recipes.map((recipe) => (
                                <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                    <InvisibleLink href={`/${recipe.user.pseudo}`}>
                                        <Stack width="fit-content">
                                            <img className="user-picture" alt={recipe.user.pseudo} src={recipe.user.avatar}></img>
                                            <Stack direction="column" spacing="0px">
                                                <Title fontfamily="medium" level={4}>
                                                    {recipe.user.pseudo}
                                                </Title>
                                            </Stack>
                                        </Stack>
                                    </InvisibleLink>
                                    <img className="recipe-image" alt={recipe.title} src={recipe.image}></img>
                                    <Stack>
                                        <IconButton variant="action" href={`/categories/${recipe.category.name}`}>{recipe.category.name}</IconButton>
                                    </Stack>
                                    <Title level={3}>{recipe.title}</Title>
                                    <Text>
                                        {recipe.description}
                                    </Text>
                                    <Button variant="secondary" href={`/${recipe.user.pseudo}/${recipe.title}`}>Suivre cette recette</Button>
                                </Bento>
                            ))
                        )}
                    </Column>
                    <Column width="40%" gap="10px">
                        <Bento position="sticky" top="80px" highlight="highlight">
                            <Title level={4}>
                                Les catégories
                            </Title>
                            <Text>
                                Les catégories de recettes
                            </Text>
                            <Stack flexWrap="wrap">
                                {/* categories.map((categorie, index) => (
                                    <IconButton key={index} variant="action" href={`/categories/${categorie.slug}`}>{categorie.label}</IconButton>
                                )) */}
                            </Stack>
                        </Bento>
                    </Column>
                </Container>
            </Hero>
        </>
    );
}

export default Home;