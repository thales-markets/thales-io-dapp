import { NavItemType } from 'components/NavLinks/NavItem';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { STAKING_TABS } from 'constants/token';
import { SpaceKey } from 'enums/governance';
import { LiquidityPool } from 'enums/liquidityPool';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { buildHref } from 'utils/routes';
import NavItemMobile from './NavItemMobile';
import { CloseIcon, IconContainer, NavMenuContainer } from './styled-components';

type NavMenuMobileProps = {
    setNavMenuVisibility: (value: boolean) => void;
};

const NavMenuMobile: React.FC<NavMenuMobileProps> = ({ setNavMenuVisibility }) => {
    const { t } = useTranslation();
    const location = useLocation();

    const navItems: NavItemType[] = useMemo(() => {
        return [
            {
                href: buildHref(ROUTES.Dashboard),
                title: t('header.links.dashboard'),
                active: location.pathname === ROUTES.Dashboard,
            },
            {
                title: t('header.links.token'),
                children: [
                    {
                        title: t('header.links.staking'),
                        active: location.pathname === ROUTES.Token.Staking.Home,
                        children: [
                            {
                                href: `${buildHref(ROUTES.Token.Staking.Home)}`,
                                title: t('staking.nav.stake-thales'),
                                active: location.search.includes(STAKING_TABS.STAKING),
                            },
                            {
                                href: `${buildHref(ROUTES.Token.Staking.Vesting)}`,
                                title: t('staking.nav.vesting'),
                                active: location.search.includes(STAKING_TABS.VESTING),
                            },
                            {
                                href: `${buildHref(ROUTES.Token.Staking.Preferences)}`,
                                title: t('staking.nav.acc-preferences'),
                                active: location.search.includes(STAKING_TABS.ACC_PREFERENCES),
                            },
                        ],
                    },
                    {
                        href: buildHref(ROUTES.Token.Bridge),
                        title: t('header.links.bridge'),
                        active: location.pathname === ROUTES.Token.Bridge,
                    },
                    {
                        href: buildHref(ROUTES.Token.LPStaking),
                        title: t('header.links.lp-staking'),
                        active: location.pathname === ROUTES.Token.LPStaking,
                    },
                ],
            },
            {
                title: t('header.links.amm-lp'),
                children: [
                    {
                        href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.THALES}`,
                        title: t('amm-lp.nav.thales'),
                        active: location.search.includes(LiquidityPool.THALES),
                    },
                    {
                        href: `${buildHref(ROUTES.AmmLP.SportsAMM)}`,
                        title: t('amm-lp.nav.overtime-single'),
                        active: location.search.includes(LiquidityPool.OVERTIME_SINGLE),
                    },
                    {
                        href: `${buildHref(ROUTES.AmmLP.ParlayAMM)}`,
                        title: t('amm-lp.nav.overtime-parlay'),
                        active: location.search.includes(LiquidityPool.OVERTIME_PARLAY),
                    },
                    {
                        href: `${buildHref(ROUTES.AmmLP.OvertimeUSDC)}`,
                        title: t('amm-lp.nav.overtime-usdc'),
                        active: location.search.includes(LiquidityPool.OVERTIME_USDC),
                    },
                    {
                        href: `${buildHref(ROUTES.AmmLP.OvertimeWETH)}`,
                        title: t('amm-lp.nav.overtime-weth'),
                        active: location.search.includes(LiquidityPool.OVERTIME_WETH),
                    },
                    {
                        href: `${buildHref(ROUTES.AmmLP.OvertimeTHALES)}`,
                        title: t('amm-lp.nav.overtime-thales'),
                        active: location.search.includes(LiquidityPool.OVERTIME_THALES),
                    },
                ],
                active: location.pathname === ROUTES.AmmLP.Home,
            },
            {
                title: t('header.links.dao'),
                children: [
                    {
                        href: buildHref(`${ROUTES.DAO.Home}/${SpaceKey.TIPS}`),
                        title: t(`governance.tabs.${SpaceKey.TIPS}`),
                        active: location.pathname.includes(SpaceKey.TIPS),
                    },
                    {
                        href: buildHref(`${ROUTES.DAO.Home}/${SpaceKey.COUNCIL}`),
                        title: t(`governance.tabs.${SpaceKey.COUNCIL}`),
                        active: location.pathname.includes(SpaceKey.COUNCIL),
                    },
                    {
                        href: buildHref(`${ROUTES.DAO.Home}/${SpaceKey.THALES_STAKERS}`),
                        title: t(`governance.tabs.${SpaceKey.THALES_STAKERS}`),
                        active: location.pathname.includes(SpaceKey.THALES_STAKERS),
                    },
                ],
            },
            {
                href: LINKS.Medium,
                title: t('header.links.blog'),
            },
            {
                title: t('header.links.about'),
                active: location.pathname.includes(ROUTES.About.Root),
                children: [
                    {
                        href: buildHref(ROUTES.About.Token),
                        title: t('header.links.about-token'),
                        active: location.pathname === ROUTES.About.Token,
                    },
                    {
                        href: buildHref(ROUTES.About.Governance),
                        title: t('header.links.about-governance'),
                        active: location.pathname === ROUTES.About.Governance,
                    },
                    {
                        href: buildHref(ROUTES.About.Whitepaper),
                        title: t('header.links.whitepaper'),
                        active: location.pathname === ROUTES.About.Whitepaper,
                    },
                    {
                        href: LINKS.Docs,
                        title: t('header.links.docs'),
                    },
                ],
            },
        ];
    }, [location.pathname, t, location.search]);

    return (
        <NavMenuContainer>
            <IconContainer>
                <CloseIcon onClick={() => setNavMenuVisibility(false)} className={`icon icon--cross`} />
            </IconContainer>
            {navItems.map((navItem: NavItemType, index: number) => {
                return <NavItemMobile key={index} item={navItem} setNavMenuVisibility={setNavMenuVisibility} />;
            })}
        </NavMenuContainer>
    );
};

export default NavMenuMobile;
