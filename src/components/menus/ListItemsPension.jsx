import PropTypes from 'prop-types';
import {
  menuListClassName,
  menuListItemClassName,
} from '../../utils/GeneralClassNames';
/**
 * Composant ListItemsPension pour afficher le contenu du menu de navigation réactif.
 *
 * @component
 * @returns {JSX.Element} - L'élément JSX du composant ListItemsPension.
 */
const ListItemsPension = ({ toggleResponsiveMenu }) => {
  return (
    <ul className={menuListClassName} role='menu'>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#formulas' rel='ugc' onClick={toggleResponsiveMenu}>
          Formules
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#installations' rel='ugc' onClick={toggleResponsiveMenu}>
          Installations
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#prices' rel='ugc' onClick={toggleResponsiveMenu}>
          Tarifs
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#contact' rel='ugc' onClick={toggleResponsiveMenu}>
          Contact
        </a>
      </li>
    </ul>
  );
};
// Définition des types des propriétés du composant
ListItemsPension.propTypes = {
  toggleResponsiveMenu: PropTypes.func,
};
export default ListItemsPension;
