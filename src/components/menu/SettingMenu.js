import NavComponent from '../ui/button/NavComponent';
import { useUser } from '@/utils/UserContext';
import { PiPictureInPicture, PiShield, PiImage, PiBell, PiUser } from 'react-icons/pi';

function SettingMenu() {
    const { isLoggedIn } = useUser();
    return (
        <ul className="menu">
            <NavComponent href="/parametres/apparences" icon={PiImage}>Apparences</NavComponent>
            {isLoggedIn &&
                <>
                    <NavComponent href="/parametres/comptes" icon={PiUser}>Comptes</NavComponent>
                    <NavComponent href="/parametres/authentification" icon={PiShield}>Authentification</NavComponent>
                    <NavComponent href="/parametres/mot-de-passe" icon={PiShield}>Mot de passe</NavComponent>
                </>
            }
        </ul>
    );
}

export default SettingMenu;