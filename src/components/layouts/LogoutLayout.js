import React from 'react';
import Main from '../ui/main/Main';
import Router from 'next/router';
import { useUser } from '@/utils/UserContext';

const LogoutLayout = ({ children }) => {
    const { isLoggedIn } = useUser();

    return (
        <>
            {!isLoggedIn ? (
                <Main variant="wnotsidebar">
                    {children}
                </Main>
            ) : (
                Router.push= "/"
            )}
        </>
    );
}

export default LogoutLayout;
