import React, { useContext, useState } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Container from '@/components/ui/wrapper/Container';
import Title from '@/components/ui/textual/Title';
import Bento from '@/components/ui/wrapper/Bento';
import Column from '@/components/ui/wrapper/Column';
import Stack from '@/components/ui/wrapper/Stack';
import SettingMenu from '@/components/menu/SettingMenu';
import {
    notifySuccess,
    notifyError,
} from '@/components/ui/Toastify';
import FormError from '@/components/ui/form/formError';
import Tips from '@/components/ui/textual/Tips';
import Button from '@/components/ui/button/Button';
import { updateUserAttributes, confirmUserAttribute } from 'aws-amplify/auth';
import { useUser } from '@/utils/UserContext';
import TextInput from '@/components/ui/form/TextInput';
import IconButton from '@/components/ui/button/IconButton';
import ProtectedRoutes from '@/hooks/login-gestion/ProtectedRoute';
import Head from 'next/head';

export default function Authentification() {
    const { user, updateUser } = useUser();
    const [error, setError] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [showEmailForm, setShowEmailForm] = useState(true);
    const [showConfirmForm, setShowConfirmForm] = useState(false);
    const [backButtonClicked, setBackButtonClicked] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const handleInputChange = () => {
        setError(null);
    };

    const handleUpdateEmail = async (event) => {
        if (!updatedEmail) {
            setError("Veuillez saisir votre nouvel email");
            return;
        }
        try {
            const result = await updateUserAttributes({
                userAttributes: {
                    email: updatedEmail,
                },
            });
            console.log('User attributes updated:', result);
            if (!result.email.isUpdated && result.email.nextStep && result.email.nextStep.updateAttributeStep === 'CONFIRM_ATTRIBUTE_WITH_CODE') {
                try {
                    setShowConfirmForm(true);
                    setShowEmailForm(false);
                } catch (error) {
                    console.log('Erreur lors de la réinitialisation du mot de passe :', error);
                    setError("Erreur lors l'étape de changement d'email.");
                    notifyError("Changement d'email échoué");
                }
                return;
            }
        } catch (error) {
            console.log(error);
            notifyError("La modification a échouée");
        }
    };


    const handleConfirmEmailChange = async () => {
        try {
            await confirmUserAttribute({ userAttributeKey: 'email', confirmationCode });
            updateUser({
                ...user,
                email: updatedEmail,
            });
            notifySuccess("Votre Email a été changé");
        } catch (error) {
            console.log('Erreur lors de la confirmation du changement d\'email :', error);
            setError("Erreur lors de la confirmation du changement d'email.");
            notifyError("Changement du mail échoué");
        }
    };

    const handleback = () => {
        setShowConfirmForm(false);
        setShowEmailForm(true);
        setBackButtonClicked(true);
    };


    return (
        <ProtectedRoutes>
            <Head>
                <title>Modifiez votre email</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <Title level={1}>
                    Paramètres
                </Title>
                <Container direction="row" align="start" width="100%">
                    <Column width="25%" gap="20px">
                        <Bento highlight="highlight">
                            <SettingMenu />
                        </Bento>
                    </Column>
                    <Column width="75%">
                        <Bento>
                            <Stack separator direction="column">
                                <Title level={3}>
                                    Changer l&apos;email
                                </Title>
                            </Stack>
                            {user?.email && user?.email !== 0 && (
                                <Tips variant="success">
                                    Votre email actuel est {user.email}
                                </Tips>
                            )}
                            {showEmailForm && (
                                <Stack direction="column" animationType={backButtonClicked ? "moveFromLeft" : "fadeIn"}>
                                    <Title level={5}>
                                        Rentrez votre nouvel email
                                    </Title>
                                    <TextInput
                                        variant="blue"
                                        type="email"
                                        label="Nouvel email"
                                        value={updatedEmail}
                                        onChange={(e) => { setUpdatedEmail(e.target.value); handleInputChange(); }}
                                    />
                                    {error && <FormError variant="error">{error}</FormError>}
                                    <Button variant="primary" onClick={handleUpdateEmail}>Étape suivante</Button>
                                </Stack>
                            )}
                            {!showEmailForm && showConfirmForm && (
                                <Stack direction="column" animationType={"moveFromRight"}>
                                    {updatedEmail && (
                                        <>
                                            <Title level={5}>
                                                Rentrez le code de validation envoyé à {updatedEmail}
                                            </Title>

                                            <Tips variant="success">
                                                Nous devons vérifier que vous avez bien accès à {updatedEmail}, c&apos;est pourquoi nous vous avons envoyé un petit code de confirmation.
                                            </Tips>
                                        </>
                                    )}
                                    <TextInput
                                        variant="blue"
                                        type="number"
                                        label="Code de confirmation"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                    />
                                    {error && <FormError variant="error">{error}</FormError>}
                                    <Stack align="center" justify="flex-end">
                                        <IconButton variant="secondary-action" onClick={handleback}>Retour</IconButton>
                                        <Button variant="primary" onClick={handleConfirmEmailChange}>Valider le code</Button>
                                    </Stack>
                                </Stack>
                            )}
                        </Bento>
                    </Column>
                </Container>
            </Hero>
        </ProtectedRoutes>
    );
}