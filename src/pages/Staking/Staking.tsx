import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import NavLinks from 'components/NavLinks';
import Loader from 'components/Loader';
import { NavItem } from 'components/NavLinks/NavLinks';
import { NavContainer, Line } from './styled-components';
import Rewards from './Rewards';
import { buildHref } from 'utils/routes';
import ROUTES from 'constants/routes';
import AccPreferences from './AccPreferences';
import Leaderboard from './Leaderboard';
import Vesting from './Vesting';
import StakingTab from './StakingTab';

enum Tab {
    REWARDS = 'rewards',
    STAKING = 'staking',
    VESTING = 'vesting',
    LEADERBOARD = 'leaderboard',
    ACCPREFERENCES = 'acc-preferences',
}

const Staking: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const paramTab = queryString.parse(location.search).tab || Tab.REWARDS;

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.REWARDS}`,
                title: t('staking.nav.rewards'),
                active: true,
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.STAKING}`,
                title: t('staking.nav.staking'),
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.VESTING}`,
                title: t('staking.nav.vesting'),
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.LEADERBOARD}`,
                title: t('staking.nav.leaderboard'),
            },
            {
                href: `${buildHref(ROUTES.Staking)}?tab=${Tab.ACCPREFERENCES}`,
                title: t('staking.nav.acc-preferences'),
            },
        ];
    }, [t]);

    return (
        <Suspense fallback={<Loader />}>
            <Line />
            <NavContainer>
                <NavLinks items={navItems} />
            </NavContainer>
            {paramTab === 'rewards' && <Rewards />}
            {paramTab === 'staking' && <StakingTab />}
            {paramTab === 'vesting' && <Vesting />}
            {paramTab === 'leaderboard' && <Leaderboard />}
            {paramTab === 'acc-preferences' && <AccPreferences />}
        </Suspense>
    );
};

export default Staking;
