import React, { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Button from '@/components/ui/button/Button';
import { PiPlus } from 'react-icons/pi';
import { generateClient, get } from 'aws-amplify/api';
import { listRecipes, listCategories, getRecipe } from '@/graphql/customQueries';
import IconButton from '@/components/ui/button/IconButton';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import Column from '@/components/ui/wrapper/Column';
import Container from '@/components/ui/wrapper/Container';
import Stack from '@/components/ui/wrapper/Stack';
import InvisibleLink from '@/components/ui/button/InvisibleLink';
import { getS3Path } from '@/utils/getS3Path';
import { useUser } from '@/utils/UserContext';
import { IoMdAdd } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { fetchAuthSession } from 'aws-amplify/auth';

const client = generateClient();

const Home = ({ initialCategories = [] }) => {
    const { isLoggedIn, profilePictureURL, user } = useUser();
    const [recipes, setRecipes] = useState([]);
    const [ragRecipes, setRagRecipes] = useState([]);
    const [activeTab, setActiveTab] = useState('byDate');
    const [loading, setLoading] = useState(false);
    const [nextToken, setNextToken] = useState(null);
    const [noMoreRecipes, setNoMoreRecipes] = useState(false);

    const fetchRecipes = useCallback(async () => {
        if (loading || noMoreRecipes) return;
        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
                variables: { limit: 2, nextToken },
            });
            const newRecipes = recipeData.data.listRecipes.items;
            console.log(newRecipes)
            const newNextToken = recipeData.data.listRecipes.nextToken;

            if (!newRecipes.length || !newNextToken) {
                setNoMoreRecipes(true);
            }

            const recipesWithImages = await Promise.all(
                newRecipes.map(async (recipe) => {
                    let imageUrl = '';
                    let profileUrl = '';
                    if (recipe.image) {
                        const imageUrlObject = await getS3Path(recipe.image);
                        imageUrl = imageUrlObject.href;
                    }
                    if (recipe.user.avatar) {
                        const profileUrlObject = await getS3Path(recipe.user.avatar);
                        profileUrl = profileUrlObject.href;
                    }
                    return { ...recipe, imageUrl, profileUrl };
                })
            );

            setRecipes((prev) => [...prev, ...recipesWithImages]);
            setNextToken(newNextToken);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, nextToken, noMoreRecipes]);

    const fetchRagRecipes = async () => {
        setLoading(true);
        try {
            const session = await fetchAuthSession();
            const accessToken = session.tokens.accessToken.toString();

            const restOperation = await get({
                apiName: 'ragApi',
                path: '/rag/recipes',
                options: {
                    headers: {
                        Token: `user_token ${accessToken}`,
                    },
                },
            });

            const response = await restOperation.response;
            const data = await response.body.json();

            const recipeDetails = await Promise.all(
                data.recipes.map(async (recipe) => {
                    const recipeData = await client.graphql({
                        query: getRecipe,
                        variables: { id: recipe.recipeId },
                    });
                    const fetchedRecipe = recipeData.data.getRecipe;

                    let imageUrl = '';
                    if (fetchedRecipe.image) {
                        const imageUrlObject = await getS3Path(fetchedRecipe.image);
                        imageUrl = imageUrlObject.href;
                    }

                    let profileUrl = '';
                    if (fetchedRecipe.user.avatar) {
                        const profileUrlObject = await getS3Path(fetchedRecipe.user.avatar);
                        profileUrl = profileUrlObject.href;
                    }

                    return { ...fetchedRecipe, imageUrl, profileUrl };
                })
            );

            setRagRecipes(recipeDetails);
        } catch (e) {
            console.error('Error fetching RAG recipes:', e);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            if (activeTab === 'forYou' && ragRecipes.length === 0) {
                await fetchRagRecipes();
            } else if (activeTab === 'byDate' && recipes.length === 0) {
                await fetchRecipes();
            }
        };
        fetchData();
    }, [activeTab]);


    return (
        <>
            <Head>
                <title>L&apos;application de recipe Miamze</title>
                <meta name="description" content="Description de la page" />
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
                        <Stack>
                            <Button
                                onClick={() => setActiveTab('byDate')}
                                variant={activeTab === 'byDate' ? 'primary' : 'secondary'}
                            >
                                Découverte
                            </Button>
                            <Button
                                onClick={() => setActiveTab('forYou')}
                                variant={activeTab === 'forYou' ? 'primary' : 'secondary'}
                            >
                                Pour vous
                            </Button>
                        </Stack>

                        {activeTab === 'forYou' && (
                            ragRecipes.length > 0 ? (
                                ragRecipes.map((recipe) => (
                                    <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                        <InvisibleLink href={`/${recipe.user.pseudo}`}>
                                            <Stack width="fit-content">
                                                {recipe.profileUrl ? (
                                                    <img
                                                        src={recipe.profileUrl}
                                                        className="user-picture"
                                                        alt={recipe.user.pseudo}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/svg/utilisateur.svg"
                                                        className="user-picture"
                                                        alt="avatar"
                                                    />
                                                )}
                                                <Stack direction="column" spacing="0px">
                                                    <Title fontfamily="medium" level={4}>
                                                        {recipe.user.pseudo}
                                                    </Title>
                                                    <Text>{`${convertirFormatDate(recipe.createdAt)}`}</Text>
                                                </Stack>
                                            </Stack>
                                        </InvisibleLink>
                                        {recipe.imageUrl && (
                                            <img
                                                className="recette-image"
                                                alt={recipe.title}
                                                src={recipe.imageUrl}
                                            ></img>
                                        )}
                                        <Stack>
                                            <IconButton
                                                variant="action"
                                                href={`/categories/${recipe.category.slug}`}
                                            >
                                                {recipe.category.name}
                                            </IconButton>
                                        </Stack>
                                        <Title level={3}>{recipe.title}</Title>
                                        <Text>{recipe.description}</Text>
                                        <Button
                                            variant="secondary"
                                            href={`/${recipe.user.pseudo}/${recipe.slug}`}
                                        >
                                            Suivre cette recette
                                        </Button>
                                    </Bento>
                                ))
                            ) : (
                                <Text>Aucune recette recommandée.</Text>
                            )
                        )}

                        {activeTab === 'byDate' && (
                            recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                        <InvisibleLink href={`/${recipe.user.pseudo}`}>
                                            <Stack width="fit-content">
                                                {recipe.profileUrl ? (
                                                    <img
                                                        src={recipe.profileUrl}
                                                        className="user-picture"
                                                        alt={recipe.user.pseudo}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/svg/utilisateur.svg"
                                                        className="user-picture"
                                                        alt="avatar"
                                                    />
                                                )}
                                                <Stack direction="column" spacing="0px">
                                                    <Title fontfamily="medium" level={4}>
                                                        {recipe.user.pseudo}
                                                    </Title>
                                                    <Text>{`${convertirFormatDate(recipe.createdAt)}`}</Text>
                                                </Stack>
                                            </Stack>
                                        </InvisibleLink>
                                        {recipe.imageUrl && (
                                            <img
                                                className="recette-image"
                                                alt={recipe.title}
                                                src={recipe.imageUrl}
                                            ></img>
                                        )}
                                        <Stack>
                                            <IconButton
                                                variant="action"
                                                href={`/categories/${recipe.category.slug}`}
                                            >
                                                {recipe.category.name}
                                            </IconButton>
                                        </Stack>
                                        <Title level={3}>{recipe.title}</Title>
                                        <Text>{recipe.description}</Text>
                                        <Button
                                            variant="secondary"
                                            href={`/${recipe.user.pseudo}/${recipe.slug}`}
                                        >
                                            Suivre cette recette
                                        </Button>
                                    </Bento>
                                ))
                            ) : (
                                <Text>Aucune recette trouvée.</Text>
                            )
                        )}

                        {loading && <Text>Chargement...</Text>}
                    </Column>
                    <Column width="40%" gap="10px">
                        <Bento position="sticky" top="80px" highlight="highlight">
                            <Title level={4}>Les catégories</Title>
                            <Text>Les catégories de recettes</Text>
                            <Stack flexWrap="wrap">
                                {initialCategories.map((categorie, index) => (
                                    <IconButton
                                        key={index}
                                        variant="action"
                                        href={`/categories/${categorie.slug}`}
                                    >
                                        {categorie.name}
                                    </IconButton>
                                ))}
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
        const categoryData = await client.graphql({
            query: listCategories,
            authMode: "identityPool",
        });
        const categoriesList = categoryData.data.listCategories.items;

        return {
            props: {
                initialCategories: categoriesList || [],
            },
        };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return {
            props: {
                initialCategories: [],
            },
        };
    }
};

export default Home;
