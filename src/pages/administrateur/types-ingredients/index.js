import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listIngredientTypes, listIngredients } from '@/graphql/customQueries';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
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
import { ingredientsByTypeID } from "@/graphql/queries";
import { deleteIngredientType, deleteIngredient } from "@/graphql/mutations";
import AnimationComponent from "@/components/animation/Animation";
import Empty from '@/components/animation/storageAnimation/empty.json';
import TextLink from '@/components/ui/textual/TextLink';

const client = generateClient();

function TypesIngredientsPage() {
    const [ingredientTypes, setIngredients] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedCount, setSelectedCount] = useState(0);
    const [deleteButtonState, setDeleteButtonState] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useUser();

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await client.graphql({
                query: listIngredientTypes,
                variables: { limit: 10 },
            });
            setIngredients(result.data.listIngredientTypes.items);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ingredientTypes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setDeleteButtonState(selectedCount > 0 ? false : true);
    }, [selectedCount]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleChildCheckboxChange = (ingredientId) => {
        const updatedCheckedItems = { ...checkedItems, [ingredientId]: !checkedItems[ingredientId] };
        const count = Object.values(updatedCheckedItems).filter(Boolean).length;
        setSelectedCount(count);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(count === ingredientTypes.length);
    };

    const handleParentCheckboxChange = () => {
        const updatedCheckedItems = {};
        if (!allChecked) {
            ingredientTypes.forEach((ingredientType) => {
                updatedCheckedItems[ingredientType.id] = true;
            });
        }
        setSelectedCount(Object.keys(updatedCheckedItems).length);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(!allChecked);
    };

    const deleteCheckedIngredients = async () => {
        const checkedIngredientTypeIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
        try {
            if (await confirm({
                title: `Voulez-vous vraiment supprimer ces types d'ingrédients ?`,
                content: "Ces types d'ingrédients et tous les ingrédients appartenant à ce type seront supprimés définitivement.",
                variant: "danger"
            })) {
                await Promise.all(checkedIngredientTypeIds.map(async (typeId) => {

                    const filter = {
                        filter: {
                            typeID: {
                                eq: typeId
                            }
                        }
                    };
    
                    const ingredientsResult = await client.graphql({
                        query: listIngredients,
                        variables: filter,
                    });
    
                    const ingredients = ingredientsResult.data.listIngredients.items;

                    await Promise.all(ingredients.map(async (ingredient) => {
                        await client.graphql({
                            query: deleteIngredient,
                            variables: { input: { id: ingredient.id } }
                        });
                    }));

                    // Delete the ingredient type
                    await client.graphql({
                        query: deleteIngredientType,
                        variables: {
                            input: { id: typeId }
                        }
                    });
                }));
                setCheckedItems({});
                setAllChecked(false);
                setSelectedCount(0);
                notifySuccess(`${checkedIngredientTypeIds.length} types d'ingrédients supprimés avec succès`);
                fetchData();
            }
        } catch (error) {
            console.error("Error on deleting ingredientTypes", error);
            notifyError("Erreur lors de la suppression des types d'ingrédients");
        }
    };


    const handleDeleteIngredientType = async (ingredientTypeId) => {
        try {
            const confirmed = await confirm({
                title: `Voulez-vous vraiment supprimer ce type d'ingrédient ?`,
                content: "Ce type d'ingrédient et tous les ingrédients associés seront supprimés de l'application",
                variant: "danger"
            });

            if (confirmed) {
                console.log("Confirmation received, proceeding with deletion");
                console.log(ingredientTypeId)

                const filter = {
                    filter: {
                        typeID: {
                            eq: ingredientTypeId
                        }
                    }
                };

                const ingredientsResult = await client.graphql({
                    query: listIngredients,
                    variables: filter,
                });

                const ingredients = ingredientsResult.data.listIngredients.items;

                console.log("Ingrédients à supprimer : ", ingredients);

                // Supprimer tous les ingrédients associés
                await Promise.all(ingredients.map(async (ingredient) => {
                    await client.graphql({
                        query: deleteIngredient,
                        variables: { input: { id: ingredient.id } }
                    });
                }));

                // Supprimer le type d'ingrédient
                await client.graphql({
                    query: deleteIngredientType,
                    variables: { input: { id: ingredientTypeId } }
                });

                notifySuccess("Type d'ingrédient et ses ingrédients associés supprimés avec succès");
                fetchData(); 
            }
        } catch (error) {
            console.error("Error on deleting ingredientType and its ingredients", error);
            notifyError("Erreur lors de la suppression du type d'ingrédient et de ses ingrédients associés");
        }
    };

    return (
        <Hero>
            <Stack justify="end">
                {isAdmin && (
                    <Stack justify="end" spacing="10px">
                        <IconButton
                            type='submit'
                            disable={deleteButtonState}
                            variant="danger"
                            onClick={deleteCheckedIngredients}
                        >
                            <CiTrash /> Supprimer ({selectedCount})
                        </IconButton>
                        <IconButton variant="action" href="/administrateur/types-ingredients/ajouter-un-type">
                            <IoMdAdd /> Ajouter un type d&apos;ingrédient
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
                        ingredientTypes.length > 0 ? (
                            ingredientTypes.map((ingredientType) => (
                                <tr key={ingredientType.id}>
                                    {isAdmin && (
                                        <Td>
                                            <Checkbox
                                                checked={checkedItems[ingredientType.id] || false}
                                                onChange={() => handleChildCheckboxChange(ingredientType.id)}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <TextLink href={`/types-ingredients/${ingredientType.id}`}>{ingredientType.name}</TextLink>
                                    </Td>
                                    {isAdmin && (
                                        <Td>
                                            <Stack spacing="10px">
                                                <IconButton onClick={() => handleDeleteIngredientType(ingredientType.id)} variant="danger">
                                                    <CiTrash />
                                                </IconButton>
                                            </Stack>
                                        </Td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <Td colSpan={4}>
                                <Stack direction="column" align="center">
                                    <AnimationComponent animationData={Empty} width="150px" />
                                    <Text>Aucun type d&apos;ingrédient.</Text>
                                    <IconButton variant="action" href="/administrateur/types-ingredients/ajouter-un-type">
                                        <IoMdAdd /> Ajouter un type d&apos;ingrédient
                                    </IconButton>
                                </Stack>
                            </Td>
                        )
                    )}
                </tbody>
            </Table>
        </Hero>
    );
}

export default TypesIngredientsPage;
