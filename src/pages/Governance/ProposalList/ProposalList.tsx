import Button from 'components/Button/Button';
import SimpleLoader from 'components/SimpleLoader';
import { SpaceKey, StatusEnum } from 'enums/governance';
import useProposalsQuery from 'queries/useProposalsQuery';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Proposal } from 'types/governance';
import { navigateToGovernance } from 'utils/routes';
import ProposalCard from '../ProposalCard';
import { LoaderContainer } from '../styled-components';
import { NoProposals, NoProposalsText, Wrapper } from './styled-components';

type ProposalListProps = {
    spaceKey: SpaceKey;
    onItemClick: any;
    statusFilter: StatusEnum;
    resetFilters: any;
    proposalSearch: string;
};

const ProposalList: React.FC<ProposalListProps> = ({
    spaceKey,
    onItemClick,
    statusFilter,
    resetFilters,
    proposalSearch,
}) => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const proposalsQuery = useProposalsQuery(spaceKey, 1000, { enabled: isAppReady });
    const proposals = useMemo(() => (proposalsQuery.isSuccess && proposalsQuery.data ? proposalsQuery.data : []), [
        proposalsQuery.isSuccess,
        proposalsQuery.data,
    ]);

    const filteredProposals = useMemo(() => {
        const filteredProposals =
            statusFilter === StatusEnum.All
                ? proposals
                : proposals.filter((proposal: Proposal) => proposal.state === statusFilter);
        const searchFilteredProposals = filteredProposals.filter(
            (proposal: Proposal) =>
                proposal.body.toLowerCase().includes(proposalSearch.toLowerCase()) ||
                proposal.title.toLowerCase().includes(proposalSearch.toLowerCase())
        );

        return searchFilteredProposals;
    }, [proposals, statusFilter, proposalSearch]);

    const hasProposals = filteredProposals.length > 0;
    const isLoading = proposalsQuery.isLoading;

    return (
        <>
            {hasProposals && !isLoading && (
                <Wrapper>
                    {filteredProposals.map((proposal: Proposal) => (
                        <ProposalCard
                            key={proposal.id}
                            proposal={proposal}
                            onClick={() => {
                                navigateToGovernance(proposal.space.id, proposal.id);
                                onItemClick(proposal);
                                document.getElementById('proposal-details')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        />
                    ))}
                </Wrapper>
            )}
            {!hasProposals && !isLoading && (
                <NoProposals>
                    <>
                        <NoProposalsText>{t('governance.proposal.no-proposals-found')}</NoProposalsText>
                        <Button onClick={resetFilters}>{t('governance.proposal.view-all-proposals')}</Button>
                    </>
                </NoProposals>
            )}
            {isLoading && (
                <LoaderContainer>
                    <SimpleLoader />
                </LoaderContainer>
            )}
        </>
    );
};

export default ProposalList;
