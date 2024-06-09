import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listIngredients } from '@/graphql/customQueries';
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
import { deleteIngredient } from "@/graphql/mutations";
import AnimationComponent from "@/components/animation/Animation";
import Empty from '@/components/animation/storageAnimation/empty.json';
import TextLink from '@/components/ui/textual/TextLink';
import { handleTypeIngredientVariant } from '@/utils/typeIngredientHandler';

const ingredientClient = generateClient();

function IngredientsPage() {
    const [ingredients, setIngredients] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedCount, setSelectedCount] = useState(0);
    const [deleteButtonState, setDeleteButtonState] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useUser();

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await ingredientClient.graphql({
                query: listIngredients,
                variables: { limit: 10 },
            });
            setIngredients(result.data.listIngredients.items);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
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
        setAllChecked(count === ingredients.length);
    };

    const handleParentCheckboxChange = () => {
        const updatedCheckedItems = {};
        if (!allChecked) {
            ingredients.forEach((ingredient) => {
                updatedCheckedItems[ingredient.id] = true;
            });
        }
        setSelectedCount(Object.keys(updatedCheckedItems).length);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(!allChecked);
    };

    const deleteCheckedIngredients = async () => {
        const checkedIngredientsIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
        try {
            if (await confirm({ title: `Voulez-vous vraiment supprimer ces ingrédients ?`, content: "Ces ingrédients seront supprimés de l'application", variant: "danger" })) {
                await Promise.all(checkedIngredientsIds.map(async (id) => {
                    const deletedClient = await ingredientClient.graphql({
                        query: deleteIngredient,
                        variables: {
                            input: {
                                id: id
                            }
                        }
                    });
                }));
                setCheckedItems({});
                setAllChecked(false);
                setSelectedCount(0);
                notifySuccess(`${checkedIngredientsIds.length} ingrédients supprimés avec succès`);
                fetchData();
            }
        } catch (error) {
            console.error("Error on deleting ingredients", error);
            notifyError("Erreur lors de la suppression des ingrédients");
        }
    };

    const handleDeleteIngredient = async (id) => {
        try {
            console.log(id)
            if (await confirm({ title: `Voulez-vous vraiment supprimer cet ingrédient ?`, content: "Cet ingrédient sera supprimé de l'application", variant: "danger" })) {
                const deletedClient = await ingredientClient.graphql({
                    query: deleteIngredient,
                    variables: {
                        input: {
                            id: id
                        }
                    }
                });
                notifySuccess("Ingrédient supprimé avec succès");
                fetchData();
            }
        } catch (error) {
            console.error("Error on deleting ingredient", error);
            notifyError("Erreur lors de la suppression de l'ingrédient");
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
                        <IconButton variant="action" href="/administrateur/ingredients/ajouter-un-ingredient">
                            <IoMdAdd /> Ajouter un ingrédient
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
                        <Th>Type</Th>
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
                        ingredients.length > 0 ? (
                            ingredients.map((ingredient) => (
                                <tr key={ingredient.id}>
                                    {isAdmin && (
                                        <Td>
                                            <Checkbox
                                                checked={checkedItems[ingredient.id] || false}
                                                onChange={() => handleChildCheckboxChange(ingredient.id)}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <TextLink href={`/ingredients/${ingredient.id}`}>{ingredient.name}</TextLink>
                                    </Td>
                                    <Td>
                                        <Chip variant={handleTypeIngredientVariant(ingredient.type.name)}>{ingredient.type.name}</Chip>
                                    </Td>
                                    {isAdmin && (
                                        <Td>
                                            <Stack spacing="10px">
                                                <IconButton onClick={() => handleDeleteIngredient(ingredient.id)} variant="danger">
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
                                        <Text>Aucun ingrédient.</Text>
                                        <IconButton variant="action" href="/administrateur/ingredients/ajouter-un-ingredient">
                                            <IoMdAdd /> Ajouter un ingrédient
                                        </IconButton>
                                    </Stack>
                                </Td>
                            </Tr>
                        )
                    )}
                </tbody>
            </Table>
        </Hero>
    );
}

export default IngredientsPage;
