import TabItem, { NavItemType } from './TabItem';
import { Links } from './styled-components';

type NavLinksProps = {
    items: NavItemType[];
};

const TabLinks: React.FC<NavLinksProps> = ({ items }) => {
    return (
        <Links>
            {items.map((item, index) => (
                <TabItem key={index} item={item} />
            ))}
        </Links>
    );
};

export default TabLinks;
