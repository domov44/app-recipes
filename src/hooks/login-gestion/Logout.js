// CustomSignOut.js
import React from 'react';
import { signOut } from 'aws-amplify/auth';
import { useUser } from '../../hooks/getdata/UserContext';
import MenuItem from '../../components/ui/aside-section/HeaderItems';
import { CiLogout } from 'react-icons/ci'
import { notifySuccess, notifyError } from '../../components/ui/Toastify';

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
      <MenuItem icon={CiLogout} variant="danger" text="Se déconnecter" onClick={handleSignOut} />
    );
}

export default Logout;