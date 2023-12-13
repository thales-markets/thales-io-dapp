import NavLinks, { NavItem } from 'components/NavLinks/NavLinks';
import UserWallet from 'components/UserWallet';
import ROUTES from 'constants/routes';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { buildHref, navigateTo } from 'utils/routes';
import { HeaderContainer, LinksContainer, Logo } from './styled-components';

const DappHeader: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                href: buildHref(ROUTES.Dashboard),
                title: t('header.links.dashboard'),
                active: location.pathname === ROUTES.Dashboard,
            },
            {
                href: buildHref(ROUTES.Token),
                title: t('header.links.token'),
                active: location.pathname === ROUTES.Token,
            },
            {
                href: buildHref(ROUTES.AMMLP),
                title: t('header.links.amm-lp'),
                active: location.pathname === ROUTES.AMMLP,
            },
            {
                href: buildHref(ROUTES.Governance.Home),
                title: t('header.links.governance'),
                active: location.pathname === ROUTES.Governance.Home,
            },
            {
                href: 'https://docs.thalesmarket.io/',
                title: t('header.links.docs'),
            },
            {
                href: buildHref(ROUTES.Whitepaper),
                title: t('header.links.whitepaper'),
                active: location.pathname === ROUTES.Whitepaper,
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
                <UserWallet></UserWallet>
            </HeaderContainer>
        </>
    );
};

export default DappHeader;
