import { VOTING_COUNCIL_PROPOSAL_ID, VOTING_ORACLE_COUNCIL_PROPOSAL_ID } from 'constants/governance';
import { SpaceKey } from 'enums/governance';
import CouncilTipVotes from 'pages/Governance/CouncilTipVotes';
import { Line, SidebarContent, SidebarTitle } from 'pages/Governance/styled-components';
import useProposalQuery from 'queries/governance/useProposalQuery';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDivCentered, FlexDivColumnCentered, FlexDivStart } from 'styles/common';
import { Proposal } from 'types/governance';
import Results from '../Results';
import { CouncilVotesLabel, Icon, SidebarHeaderContainer } from '../styled-components';

type SidebarType = 'results' | 'history';

type SidebarDetailsProps = {
    proposal: Proposal;
    type: SidebarType;
};

const SidebarDetails: React.FC<SidebarDetailsProps> = ({ proposal, type }) => {
    const { t } = useTranslation();
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const proposalResultsQuery = useProposalQuery(proposal.space.id, proposal.id, walletAddress);
    const proposalResults =
        proposalResultsQuery.isSuccess && proposalResultsQuery.data ? proposalResultsQuery.data : undefined;
    const isCouncilVoting = useMemo(
        () =>
            proposal.space.id === SpaceKey.COUNCIL &&
            (proposal.id === VOTING_COUNCIL_PROPOSAL_ID || proposal.id === VOTING_ORACLE_COUNCIL_PROPOSAL_ID),
        [proposal]
    );

    return (
        <FlexDivColumnCentered>
            <SidebarHeaderContainer>
                <FlexDivColumnCentered>
                    {type === 'history' && (
                        <>
                            <FlexDivStart>
                                <Icon className="icon icon--people" />
                                <SidebarTitle>{t(`governance.sidebar.title.${type}`)}</SidebarTitle>
                            </FlexDivStart>
                            <FlexDivStart>
                                <CouncilVotesLabel>{t(`governance.sidebar.tip-condition`)}</CouncilVotesLabel>
                            </FlexDivStart>
                        </>
                    )}
                    {type !== 'history' && (
                        <>
                            <FlexDivCentered>
                                <SidebarTitle>{t(`governance.sidebar.title.${type}`)}</SidebarTitle>
                            </FlexDivCentered>
                        </>
                    )}
                </FlexDivColumnCentered>
            </SidebarHeaderContainer>
            {type !== 'history' && <Line />}
            <SidebarContent type={type} isCouncilVoting={isCouncilVoting}>
                {type === 'results' && (
                    <Results
                        isCouncilVoting={isCouncilVoting}
                        proposalResults={proposalResults}
                        isLoading={proposalResultsQuery.isLoading}
                        proposalId={proposal.id}
                    />
                )}
                {type === 'history' && !isCouncilVoting && (
                    <CouncilTipVotes
                        proposal={proposal}
                        proposalResults={proposalResults}
                        isLoading={proposalResultsQuery.isLoading}
                    />
                )}
            </SidebarContent>
        </FlexDivColumnCentered>
    );
};

export default SidebarDetails;
