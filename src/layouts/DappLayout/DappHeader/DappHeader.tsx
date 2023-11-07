import { navigateTo } from 'utils/routes';
import { Wrapper } from '../styled-components';
import ROUTES from 'constants/routes';
import { Links, Link } from './styled-components';
import { useTranslation } from 'react-i18next';

const DappHeader: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Wrapper>
            {/* <Logo
                onClick={() => navigateTo(ROUTES.Home, false, false, 'show')}
                className="icon-home icon-home--thales"
            /> */}
            <Links>
                <Link
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => navigateTo(ROUTES.Dashboard, false, false, 'show')}
                >
                    {t('header.links.dashboard')}
                </Link>
                <Link target="_blank" rel="noreferrer" onClick={() => navigateTo(ROUTES.Staking, false, false, 'show')}>
                    {t('header.links.staking')}
                </Link>
                <Link
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => navigateTo(ROUTES.Governance, false, false, 'show')}
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
                >
                    {t('header.links.whitepaper')}
                </Link>
            </Links>
        </Wrapper>
    );
};

export default DappHeader;
