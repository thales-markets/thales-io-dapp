import { NavItemType } from 'components/NavLinks/NavItem';
import NavLinks from 'components/NavLinks/NavLinks';
import UserWallet from 'components/UserWallet';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { buildHref, navigateTo } from 'utils/routes';
import { HeaderContainer, LinksContainer, Logo } from './styled-components';

const DappHeader: React.FC = () => {
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
                active: location.pathname === ROUTES.Staking,
                children: [
                    {
                        href: buildHref(ROUTES.Staking),
                        title: t('header.links.staking'),
                        active: location.pathname === ROUTES.Staking,
                    },
                    {
                        href: buildHref(ROUTES.Bridge),
                        title: t('header.links.bridge'),
                        active: location.pathname === ROUTES.Bridge,
                    },
                    {
                        href: buildHref(ROUTES.LPStaking),
                        title: t('header.links.lp-staking'),
                        active: location.pathname === ROUTES.LPStaking,
                    },
                ],
            },
            {
                href: buildHref(ROUTES.AMMLP),
                title: t('header.links.amm-lp'),
                active: location.pathname === ROUTES.AMMLP,
            },
            {
                href: buildHref(ROUTES.DAO.Home),
                title: t('header.links.dao'),
                active: location.pathname.includes(ROUTES.DAO.Home),
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
                        href: 'https://docs.thalesmarket.io/',
                        title: t('header.links.docs'),
                    },
                ],
            },
        ];
    }, [location.pathname, t]);

    return (
        <>
            <HeaderContainer>
                <Logo
                    onClick={() => navigateTo(ROUTES.Home, false, false, 'show')}
                    className="icon icon--thales-logo"
                />
                <LinksContainer>
                    <NavLinks items={navItems} />
                </LinksContainer>
                <UserWallet />
            </HeaderContainer>
        </>
    );
};

export default DappHeader;
