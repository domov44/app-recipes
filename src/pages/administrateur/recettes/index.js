import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listRecipes } from '@/graphql/customQueries';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import Checkbox from '@/components/ui/form/CheckboxItem';
import IconButton from '@/components/ui/button/IconButton';
import { CiTrash } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { confirm } from '@/utils/ConfirmGlobal';
import {
    notifySuccess,
    notifyError,
} from '@/components/ui/Toastify';
import Text from '@/components/ui/textual/Text';
import Link from 'next/link';
import Hero from '@/components/ui/wrapper/Hero';
import Stack from '@/components/ui/wrapper/Stack';
import { useUser } from '@/utils/UserContext';
import Chip from '@/components/ui/textual/Chip';
import { deleteRecipe } from "@/graphql/customMutations";
import AnimationComponent from "@/components/animation/Animation";
import Empty from '@/components/animation/storageAnimation/empty.json';
import TextLink from '@/components/ui/textual/TextLink';
import { handleTypeIngredientVariant } from '@/utils/typeIngredientHandler';
import ProtectedRoutes from '@/hooks/login-gestion/ProtectedRoute';
import { onDeleteRecipe } from '@/graphql/subscriptions';

const client = generateClient();

function MyRecipePage() {
    const { isAdmin, user } = useUser();
    const [recipes, setRecipes] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedCount, setSelectedCount] = useState(0);
    const [deleteButtonState, setDeleteButtonState] = useState(false);
    const [loading, setLoading] = useState(true);
    let subscription;

    useEffect(() => {
        fetchRecipes();
        subscribeToDeleteRecipe();
        return () => unsubscribeFromDeleteRecipe();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const recipeData = await client.graphql({
                query: listRecipes,
            });
            const recipesList = recipeData.data.listRecipes.items;
            setRecipes(recipesList);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching recipes:", error);
        }
    };

    useEffect(() => {
        setDeleteButtonState(selectedCount > 0 ? false : true);
    }, [selectedCount]);

    const handleChildCheckboxChange = (recipeId) => {
        const updatedCheckedItems = { ...checkedItems, [recipeId]: !checkedItems[recipeId] };
        const count = Object.values(updatedCheckedItems).filter(Boolean).length;
        setSelectedCount(count);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(count === recipes.length);
    };

    const handleParentCheckboxChange = () => {
        const updatedCheckedItems = {};
        if (!allChecked) {
            recipes.forEach((recipe) => {
                updatedCheckedItems[recipe.id] = true;
            });
        }
        setSelectedCount(Object.keys(updatedCheckedItems).length);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(!allChecked);
    };

    const deleteCheckedRecipes = async () => {
        const checkedRecipeIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
        try {
            if (await confirm({ title: `Voulez-vous vraiment supprimer ces recettes ?`, content: "Ces recettes seront supprimées de l'application", variant: "danger" })) {
                await Promise.all(checkedRecipeIds.map(async (id) => {
                    await deleteRecipeById(id);
                }));
                setCheckedItems({});
                setAllChecked(false);
                setSelectedCount(0);
                notifySuccess(`${checkedRecipeIds.length} recettes supprimées avec succès`);
                fetchRecipes();
            }
        } catch (error) {
            console.error("Error on deleting recipes", error);
            notifyError("Erreur lors de la suppression des recettes");
        }
    };

    const deleteRecipeById = async (id) => {
        try {
            const deletedRecipe = await client.graphql({
                query: deleteRecipe,
                variables: {
                    input: {
                        id: id,
                    }
                }
            });
            notifySuccess("Recette supprimée avec succès");
        } catch (error) {
            console.error("Error on deleting recipe", error);
            notifyError("Erreur lors de la suppression de la recette");
        }
    };

    const subscribeToDeleteRecipe = () => {
        subscription = client
            .graphql({
                query: onDeleteRecipe,
                variables: {
                }
            })
            .subscribe({
                next: (data) => {
                    console.log('Subscription data:', data);
                    handleSubscriptionEvent(data);
                },
                error: (error) => {
                    console.error('Subscription error:', error);
                }
            });
    };

    const unsubscribeFromDeleteRecipe = () => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };

    const handleSubscriptionEvent = (data) => {
        fetchRecipes();
    };

    const handleDeleteRecipe = async (id) => {
        try {
            if (await confirm({ title: `Voulez-vous vraiment supprimer cette recette ?`, content: "Cette recette sera supprimée de l'application", variant: "danger" })) {
                await deleteRecipeById(id);
            }
        } catch (error) {
            console.error("Error on deleting recipe", error);
            notifyError("Erreur lors de la suppression de la recette");
        }
    };

    return (
        <ProtectedRoutes>
            <Hero>
                <Stack justify="end">
                    {isAdmin && (
                        <Stack justify="end" spacing="10px">
                            <IconButton
                                type='submit'
                                disable={deleteButtonState}
                                variant="danger"
                                onClick={deleteCheckedRecipes}
                            >
                                <CiTrash /> Supprimer ({selectedCount})
                            </IconButton>
                            <IconButton variant="action" href="/ajouter-une-recette">
                                <IoMdAdd /> Ajouter
                            </IconButton>
                        </Stack>
                    )}
                </Stack>
                <Table>
                    <thead>
                        <tr>
                            {isAdmin && (
                                <Th>
                                    <Checkbox
                                        checked={allChecked}
                                        onChange={handleParentCheckboxChange}
                                    />
                                </Th>
                            )}
                            <Th>Nom</Th>
                            <Th>Catégorie</Th>
                            <Th>Créateur</Th>
                            {isAdmin && <Th>Actions</Th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <Td colSpan={3}>
                                    <Stack direction="column" align="center">
                                        <Text>Chargement...</Text>
                                    </Stack>
                                </Td>
                            </tr>
                        ) : (
                            recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <tr key={recipe.id}>
                                        {isAdmin && (
                                            <Td>
                                                <Checkbox
                                                    checked={checkedItems[recipe.id] || false}
                                                    onChange={() => handleChildCheckboxChange(recipe.id)}
                                                />
                                            </Td>
                                        )}
                                        <Td>
                                            <TextLink href={`/${recipe.user.pseudo}/${recipe.slug}`}>{recipe.title}</TextLink>
                                        </Td>
                                        <Td>
                                            <Chip variant={handleTypeIngredientVariant(recipe.category.name)}>{recipe.category.name}</Chip>
                                        </Td>
                                        <Td>
                                            <Stack align="center">
                                                <img src={recipe.user.avatar} className='user-picture-min'></img>
                                                {recipe.user.pseudo}
                                            </Stack>
                                        </Td>
                                        {isAdmin && (
                                            <Td>
                                                <Stack spacing="10px">
                                                    <IconButton onClick={() => handleDeleteRecipe(recipe.id)} variant="danger">
                                                        <CiTrash />
                                                    </IconButton>
                                                </Stack>
                                            </Td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={4}>
                                        <Stack direction="column" align="center">
                                            <AnimationComponent animationData={Empty} width="150px" />
                                            <Text>Aucune recette.</Text>
                                            <IconButton variant="action" href="/ajouter-une-recette">
                                                <IoMdAdd /> Ajouter une recette
                                            </IconButton>
                                        </Stack>
                                    </Td>
                                </Tr>
                            )
                        )}
                    </tbody>
                </Table>
            </Hero>
        </ProtectedRoutes>
    );
}

export default MyRecipePage;
