import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES, { ROUTE_NAMES } from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { navigateTo } from 'utils/routes';

export const BREADCRUMBS_DROPDOWN_ITEMS = {
    AmmLP: [
        {
            i18label: 'amm-lp.nav.thales',
            route: ROUTES.AmmLP.Home,
        },
        {
            i18label: 'amm-lp.nav.overtime-single',
            route: ROUTES.AmmLP.SportsAMM,
        },
        {
            i18label: 'amm-lp.nav.overtime-parlay',
            route: ROUTES.AmmLP.ParlayAMM,
        },
    ],
    Token: [
        {
            i18label: 'header.links.staking',
            route: ROUTES.Token.Staking.Home,
        },
        {
            i18label: 'header.links.bridge',
            route: ROUTES.Token.Bridge,
        },
        {
            i18label: 'header.links.lp-staking',
            route: ROUTES.Token.LPStaking,
        },
    ],
    Staking: [
        {
            i18label: 'staking.nav.stake-thales',
            route: ROUTES.Token.Staking.Home,
        },
        {
            i18label: 'staking.nav.rewards',
            route: ROUTES.Token.Staking.Rewards,
        },
        {
            i18label: 'staking.nav.vesting',
            route: ROUTES.Token.Staking.Vesting,
        },
        {
            i18label: 'staking.nav.leaderboard',
            route: ROUTES.Token.Staking.Leaderboard,
        },
        {
            i18label: 'staking.nav.acc-preferences',
            route: ROUTES.Token.Staking.Preferences,
        },
    ],
    About: [
        {
            i18label: 'header.links.about-token',
            route: ROUTES.About.Token,
        },
        {
            i18label: 'header.links.about-governance',
            route: ROUTES.About.Governance,
        },
        {
            i18label: 'header.links.whitepaper',
            route: ROUTES.About.Whitepaper,
        },
        {
            i18label: 'header.links.docs',
            route: LINKS.Docs,
        },
    ],
    DAO: [
        {
            i18label: 'governance.nav.tips',
            route: `${ROUTES.DAO.Home}/${SpaceKey.TIPS}`,
        },
        {
            i18label: 'governance.nav.elections',
            route: `${ROUTES.DAO.Home}/${SpaceKey.COUNCIL}`,
        },
        {
            i18label: 'governance.nav.thales-stakers',
            route: `${ROUTES.DAO.Home}/${SpaceKey.THALES_STAKERS}`,
        },
    ],
};

const BreadcrumbsMenu: React.FC = () => {
    const { t } = useTranslation();
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    const location = useLocation();

    const [dropdownIndex, setDropdownIndex] = useState<number | undefined>(undefined);

    const splittedPath = location.pathname !== '/' ? location.pathname.split('/').filter((item) => item) : [];
    const searchQuery = location?.search;

    console.log('dropdownIndex ', dropdownIndex);

    return isMobile && splittedPath.length ? (
        <Wrapper>
            <SPAAnchor href="/">
                <Icon className="icon icon--house" />
            </SPAAnchor>
            {splittedPath.map((item, index) => {
                const dropdownItems = getDropdownItems(item);
                return (
                    <>
                        {showDropdownItem(item) && <Arrow className="thales-icon thales-icon--right" />}
                        {dropdownItems.length > 0 ? (
                            <ItemContainer>
                                <Item
                                    onClick={() => {
                                        if (dropdownIndex == index) {
                                            setDropdownIndex(undefined);
                                            return;
                                        } else {
                                            setDropdownIndex(index);
                                        }
                                    }}
                                >
                                    {formatBreadcrumbsItem(item)}
                                    <ArrowDown className="icon icon--caret-down" />
                                </Item>
                                <OutsideClickHandler onOutsideClick={() => setDropdownIndex(undefined)}>
                                    <DropdownContainer show={dropdownIndex == index}>
                                        {dropdownItems.map((dropdownItem, dpIndex) => {
                                            return (
                                                <DropdownItem
                                                    key={`${dpIndex}-dd`}
                                                    onClick={() => {
                                                        setDropdownIndex(undefined);
                                                        navigateTo(dropdownItem.route, undefined, true);
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
            })}
            {searchQuery ? (
                <>
                    <Arrow className="thales-icon thales-icon--right" />
                    <SPAAnchor href={``} key={'last'}>
                        <Item>{formatBreadcrumbsItem(searchQuery, t)}</Item>
                    </SPAAnchor>
                </>
            ) : (
                <></>
            )}
        </Wrapper>
    ) : (
        <></>
    );
};

const getDropdownItems = (itemName: string) => {
    if (itemName == ROUTE_NAMES.AmmLP) return BREADCRUMBS_DROPDOWN_ITEMS.AmmLP;
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
    return final;
};

const Wrapper = styled(FlexDiv)`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
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

const Icon = styled.i`
    font-size: 20px;
    color: ${(props) => props.theme.textColor.primary};
    padding-right: 5px;
`;

const Arrow = styled(Icon)`
    font-size: 13px;
`;

const ArrowDown = styled(Icon)`
    font-size: 13px;
`;

const ItemContainer = styled(FlexDiv)`
    position: relative;
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

export default BreadcrumbsMenu;
