import { COUNCIL_PROPOSAL_ID } from 'constants/governance';
import { SpaceKey } from 'enums/governance';
import { SidebarContent, SidebarTitle } from 'pages/Governance/styled-components';
import useProposalQuery from 'queries/governance/useProposalQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDivColumnCentered } from 'styles/common';
import Results from '../ProposalDetails/Results';

const CouncilMembers: React.FC = () => {
    const { t } = useTranslation();
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const proposalResultsQuery = useProposalQuery(SpaceKey.COUNCIL, COUNCIL_PROPOSAL_ID, walletAddress);
    const proposalResults =
        proposalResultsQuery.isSuccess && proposalResultsQuery.data ? proposalResultsQuery.data : undefined;

    return (
        <FlexDivColumnCentered>
            <SidebarTitle bottomMargin={15}>{t(`governance.sidebar.title.council-members`)}</SidebarTitle>
            <SidebarContent>
                <Results
                    proposalResults={proposalResults}
                    isCouncilResults={true}
                    isLoading={proposalResultsQuery.isLoading}
                    showAll={false}
                    proposalId={COUNCIL_PROPOSAL_ID}
                    hideViewMore={true}
                />
            </SidebarContent>
        </FlexDivColumnCentered>
    );
};

export default CouncilMembers;
