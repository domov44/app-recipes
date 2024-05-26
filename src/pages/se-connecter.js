
import LoginForm from '@/hooks/login-gestion/LoginForm';
import Hero from '@/components/ui/wrapper/Hero';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import Bento from '@/components/ui/wrapper/Bento';

function Login() {
    return (
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
    );
}

export default Login;
