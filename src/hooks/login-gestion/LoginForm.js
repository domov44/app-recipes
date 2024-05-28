import React, { useState } from 'react';
import { confirmSignIn, signIn, resetPassword, confirmResetPassword } from 'aws-amplify/auth';
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

function LoginForm() {
    const { login } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
    const [error, setError] = useState(null);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgetPasswordFormstep1, setShowForgetPasswordFormstep1] = useState(false);
    const [showForgetPasswordFormstep2, setShowForgetPasswordFormstep2] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [backButtonClicked, setBackButtonClicked] = useState(false);


    const handleSignIn = async () => {
        try {
            const { isSignedIn, nextStep } = await signIn({ username, password });
            console.log('Réponse de l\'API après connexion :', { isSignedIn, nextStep });

            if (!isSignedIn && nextStep && nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                try {
                    setShowResetPasswordForm(true);
                    setShowLoginForm(false);
                } catch (error) {
                    console.log('Erreur lors de la réinitialisation du mot de passe :', error);
                    setError("Erreur lors de la réinitialisation du mot de passe.");
                    notifyError("Réinitialisation du mot de passe échouée");
                }
                return;
            }

            if (isSignedIn) {
                notifySuccess("Connexion établie avec succès");
                login();
                Router.push('/')
            } else {
                console.log('La connexion a échoué.');
                setError("Nom d'utilisateur ou mot de passe incorrect.");
                notifyError("Connexion échouée");
            }
        } catch (error) {
            console.log('Erreur lors de la connexion :', error);
            if (error.code === 'NotAuthorizedException') {
                setError("Nom d'utilisateur ou mot de passe incorrect.");
                notifyError("Nom d'utilisateur ou mot de passe incorrect.");
            } else {
                setError(error.message);
                notifyError("Connexion échouée");
            }
        }
    };

    const handleInputChange = () => {
        setError(null);
    };

    const handleback = () => {
        setShowResetPasswordForm(false);
        setShowLoginForm(true);
        setShowForgetPasswordForm(false);
        handleInputChange();
        setShowForgetPasswordFormstep2(false);
        setBackButtonClicked(true); // Set the state to true when back button is clicked
    };

    const handleForget = () => {
        setShowLoginForm(false);
        setShowForgetPasswordForm(true);
        setShowForgetPasswordFormstep1(true)
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            setError("Les 2 mots de passe ne correspondent pas");
            notifyError("Changement du mot de passe échouée");
            return;
        }

        try {
            const challengeResponse = newPassword;
            await confirmSignIn({ challengeResponse });
            notifySuccess("Mot de passe changé avec succès");
            login();
            navigate('/');
        } catch (error) {
            console.log('Erreur lors du changement du mot de passe :', error);
            setError("Erreur lors du changement du mot de passe.");
            notifyError("Changement du mot de passe échouée");
        }
        return;
    };

    const handleForgetPassword = async () => {
        try {
            if (!username) {
                setError("Veuillez saisir votre adresse e-mail.");
                return;
            }

            await resetPassword({ username });
            notifySuccess("Email envoyé avec succès");
            setShowForgetPasswordFormstep1(false);
            setShowForgetPasswordFormstep2(true);
        } catch (error) {
            console.log('Erreur lors de l\'envoi de l\'email :', error);
            setError("Erreur lors de l'envoi de l'email");
            notifyError("L'envoi de l'email a échoué");
        }
    };

    const handleConfirmResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Les 2 mots de passe ne correspondent pas");
            notifyError("Changement du mot de passe échouée");
            return;
        }

        try {
            await confirmResetPassword({ username, confirmationCode, newPassword });
            notifySuccess("Mot de passe changé, bienvenue");
            navigate('/');
        } catch (error) {
            console.log('Erreur lors de la confirmation de la réinitialisation du mot de passe :', error);
            setError("Erreur lors de la confirmation de la réinitialisation du mot de passe.");
            notifyError("Changement du mot de passe échouée");
        }
    };

    return (
        <Form autoComplete="on">
            <Logo />
            {showLoginForm && !showResetPasswordForm && !showForgetPasswordForm && (
                <Stack animationType={backButtonClicked ? "animateMoveFromLeft" : "animateFadeIn"} direction="column">
                    <TextInput
                        type="text"
                        label="Email ou pseudo"
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
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
                        required
                    />
                    {error && <FormError variant="error">{error}</FormError>}
                    <Button width="full-width" variant="primary" onClick={handleSignIn}>Se connecter</Button>
                    <Stack justify="end">
                        <IconButton variant="secondary-action" onClick={handleForget}>Mot de passe oublié ?</IconButton>
                    </Stack>
                </Stack>
            )}
            {showForgetPasswordForm && (
                <>
                    {showForgetPasswordFormstep1 && (
                        <Stack direction="column" animationType="animateMoveFromRight">
                            <Title level={3}>Réinitialiser le mot de passe</Title>
                            <Tips variant="success">
                                Rentrez le pseudo associé à votre compte.
                            </Tips>
                            <TextInput
                                type="text"
                                label="Pseudo"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); handleInputChange(); }}
                                required
                                autoComplete="username"
                                variant="blue"
                            />
                            {error && <FormError variant="error">{error}</FormError>}
                            <Stack align="center" justify="flex-end">
                                <IconButton variant="secondary-action" onClick={handleback}>Retour</IconButton>
                                <IconButton variant="action" onClick={handleForgetPassword}>Suivant</IconButton>
                            </Stack>
                        </Stack>
                    )}
                    {showForgetPasswordFormstep2 && (
                        <Stack direction="column" animationType="animateMoveFromRight">
                            {username && (
                                <Tips variant="success">
                                    1 : Rentrez le code reçu sur l&apos;email associé au compte {username}.
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
                            <Tips variant="success">
                                2 : Changez votre mot de passe avec au moins 8 caractères.
                            </Tips>
                            <PasswordInput
                                label="Nouveau mot de passe"
                                type="password"
                                variant="blue"
                                value={newPassword}
                                autoComplete="new-password"
                                onChange={(e) => { setNewPassword(e.target.value); handleInputChange(); }}
                                required
                            />
                            <PasswordInput
                                label="Confirmer le nouveau mot de passe"
                                type="password"
                                variant="blue"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); handleInputChange(); }}
                                required
                            />
                            {error && <FormError variant="error">{error}</FormError>}
                            <Stack align="center" justify="flex-end">
                                <IconButton variant="secondary-action" onClick={handleback}><FaArrowLeftLong />Retour</IconButton>
                                <Button variant="primary" onClick={handleConfirmResetPassword}>Je confirme</Button>
                            </Stack>
                        </Stack>
                    )}
                </>
            )}
            {showResetPasswordForm && (
                <Stack direction="column" animationType={"moveFromRight"}>
                    <Title level={3}>Choisissez votre mot de passe</Title>
                    <Tips variant="success">
                        Définissez votre propre mot de passe d&apos;au moins 8 caractères.
                    </Tips>
                    <PasswordInput
                        label="Nouveau mot de passe"
                        type="password"
                        variant="blue"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); handleInputChange(); }}
                        required
                    />
                    <PasswordInput
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        variant="blue"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); handleInputChange(); }}
                        required
                    />
                    {error && <FormError variant="error">{error}</FormError>}
                    <Stack align="center" justify="flex-end">
                        <IconButton variant="secondary-action" onClick={handleback}><FaArrowLeftLong />Retour</IconButton>
                        <Button variant="primary" onClick={handlePasswordReset}>Je confirme</Button>
                    </Stack>
                </Stack>
            )}
        </Form>
    );
}

export default LoginForm;
