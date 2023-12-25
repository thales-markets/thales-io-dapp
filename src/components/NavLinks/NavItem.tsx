import SPAAnchor from 'components/SPAAnchor';
import React, { useState } from 'react';
import { FlexDivCentered } from 'styles/common';
import { DropdownContainer, DropdownItem, Icon, Item } from './styled-components';

export type NavItemType = {
    href?: string;
    title: string;
    active?: boolean;
    children?: NavItemType[];
};

type NavItemProps = {
    item: NavItemType;
};

const NavItem: React.FC<NavItemProps> = ({ item }) => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    return (
        <SPAAnchor href={item.href}>
            <FlexDivCentered>
                <Item
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                    active={item.active}
                >
                    <span>{item.title}</span>
                    {item.children && <Icon active={item.active} className={`icon icon--caret-down`} />}
                    {item.children && dropdownVisible && (
                        <DropdownContainer>
                            {item.children.map((child) => {
                                return (
                                    <SPAAnchor href={child.href}>
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
