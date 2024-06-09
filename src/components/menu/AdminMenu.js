import NavComponent from '../ui/button/NavComponent';
import { PiMosque, PiGearSix, PiCarrot, PiFolders, PiBasket, PiStorefront } from 'react-icons/pi';
import Chip from '../ui/textual/Chip';

function AdminMenu() {
    return (
        <ul className="menu">
            <Chip variant="success">Admin</Chip>
            <NavComponent href="/administrateur/recettes" icon={PiStorefront}>Recettes</NavComponent>
            <NavComponent href="/administrateur/ingredients" icon={PiCarrot}>Ingrédients</NavComponent>
            <NavComponent href="/administrateur/categories" icon={PiFolders}>Catégories</NavComponent>
            <NavComponent href="/administrateur/types-ingredients" icon={PiBasket}>Type d&apos;ingrédients</NavComponent>
        </ul>
    );
}

export default AdminMenu;
