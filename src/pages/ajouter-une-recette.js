import React, { useState, useContext } from 'react';
import axios from 'axios';
import { showToast, ToastContainer, notifySuccess, notifyError, notifyInfo, notifyWarning, notifyDefault } from '../components/ui/Toastify';
import Button from '@/components/ui/button/Button';
import Form from '@/components/ui/form/Form';
import TextInput from '@/components/ui/form/TextInput';
import Upload from '@/components/ui/form/Upload';
import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Container from '@/components/ui/wrapper/Container';
import Column from '@/components/ui/wrapper/Column';
import Title from '@/components/ui/textual/Title';
import FormError from '@/components/ui/form/formError';
import Text from '@/components/ui/textual/Text';
import Router from 'next/router';
import CircleProgress from '@/components/ui/progress/CircleProgress';
import Textarea from '@/components/ui/form/Textarea';
import useCategoriesOptions from '@/utils/getCategories';
import useIngredientsOptions from '@/utils/getIngredients';
import SelectSearchable from '@/components/ui/form/SelectSearchable';
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import Head from 'next/head';
import Accordion from '@/components/ui/wrapper/Accordion';
import Stack from '@/components/ui/wrapper/Stack';
import IconButton from '@/components/ui/button/IconButton';
import { CiTrash } from 'react-icons/ci';
import { confirm } from '@/utils/ConfirmGlobal';
import { PiPlus } from 'react-icons/pi';

const AjouterRecette = () => {

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [categorie, setCategorie] = useState('');
    const [formData1, setFormData1] = useState({ nom: '' });
    const [formData2, setFormData2] = useState({ description: '', categorie: null });
    const [formData3, setFormData3] = useState({ ingredients: [] });
    const [formData4, setFormData4] = useState({ steps: [{ description: '', duration: '' }] });
    const [formData5, setFormData5] = useState({ image: null });

    const categoriesOptions = useCategoriesOptions();
    const ingredientsOptions = useIngredientsOptions();

    const handleImageDelete = () => {
        setFormData5({ image: null });
    };

    const handlePageImageChange = (event) => {
        const file = event.target.files[0];
        setFormData5({ image: file });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        console.log("FormData1:", formData1);
        console.log("FormData2:", formData2);
        console.log("FormData3:", formData3);
        console.log("FormData4:", formData4);
        console.log("FormData5:", formData5);

        if (step === 1) {
            setFormData1({ ...formData1 });
            setStep(2);
        } else if (step === 2) {
            setFormData2({ ...formData2 });
            setStep(3);
        } else if (step === 3) {
            setFormData3({ ...formData3 });
            setStep(4);
        } else if (step === 4) {
            setFormData4({ ...formData4 });
            setStep(5);
        } else if (step === 5) {
            submitCompleteForm();
        }
    };

    const submitCompleteForm = () => {
        const completeFormData = new FormData();
        Object.entries(formData1).forEach(([key, value]) => completeFormData.append(key, value));
        Object.entries(formData2).forEach(([key, value]) => completeFormData.append(key, value));
        const stepsData = formData4.steps || [];
        completeFormData.append('steps', JSON.stringify(stepsData.map((step, index) => ({ ...step, step_number: index + 1 }))));

        const ingredientsArray = formData3.ingredients.map(ingredient => ({
            id: ingredient.id,
            label: ingredient.label,
            quantity: ingredient.quantity
        }));
        completeFormData.append('ingredients', JSON.stringify(ingredientsArray));

        if (formData5.image) {
            completeFormData.append('image', formData5.image);
        }

        axios
            .post('http://localhost:8081/recettes/ajouter', completeFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                notifySuccess("Recette ajoutée avec succès");
                Router.push('/mes-recettes');
            })
            .catch((err) => {
                if (err.response && (err.response.status === 409 || err.response.status === 500)) {
                    const errorMessage = err.response.data;
                    notifyError("L'ajout a échoué");
                    setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
                }
                else if (err.response && (err.response.status === 400)) {
                    const errorMessage = err.response.data;
                    notifyError("Ajout refusé vérifiez vos propos");
                    setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
                }
            });
    };


console.log(ingredientsOptions)

    const calculateProgress = () => {
        const totalFields = (Object.keys(formData1).length + Object.keys(formData2).length + Object.keys(formData3).length) + Object.keys(formData4).length;
        const filledFields = Object.values(formData1).filter(value => value !== '').length +
            Object.values(formData2).filter(value => value !== '').length +
            Object.values(formData3).filter(value => value !== '').length;
        Object.values(formData4).filter(value => value !== null).length;
        const progressPercentage = Math.round((filledFields / totalFields) * 100);
        return progressPercentage;
    };

    const handleIngredientChange = (selectedOption, index) => {
        const newIngredients = [...formData3.ingredients];
        newIngredients[index] = {
            ...newIngredients[index],
            id: selectedOption.id,
            label: selectedOption.label
        };
        setFormData3({ ...formData3, ingredients: newIngredients });
    };

    const handleDeleteIngredients = async (index) => {
        if (await confirm({ title: "Voulez-vous vraiment supprimer cet ingrédient ?", content: "Cet ingrédient sera supprimé de cette recette.", variant: "danger" })) {
            try {
                const newIngredients = [...formData3.ingredients];
                newIngredients.splice(index, 1);
                setFormData3({ ...formData3, ingredients: newIngredients });
                notifySuccess("Ingrédient supprimé avec succès");
            } catch (err) {
                console.log(err);
                notifyError("Erreur lors de la suppression de l'ingrédient");
            }
        }
    };

    const handleQuantityChange = (event, index) => {
        const newIngredients = [...formData3.ingredients];
        newIngredients[index] = {
            ...newIngredients[index],
            quantity: event.target.value
        };
        setFormData3({ ...formData3, ingredients: newIngredients });
    };

    const addIngredient = () => {
        setFormData3({
            ...formData3,
            ingredients: [...formData3.ingredients, { id: '', quantity: '' }]
        });
    };

    const handleDeleteStep = async (index) => {
        if (await confirm({ title: "Voulez-vous vraiment supprimer cette étape ?", content: "Cette étape sera supprimée de cette recette et vous ne pourrez pas la récupérer", variant: "danger" })) {
            try {
                const newSteps = [...formData4.steps];
                newSteps.splice(index, 1);
                setFormData4({ ...formData4, steps: newSteps });
                notifySuccess("Étape supprimée avec succès");
            } catch (err) {
                console.log(err);
                notifyError("Erreur lors de la suppression de l'étape");
            }
        }
    };



    return (
        <ProtectedRoutes>
            <Head>
                <title>Ajoutez votre recette sur Miamalo</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <div className='fixed-bottom-right'>
                    <CircleProgress progress={calculateProgress()} />
                </div>
                <Container direction="row" responsive="yes">
                    <Column width="100%" align="center">
                        <Bento width="600px" highlight="highlight" padding="40px">
                            <Form onSubmit={handleSubmit}>
                                {step === 1 && (
                                    <>
                                        <Title level={2}>
                                            C&apos;est parti !
                                        </Title>
                                        <Text>Choisissez un nom pour votre nouvelle recette</Text>
                                        <TextInput
                                            type="text"
                                            required
                                            label="Nom"
                                            value={formData1.nom}
                                            onChange={(e) => setFormData1({ ...formData1, nom: e.target.value })}
                                        />
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <Title level={2}>
                                            Choix de la catégorie
                                        </Title>
                                        <Text>Maintenant décrivez votre nouvelle recette.</Text>
                                        <SelectSearchable
                                            options={categoriesOptions}
                                            onSelect={(selectedOption) => setFormData2({ ...formData2, categorie: selectedOption.id })}
                                            label="Rechercher une catégorie"
                                        />
                                        <Textarea
                                            required
                                            label="Description"
                                            value={formData2.description}
                                            onChange={(e) => setFormData2({ ...formData2, description: e.target.value })}
                                        />
                                    </>
                                )}
                                {step === 3 && (
                                    <>
                                        <Title>Ingredients</Title>
                                        {formData3.ingredients.map((ingredient, index) => (
                                            <Stack key={index} align="center">
                                                <Accordion title={ingredient.id ? `Ingrédient ${index + 1} : ` + ingredient.label : `Ingrédient ${index + 1} : choisissez un ingrédient`} defaultOpen={true}>
                                                    <Stack direction="column">
                                                        <SelectSearchable
                                                            options={ingredientsOptions}
                                                            onSelect={(selectedOption) => handleIngredientChange(selectedOption, index)}
                                                            label="Rechercher un ingrédient"
                                                        />
                                                        <TextInput
                                                            type="text"
                                                            required
                                                            label="Quantité"
                                                            value={ingredient.quantity}
                                                            onChange={(e) => handleQuantityChange(e, index)}
                                                        />
                                                    </Stack>
                                                </Accordion>
                                                <IconButton wtext="no" onClick={e => handleDeleteIngredients(index)} variant="danger"><CiTrash /></IconButton>
                                            </Stack>

                                        ))}
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={addIngredient}
                                            icon={PiPlus}
                                        >
                                            Ajouter un ingrédient
                                        </Button>
                                    </>
                                )}
                                {step === 4 && (
                                    <>
                                        {formData4.steps.map((step, index) => (
                                            <Stack key={index} align="center">
                                                <Accordion title={`Étape ${index + 1}`} defaultOpen={true}>
                                                    <Stack direction="column">
                                                        <Textarea
                                                            required
                                                            label="Description"
                                                            value={step.description}
                                                            onChange={(e) => {
                                                                const newSteps = [...formData4.steps];
                                                                newSteps[index] = { ...newSteps[index], description: e.target.value };
                                                                setFormData4({ ...formData4, steps: newSteps });
                                                            }}
                                                        />
                                                        <TextInput
                                                            type="number"
                                                            required
                                                            label="Durée en minute"
                                                            value={step.duration}
                                                            onChange={(e) => {
                                                                const newSteps = [...formData4.steps];
                                                                newSteps[index] = { ...newSteps[index], duration: e.target.value };
                                                                setFormData4({ ...formData4, steps: newSteps });
                                                            }}
                                                        />
                                                    </Stack>
                                                </Accordion>
                                                <IconButton
                                                    wtext="no"
                                                    variant="danger"
                                                    onClick={() => handleDeleteStep(index)}
                                                >
                                                    <CiTrash />
                                                </IconButton>
                                            </Stack>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setFormData4({ ...formData4, steps: [...formData4.steps, { description: '', duration: '' }] })}
                                        >
                                            Ajouter une étape
                                        </Button>
                                    </>
                                )}
                                {step === 5 && (
                                    <>
                                        <Title level={2}>
                                            On y est presque !
                                        </Title>
                                        <Text>Choisissez une photo pour votre nouvelle recette</Text>
                                        <Upload
                                            variant="action"
                                            onFileDelete={handleImageDelete}
                                            name="image"
                                            accept="image/png, image/jpeg"
                                            onChange={handlePageImageChange}
                                        />
                                    </>
                                )}
                                <div className='button-container-reverse'>
                                    {step < 5 ? (
                                        <Button type="submit" variant="primary" width="full-width">
                                            Suivant
                                        </Button>
                                    ) : (
                                        <Button type="submit" variant="primary" width="full-width">
                                            Valider
                                        </Button>
                                    )}
                                    {step > 1 && (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            width="full-width"
                                            onClick={() => setStep(step - 1)}
                                        >
                                            Précédent
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Bento>
                    </Column>
                </Container>
            </Hero>
        </ProtectedRoutes>
    );
};

export default AjouterRecette;