import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { STAKING_TABS } from 'constants/token';
import { SpaceKey } from 'enums/governance';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import BreadcrumbItem from './BreadcrumbItem';

export const BREADCRUMBS_DROPDOWN_ITEMS = {
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
            i18label: 'staking.nav.vesting',
            route: ROUTES.Token.Staking.Vesting,
        },
        {
            i18label: 'staking.nav.acc-preferences',
            route: ROUTES.Token.Staking.Preferences,
        },
    ],
    DAO: [
        {
            i18label: 'governance.nav.oips',
            route: `${ROUTES.DAO.Home}/${SpaceKey.OIPS}`,
        },
        {
            i18label: 'governance.nav.elections',
            route: `${ROUTES.DAO.Home}/${SpaceKey.COUNCIL}`,
        },
        // {
        //     i18label: 'governance.nav.thales-stakers',
        //     route: `${ROUTES.DAO.Home}/${SpaceKey.THALES_STAKERS}`,
        // },
    ],
};

const BreadcrumbsMenu: React.FC = () => {
    const { t } = useTranslation();
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    const location = useLocation();

    const splittedPath = location.pathname !== '/' ? location.pathname.split('/').filter((item) => item) : [];
    const searchQuery = location?.search;

    return isMobile && splittedPath.length ? (
        <Wrapper>
            <SPAAnchor href="/">
                <Icon className="icon icon--house" />
            </SPAAnchor>
            {splittedPath.map((item, index) => {
                return <BreadcrumbItem key={index} index={index} item={item} splittedPath={splittedPath} />;
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

const formatBreadcrumbsItem = (item: string, t?: TFunction) => {
    const final = item.replace('-', ' ').replace('?tab=', '');
    if (final.includes(SpaceKey.OIPS) && t) return t('governance.nav.oips');
    if (final.includes(SpaceKey.COUNCIL) && t) return t('governance.nav.elections');
    if (item.includes(STAKING_TABS.ACC_PREFERENCES) && t) return t('staking.nav.acc-preferences');
    return final;
};

const Wrapper = styled(FlexDiv)`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    margin-top: 10px;
    z-index: 100;
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

export default BreadcrumbsMenu;
