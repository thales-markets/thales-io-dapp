import ROUTES from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { buildHref, navigateTo } from 'utils/routes';
import { HeaderContainer, LinksContainer, Logo, WalletButton } from './styled-components';
import { useMemo } from 'react';
import NavLinks, { NavItem } from 'components/NavLinks/NavLinks';

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
                href: buildHref(ROUTES.Staking),
                title: t('header.links.staking'),
                active: location.pathname === ROUTES.Staking,
            },
            {
                href: buildHref(ROUTES.Governance),
                title: t('header.links.governance'),
                active: location.pathname === ROUTES.Governance,
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
                <WalletButton>
                    <i className="icon icon--wallet" />
                    {t('common.wallet.connect-your-wallet')}
                </WalletButton>
            </HeaderContainer>
        </>
    );
};

export default DappHeader;
