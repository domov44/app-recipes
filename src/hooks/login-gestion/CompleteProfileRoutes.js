import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import Loading from '@/components/Loading';

function CompleteProfileRoutes({ children }) {
    const { isLoggedIn, profileCompleted } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/se-connecter');
        } else if (isLoggedIn && profileCompleted === true) {
            router.push('/');
        }
    }, [isLoggedIn, profileCompleted, router]);

    if (!isLoggedIn || profileCompleted === true) {
        return null;
    }

    if (isLoggedIn && profileCompleted === null) {
        return <Loading />;
    }

    if (isLoggedIn && profileCompleted === false) {
        return children;
    }

    return null;
}

export default CompleteProfileRoutes;
