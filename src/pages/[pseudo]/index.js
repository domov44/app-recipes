// pages/[pseudo]/index.js

import React, { useState, useEffect, useCallback } from 'react';
import BackgroundContainer from '@/components/ui/wrapper/BackgroundContainer';
import Stack from '@/components/ui/wrapper/Stack';
import Title from '@/components/ui/textual/Title';
import Bento from '@/components/ui/wrapper/Bento';
import Chip from '@/components/ui/textual/Chip';
import Text from '@/components/ui/textual/Text';
import Column from '@/components/ui/wrapper/Column';
import Section from '@/components/ui/wrapper/Section';
import Container from '@/components/ui/wrapper/Container';
import Button from '@/components/ui/button/Button';
import { PiEnvelope, PiMapPin, PiPlus, PiClock } from 'react-icons/pi';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import IconButton from '@/components/ui/button/IconButton';
import Head from 'next/head';
import { profileByPseudo, RecipeByOwner } from '@/graphql/customQueries';
import { generateClient } from 'aws-amplify/api';
import { getS3Path } from '@/utils/getS3Path';
import { useUser } from '@/utils/UserContext';
import TextHover from '@/components/ui/hover/TextHover';
import { usePopup } from "@/utils/PopupContext";
import ViewProfilePicturePopup from '@/components/ui/popup/allPopups/ViewProfilePicturePopup';

const client = generateClient();

const ProfilPage = ({ pseudo, user, recipes: initialRecipes, profileUrl, nextToken: initialNextToken, error }) => {
    const [recipes, setRecipes] = useState(initialRecipes);
    const { popups, openPopup, closePopup } = usePopup();
    const { isLoggedIn } = useUser();
    const [nextToken, setNextToken] = useState(initialNextToken);
    const [loading, setLoading] = useState(false);
    const [noMoreRecipes, setNoMoreRecipes] = useState(false);

    const fetchMoreRecipes = useCallback(async () => {
        if (loading || !nextToken) return;
        setLoading(true);
        try {
            console.log(`${user.id}::${user.pseudo}`)
            const recipeData = await client.graphql({
                query: RecipeByOwner,
                variables: {
                    owner: `${user.id}::${user.pseudo}`,
                    limit: 2,
                    nextToken: nextToken
                },
            });

            const newRecipes = recipeData.data.RecipeByOwner.items;
            const newNextToken = recipeData.data.RecipeByOwner.nextToken;

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

    if (error) {
        return <p>Erreur: {error}</p>;
    }

    return (
        <>
            <Head>
                <title>{`Profil de ${user?.pseudo}`}</title>
                <meta name="description" content={`Profil Miamze de ${user?.pseudo}`} />
                <meta property="og:image" content={profileUrl || "/svg/utilisateur.svg"} />
            </Head>
            <Section>
                <Button variant="primary" position="fixed" right="20px" bottom="20px" zindex={2} href="/ajouter-une-recette" icon={PiPlus}>
                    Ajouter une recette
                </Button>
                <BackgroundContainer coverUrl={"background/cover_4.jpg"}>
                    <div className="profil-container">
                        {profileUrl ? (
                            <img src={profileUrl} className="user-picture pointer" alt={user.pseudo} onClick={() => openPopup('viewProfilePicture')} />
                        ) : (
                            <img src="/svg/utilisateur.svg" className="user-picture pointer" alt="avatar" onClick={() => openPopup('viewProfilePicture')} />
                        )}

                        <Stack direction="column" spacing="0px">
                            <Title level={1}>
                                {user?.pseudo}
                            </Title>
                            <Text>{user?.name} {user?.surname}</Text>
                        </Stack>
                    </div>
                </BackgroundContainer>
                <Container direction="row" responsive="yes">
                    <Column width="35%">
                        <Bento position="sticky" top="80px" highlight="highlight">
                            <Title level={4}>Informations sur {user?.pseudo}</Title>
                            {user?.description ? (
                                <Text>{user?.description}</Text>
                            ) : (
                                <Text>{user?.pseudo} n&apos;a pas encore de description</Text>
                            )}
                        </Bento>
                    </Column>
                    <Column width="65%" gap="30px">
                        {recipes.length > 0 ? (
                            recipes.map(recipe => (
                                <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                    <Stack>
                                        {profileUrl ? (
                                            <img src={profileUrl} className="user-picture" alt={recipe?.user?.pseudo} />
                                        ) : (
                                            <img src="/svg/utilisateur.svg" className="user-picture" alt="avatar" />
                                        )}
                                        <Stack direction="column" spacing="0px">
                                            <Title fontFamily="medium" level={4}>
                                                {recipe?.user?.pseudo}
                                            </Title>
                                            <Text>
                                                {`Le ${convertirFormatDate(recipe.createdAt)}`}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    {recipe.imageUrl && <img className="recette-image" alt={recipe.title} src={recipe.imageUrl} />}
                                    <Stack>
                                        <IconButton variant="action" href={`/categories/${recipe?.category?.slug}`}>{recipe?.category?.name}</IconButton>
                                    </Stack>
                                    <Title level={3}>{recipe.title}</Title>
                                    <Text>{recipe.description}</Text>
                                    <Button variant="primary" href={`/${recipe?.user?.pseudo}/${recipe.title}`}>Suivre la recette</Button>
                                </Bento>
                            ))
                        ) : (
                            <Text>Aucune recette n&apos;a été trouvée pour cet utilisateur.</Text>
                        )}
                        {loading && <Text>Chargement des recettes suivantes...</Text>}
                        {!loading && noMoreRecipes && <Text>Il n&apos;y a pas d&apos;autres recettes.</Text>}
                    </Column>
                </Container>
            </Section>
            <ViewProfilePicturePopup
                open={popups['viewProfilePicture']}
                picture={profileUrl}
                pseudo={user.pseudo}
                onClose={() => closePopup('viewProfilePicture')}
            />
        </>
    );
};

export async function getServerSideProps(context) {
    const { pseudo } = context.params;
    let profileUrl = '';
    let recipes = [];
    let nextToken = null;

    try {
        const userResult = await client.graphql({
            query: profileByPseudo,
            variables: { pseudo },
            authMode: "identityPool",
        });

        const user = userResult.data.profileByPseudo.items[0];
        console.log(user)

        if (!user) {
            return {
                notFound: true,
            };
        }

        if (user.avatar) {
            const imageUrlObject = await getS3Path(user.avatar);
            profileUrl = imageUrlObject.href;
        }

        const recipeData = await client.graphql({
            query: RecipeByOwner,
            variables: {
                owner: `${user.id}::${user.pseudo}`,
                limit: 2,
                nextToken: nextToken
            },
            authMode: "identityPool",
        });

        console.log(recipeData.data.RecipeByOwner.items)
        const recipesList = recipeData.data.RecipeByOwner.items;
        nextToken = recipeData.data.RecipeByOwner.nextToken;

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
                pseudo,
                user,
                profileUrl,
                recipes: recipesWithImages,
                nextToken
            },
        };
    } catch (error) {
        console.error(error)
        return {
            props: {
                error: 'Failed to fetch data' + error,
            },
        };
    }
}

export default ProfilPage;
