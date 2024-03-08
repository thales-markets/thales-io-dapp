import SPAAnchor from 'components/SPAAnchor';
import React, { useEffect, useState } from 'react';
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
    const [grandchildrenDropdownVisible, setGrandchildrenDropdownVisible] = useState<boolean>(false);
    const active = item.active || !!item?.children?.find((child) => child.active);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(active ? true : false);

    useEffect(() => {
        item.children?.forEach((child) => {
            child.children?.forEach((grandchild) => {
                if (grandchild.active) setGrandchildrenDropdownVisible(true);
            });
        });
    }, [item]);

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
                                    <LabelContainer
                                        indentation={10}
                                        key={index}
                                        onClick={() => {
                                            if (child.children) {
                                                setGrandchildrenDropdownVisible(!grandchildrenDropdownVisible);
                                            } else {
                                                setNavMenuVisibility(false);
                                            }
                                        }}
                                    >
                                        <SPAAnchor href={child.href}>
                                            <Item active={child.active}>
                                                <span>{child.title}</span>
                                            </Item>
                                        </SPAAnchor>
                                        {child.children &&
                                            (grandchildrenDropdownVisible ? (
                                                <Icon className={`icon icon--caret-up`} />
                                            ) : (
                                                <Icon className={`icon icon--caret-down`} />
                                            ))}
                                    </LabelContainer>
                                    {child.children && grandchildrenDropdownVisible && (
                                        <>
                                            {child.children.map((grandChild, index) => {
                                                return (
                                                    <LabelContainer
                                                        indentation={20}
                                                        key={index}
                                                        onClick={() => setNavMenuVisibility(false)}
                                                    >
                                                        <SPAAnchor href={grandChild.href}>
                                                            <Item active={grandChild.active}>
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
