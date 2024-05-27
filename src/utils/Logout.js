// CustomSignOut.js
import React from 'react';
import { signOut } from 'aws-amplify/auth';
import { useUser } from './UserContext';
import NavComponent from '@/components/ui/button/NavComponent';
import { CiLogout } from 'react-icons/ci'
import { notifySuccess, notifyError } from '@/components/ui/Toastify';

function Logout() {
    const { logout } = useUser();

    const handleSignOut = async () => {
        try {
            await signOut();
            notifySuccess("Vous êtes bien déconnecté");

            logout();
        } catch (error) {
            notifyError("Erreur lors de la déconnexion");
        }
    };

    return (
      <NavComponent icon={CiLogout} variant="danger" onClick={handleSignOut}>Se déconnecter</NavComponent>
    );
}

export default Logout;