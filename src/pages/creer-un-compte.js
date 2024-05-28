
import RegisterForm from '@/hooks/login-gestion/RegisterForm';
import Hero from '@/components/ui/wrapper/Hero';
import FormContainer from '@/components/ui/wrapper/FormContainer';
import Bento from '@/components/ui/wrapper/Bento';

function Register() {
    return (
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
    );
}

export default Register;