import BreadcrumbsMenu from 'components/BreadcrumbsMenu';
import NavLinks from 'components/NavLinks';
import { NavItemType } from 'components/NavLinks/NavItem';
import NavMenuMobile from 'components/NavMenuMobile';
import UserWallet from 'components/UserWallet';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIsMobile } from 'redux/modules/ui';
import { buildHref, navigateTo } from 'utils/routes';
import {
    HeaderContainer,
    IconLink,
    LeftWrapper,
    LinksContainer,
    Logo,
    LogoMobile,
    MenuIcon,
} from './styled-components';

const DappHeader: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const isMobile = useSelector(getIsMobile);
    const [navMenuVisibility, setNavMenuVisibility] = useState<boolean>(false);

    const navItems: NavItemType[] = useMemo(() => {
        return [
            {
                title: t('header.links.over-token'),
                children: [
                    {
                        href: buildHref(ROUTES.About.Token),
                        title: t('header.links.over-token'),
                        active: location.pathname === ROUTES.About.Token,
                    },
                    {
                        href: buildHref(ROUTES.Token.Staking.Home),
                        title: t('header.links.staking'),
                        active: location.pathname === ROUTES.Token.Staking.Home,
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
                href: buildHref(ROUTES.DAO.Home),
                title: t('header.links.dao'),
                active: location.pathname.includes(ROUTES.DAO.Home),
            },
        ];
    }, [location.pathname, t]);

    return (
        <>
            <HeaderContainer>
                <LeftWrapper>
                    <MenuIcon onClick={() => setNavMenuVisibility(true)} className="icon icon--menu" />
                    {!isMobile ? (
                        <Logo
                            onClick={() => navigateTo(ROUTES.Home, false, false, 'show')}
                            className="overtime-icon overtime-icon--overtime"
                        />
                    ) : (
                        <LogoMobile className="overtime-icon overtime-icon--overtime">
                            <IconLink onClick={() => navigateTo(ROUTES.Home, false, false, 'show')} />
                        </LogoMobile>
                    )}
                </LeftWrapper>
                <LinksContainer>
                    <NavLinks items={navItems} />
                </LinksContainer>
                <UserWallet />
            </HeaderContainer>
            <BreadcrumbsMenu />
            <ReactModal
                isOpen={navMenuVisibility && isMobile}
                onRequestClose={() => {
                    setNavMenuVisibility(false);
                }}
                shouldCloseOnOverlayClick={false}
                style={getCustomModalStyles()}
            >
                <NavMenuMobile setNavMenuVisibility={setNavMenuVisibility}></NavMenuMobile>
            </ReactModal>
        </>
    );
};

const getCustomModalStyles = () => ({
    content: {
        top: '0',
        overflow: 'auto',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '0px',
        background: 'transparent',
        border: 'none',
        width: '100%',
        height: '100vh',
    },
    overlay: {
        backgroundColor: '#eeeeee',
        zIndex: '10000',
    },
});

export default DappHeader;
