import React, { useState } from 'react';
import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import Title from '@/components/ui/textual/Title';
import TextInput from '@/components/ui/form/TextInput';
import PasswordInput from '@/components/ui/form/Password';
import FormError from '@/components/ui/form/formError';
import Form from '@/components/ui/form/Form';
import Button from '@/components/ui/button/Button.js';
import Logo from '@/components/ui/Logo';
import { useUser } from '@/utils/UserContext';
import { notifySuccess, notifyError } from '@/components/ui/Toastify';
import IconButton from '@/components/ui/button/IconButton';
import { FaArrowLeftLong } from "react-icons/fa6";
import Stack from '@/components/ui/wrapper/Stack';
import Text from '@/components/ui/textual/Text';
import Tips from '@/components/ui/textual/Tips';
import Router from 'next/router';
import TextLink from '@/components/ui/textual/TextLink';
import { handleCognitoError } from '@/utils/cognitoErrorHandler';

function RegisterForm() {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSignupForm, setShowSignupForm] = useState(true);
    const [showConfirmSignupForm, setShowConfirmSignupForm] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [backButtonClicked, setBackButtonClicked] = useState(false);

    const handleSignup = async () => {
        setDisable(true);
        if (password !== confirmPassword) {
            setError("Les 2 mots de passe ne correspondent pas");
            notifyError("Erreur lors de l'inscription");
            setDisable(false);
            return;
        }

        if (!email || !username || !password || !confirmPassword) {
            setError("Veuillez remplir tous les champs");
            notifyError("Erreur lors de l'inscription");
            setDisable(false);
            return;
        }

        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email
                    },
                    autoSignIn: { enabled: true }
                }
            });

            console.log(nextStep);
            setDisable(false);

            if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                setShowConfirmSignupForm(true);
                setShowSignupForm(false);
            } else if (nextStep.signUpStep === 'DONE') {
                notifySuccess("Inscription réussie, bienvenue");
                login();
                refreshUser();
                setDisable(false);
            }
        } catch (error) {
            console.log('Erreur lors de l\'inscription :', error);
            setError(handleCognitoError(error));
            notifyError("Inscription échouée");
            setDisable(false);
        }
    };

    const handleInputChange = () => {
        setError(null);
    };

    const handleBack = () => {
        setShowConfirmSignupForm(false);
        setShowSignupForm(true);
        handleInputChange();
        setBackButtonClicked(true);
    };

    const handleConfirmSignup = async () => {
        setDisable(true);
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({ username, confirmationCode });
            if (nextStep.signUpStep === 'DONE' || isSignUpComplete) {
                notifySuccess("Inscription confirmée, bienvenue");
                await handleAutoSignIn()
                setDisable(false);
                Router.push('/')
            }
        } catch (error) {
            console.log('Erreur lors de la confirmation de l\'inscription :', error);
            setError(handleCognitoError(error));
            notifyError("Confirmation de l'inscription échouée");
            setDisable(false);
        }
    };

    async function handleAutoSignIn() {
        try {
            await autoSignIn();
            login();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form autoComplete="on">
            <Logo />
            {showSignupForm && !showConfirmSignupForm && (
                <Stack animationType={backButtonClicked ? "animateMoveFromLeft" : "animateFadeIn"} direction="column">
                    <TextInput
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); handleInputChange(); }}
                        required
                        autoComplete="email"
                        variant="blue"
                    />
                    <TextInput
                        type="text"
                        label="Pseudo"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); handleInputChange(); }}
                        required
                        autoComplete="username"
                        variant="blue"
                    />
                    <PasswordInput
                        label="Mot de passe"
                        type="password"
                        variant="blue"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
                        required
                    />
                    <PasswordInput
                        label="Confirmer le mot de passe"
                        type="password"
                        variant="blue"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); handleInputChange(); }}
                        required
                    />
                    {error && <FormError variant="error">{error}</FormError>}
                    <Button width="full-width" variant="primary" disable={disable} onClick={handleSignup}>Valider l&apos;inscription</Button>
                    <TextLink href="/se-connecter">Déja membre ?</TextLink>
                </Stack>
            )}
            {showConfirmSignupForm && (
                <Stack direction="column" animationType="animateMoveFromRight">
                    {email && (
                        <Tips variant="success">
                            1 : Rentrez le code reçu sur l&apos;email {email}.
                        </Tips>
                    )}
                    <TextInput
                        type="number"
                        label="Code de confirmation"
                        value={confirmationCode}
                        onChange={(e) => { setConfirmationCode(e.target.value); handleInputChange(); }}
                        required
                        variant="blue"
                    />
                    {error && <FormError variant="error">{error}</FormError>}
                    <Stack align="center" justify="flex-end">
                        <IconButton variant="secondary-action" onClick={handleBack}><FaArrowLeftLong />Retour</IconButton>
                        <Button variant="primary" disable={disable} onClick={handleConfirmSignup}>Je confirme</Button>
                    </Stack>
                </Stack>
            )}
        </Form>
    );
}

export default RegisterForm;

