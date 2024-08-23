import Hero from "@/components/ui/wrapper/Hero";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { generateClient } from "aws-amplify/api";
import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@/utils/UserContext';
import Head from "next/head";
import Button from "@/components/ui/button/Button";
import Chip from "@/components/ui/textual/Chip";
import { PiCake, PiEnvelope, PiPlus, PiPen } from 'react-icons/pi';
import Section from "@/components/ui/wrapper/Section";
import Bento from "@/components/ui/wrapper/Bento";
import Container from "@/components/ui/wrapper/Container";
import Title from "@/components/ui/textual/Title";
import BackgroundContainer from "@/components/ui/wrapper/BackgroundContainer";
import Stack from "@/components/ui/wrapper/Stack";
import Text from "@/components/ui/textual/Text";
import Column from "@/components/ui/wrapper/Column";
import AnimationComponent from "@/components/animation/Animation";
import Empty from '@/components/animation/storageAnimation/empty.json';
import IconButton from "@/components/ui/button/IconButton";
import { listRecipes } from "@/graphql/customQueries";
import InvisibleLink from "@/components/ui/button/InvisibleLink";
import { getS3Path } from '@/utils/getS3Path';
import ProfilePicturePopup from "@/components/ui/popup/allPopups/ProfilePicturePopup";
import { usePopup } from "@/utils/PopupContext";
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import EditProfilePopup from "@/components/ui/popup/allPopups/EditProfilePopup";
import TextHover from "@/components/ui/hover/TextHover";

const client = generateClient();

export default function Profil({ onProgressChange, onUploadStart, onUploadEnd }) {
    const { popups, openPopup, closePopup } = usePopup();
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, user, profilePictureURL } = useUser();
    const [recipes, setRecipes] = useState([]);
    const [nextToken, setNextToken] = useState(null);
    const [noMoreRecipes, setNoMoreRecipes] = useState(false);

    const fetchInitialRecipes = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
                variables: {
                    filter: {
                        owner: {
                            eq: user.id
                        }
                    }, limite: 2
                }
            });
            const recipesList = recipeData.data.listRecipes.items;
            const newNextToken = recipeData.data.listRecipes.nextToken;

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

            setRecipes(recipesWithImages);
            setNextToken(newNextToken);
            setNoMoreRecipes(!newNextToken);
        } catch (error) {
            console.error("Error fetching initial recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchInitialRecipes();
        }
    }, [user]);

    const fetchMoreRecipes = useCallback(async () => {
        if (loading || noMoreRecipes || !nextToken) return;
        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
                variables: {
                    filter: {
                        owner: {
                            eq: user.id
                        }
                    }, limite: 2, nextToken
                }
            });
            const recipesList = recipeData.data.listRecipes.items;
            const newNextToken = recipeData.data.listRecipes.nextToken;

            if (recipesList.length === 0 || !newNextToken) {
                setNoMoreRecipes(true);
            }

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

            setRecipes((prevRecipes) => [...prevRecipes, ...recipesWithImages]);
            setNextToken(newNextToken);
        } catch (error) {
            console.error("Error fetching more recipes:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, nextToken, noMoreRecipes]);

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
        <ProtectedRoutes>
            <Head>
                <title>Votre profil Miamze, {user?.pseudo}</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Button variant="primary" position="fixed" right="20px" bottom="20px" zIndex="2" href="/ajouter-une-recette" icon={PiPlus}>
                Ajouter une recette
            </Button>
            <Section>
                <BackgroundContainer coverUrl="background/cover_4.jpg">
                    <div className="profil-container">
                        <TextHover
                            text={"Changer de Photo de profil"}
                            onClick={() =>
                                openPopup('popupProfilePicture')
                            }
                        >
                            {profilePictureURL ? (
                                <img src={profilePictureURL} className="user-picture" alt={user.profile.name} />
                            ) : (
                                <img src="/svg/utilisateur.svg" className="big-user-picture" alt="avatar" />
                            )}
                        </TextHover>
                        <Stack direction="column" spacing="0px">
                            <Title level={2}>
                                {user?.profile.name} {user?.profile.surname}
                            </Title>
                            <Text>{user?.pseudo}</Text>
                        </Stack>
                    </div>
                </BackgroundContainer>
                <Container direction="row" responsive="yes">
                    <Column width="35%">
                        <Bento position="sticky" top="80px" highlight="highlight">
                            <Stack align="center">
                                <Title level={4}>À propos</Title>
                                <IconButton variant="secondary-action" onClick={() => openPopup('popupEditProfile')}>
                                    <PiPen /> Modifier
                                </IconButton>
                            </Stack>
                            <Text>{user?.profile.description}</Text>
                            <Chip icon={PiEnvelope} variant="success">{user?.email}</Chip>
                            <Chip icon={PiCake} variant="success">{`${user?.age} ans`}</Chip>
                        </Bento>
                    </Column>
                    <Column width="65%" gap="30px">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <Bento highlight="highlight" padding="15px" item key={recipe.id}>
                                    <InvisibleLink href={`/${recipe.user.pseudo}`}>
                                        <Stack width="fit-content">
                                            <img className="user-picture" alt={recipe.user.pseudo} src={profilePictureURL} />
                                            <Stack direction="column" spacing="0px">
                                                <Title fontFamily="medium" level={4}>
                                                    {recipe.user.pseudo}
                                                </Title>
                                                <Text>{`${convertirFormatDate(recipe.createdAt)}`}</Text>
                                            </Stack>
                                        </Stack>
                                    </InvisibleLink>
                                    {recipe.imageUrl && <img className="recette-image" alt={recipe.title} src={recipe.imageUrl} />}
                                    <Stack>
                                        <IconButton variant="action" href={`/categories/${recipe.category.name}`}>
                                            {recipe.category.name}
                                        </IconButton>
                                    </Stack>
                                    <Title level={3}>{recipe.title}</Title>
                                    <Text>{recipe.description}</Text>
                                    <Button variant="secondary" href={`/${recipe.user.pseudo}/${recipe.title}`}>
                                        Voir ma recette
                                    </Button>
                                </Bento>
                            ))
                        ) : (
                            <Stack direction="column" align="center">
                                <AnimationComponent animationData={Empty} width="150px" />
                                <Text>Vous n&apos;avez pas encore de recette</Text>
                                <IconButton variant="action" href="/ajouter-une-recette">
                                    <PiPlus /> Ajouter une recette
                                </IconButton>
                            </Stack>
                        )}
                        {loading && <Text>Chargement en cours...</Text>}
                        {!loading && noMoreRecipes && <Text>Vous n&apos;avez pas d&apos;autres recettes.</Text>}
                    </Column>
                </Container>
            </Section>
            <ProfilePicturePopup
                open={popups['popupProfilePicture']}
                onClose={() => closePopup('popupProfilePicture')}
                onProgressChange={onProgressChange}
                onUploadStart={onUploadStart}
                onUploadEnd={onUploadEnd}
            />
            <EditProfilePopup
                open={popups['popupEditProfile']}
                onClose={() => closePopup('popupEditProfile')}
            />
        </ProtectedRoutes>
    );
}
