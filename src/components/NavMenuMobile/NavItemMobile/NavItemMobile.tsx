import SPAAnchor from 'components/SPAAnchor';
import React, { useState } from 'react';
import { Container, Icon, Item, ItemContainer, LabelContainer } from './styled-components';

export type NavItemType = {
    href?: string;
    title: string;
    active?: boolean;
    children?: NavItemType[];
};

type NavItemMobileProps = {
    item: NavItemType;
    setNavMenuVisibility: (value: boolean) => void;
};

const NavItemMobile: React.FC<NavItemMobileProps> = ({ item, setNavMenuVisibility }) => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [childrenDropdownVisible, setChildrenDropdownVisible] = useState<boolean>(false);
    const active = item.active || !!item?.children?.find((child) => child.active);

    return (
        <Container>
            <ItemContainer>
                <LabelContainer>
                    <SPAAnchor href={item.href}>
                        <Item
                            onClick={() => {
                                if (item.children) {
                                    setDropdownVisible(!dropdownVisible);
                                } else {
                                    setNavMenuVisibility(false);
                                }
                            }}
                            active={active}
                        >
                            <span>{item.title}</span>
                        </Item>
                    </SPAAnchor>
                    {item.children &&
                        (dropdownVisible ? (
                            <Icon
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                                className={`icon icon--caret-up`}
                            />
                        ) : (
                            <Icon
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                                className={`icon icon--caret-down`}
                            />
                        ))}
                </LabelContainer>

                {item.children && dropdownVisible && (
                    <>
                        {item.children.map((child, index) => {
                            return (
                                <>
                                    <LabelContainer key={index}>
                                        <SPAAnchor href={child.href}>
                                            <Item
                                                onClick={() => {
                                                    if (child.children) {
                                                        setChildrenDropdownVisible(!childrenDropdownVisible);
                                                    } else {
                                                        setNavMenuVisibility(false);
                                                    }
                                                }}
                                                active={child.active}
                                            >
                                                <span>{child.title}</span>
                                            </Item>
                                        </SPAAnchor>
                                        {child.children &&
                                            (childrenDropdownVisible ? (
                                                <Icon
                                                    onClick={() => setChildrenDropdownVisible(!childrenDropdownVisible)}
                                                    className={`icon icon--caret-up`}
                                                />
                                            ) : (
                                                <Icon
                                                    onClick={() => setChildrenDropdownVisible(!childrenDropdownVisible)}
                                                    className={`icon icon--caret-down`}
                                                />
                                            ))}
                                    </LabelContainer>
                                    {child.children && childrenDropdownVisible && (
                                        <>
                                            {child.children.map((grandChild, index) => {
                                                return (
                                                    <LabelContainer key={index}>
                                                        <SPAAnchor href={grandChild.href}>
                                                            <Item
                                                                onClick={() => setNavMenuVisibility(false)}
                                                                active={grandChild.active}
                                                            >
                                                                <span>{grandChild.title}</span>
                                                            </Item>
                                                        </SPAAnchor>
                                                    </LabelContainer>
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            );
                        })}
                    </>
                )}
            </ItemContainer>
        </Container>
    );
};

export default NavItemMobile;
