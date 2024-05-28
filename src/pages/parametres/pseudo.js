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

export default function Pseudo() {
    const { user, updateUser } = useUser();
    const [error, setError] = useState("");
    const [updatedPseudo, setUpdatedPseudo] = useState("");
    const [showPseudoForm, setShowPseudoForm] = useState(true);
    const [showConfirmForm, setShowConfirmForm] = useState(false);
    const [backButtonClicked, setBackButtonClicked] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const handleInputChange = () => {
        setError(null);
    };

    const handleUpdatePseudo = async (event) => {
        if (!updatedPseudo) {
            setError("Veuillez saisir votre nouvel pseudo");
            return;
        }
        try {
            const result = await updateUserAttributes({
                userAttributes: {
                    pseudo: updatedPseudo,
                },
            });
            console.log('User attributes updated:', result);
            if (!result.pseudo.isUpdated && result.pseudo.nextStep && result.pseudo.nextStep.updateAttributeStep === 'CONFIRM_ATTRIBUTE_WITH_CODE') {
                try {
                    setShowConfirmForm(true);
                    setShowPseudoForm(false);
                } catch (error) {
                    console.log('Erreur lors de la réinitialisation du mot de passe :', error);
                    setError("Erreur lors l'étape de changement d'pseudo.");
                    notifyError("Changement d'pseudo échoué");
                }
                return;
            }
        } catch (error) {
            console.log(error);
            notifyError("La modification a échouée");
        }
    };


    const handleConfirmPseudoChange = async () => {
        try {
            await confirmUserAttribute({ userAttributeKey: 'pseudo', confirmationCode });
            updateUser({
                ...user,
                pseudo: updatedPseudo,
            });
            notifySuccess("Votre Pseudo a été changé");
        } catch (error) {
            console.log('Erreur lors de la confirmation du changement d\'pseudo :', error);
            setError("Erreur lors de la confirmation du changement d'pseudo.");
            notifyError("Changement du mail échoué");
        }
    };

    const handleback = () => {
        setShowConfirmForm(false);
        setShowPseudoForm(true);
        setBackButtonClicked(true);
    };


    return (
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
                                    Changer l&apos;pseudo
                                </Title>
                            </Stack>
                            {user.pseudo && user.pseudo !== 0 && (
                                <Tips variant="success">
                                    Votre pseudo actuel est {user.pseudo}
                                </Tips>
                            )}
                                {showPseudoForm && (
                                    <Stack direction="column" animationType={backButtonClicked ? "moveFromLeft" : "fadeIn"}>
                                        <Title level={5}>
                                            Rentrez votre nouveau pseudo
                                        </Title>
                                        <TextInput
                                            variant="blue"
                                            type="pseudo"
                                            label="Nouvel pseudo"
                                            value={updatedPseudo}
                                            onChange={(e) => { setUpdatedPseudo(e.target.value); handleInputChange(); }}
                                        />
                                        {error && <FormError variant="error">{error}</FormError>}
                                        <Button variant="primary" onClick={handleUpdatePseudo}>Étape suivante</Button>
                                    </Stack>
                                )}
                                {!showPseudoForm && showConfirmForm && (
                                    <Stack direction="column" animationType={"moveFromRight"}>
                                        {updatedPseudo && (
                                            <>
                                                <Title level={5}>
                                                    Rentrez le code de validation envoyé à {updatedPseudo}
                                                </Title>

                                                <Tips variant="success">
                                                    Nous devons vérifier que vous avez bien accès à {updatedPseudo}, c&apos;est pourquoi nous vous avons envoyé un petit code de confirmation.
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
                                            <Button variant="primary" onClick={handleConfirmPseudoChange}>Valider le code</Button>
                                        </Stack>
                                    </Stack>
                                )}
                        </Bento>
                    </Column>
                </Container>
            </Hero>
    );
}