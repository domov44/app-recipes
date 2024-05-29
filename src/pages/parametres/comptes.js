import React, { useContext, useState } from 'react';
import Router from 'next/router';
import Hero from '@/components/ui/wrapper/Hero';
import Container from '@/components/ui/wrapper/Container';
import Title from '@/components/ui/textual/Title';
import Bento from '@/components/ui/wrapper/Bento';
import Column from '@/components/ui/wrapper/Column';
import Stack from '@/components/ui/wrapper/Stack';
import SettingMenu from '@/components/menu/SettingMenu';
import Text from '@/components/ui/textual/Text';
import IconButton from '@/components/ui/button/IconButton';
import { deleteUser, signOut } from 'aws-amplify/auth';
import { confirm } from '@/utils/ConfirmGlobal';
import {
    notifySuccess,
    notifyError,
} from '@/components/ui/Toastify';
import FormError from '@/components/ui/form/formError';
import { useUser } from '@/utils/UserContext';
import ProtectedRoutes from '@/hooks/login-gestion/ProtectedRoute';
import Head from 'next/head';


export default function Comptes() {
    const [error, setError] = useState("");
    const { logout } = useUser();

    const handleDeleteCurrentAccount = async () => {
        if (await confirm({
            title: "Voulez-vous vraiment supprimer votre compte ?",
            content: "Votre compte sera définitivement supprimé et vous ne pourrez pas le récupérer.",
            variant: "danger"
        })) {
            try {
                await deleteUser();
                await signOut();
                logout();
                Router.push("/se-connecter")
                notifySuccess("Compte supprimé avec succès");
            } catch (error) {
                console.log('Erreur lors de la suppréssion du compte.', error);
                setError("Erreur lors de la suppréssion du compte.");
                notifyError("La suppréssion a échouée");
            }
        }
    };

    return (
        <ProtectedRoutes>
            <Head>
                <title>Modifiez votre compte</title>
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
                            <Stack separator>
                                <Title level={3} variant="danger">
                                    Supprimer votre compte
                                </Title>
                            </Stack>
                            <Stack spacing="20px" direction="column">
                                <Text>
                                    Vous pouvez supprimer votre compte, mais cette action est définitive.
                                </Text>
                                <IconButton variant="danger" onClick={handleDeleteCurrentAccount}>Supprimer mon compte</IconButton>
                                {error && <FormError variant="error">{error}</FormError>}
                            </Stack>
                        </Bento>
                    </Column>
                </Container>
            </Hero>
        </ProtectedRoutes>
    );
}