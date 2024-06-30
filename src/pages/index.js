import React, { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Button from '@/components/ui/button/Button';
import { PiPlus } from 'react-icons/pi';
import { generateClient } from 'aws-amplify/api';
import { listRecipes } from '@/graphql/customQueries';
import IconButton from '@/components/ui/button/IconButton';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import Column from '@/components/ui/wrapper/Column';
import Container from '@/components/ui/wrapper/Container';
import Stack from '@/components/ui/wrapper/Stack';
import InvisibleLink from '@/components/ui/button/InvisibleLink';
import { getS3Path } from '@/utils/getS3Path';

const client = generateClient();

const Home = ({ initialRecipes = [], nextToken: initialNextToken }) => {
    const [recipes, setRecipes] = useState(initialRecipes);
    const [nextToken, setNextToken] = useState(initialNextToken);
    const [loading, setLoading] = useState(false);
    const [noMoreRecipes, setNoMoreRecipes] = useState(false);

    const fetchMoreRecipes = useCallback(async () => {
        if (loading || !nextToken) return;
        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
                variables: { limit: 2, nextToken },
                authMode: "apiKey"
            });
            const newRecipes = recipeData.data.listRecipes.items;
            const newNextToken = recipeData.data.listRecipes.nextToken;

            if (newRecipes.length === 0 || !newNextToken) {
                setNoMoreRecipes(true);
            }

            const recipesWithImages = await Promise.all(
                newRecipes.map(async (recipe) => {
                    let imageUrl = '';
                    if (recipe.image) {
                        const imageUrlObject = await getS3Path(recipe.image);
                        imageUrl = imageUrlObject.href;
                    }
                    return {
                        ...recipe,
                        imageUrl
                    };
                })
            );

            setRecipes((prevRecipes) => [...prevRecipes, ...recipesWithImages]);
            setNextToken(newNextToken);
        } catch (error) {
            console.error("Error fetching more recipes:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, nextToken]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && !loading) {
                fetchMoreRecipes();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchMoreRecipes, loading]);

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
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                    <InvisibleLink href={`/${recipe.user.pseudo}`}>
                                        <Stack width="fit-content">
                                            <img className="user-picture" alt={recipe.user.pseudo} src={recipe.user.avatar}></img>
                                            <Stack direction="column" spacing="0px">
                                                <Title fontfamily="medium" level={4}>
                                                    {recipe.user.pseudo}
                                                </Title>
                                                <Text>{`${convertirFormatDate(recipe.createdAt)}`}</Text>
                                            </Stack>
                                        </Stack>
                                    </InvisibleLink>
                                    {recipe.imageUrl && <img className="recette-image" alt={recipe.title} src={recipe.imageUrl}></img>}
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
                        ) : (
                            <Text>Aucune recette trouvée.</Text>
                        )}
                        {loading && <Text>Chargement des recettes suivantes...</Text>}
                        {!loading && noMoreRecipes && <Text>Il n&apos;y a pas d&apos;autres recettes.</Text>}
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
};

export const getServerSideProps = async () => {
    try {
        const recipeData = await client.graphql({
            query: listRecipes,
            variables: { limit: 2 },
            authMode: "apiKey"
        });
        const recipesList = recipeData.data.listRecipes.items;
        const nextToken = recipeData.data.listRecipes.nextToken;

        const recipesWithImages = await Promise.all(
            recipesList.map(async (recipe) => {
                let imageUrl = '';
                if (recipe.image) {
                    const imageUrlObject = await getS3Path(recipe.image);
                    imageUrl = imageUrlObject.href;
                }
                return {
                    ...recipe,
                    imageUrl
                };
            })
        );

        return {
            props: {
                initialRecipes: recipesWithImages || [],
                nextToken
            }
        };
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return {
            props: {
                initialRecipes: [],
                nextToken: null
            }
        };
    }
};

export default Home;
