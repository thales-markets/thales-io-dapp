import SPAAnchor from 'components/SPAAnchor';
import { Links, Item } from './styled-components';

export type NavItem = {
    href: string;
    title: string;
    active?: boolean;
};

type NavLinksProps = {
    items: NavItem[];
};

const NavLinks: React.FC<NavLinksProps> = ({ items }) => {
    return (
        <Links>
            {items.map((item, index) => (
                <SPAAnchor href={item.href}>
                    <Item key={index} active={item.active}>
                        {item.title}
                    </Item>
                </SPAAnchor>
            ))}
        </Links>
    );
};

export default NavLinks;
