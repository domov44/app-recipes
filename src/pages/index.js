import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Bento from '@/components/ui/wrapper/Bento';
import Button from '@/components/ui/button/Button';
import IconButton from '@/components/ui/button/IconButton';
import Stack from '@/components/ui/wrapper/Stack';
import InvisibleLink from '@/components/ui/button/InvisibleLink';
import { getS3Path } from '@/utils/getS3Path';
import { getRecipe } from '@/graphql/customQueries';
import { generateClient } from 'aws-amplify/api';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import { IoMdAdd } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { fetchAuthSession } from 'aws-amplify/auth';

const client = generateClient();

const RecipesForUser = () => {
  const router = useRouter();
  const { user, isLoggedIn, profilePictureURL } = useUser();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeForUser = async () => {
        if (!user) {
            return;
          }

      try {
        const response = await fetch(`/api/getRecipeForUser?userId=${user.id}`, {
            headers: {
              Authorization: `Bearer ${((await fetchAuthSession()).tokens.accessToken.toString())}`,
            },
          });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Une erreur est survenue.');
          setLoading(false);
          return;
        }

        const recipeData = await client.graphql({
          query: getRecipe,
          variables: { id: data.recipeId },
        });

        const enrichedRecipe = await enrichRecipeWithImages(recipeData.data.getRecipe);
        setRecipe(enrichedRecipe);
      } catch (err) {
        setError('Erreur lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeForUser();
  }, [user, router]);

  const enrichRecipeWithImages = async (recipe) => {
    let imageUrl = '';
    let profileUrl = '';
    if (recipe.image) {
      const imageUrlObject = await getS3Path(recipe.image);
      imageUrl = imageUrlObject.href;
    }

    if (recipe.user?.avatar) {
      const profileUrlObject = await getS3Path(recipe.user.avatar);
      profileUrl = profileUrlObject.href;
    }

    return {
      ...recipe,
      imageUrl,
      profileUrl,
    };
  };

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <div>
      {isLoggedIn && (
        <Bento highlight={"highlight"} overflow={"visible"}>
          <Stack direction={"column"}>
            <Stack separator align={"center"} spacing={"20px"}>
              {isLoggedIn && user?.pseudo && (
                <InvisibleLink href="/profil" lineheight="0">
                  {profilePictureURL ? (
                    <img src={profilePictureURL} className="user-picture" alt={user.profile.name} />
                  ) : (
                    <img src="/svg/utilisateur.svg" className="user-picture" alt="avatar" />
                  )}
                </InvisibleLink>
              )}
              <Stack direction={"column"}>
                <Title level={5}>On cuisine quoi aujourd&apos;hui ?</Title>
                <Text>Voici les actions que vous pouvez faire</Text>
              </Stack>
            </Stack>
            <Stack>
              <IconButton variant="action" href={`/ajouter-une-recette`}>
                <IoMdAdd /> Ajouter une recette
              </IconButton>
              <IconButton variant="secondary-action" href={`/mes-recettes`}>
                <CiEdit /> Gérer mes recettes
              </IconButton>
            </Stack>
          </Stack>
        </Bento>
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {!error && !recipe && <Text>Aucune recette trouvée.</Text>}
      {!error && recipe && (
        <Bento highlight="highlight" padding="15px">
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
                <Text>{convertirFormatDate(recipe.createdAt)}</Text>
              </Stack>
            </Stack>
          </InvisibleLink>
          {recipe.imageUrl && (
            <img
              className="recette-image"
              alt={recipe.title}
              src={recipe.imageUrl}
            />
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
      )}
    </div>
  );
};

export default RecipesForUser;
