import { navigateTo } from 'utils/routes';
import ROUTES from 'constants/routes';
import { Links, Link } from './styled-components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

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
                <Link
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => navigateTo(ROUTES.Dashboard, false, false, 'show')}
                    active={location.pathname === ROUTES.Dashboard}
                >
                    {t('header.links.dashboard')}
                </Link>
                <Link
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => navigateTo(ROUTES.Staking, false, false, 'show')}
                    active={location.pathname === ROUTES.Staking}
                >
                    {t('header.links.staking')}
                </Link>
                <Link
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => navigateTo(ROUTES.Governance, false, false, 'show')}
                    active={location.pathname === ROUTES.Governance}
                >
                    {t('header.links.governance')}
                </Link>
                <Link rel="noreferrer" target="_blank" href="https://docs.thalesmarket.io/">
                    {t('header.links.docs')}
                </Link>
                <Link
                    rel="noreferrer"
                    target="_blank"
                    onClick={() => navigateTo(ROUTES.Whitepaper, false, false, 'show')}
                    active={location.pathname === ROUTES.Whitepaper}
                >
                    {t('header.links.whitepaper')}
                </Link>
            </Links>
        </>
    );
};

export default DappHeader;
