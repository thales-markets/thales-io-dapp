import SPAAnchor from 'components/SPAAnchor';
import React, { useState } from 'react';
import { FlexDivCentered } from 'styles/common';
import { DropdownContainer, DropdownItem, Icon, Item } from './styled-components';

export type NavItemType = {
    href?: string;
    title: string;
    active?: boolean;
    deprecated?: string;
    children?: NavItemType[];
};

type NavItemProps = {
    item: NavItemType;
};

const NavItem: React.FC<NavItemProps> = ({ item }) => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const active = item.active || !!item?.children?.find((child) => child.active);
    return (
        <SPAAnchor href={item.href}>
            <FlexDivCentered>
                <Item
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                    active={active}
                    deprecated={!!item.deprecated}
                    title={item.deprecated}
                >
                    <span>{item.title}</span>
                    {item.children && <Icon active={active} className={`icon icon--caret-down`} />}
                    {item.children && dropdownVisible && (
                        <DropdownContainer>
                            {item.children.map((child, index) => {
                                return (
                                    <SPAAnchor key={index} href={child.href}>
                                        <DropdownItem active={child.active}>{child.title}</DropdownItem>
                                    </SPAAnchor>
                                );
                            })}
                        </DropdownContainer>
                    )}
                </Item>
            </FlexDivCentered>
        </SPAAnchor>
    );
};

export default NavItem;
