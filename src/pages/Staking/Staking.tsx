import Button from 'components/Button';
import Loader from 'components/Loader';
import { NavItemType } from 'components/NavLinks/NavItem';
import SPAAnchor from 'components/SPAAnchor';
import TabLinks from 'components/TabLinks';
import ThalesToOverMigrationModal from 'components/ThalesToOverMigrationModal';
import { MIGRATION_PROPOSAL_ID } from 'constants/governance';
import ROUTES from 'constants/routes';
import { STAKING_TABS } from 'constants/token';
import { SpaceKey } from 'enums/governance';
import queryString from 'query-string';
import { Suspense, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import { NavContainer } from 'styles/common';
import { buildGovernanceHref, buildHref } from 'utils/routes';
import AccPreferences from './AccPreferences';
import StakingTab from './StakingTab';
import Vesting from './Vesting';
import CCIPAnimation from './components/CCIPAnimation';
import { Bold, MigrationContainer } from './styled-components';

const Staking: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const paramTab = queryString.parse(location.search).tab || STAKING_TABS.STAKING;

    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    const [showThalesToOverMigrationModal, setShowThalesToOverMigrationModal] = useState<boolean>(false);

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
            <MigrationContainer>
                <span>
                    <Trans
                        i18nKey={t('staking.migration-banner')}
                        components={{
                            tip: <SPAAnchor href={buildGovernanceHref(SpaceKey.COUNCIL, MIGRATION_PROPOSAL_ID)} />,
                            bold: <Bold />,
                        }}
                    />
                </span>
            </MigrationContainer>
            <Button onClick={() => setShowThalesToOverMigrationModal(true)} margin="0 0 20px 0">
                Migrate $THALES to $OVER
            </Button>
            {!isMobile && (
                <NavContainer>
                    <TabLinks items={navItems} />
                </NavContainer>
            )}
            <CCIPAnimation />
            {paramTab === STAKING_TABS.STAKING && <StakingTab />}
            {paramTab === STAKING_TABS.VESTING && <Vesting />}
            {paramTab === STAKING_TABS.ACC_PREFERENCES && <AccPreferences />}
            {showThalesToOverMigrationModal && (
                <ThalesToOverMigrationModal onClose={() => setShowThalesToOverMigrationModal(false)} />
            )}
        </Suspense>
    );
};

export default Staking;
