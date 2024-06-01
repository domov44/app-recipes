import Hero from "@/components/ui/wrapper/Hero";
import ProtectedRoutes from "@/hooks/login-gestion/ProtectedRoute";
import { useUser } from '@/utils/UserContext';

export default function Profil() {
    const { isLoggedIn, user } = useUser();
    return (
        <ProtectedRoutes>
            <Hero>
                {isLoggedIn &&
                    <>
                        <p>{user?.pseudo}</p>
                        <p>{user?.email}</p>
                        <p>{user?.id}</p>
                    </>
                }
            </Hero>
        </ProtectedRoutes>
    )
}