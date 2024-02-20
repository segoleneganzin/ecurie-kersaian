import PropTypes from 'prop-types';
import {
  menuListClassName,
  menuListItemClassName,
} from '../../utils/GeneralClassNames';
/**
 * Composant for equestrian center items menu
 * @component
 * @returns {JSX.Element}
 */
const ListItemsEquestrianCenter = ({ toggleResponsiveMenu }) => {
  return (
    <ul className={menuListClassName} role='menu'>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#activities' rel='ugc' onClick={toggleResponsiveMenu}>
          Activités
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#installations' rel='ugc' onClick={toggleResponsiveMenu}>
          Installations
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#cavalry' rel='ugc' onClick={toggleResponsiveMenu}>
          Cavalerie
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#prices' rel='ugc' onClick={toggleResponsiveMenu}>
          Tarifs
        </a>
      </li>
      <li role='menuitem' className={menuListItemClassName}>
        <a href='#planning' rel='ugc' onClick={toggleResponsiveMenu}>
          Planning
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

ListItemsEquestrianCenter.propTypes = {
  toggleResponsiveMenu: PropTypes.func,
};

export default ListItemsEquestrianCenter;
