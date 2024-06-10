// pages/[pseudo]/index.js

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BackgroundContainer from '@/components/ui/wrapper/BackgroundContainer';
import Stack from '@/components/ui/wrapper/Stack';
import Title from '@/components/ui/textual/Title';
import Bento from '@/components/ui/wrapper/Bento';
import Chip from '@/components/ui/textual/Chip';
import Text from '@/components/ui/textual/Text';
import Column from '@/components/ui/wrapper/Column';
import Section from '@/components/ui/wrapper/Section';
import Container from '@/components/ui/wrapper/Container';
import Button from '@/components/ui/button/Button';
import { PiEnvelope, PiMapPin, PiPlus, PiClock } from 'react-icons/pi';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import IconButton from '@/components/ui/button/IconButton';
import Head from 'next/head';
import { profileByPseudo } from '@/graphql/customQueries';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

function ProfilPage() {
    const router = useRouter();
    const { pseudo } = router.query;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await client.graphql({
                query: profileByPseudo,
                variables: { pseudo },
            });
            setUser(result.data.profileByPseudo.items[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    console.log('result user', user)

    useEffect(() => {
        if (pseudo) {
            fetchData();
        }
    }, [pseudo]);

    return (
        <>
            <Head>
                <title>{`Profil de ${user?.pseudo}`}</title>
                <meta name="description" content={`Profil de ${user?.pseudo}`} />
                <meta property="og:image" content={user?.avatar || 'URL_de_votre_image'} />
            </Head>
            <BackgroundContainer>
                <Button variant="primary" position="fixed" right="20px" bottom="20px" zindex="2" href="/ajouter-une-recette" icon={PiPlus}>Ajouter une recette</Button>
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <Container>
                        <Section>
                            <Stack>
                                <Title>{`${user?.name} ${user?.surname}`}</Title>
                                <img src={user?.avatar} alt={`${user?.pseudo}'s avatar`} />
                                <Text>{user?.description}</Text>
                                <Chip>{convertirFormatDate(user?.birthdate)}</Chip>
                                {/* Ajoutez d'autres informations utilisateur ici */}
                            </Stack>
                        </Section>
                    </Container>
                )}
            </BackgroundContainer>
            <Section>
                <Container direction="row" responsive="yes">
                    <Column width="35%">
                        <Bento position="sticky" top="80px" highlight="highlight">
                            <Title level={4}>
                                Profil
                            </Title>
                            {user?.description ? (
                                <Text>
                                    {user?.description}
                                </Text>
                            ) : (
                                <Text>
                                    {user?.pseudo} n&apos;a pas encore de description
                                </Text>
                            )}
                        </Bento>
                    </Column>
                    {/* {Array.isArray(data.recettes) && data.recettes.length > 0 ? (
                        <Column width="65%" gap="30px">
                            {data.recettes.map(recette => (
                                <Bento highlight="highlight" padding="15px" item key={recette.id}>
                                    <Stack>
                                        <img className="user-picture" alt={recette.user.pseudo} src={recette.user.picture}></img>
                                        <Stack direction="column" spacing="0px">
                                            <Title fontfamily="medium" level={4}>
                                                {recette.user.pseudo}
                                            </Title>
                                            <Text>
                                                {`Le ${convertirFormatDate(recette.creation)}`}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    <img className="recette-image" alt={recette.nom} src={recette.image}></img>
                                    <Stack>
                                        <IconButton variant="action" href={`/categories/${recette.category.slug}`}>{recette.category.label}</IconButton>
                                        <Chip icon={PiClock} variant="success">{`${recette.totalDuration} minutes`}</Chip>
                                    </Stack>
                                    <Title level={3}>{recette.nom}</Title>
                                    <Text>
                                        {recette.description}
                                    </Text>
                                    <Button variant="primary" href={`/${recette.user.pseudo}/${recette.slug}`}>Suivre la recette</Button>
                                </Bento>
                            ))}
                        </Column>
                    ) : (
                        <Text>
                            Aucune recette n&apos;a été trouvée pour cet utilisateur.
                        </Text>
                    )} */}
                </Container>
            </Section>
        </>
    );
}

export default ProfilPage;

