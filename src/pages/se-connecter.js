
import LoginForm from '@/hooks/login-gestion/LoginForm';
import Hero from '@/components/ui/wrapper/Hero';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';

function Login() {
    return (
        <>
            <Head>
                <title>Connectez-vous à votre compte Miamze</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <FormContainer>
                    <Bento width="450px" highlight="highlight" padding="40px"
                        responsive={{
                            mobilePadding: "20px"
                        }}>
                        <LoginForm />
                    </Bento>
                </FormContainer>
            </Hero>
        </>
    );
}

export default Login;
