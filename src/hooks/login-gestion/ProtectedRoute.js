import React from 'react';
import Navigation from 'next/navigation';
import { useUser } from '@/utils/UserContext';

function ProtectedRoutes({ children }) {
    const { isLoggedIn } = useUser();

    return isLoggedIn ? children : Navigation.push('/se-connecter')
}

export default ProtectedRoutes;