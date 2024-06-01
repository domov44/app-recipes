import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';
import Title from '@/components/ui/textual/Title';
import Text from '@/components/ui/textual/Text';
import Button from '@/components/ui/button/Button';
import { PiPlus, PiTimer } from 'react-icons/pi';

function Login() {
    return (
        <>
            <Head>
                <title>L&apos;application de recette Miamze</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <Button
                    zindex="2"
                    variant="primary"
                    position="fixed"
                    right="20px"
                    bottom="20px"
                    href="/ajouter-une-recette"
                    icon={PiPlus}
                >
                    Ajouter une recette
                </Button>
                <Bento width="450px" highlight="highlight" padding="40px"
                    responsive={{
                        mobilePadding: "20px"
                    }}>
                    <Title level={1}>Bienvenue sur Miamze,</Title>
                    <Text>On cuisine quoi aujourd&apos;hui ?</Text>
                </Bento>
            </Hero>
        </>
    );
}

export default Login;