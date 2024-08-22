import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCurrentUser } from 'aws-amplify/auth';
import { useUser } from '@/utils/UserContext';
import Loading from '@/components/Loading';

async function checkAuthState() {
    try {
        await getCurrentUser();
        return true;
    } catch (error) {
        return false;
    }
}

function ProtectedRoutes({ children }) {
    const { isLoggedIn, profileCompleted } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const isAuthenticated = await checkAuthState();
            if (!isAuthenticated) {
                Router.push('/se-connecter');
                return;
            }

            if (isLoggedIn && profileCompleted === false) {
                Router.push('/completer-mon-profil');
                return;
            }

            setLoading(false);
        }

        fetchData();
    }, [isLoggedIn, profileCompleted]);

    if (loading || isLoggedIn === null) {
        return <Loading />;
    }

    if (isLoggedIn && profileCompleted === true) {
        return children;
    }

    return null;
}

export default ProtectedRoutes;

