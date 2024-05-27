import NavComponent from '../ui/button/NavComponent';
import { PiMosque } from 'react-icons/pi';

function SettingMenu() {
    return (
        <ul className="menu">
            <NavComponent href="/parametres/apparences" icon={PiMosque}>Apparences</NavComponent>
            <NavComponent href="/parametres/comptes" icon={PiMosque}>Comptes</NavComponent>
            <NavComponent href="/parametres/authentification" icon={PiMosque}>Authentification</NavComponent>
            <NavComponent href="/parametres/mot-de-passe" icon={PiMosque}>Mot de passe</NavComponent>
        </ul>
    );
}

export default SettingMenu;