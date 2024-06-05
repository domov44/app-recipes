import React, { useState, useEffect } from 'react';
import Title from '@/components/ui/textual/Title';
import TextInput from '@/components/ui/form/TextInput';
import Textarea from '@/components/ui/form/Textarea';
import DateInput from '@/components/ui/form/DateInput';
import Button from '@/components/ui/button/Button';
import IconButton from '@/components/ui/button/IconButton';
import Bento from '@/components/ui/wrapper/Bento';
import Column from '@/components/ui/wrapper/Column';
import Container from '@/components/ui/wrapper/Container';
import Section from '@/components/ui/wrapper/Section';
import ProtectedRoutes from '@/hooks/login-gestion/ProtectedRoute';
import { useUser } from '@/utils/UserContext';
import { notifyError, notifySuccess } from "@/components/ui/Toastify";
import { updateProfile } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import Router from 'next/router';

const client = generateClient();

export default function ProfileDetail() {
    const [disable, setDisable] = useState(false);
    const { user, refreshUser } = useUser();
    const [formData, setFormData] = useState({
        name: user?.profile.name || "",
        surname: user?.profile.surname || "",
        description: user?.profile.description || "",
        birthdate: user?.profile.birthdate || ""
    });

    useEffect(() => {
        setFormData({
            name: user?.profile.name || "",
            surname: user?.profile.surname || "",
            description: user?.profile.description || "",
            birthdate: user?.profile.birthdate || ""
        });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        setDisable(true);
        try {
            await client.graphql({
                query: updateProfile,
                variables: {
                    input: {
                        id: user.profile.id,
                        name: formData.name,
                        surname: formData.surname,
                        description: formData.description,
                        birthdate: formData.birthdate,
                        owner: user.profile.id,
                    }
                }
            })
            refreshUser();
            setDisable(false);
            notifySuccess("Profil mis à jour");
            Router.push('/profil')
        } catch (error) {
            setDisable(false);
            notifyError("Erreur lors de la mise à jour");
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };

    return (
        <ProtectedRoutes>
            <Section>
                <Container direction="row" align="start" width="100%">
                    <Column width={"100%"} gap="20px">
                        <IconButton href={`/profil`} variant="secondary-action">Voir mon profil</IconButton>
                        <Bento highlight={"highlight"}>
                            <Title level={4}>
                                Mettez à jour vos informations
                            </Title>
                            <TextInput
                                type="text"
                                label={"Prénom"}
                                value={formData.name}
                                name={"name"}
                                onChange={handleInputChange}
                                required
                                variant={"blue"}
                            />
                            <TextInput
                                type="text"
                                label={"Nom"}
                                value={formData.surname}
                                name={"surname"}
                                onChange={handleInputChange}
                                required
                                variant={"blue"}
                            />
                            <Textarea
                                maxLength={250}
                                label={"Description"}
                                name={"description"}
                                value={formData.description}
                                onChange={handleInputChange}
                                variant={"blue"}
                            />
                            <DateInput
                                type="text"
                                label={"Date de naissance"}
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                variant="blue"
                            />
                            <Button disable={disable} onClick={handleSubmit} width="full-width" variant={"primary"}>
                                Mettre à jour
                            </Button>
                        </Bento>
                    </Column>
                </Container>
            </Section>
        </ProtectedRoutes>
    );
}
