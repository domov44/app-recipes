import React, { useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '@/utils/UserContext';

function ProtectedRoutes({ children }) {
    const { isLoggedIn } = useUser();

    useEffect(() => {
        if (!isLoggedIn) {
            Router.push('/se-connecter');
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return children;
    }
    return null;
}

export default ProtectedRoutes;
