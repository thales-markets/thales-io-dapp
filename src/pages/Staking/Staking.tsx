import Loader from 'components/Loader';
import NavLinks from 'components/NavLinks';
import { NavItemType } from 'components/NavLinks/NavItem';
import ROUTES from 'constants/routes';
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
import Leaderboard from './Leaderboard';
import Rewards from './Rewards';
import StakingTab from './StakingTab';
import Vesting from './Vesting';

enum Tab {
    REWARDS = 'rewards',
    STAKING = 'staking',
    VESTING = 'vesting',
    LEADERBOARD = 'leaderboard',
    ACC_PREFERENCES = 'acc-preferences',
}

const Staking: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const paramTab = queryString.parse(location.search).tab || Tab.STAKING;

    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const navItems: NavItemType[] = useMemo(() => {
        return [
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.STAKING}`,
                title: t('staking.nav.staking'),
                active: paramTab === Tab.STAKING,
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.REWARDS}`,
                title: t('staking.nav.rewards'),
                active: paramTab === Tab.REWARDS,
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.VESTING}`,
                title: t('staking.nav.vesting'),
                active: paramTab === Tab.VESTING,
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.LEADERBOARD}`,
                title: t('staking.nav.leaderboard'),
                active: paramTab === Tab.LEADERBOARD,
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.ACC_PREFERENCES}`,
                title: t('staking.nav.acc-preferences'),
                active: paramTab === Tab.ACC_PREFERENCES,
            },
        ];
    }, [paramTab, t]);

    return (
        <Suspense fallback={<Loader />}>
            <Line />
            {!isMobile && (
                <NavContainer>
                    <NavLinks items={navItems} />
                </NavContainer>
            )}
            {paramTab === Tab.STAKING && <StakingTab />}
            {paramTab === Tab.REWARDS && <Rewards />}
            {paramTab === Tab.VESTING && <Vesting />}
            {paramTab === Tab.LEADERBOARD && <Leaderboard />}
            {paramTab === Tab.ACC_PREFERENCES && <AccPreferences />}
        </Suspense>
    );
};

export default Staking;
