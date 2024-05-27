import React, { useContext, useState } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Container from '@/components/ui/wrapper/Container';
import Title from '@/components/ui/textual/Title';
import Bento from '@/components/ui/wrapper/Bento';
import Column from '@/components/ui/wrapper/Column';
import Stack from '@/components/ui/wrapper/Stack';
import SettingMenu from '@/components/menu/SettingMenu';
import PasswordInput from '@/components/ui/form/Password';
import Form from '@/components/ui/form/Form';
import { updatePassword } from 'aws-amplify/auth';
import {
    notifySuccess,
    notifyError,
} from '@/components/ui/Toastify';
import FormError from '@/components/ui/form/formError';
import Tips from '@/components/ui/textual/Tips';
import Button from '@/components/ui/button/Button';


export default function Comptes() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = () => {
        setError(null);
    };

    async function handleUpdatePassword() {
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError("Veuillez remplir tous les champs de mot de passe.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            await updatePassword({ oldPassword, newPassword });
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            notifySuccess("Mot de passe changé")
        } catch (err) {
            console.error("Erreur lors de la mise à jour du mot de passe :", err);
            notifyError("Le mot de passe n'a pas été changé", err)
            setError("Erreur lors de la mise à jour du mot de passe");
        }
    }

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
                        <Stack separator>
                            <Title level={3}>
                                Changer le mot de passe
                            </Title>
                        </Stack>
                        <Tips variant="success">
                            Pensez à choisir un mot de passe d'au moins 8 caractères.
                        </Tips>
                        <Form>
                            <PasswordInput
                                variant="blue"
                                label="Mot de passe actuel"
                                value={oldPassword}
                                onChange={(e) => { setOldPassword(e.target.value); handleInputChange(); }}
                            />
                            <PasswordInput
                                variant="blue"
                                label="Nouveau mot de passe"
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value); handleInputChange(); }}
                            />
                            <PasswordInput
                                variant="blue"
                                label="Confirmer le nouveau mot de passe"
                                value={confirmNewPassword}
                                onChange={(e) => { setConfirmNewPassword(e.target.value); handleInputChange(); }}
                            />
                            {error && <FormError variant="error">{error}</FormError>}
                            <Button variant="primary" onClick={handleUpdatePassword}>Mettre à jour le mot de passe</Button>
                        </Form>
                    </Bento>
                </Column>
            </Container>
        </Hero>
    );
}