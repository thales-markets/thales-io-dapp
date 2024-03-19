import LoadingContainer from 'components/LoadingContainer';
import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import useProposalsQuery from 'queries/useProposalsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { FlexDivSpaceBetween } from 'styles/common';
import { Proposal } from 'types/governance';
import { buildHref } from 'utils/routes';
import {
    DoubleSideSectionSpan,
    GovernanceInfoSection,
    InfoStats,
    InfoText,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const Governance: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const [latestProposal, setLatestProposal] = useState<Proposal>();
    const [totalProposals, setTotalProposals] = useState<number>(0);

    const proposalsQuery = useProposalsQuery(SpaceKey.TIPS, 1000, { enabled: isAppReady });

    useEffect(() => {
        if (proposalsQuery.isSuccess && proposalsQuery.data) {
            setLatestProposal(proposalsQuery.data[0]);
            setTotalProposals(proposalsQuery.data.length);
        }
    }, [proposalsQuery.isSuccess, proposalsQuery.data]);

    return (
        <LoadingContainer isLoading={proposalsQuery.isLoading}>
            <SPAAnchor href={buildHref(ROUTES.DAO.Home)}>
                <WidgetWrapper>
                    <WidgetHeader>
                        <WidgetIcon className="icon icon--governance" />
                        <TitleLabel>{t('dashboard.governance.title')}</TitleLabel>
                    </WidgetHeader>
                    <GovernanceInfoSection>
                        <FlexDivSpaceBetween>
                            <InfoText>{t('dashboard.governance.total-proposals')}</InfoText>
                            <InfoStats>{totalProposals}</InfoStats>
                        </FlexDivSpaceBetween>
                        <DoubleSideSectionSpan>
                            <InfoText>{t('dashboard.governance.latest-proposal')}</InfoText>
                            <br />
                            <InfoStats>{latestProposal ? latestProposal.title : '-'}</InfoStats>
                        </DoubleSideSectionSpan>
                    </GovernanceInfoSection>
                </WidgetWrapper>
            </SPAAnchor>
        </LoadingContainer>
    );
};

export default Governance;
