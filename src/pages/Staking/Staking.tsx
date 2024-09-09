import Loader from 'components/Loader';
import { NavItemType } from 'components/NavLinks/NavItem';
import TabLinks from 'components/TabLinks';
import ROUTES from 'constants/routes';
import { STAKING_TABS } from 'constants/token';
import queryString from 'query-string';
import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import { Line, NavContainer } from 'styles/common';
import { buildHref } from 'utils/routes';
import AccPreferences from './AccPreferences';
import StakingTab from './StakingTab';
import Vesting from './Vesting';
import CCIPAnimation from './components/CCIPAnimation';

const Staking: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const paramTab = queryString.parse(location.search).tab || STAKING_TABS.STAKING;

    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const navItems: NavItemType[] = useMemo(() => {
        return [
            {
                href: `${buildHref(ROUTES.Token.Staking.Home)}?tab=${STAKING_TABS.STAKING}`,
                title: t('staking.nav.staking'),
                active: paramTab === STAKING_TABS.STAKING,
            },
            {
                href: `${buildHref(ROUTES.Token.Staking.Home)}?tab=${STAKING_TABS.VESTING}`,
                title: t('staking.nav.vesting'),
                active: paramTab === STAKING_TABS.VESTING,
            },
            {
                href: `${buildHref(ROUTES.Token.Staking.Home)}?tab=${STAKING_TABS.ACC_PREFERENCES}`,
                title: t('staking.nav.acc-preferences'),
                active: paramTab === STAKING_TABS.ACC_PREFERENCES,
            },
        ];
    }, [paramTab, t]);

    return (
        <Suspense fallback={<Loader />}>
            {!isMobile && <Line />}
            {!isMobile && (
                <NavContainer>
                    <TabLinks items={navItems} />
                </NavContainer>
            )}
            <CCIPAnimation />
            {paramTab === STAKING_TABS.STAKING && <StakingTab />}
            {paramTab === STAKING_TABS.VESTING && <Vesting />}
            {paramTab === STAKING_TABS.ACC_PREFERENCES && <AccPreferences />}
        </Suspense>
    );
};

export default Staking;
