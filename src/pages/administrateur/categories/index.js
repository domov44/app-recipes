import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { listCategories } from '@/graphql/customQueries';
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
import { deleteCategory } from "@/graphql/mutations";
import AnimationComponent from "@/components/animation/Animation";
import Empty from '@/components/animation/storageAnimation/empty.json';
import TextLink from '@/components/ui/textual/TextLink';

const categoryClient = generateClient();

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedCount, setSelectedCount] = useState(0);
    const [deleteButtonState, setDeleteButtonState] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useUser();

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await categoryClient.graphql({
                query: listCategories,
                variables: { limit: 10 },
            });
            setCategories(result.data.listCategories.items);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setDeleteButtonState(selectedCount > 0 ? false : true);
    }, [selectedCount]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleChildCheckboxChange = (categoryId) => {
        const updatedCheckedItems = { ...checkedItems, [categoryId]: !checkedItems[categoryId] };
        const count = Object.values(updatedCheckedItems).filter(Boolean).length;
        setSelectedCount(count);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(count === categories.length);
    };

    const handleParentCheckboxChange = () => {
        const updatedCheckedItems = {};
        if (!allChecked) {
            categories.forEach((category) => {
                updatedCheckedItems[category.id] = true;
            });
        }
        setSelectedCount(Object.keys(updatedCheckedItems).length);
        setCheckedItems(updatedCheckedItems);
        setAllChecked(!allChecked);
    };

    const deleteCheckedCategories = async () => {
        const checkedCategoriesIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
        try {
            if (await confirm({ title: `Voulez-vous vraiment supprimer ces catégories ?`, content: "Ces catégories seront supprimés de l'application", variant: "danger" })) {
                await Promise.all(checkedCategoriesIds.map(async (id) => {
                    const deletedCategory = await categoryClient.graphql({
                        query: deleteCategory,
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
                notifySuccess(`${checkedCategoriesIds.length} catégories supprimés avec succès`);
                fetchData();
            }
        } catch (error) {
            console.error("Error on deleting categories", error);
            notifyError("Erreur lors de la suppression des catégories");
        }
    };

    const handleDeleteIngredient = async (id) => {
        try {
            console.log(id)
            if (await confirm({ title: `Voulez-vous vraiment supprimer cette catégorie ?`, content: "Cette catégorie sera supprimée de l'application", variant: "danger" })) {
                const deletedClient = await categoryClient.graphql({
                    query: deleteCategory,
                    variables: {
                        input: {
                            id: id
                        }
                    }
                });
                notifySuccess("Catégorie supprimé avec succès");
                fetchData();
            }
        } catch (error) {
            console.error("Error on deleting category", error);
            notifyError("Erreur lors de la suppression de l'catégorie");
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
                            onClick={deleteCheckedCategories}
                        >
                            <CiTrash /> Supprimer ({selectedCount})
                        </IconButton>
                        <IconButton variant="action" href="/administrateur/categories/ajouter-une-categorie">
                            <IoMdAdd /> Ajouter une catégorie
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
                        categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    {isAdmin && (
                                        <Td>
                                            <Checkbox
                                                checked={checkedItems[category.id] || false}
                                                onChange={() => handleChildCheckboxChange(category.id)}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <TextLink href={`/categories/${category.slug}`}>{category.name}</TextLink>
                                    </Td>
                                    {isAdmin && (
                                        <Td>
                                            <Stack spacing="10px">
                                                <IconButton onClick={() => handleDeleteIngredient(category.id)} variant="danger">
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
                                        <Text>Aucune catégorie.</Text>
                                        <IconButton variant="action" href="/administrateur/categories/ajouter-une-categorie">
                                            <IoMdAdd /> Ajouter une catégorie
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

export default CategoriesPage;
