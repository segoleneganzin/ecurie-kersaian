import PropTypes from 'prop-types';
import {
  menuListClassName,
  menuListItemClassName,
} from '../../utils/GeneralClassNames';
/**
 * Composant for pension items menu
 *
 * @component
 * @returns {JSX.Element}
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

ListItemsPension.propTypes = {
  toggleResponsiveMenu: PropTypes.func,
};
export default ListItemsPension;
