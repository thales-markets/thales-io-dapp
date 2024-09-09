import SPAAnchor from 'components/SPAAnchor';
import Tooltip from 'components/Tooltip';
import React, { useState } from 'react';
import { FlexDivCentered } from 'styles/common';
import { DropdownContainer, DropdownItem, Icon, Item, ItemTitle } from './styled-components';

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
                    active={active}
                    deprecated={!!item.deprecated}
                    title={item.deprecated}
                >
                    <ItemTitle>
                        <span>{item.title}</span>
                        {item?.deprecated && (
                            <Tooltip
                                overlay={<span>{item?.deprecated}</span>}
                                iconFontSize={14}
                                marginLeft={3}
                                top={2}
                            />
                        )}
                    </ItemTitle>
                    {item.children && <Icon active={active} className={`icon icon--caret-down`} />}
                    {item.children && dropdownVisible && (
                        <DropdownContainer
                            onMouseEnter={() => setDropdownVisible(true)}
                            onMouseLeave={() => setDropdownVisible(false)}
                        >
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
