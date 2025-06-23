import { ProposalTypeEnum, SpaceKey, StatusEnum } from 'enums/governance';
import { Network } from 'enums/network';
import useVotingPowerQuery from 'queries/governance/useVotingPowerQuery';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import { FlexDivRow } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { Proposal } from 'types/governance';
import { getProposalApprovalData } from 'utils/governance';
import networkConnector from 'utils/networkConnector';
import ProposalHeader from './ProposalHeader';
import SingleChoiceVoting from './Voting/SingleChoiceVoting';
import WeightedVoting from './Voting/WeightedVoting';
import { Body, Container, DetailsTitle, Divider, VoteHeader, VoteNote, VotingPowerTitle } from './styled-components';

type ProposalDetailsProps = {
    proposal: Proposal;
};

const ProposalDetails: React.FC<ProposalDetailsProps> = ({ proposal }) => {
    const { t } = useTranslation();
    const isMobile = useSelector(getIsMobile);
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const [authorEns, setAuthorEns] = useState<string | null>(null);
    const { numberOfCouncilMembers, proposalApprovalVotes } = getProposalApprovalData(proposal.start);

    const votingPowerQuery = useVotingPowerQuery(proposal, walletAddress, {
        enabled: isAppReady && isWalletConnected,
    });
    const votingPower: number = votingPowerQuery.isSuccess && votingPowerQuery.data ? votingPowerQuery.data : 0;

    const getRawMarkup = (value?: string | null) => {
        const remarkable = new Remarkable({
            html: false,
            breaks: true,
            typographer: false,
        }).use(linkify);

        if (!value) return { __html: '' };

        return { __html: remarkable.render(value) };
    };

    useEffect(() => {
        const fetchAuthorEns = async () => {
            const authorEns = await (networkConnector as any).provider.lookupAddress(proposal.author);
            setAuthorEns(authorEns);
        };
        if (networkId === Network.Mainnet) {
            fetchAuthorEns();
        }
    }, [proposal, networkId]);

    return (
        <>
            <ProposalHeader proposal={proposal} authorEns={authorEns} />
            <Container topMargin={isMobile ? 30 : 10}>
                <DetailsTitle>{proposal.title}</DetailsTitle>
                <Body dangerouslySetInnerHTML={getRawMarkup(proposal.body)}></Body>
                {proposal.state === StatusEnum.Active && (
                    <>
                        <VoteHeader>
                            <FlexDivRow>
                                <DetailsTitle>{t(`governance.proposal.vote-label`)}</DetailsTitle>
                                {proposal.space.id === SpaceKey.OIPS && (
                                    <VoteNote>
                                        (
                                        {t(`governance.proposal.vote-note`, {
                                            approvalVotes: proposalApprovalVotes,
                                            totalVotes: numberOfCouncilMembers,
                                        })}
                                        )
                                    </VoteNote>
                                )}
                            </FlexDivRow>
                            <VotingPowerTitle>{`${t(`governance.proposal.voting-power-label`)}: ${
                                isWalletConnected && !votingPowerQuery.isLoading
                                    ? formatCurrencyWithKey(proposal.space.symbol, votingPower)
                                    : '-'
                            }`}</VotingPowerTitle>
                        </VoteHeader>
                        <Divider />
                    </>
                )}
                {proposal.state === StatusEnum.Active && proposal.type === ProposalTypeEnum.Single && (
                    <SingleChoiceVoting proposal={proposal} hasVotingRights={votingPower > 0} />
                )}
                {proposal.state === StatusEnum.Active && proposal.type === ProposalTypeEnum.Weighted && (
                    <WeightedVoting proposal={proposal} hasVotingRights={votingPower > 0} />
                )}
            </Container>
        </>
    );
};

export default ProposalDetails;
