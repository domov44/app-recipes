import React, { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Button from '@/components/ui/button/Button';
import Stack from '@/components/ui/wrapper/Stack';
import Column from '@/components/ui/wrapper/Column';
import Container from '@/components/ui/wrapper/Container';
import Head from 'next/head';
import { CategoryBySlug, listCategories } from '@/graphql/customQueries';
import { generateClient } from 'aws-amplify/api';
import { getS3Path } from '@/utils/getS3Path';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import InvisibleLink from '@/components/ui/button/InvisibleLink';
import IconButton from '@/components/ui/button/IconButton';
import { useUser } from '@/utils/UserContext';

const client = generateClient();

const CategoryPage = ({ category, initialRecipes, nextToken: initialNextToken, error, categories }) => {
    const { isLoggedIn } = useUser();
    const [recipes, setRecipes] = useState(initialRecipes);
    const [nextToken, setNextToken] = useState(initialNextToken);
    const [loading, setLoading] = useState(false);
    const [noMoreRecipes, setNoMoreRecipes] = useState(false);

    useEffect(() => {
        setRecipes(initialRecipes);
        setNextToken(initialNextToken);
        setNoMoreRecipes(false);
    }, [category]);

    const fetchMoreRecipes = useCallback(async () => {
        if (loading || !nextToken) return;
        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: CategoryBySlug,
                variables: {
                    slug: category.slug,
                    recipesLimit: 2,
                    recipesNextToken: nextToken,
                },
                authMode: isLoggedIn ? "userPool" : "identityPool"
            });
    
            const newRecipes = recipeData.data.CategoryBySlug.items[0].recipes.items;
            const newNextToken = recipeData.data.CategoryBySlug.items[0].recipes.nextToken;
    
            if (newRecipes.length === 0 || !newNextToken) {
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
                    return {
                        ...recipe,
                        imageUrl,
                        profileUrl,
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
    }, [loading, nextToken, category.slug]);    

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && !loading) {
                fetchMoreRecipes();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchMoreRecipes, loading]);

    if (error) {
        return <p>Erreur: {error}</p>;
    }

    return (
        <>
            <Head>
                <title>{`Recettes de ${category.name}`}</title>
                <meta name="description" content={`Découvrez toutes les recettes de la catégorie ${category.name}`} />
            </Head>
            <Hero>
                <Container direction="row" responsive="yes">
                    <Column width="60%" gap="30px">
                        <Bento highlight="highlight" padding="15px" item>
                            <Title level={3}>{category.name}</Title>
                            <Text>{category.description || "Découvrez les recettes de cette catégorie."}</Text>
                        </Bento>
                        {recipes.length > 0 ? (
                            recipes.map(recipe => (
                                <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                    <InvisibleLink href={`/${recipe.user.pseudo}`}>
                                        <Stack width="fit-content">
                                            {recipe.profileUrl ? (
                                                <img src={recipe.profileUrl} className="user-picture" alt={recipe.user.pseudo} />
                                            ) : (
                                                <img src="/svg/utilisateur.svg" className="user-picture" alt="avatar" />
                                            )}
                                            <Stack direction="column" spacing="0px">
                                                <Title fontfamily="medium" level={4}>
                                                    {recipe.user.pseudo}
                                                </Title>
                                                <Text>{`${convertirFormatDate(recipe.createdAt)}`}</Text>
                                            </Stack>
                                        </Stack>
                                    </InvisibleLink>
                                    {recipe.imageUrl && <img className="recette-image" alt={recipe.title} src={recipe.imageUrl} />}
                                    <Stack>
                                        <IconButton variant="action" href={`/categories/${recipe.category.slug}`}>{recipe.category.name}</IconButton>
                                    </Stack>
                                    <Title level={3}>{recipe.title}</Title>
                                    <Text>
                                        {recipe.description}
                                    </Text>
                                    <Button variant="secondary" href={`/${recipe.user.pseudo}/${recipe.slug}`}>Voir la recette</Button>
                                </Bento>
                            ))
                        ) : (
                            <Text>Aucune recette trouvée dans cette catégorie.</Text>
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
                                Découvrez toutes les catégories disponibles
                            </Text>
                            <Stack flexWrap="wrap">
                                {categories.map((categorie, index) => (
                                    <IconButton key={index} variant="action" href={`/categories/${categorie.slug}`}>{categorie.name}</IconButton>
                                ))}
                            </Stack>
                        </Bento>
                    </Column>
                </Container>
            </Hero>
        </>
    );
};

export async function getServerSideProps(context) {
    const { slug } = context.params;
    let category = null;
    let recipes = [];
    let nextToken = null;
    let categories = [];

    try {
        const categoryResult = await client.graphql({
            query: CategoryBySlug,
            variables: {
                slug,
                recipesLimit: 2,
            },
            authMode: "identityPool",
        });

        category = categoryResult.data.CategoryBySlug.items[0];

        if (!category) {
            return {
                notFound: true,
            };
        }

        const recipesList = category.recipes.items;
        nextToken = category.recipes.nextToken;

        const recipesWithImages = await Promise.all(
            recipesList.map(async (recipe) => {
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
                return {
                    ...recipe,
                    imageUrl,
                    profileUrl,
                };
            })
        );

        const categoriesResult = await client.graphql({
            query: listCategories,
            authMode: "identityPool",
        });
        categories = categoriesResult.data.listCategories.items;

        return {
            props: {
                category,
                initialRecipes: recipesWithImages,
                nextToken,
                categories,
            },
        };
    } catch (error) {
        return {
            props: {
                error: 'Failed to fetch data',
                categories: [],
            },
        };
    }
}

export default CategoryPage;
