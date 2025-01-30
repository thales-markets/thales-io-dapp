import SPAAnchor from 'components/SPAAnchor';
import { ROUTE_NAMES } from 'constants/routes';
import { STAKING_TABS } from 'constants/token';
import { SpaceKey } from 'enums/governance';
import { TFunction, t } from 'i18next';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { navigateTo } from 'utils/routes';
import { BREADCRUMBS_DROPDOWN_ITEMS } from './BreadcrumbsMenu';

type BreadcrumbItemProps = {
    item: string;
    splittedPath: string[];
    index: number;
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ item, splittedPath, index }) => {
    const dropdownItems = getDropdownItems(item);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {showDropdownItem(item) && <Arrow className="thales-icon thales-icon--right" />}
            {dropdownItems.length > 0 ? (
                <ItemContainer id={formatBreadcrumbsItem(item) + 'Container'}>
                    <Item
                        id={formatBreadcrumbsItem(item)}
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        {formatBreadcrumbsItem(item)}
                        <ArrowDown className="icon icon--caret-down" />
                    </Item>
                    <OutsideClickHandler
                        onOutsideClick={(event) => {
                            const originId = ((event?.target as HTMLElement).parentNode as HTMLElement).id;
                            if (!originId.includes(formatBreadcrumbsItem(item))) {
                                setIsOpen(false);
                            }
                        }}
                    >
                        <DropdownContainer show={isOpen}>
                            {dropdownItems.map((dropdownItem, dpIndex) => {
                                return (
                                    <DropdownItem
                                        key={`${dpIndex}-dd`}
                                        onClick={() => {
                                            setIsOpen(false);
                                            if (!dropdownItem.route.includes('http')) {
                                                navigateTo(dropdownItem.route, undefined, true);
                                            } else {
                                                window.open(dropdownItem.route);
                                            }
                                        }}
                                    >
                                        {t(dropdownItem.i18label)}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownContainer>
                    </OutsideClickHandler>
                </ItemContainer>
            ) : showDropdownItem(item) ? (
                <SPAAnchor
                    {...(index !== splittedPath.length - 1
                        ? { href: `/${splittedPath.slice(0, index).join('/')}` }
                        : {})}
                >
                    <Item>{formatBreadcrumbsItem(item, t)}</Item>
                </SPAAnchor>
            ) : (
                <></>
            )}
        </>
    );
};

const getDropdownItems = (itemName: string) => {
    if (itemName == ROUTE_NAMES.Staking) return BREADCRUMBS_DROPDOWN_ITEMS.Staking;
    if (itemName == ROUTE_NAMES.Token) return BREADCRUMBS_DROPDOWN_ITEMS.Token;
    if (itemName == ROUTE_NAMES.DAO) return BREADCRUMBS_DROPDOWN_ITEMS.DAO;
    if (itemName == ROUTE_NAMES.About) return BREADCRUMBS_DROPDOWN_ITEMS.About;
    return [];
};

const showDropdownItem = (item: string): boolean => {
    if (item.toLowerCase().includes('0x')) return false;
    return true;
};

const formatBreadcrumbsItem = (item: string, t?: TFunction) => {
    const final = item.replace('-', ' ').replace('?tab=', '');
    if (final.includes(SpaceKey.TIPS) && t) return t('governance.nav.tips');
    if (final.includes(SpaceKey.COUNCIL) && t) return t('governance.nav.elections');
    if (item.includes(STAKING_TABS.ACC_PREFERENCES) && t) return t('staking.nav.acc-preferences');
    return final;
};

const Icon = styled.i`
    font-size: 20px;
    color: ${(props) => props.theme.textColor.primary};
    padding-right: 5px;
`;

const ArrowDown = styled(Icon)`
    font-size: 13px;
`;

const Arrow = styled(Icon)`
    font-size: 13px;
`;

const ItemContainer = styled(FlexDiv)`
    position: relative;
`;

const Item = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.textColor.primary};
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DropdownContainer = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    min-width: 100px;
    width: max-content;
    border-radius: 8px;
    position: absolute;
    top: 15px;
    z-index: 2;
    padding: 7px;
    background: ${(props) => props.theme.background.primary};
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
    transform: translateX(-25%);
`;

const DropdownItem = styled.div<{ active?: boolean }>`
    text-align: left;
    cursor: pointer;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    &:hover {
        background: ${(props) => props.theme.background.quaternary};
    }
`;

export default BreadcrumbItem;
