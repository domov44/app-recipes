import Hero from "@/components/ui/wrapper/Hero";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { useUser } from '@/utils/UserContext';
import Head from "next/head";
import Button from "@/components/ui/button/Button";
import Chip from "@/components/ui/textual/Chip";
import { PiCake, PiEnvelope, PiPlus, PiPen } from 'react-icons/pi';
import Section from "@/components/ui/wrapper/Section";
import Bento from "@/components/ui/wrapper/Bento";
import Container from "@/components/ui/wrapper/Container";
import Title from "@/components/ui/textual/Title";
import BackgroundContainer from "@/components/ui/wrapper/BackgroundContainer";
import Stack from "@/components/ui/wrapper/Stack";
import Text from "@/components/ui/textual/Text";
import Column from "@/components/ui/wrapper/Column";
import AnimationComponent from "@/components/animation/Animation";
import Empty from '@/components/animation/storageAnimation/empty.json';
import IconButton from "@/components/ui/button/IconButton";

export default function Profil() {
    const { isLoggedIn, user } = useUser();
    return (
        <ProtectedRoutes>
            <Head>
                <title>Votre profil Miamze, {user?.pseudo}</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Button variant="primary" position="fixed" right="20px" bottom="20px" zindex="2" href="/ajouter-une-recette" icon={PiPlus}>Ajouter une recette</Button>
            <Section>
                <Title level={1}>
                    Votre Profil
                </Title>
                <BackgroundContainer coverUrl="https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg">
                    <Stack position="absolute" left="15px" bottom="15px">
                        <img className="user-picture" alt={user?.pseudo} src={user?.profile.avatar}></img>
                        <Stack direction="column" spacing="0px">
                            <Title level={2}>
                                {user?.profile.name} {user?.profile.surname}
                            </Title>
                            <Text>
                                {user?.pseudo}
                            </Text>
                        </Stack>
                    </Stack>
                </BackgroundContainer>
                <Container direction="row" responsive="yes">
                    <Column width="35%">
                        <Bento position="sticky" top="80px" highlight="highlight">
                            <Stack align="center">
                                <Title level={4}>
                                    Profil
                                </Title>
                                <IconButton variant="secondary-action" href="/profil/modifier-mon-profil"><PiPen/> Modifier</IconButton>
                            </Stack>
                            <Text>
                                {user?.profile.description}
                            </Text>
                            <Chip icon={PiEnvelope} variant="success">{user?.email}</Chip>
                            <Chip icon={PiCake} variant="success">{`${user?.age} ans`}</Chip>
                        </Bento>
                    </Column>
                    <Column width="65%" gap="30px">
                        <Stack direction="column" align="center">
                            <AnimationComponent animationData={Empty} width="150px" />
                            <Text>Vous n&apos;avez pas encore de recette</Text>
                            <IconButton variant="action" href="/ajouter-une-recette">
                                <PiPlus /> Ajouter une recette
                            </IconButton>
                        </Stack>
                    </Column>
                </Container>
            </Section>
        </ProtectedRoutes>
    )
}