
import RegisterForm from '@/hooks/login-gestion/RegisterForm';
import Hero from '@/components/ui/wrapper/Hero';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';

function Register() {
    return (
        <>
            <Head>
                <title>Créez votre compte Miamze</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <FormContainer>
                    <Bento width="450px" highlight="highlight" padding="40px"
                        responsive={{
                            mobilePadding: "20px"
                        }}>
                        <RegisterForm />
                    </Bento>
                </FormContainer>
            </Hero>
        </>
    );
}

export default Register;