import React, { useEffect } from 'react';
import Router from 'next/router';
import { getCurrentUser } from 'aws-amplify/auth';
import { useUser } from '@/utils/UserContext';

async function checkAuthState() {
    try {
        await getCurrentUser();
        return true;
    } catch (error) {
        return false;
    }
}

function ProtectedRoutes({ children }) {
    const { isLoggedIn } = useUser();

    useEffect(() => {
        async function fetchData() {
            const isAuthenticated = await checkAuthState();
            if (!isAuthenticated) {
                Router.push('/se-connecter');
            }
        }
        fetchData();
    }, []);

    if (isLoggedIn) {
        return children;
    } else {
        return null;
    }
}

export default ProtectedRoutes;
