import { NavItemType } from 'components/NavLinks/NavItem';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
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
                href: buildHref(ROUTES.OverToken),
                title: t('header.links.over-token'),
                active: location.pathname === ROUTES.OverToken,
                // children: [
                //     {
                //         href: buildHref(ROUTES.OverToken),
                //         title: t('header.links.over-token'),
                //         active: location.pathname === ROUTES.OverToken,
                //     },
                //     {
                //         title: t('header.links.staking'),
                //         active: location.pathname === ROUTES.Token.Staking.Home,
                //         children: [
                //             {
                //                 href: `${buildHref(ROUTES.Token.Staking.Home)}`,
                //                 title: t('staking.nav.stake-thales'),
                //                 active: location.search.includes(STAKING_TABS.STAKING),
                //             },
                //             {
                //                 href: `${buildHref(ROUTES.Token.Staking.Vesting)}`,
                //                 title: t('staking.nav.vesting'),
                //                 active: location.search.includes(STAKING_TABS.VESTING),
                //             },
                //             {
                //                 href: `${buildHref(ROUTES.Token.Staking.Preferences)}`,
                //                 title: t('staking.nav.acc-preferences'),
                //                 active: location.search.includes(STAKING_TABS.ACC_PREFERENCES),
                //             },
                //         ],
                //     },
                //     {
                //         href: buildHref(ROUTES.Token.Bridge),
                //         title: t('header.links.bridge'),
                //         active: location.pathname === ROUTES.Token.Bridge,
                //     },
                //     {
                //         href: buildHref(ROUTES.Token.LPStaking),
                //         title: t('header.links.lp-staking'),
                //         active: location.pathname === ROUTES.Token.LPStaking,
                //     },
                // ],
            },
            {
                href: buildHref(ROUTES.Dashboard),
                title: t('header.links.dashboard'),
                active: location.pathname === ROUTES.Dashboard,
            },

            {
                title: t('header.links.products'),
                children: [
                    {
                        href: LINKS.Overtime,
                        title: t('header.links.overtime'),
                    },
                    {
                        href: LINKS.SpeedMarkets,
                        title: t('header.links.speed-markets'),
                    },
                    {
                        href: LINKS.ThalesMarkets,
                        title: t('header.links.thales-markets'),
                    },
                ],
            },
            {
                title: t('header.links.resources'),
                children: [
                    {
                        href: LINKS.Docs,
                        title: t('header.links.docs'),
                    },
                    {
                        href: LINKS.Medium,
                        title: t('header.links.blog'),
                    },
                    {
                        href: LINKS.Discord,
                        title: t('header.links.community'),
                    },
                ],
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
                    // {
                    //     href: buildHref(`${ROUTES.DAO.Home}/${SpaceKey.THALES_STAKERS}`),
                    //     title: t(`governance.tabs.${SpaceKey.THALES_STAKERS}`),
                    //     active: location.pathname.includes(SpaceKey.THALES_STAKERS),
                    // },
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
