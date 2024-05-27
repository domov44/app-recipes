import NavComponent from '../ui/button/NavComponent';
import { PiMosque } from 'react-icons/pi';


function MainMenu() {
    return (
        <ul className="menu">
            <NavComponent href="/" icon={PiMosque}>Accueil</NavComponent>
            <NavComponent href="/parametres" icon={PiMosque}>Paramètres</NavComponent>
        </ul>
    );
}

export default MainMenu;
