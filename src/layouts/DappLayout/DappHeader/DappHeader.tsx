import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { buildHref } from 'utils/routes';
import { Item, Links } from './styled-components';

const DappHeader: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    return (
        <>
            {/* <Logo
                onClick={() => navigateTo(ROUTES.Home, false, false, 'show')}
                className="icon-home icon-home--thales"
            /> */}
            <Links>
                <SPAAnchor href={buildHref(ROUTES.Dashboard)}>
                    <Item active={location.pathname === ROUTES.Dashboard}>{t('header.links.dashboard')}</Item>
                </SPAAnchor>
                <SPAAnchor href={buildHref(ROUTES.Staking)}>
                    <Item active={location.pathname === ROUTES.Staking}> {t('header.links.staking')}</Item>
                </SPAAnchor>
                <SPAAnchor href={buildHref(ROUTES.Governance)}>
                    <Item active={location.pathname === ROUTES.Governance}> {t('header.links.governance')}</Item>
                </SPAAnchor>
                <SPAAnchor href="https://docs.thalesmarket.io/">
                    <Item> {t('header.links.docs')}</Item>
                </SPAAnchor>
                <SPAAnchor href={buildHref(ROUTES.Whitepaper)}>
                    <Item active={location.pathname === ROUTES.Whitepaper}> {t('header.links.whitepaper')}</Item>
                </SPAAnchor>
            </Links>
        </>
    );
};

export default DappHeader;
