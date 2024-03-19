import NavItem, { NavItemType } from './NavItem';
import { Links } from './styled-components';

type NavLinksProps = {
    items: NavItemType[];
};

const NavLinks: React.FC<NavLinksProps> = ({ items }) => {
    return (
        <Links>
            {items.map((item, index) => (
                <NavItem key={index} item={item} />
            ))}
        </Links>
    );
};

export default NavLinks;
