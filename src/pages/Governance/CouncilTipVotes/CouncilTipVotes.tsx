import SimpleLoader from 'components/SimpleLoader';
import Tooltip from 'components/Tooltip/Tooltip';
import { CURRENT_GOVERNANCE_EPOCH_END_DATE, CURRENT_GOVERNANCE_EPOCH_START_DATE } from 'constants/governance';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { LoaderContainer, StyledLink } from 'pages/Governance/styled-components';
import { RPC_LIST } from 'pages/Root/Root';
import useCouncilNftOwners from 'queries/governance/useCouncilNftOwners';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { Colors, FlexDivCentered, FlexDivColumn } from 'styles/common';
import { getEtherscanAddressLink, truncateAddress, truncateText } from 'thales-utils';
import { Proposal, ProposalResults } from 'types/governance';
import { getProposalApprovalData } from 'utils/governance';
import { FlexDivFullWidthSpaceBetween } from '../ProposalDetails/ProposalHeader/styled-components';
import { Icon } from '../ProposalDetails/styled-components';
import {
    ColoredVotesSection,
    CouncilMemberLabel,
    CouncilVoteRowData,
    Divider,
    VoteLabel,
    VoteRow,
    VotesChart,
} from './styled-components';

type CouncilTipVotesProps = {
    proposal: Proposal;
    proposalResults?: ProposalResults;
    isLoading: boolean;
};

const CouncilTipVotes: React.FC<CouncilTipVotesProps> = ({ proposal, proposalResults, isLoading }) => {
    const { t } = useTranslation();
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const hasVotes = proposalResults && proposalResults.votes.length > 0;

    const { numberOfCouncilMembers } = getProposalApprovalData(proposal.start);

    const councilNftsOwnersQuery = useCouncilNftOwners();
    const councilNftsOwners =
        councilNftsOwnersQuery.isSuccess && councilNftsOwnersQuery.data ? councilNftsOwnersQuery.data : undefined;

    const councilMembersNotVoted = useMemo(() => {
        if (councilNftsOwners && proposalResults) {
            const voters = proposalResults.votes.map((vote: any) => vote.voter);
            const membersNotVoted = councilNftsOwners.filter(
                (memberAddress: string) => !voters.includes(memberAddress)
            );
            return membersNotVoted;
        }
    }, [councilNftsOwners, proposalResults]);

    const calculatedVotesSectionsWidth = useMemo(() => {
        if (proposalResults && proposal && numberOfCouncilMembers) {
            return calculateWidth(proposalResults?.votes, proposal, numberOfCouncilMembers);
        }
    }, [proposalResults, proposal, numberOfCouncilMembers]);

    return (
        <>
            {hasVotes && !isLoading && proposalResults && (
                <FlexDivColumn>
                    {proposalResults.votes.map((vote: any, index: number) => {
                        const voteChoice = proposal.choices[vote.choice - 1];

                        return (
                            <>
                                <VoteRow key={vote.voter + index}>
                                    <CouncilVoteRowData>
                                        <FlexDivFullWidthSpaceBetween>
                                            <StyledLink
                                                href={getEtherscanAddressLink(Network.Mainnet, vote.voter)}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FlexDivCentered>
                                                    <Voter address={vote.voter} walletAddress={walletAddress} />
                                                </FlexDivCentered>
                                            </StyledLink>
                                            <Tooltip
                                                overlay={voteChoice}
                                                overlayInnerStyle={{
                                                    fontFamily: 'Nunito !important',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <FlexDivCentered>
                                                    <VoteLabel fontWeight={500} color={Colors.GRAY}>
                                                        {t(`governance.voted`)}
                                                    </VoteLabel>
                                                    <VoteLabel color={Colors.WHITE}>{voteChoice}</VoteLabel>
                                                </FlexDivCentered>
                                            </Tooltip>
                                        </FlexDivFullWidthSpaceBetween>
                                        <Icon
                                            color={isForVote(voteChoice) ? Colors.CYAN : Colors.RED}
                                            className={`icon icon--${isForVote(voteChoice) ? 'checkmark' : 'cross'}`}
                                        />
                                    </CouncilVoteRowData>
                                    {index < 6 && <Divider />}
                                </VoteRow>
                            </>
                        );
                    })}
                    {proposal.start * 1000 > CURRENT_GOVERNANCE_EPOCH_START_DATE.getTime() &&
                        proposal.end * 1000 < CURRENT_GOVERNANCE_EPOCH_END_DATE.getTime() &&
                        councilMembersNotVoted?.map((address: string, index: number) => {
                            return (
                                <>
                                    <VoteRow key={address + index}>
                                        <CouncilVoteRowData>
                                            <FlexDivFullWidthSpaceBetween>
                                                <StyledLink
                                                    href={getEtherscanAddressLink(Network.Mainnet, address)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <FlexDivCentered>
                                                        <Voter address={address} walletAddress={walletAddress} />
                                                    </FlexDivCentered>
                                                </StyledLink>
                                                <Tooltip
                                                    overlay={t(`governance.not-voted`)}
                                                    overlayInnerStyle={{
                                                        fontFamily: 'Nunito !important',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <FlexDivCentered>
                                                        <VoteLabel fontWeight={500} color={Colors.GRAY}>
                                                            {t(`governance.not-voted`)}
                                                        </VoteLabel>
                                                    </FlexDivCentered>
                                                </Tooltip>
                                            </FlexDivFullWidthSpaceBetween>
                                            <Icon color={Colors.LIGHT_GRAY} className="icon icon--sleep" />
                                        </CouncilVoteRowData>
                                        {councilMembersNotVoted.length - 1 > index && <Divider />}
                                    </VoteRow>
                                </>
                            );
                        })}
                    {calculatedVotesSectionsWidth && (
                        <>
                            <VotesChart>
                                <Tooltip
                                    overlay={t('governance.proposal.for-votes', {
                                        votes: calculatedVotesSectionsWidth[0].votesNumber,
                                    })}
                                    overlayInnerStyle={{ fontFamily: 'Nunito !important', textAlign: 'center' }}
                                >
                                    <ColoredVotesSection
                                        width={calculatedVotesSectionsWidth[0].width}
                                        color={calculatedVotesSectionsWidth[0].color}
                                    >
                                        {t('governance.proposal.for')}
                                    </ColoredVotesSection>
                                </Tooltip>
                                <Tooltip
                                    overlay={t('governance.proposal.against-votes', {
                                        votes: calculatedVotesSectionsWidth[1].votesNumber,
                                    })}
                                    overlayInnerStyle={{ fontFamily: 'Nunito !important', textAlign: 'center' }}
                                >
                                    <ColoredVotesSection
                                        width={
                                            calculatedVotesSectionsWidth[0].width +
                                            calculatedVotesSectionsWidth[1].width
                                        }
                                        color={calculatedVotesSectionsWidth[1].color}
                                    >
                                        {t('governance.proposal.against')}
                                    </ColoredVotesSection>
                                </Tooltip>
                                <Tooltip
                                    overlay={t('governance.proposal.not-voted', {
                                        votes: calculatedVotesSectionsWidth[2].votesNumber,
                                    })}
                                    overlayInnerStyle={{ fontFamily: 'Nunito !important', textAlign: 'center' }}
                                    overlayClassName="left-margin-tooltip"
                                >
                                    <ColoredVotesSection
                                        width={
                                            calculatedVotesSectionsWidth[0].width +
                                            calculatedVotesSectionsWidth[1].width +
                                            calculatedVotesSectionsWidth[2].width
                                        }
                                        color={calculatedVotesSectionsWidth[2].color}
                                    >
                                        NA
                                    </ColoredVotesSection>
                                </Tooltip>
                            </VotesChart>
                        </>
                    )}
                </FlexDivColumn>
            )}
            {isLoading && (
                <LoaderContainer height={200}>
                    <SimpleLoader />
                </LoaderContainer>
            )}
        </>
    );
};

type StakerCellProps = {
    address: string;
    walletAddress: string;
};

const Voter: React.FC<StakerCellProps> = ({ address, walletAddress }) => {
    const { t } = useTranslation();
    const [voterEns, setVoterEns] = useState<string | null>(null);

    useEffect(() => {
        const fetchVoterEns = async () => {
            const mainnetInfuraProvider = new ethers.providers.JsonRpcProvider(
                RPC_LIST.DRPC[Network.Mainnet as keyof typeof RPC_LIST.DRPC].http
            );
            const stakerEns = await mainnetInfuraProvider.lookupAddress(address);
            setVoterEns(stakerEns);
        };
        fetchVoterEns();
    }, [address]);

    const voter =
        address.toLowerCase() === walletAddress.toLowerCase()
            ? t(`governance.you`)
            : voterEns != null
            ? truncateText(voterEns, 12)
            : truncateAddress(address);
    const voterTooltip =
        address.toLowerCase() === walletAddress.toLowerCase()
            ? t(`governance.you`)
            : voterEns != null
            ? voterEns
            : address;

    return (
        <Tooltip overlay={voterTooltip}>
            <CouncilMemberLabel>{voter}</CouncilMemberLabel>
        </Tooltip>
    );
};

const isForVote = (voteChoice: string) => {
    return voteChoice.toLowerCase() == 'yes' || voteChoice.toLowerCase() == 'for';
};

const isAgainstVote = (voteChoice: string) => {
    return voteChoice.toLowerCase() == 'no' || voteChoice.toLowerCase() == 'against';
};

const calculateWidth = (votes: any[], proposal: Proposal, numberOfCouncilMembers: number) => {
    const voteChoices = votes.map((vote: any) => {
        return proposal.choices[vote.choice - 1];
    });
    const numberOfYesVotes = voteChoices.filter((voteChoice: string) => isForVote(voteChoice)).length;
    const numberOfNoVotes = voteChoices.filter((voteChoice: string) => isAgainstVote(voteChoice)).length;
    const numberNotVoted = numberOfCouncilMembers - voteChoices.length;
    const yesVotes = {
        color: Colors.CYAN,
        width: (numberOfYesVotes / numberOfCouncilMembers) * 100,
        votesNumber: numberOfYesVotes,
    };
    const noVotes = {
        color: Colors.RED,
        width: (numberOfNoVotes / numberOfCouncilMembers) * 100,
        votesNumber: numberOfNoVotes,
    };
    const notVoted = {
        color: Colors.LIGHT_GRAY,
        width: (numberNotVoted / 7) * 100,
        votesNumber: numberNotVoted,
    };
    return [yesVotes, noVotes, notVoted];
};

export default CouncilTipVotes;
