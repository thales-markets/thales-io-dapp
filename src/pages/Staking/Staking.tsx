import Loader from 'components/Loader';
import NavLinks from 'components/NavLinks';
import { NavItem } from 'components/NavLinks/NavLinks';
import ROUTES from 'constants/routes';
import queryString from 'query-string';
import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
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

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                href: `${buildHref(ROUTES.Token)}?tab=${Tab.STAKING}`,
                title: t('staking.nav.staking'),
                active: paramTab === Tab.STAKING,
            },
            {
                href: `${buildHref(ROUTES.Token)}?tab=${Tab.REWARDS}`,
                title: t('staking.nav.rewards'),
                active: paramTab === Tab.REWARDS,
            },
            {
                href: `${buildHref(ROUTES.Token)}?tab=${Tab.VESTING}`,
                title: t('staking.nav.vesting'),
                active: paramTab === Tab.VESTING,
            },
            {
                href: `${buildHref(ROUTES.Token)}?tab=${Tab.LEADERBOARD}`,
                title: t('staking.nav.leaderboard'),
                active: paramTab === Tab.LEADERBOARD,
            },
            {
                href: `${buildHref(ROUTES.Token)}?tab=${Tab.ACC_PREFERENCES}`,
                title: t('staking.nav.acc-preferences'),
                active: paramTab === Tab.ACC_PREFERENCES,
            },
        ];
    }, [paramTab, t]);

    return (
        <Suspense fallback={<Loader />}>
            <Line />
            <NavContainer>
                <NavLinks items={navItems} />
            </NavContainer>
            {paramTab === Tab.STAKING && <StakingTab />}
            {paramTab === Tab.REWARDS && <Rewards />}
            {paramTab === Tab.VESTING && <Vesting />}
            {paramTab === Tab.LEADERBOARD && <Leaderboard />}
            {paramTab === Tab.ACC_PREFERENCES && <AccPreferences />}
        </Suspense>
    );
};

export default Staking;
