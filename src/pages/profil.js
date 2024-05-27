import Hero from "@/components/ui/wrapper/Hero";
import { useUser } from '@/utils/UserContext';

export default function Profil() {
    const { isLoggedIn, user } = useUser();
    return (
        <Hero>
            {isLoggedIn &&
                <>
                    <p>{user?.pseudo}</p>
                    <p>{user?.email}</p>
                </>
            }
        </Hero>
    )
}