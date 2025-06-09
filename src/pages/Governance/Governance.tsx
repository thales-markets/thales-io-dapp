import { Item, Links } from 'components/NavLinks/styled-components';
import SearchInput from 'components/SearchInput';
import { SNAPSHOT_GRAPHQL_URL } from 'constants/governance';
import { SpaceKey, StatusEnum } from 'enums/governance';
import request, { gql } from 'graphql-request';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getProposalSearch, setProposalSearch } from 'redux/modules/proposal';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import { Line, NavContainer } from 'styles/common';
import { Proposal } from 'types/governance';
import { navigateToGovernance } from 'utils/routes';
import Dropdown from '../../components/Dropdown';
import CouncilMembers from './CouncilMembers';
import ProposalDetails from './ProposalDetails';
import ElectionVotes from './ProposalDetails/ElectionVotes';
import SidebarDetails from './ProposalDetails/SidebarDetails';
import ProposalList from './ProposalList';
import ThalesStakers from './ThalesStakers';
import {
    ArrowIcon,
    BackLink,
    BackLinkWrapper,
    Container,
    MainContentContainer,
    MainContentWrapper,
    OptionsTabWrapper,
    Sidebar,
    SidebarContainer,
    SidebarWrapper,
} from './styled-components';

type GovernanceProps = RouteComponentProps<{
    space: string;
    id: string;
}>;

const Governance: React.FC<GovernanceProps> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | undefined>(undefined);
    const [selectedTab, setSelectedTab] = useState<SpaceKey>(SpaceKey.TIPS);
    const [statusFilter, setStatusFilter] = useState<StatusEnum>(StatusEnum.All);
    const proposalSearch = useSelector((state: RootState) => getProposalSearch(state));

    // const isMobile = false;

    const fetchPreloadedProposal = useCallback(() => {
        const fetch = async () => {
            const { params } = props.match;
            const { proposal }: { proposal: Proposal } = await request(
                SNAPSHOT_GRAPHQL_URL,
                gql`
                    query Proposals($id: String!) {
                        proposal(id: $id) {
                            id
                            title
                            body
                            choices
                            start
                            end
                            snapshot
                            state
                            author
                            type
                            scores
                            space {
                                id
                                name
                                symbol
                                network
                            }
                            strategies {
                                name
                                network
                                params
                            }
                        }
                    }
                `,
                { id: params.id }
            );
            setSelectedProposal(proposal);
        };
        fetch();
    }, [props.match]);

    useEffect(() => {
        const { params } = props.match;

        if (
            params &&
            params.space &&
            (params.space === SpaceKey.TIPS ||
                params.space === SpaceKey.COUNCIL ||
                params.space === SpaceKey.THALES_STAKERS)
        ) {
            if (params.id) {
                fetchPreloadedProposal();
            } else {
                setSelectedProposal(undefined);
            }
            setSelectedTab(params.space as SpaceKey);
        } else {
            setSelectedTab(SpaceKey.TIPS);
            setSelectedProposal(undefined);
        }
    }, [props.match, fetchPreloadedProposal]);

    const optionsTabContent: Array<{
        id: SpaceKey;
        name: string;
    }> = useMemo(
        () => [
            {
                id: SpaceKey.TIPS,
                name: t(`governance.tabs.${SpaceKey.TIPS}`),
            },
            {
                id: SpaceKey.COUNCIL,
                name: t(`governance.tabs.${SpaceKey.COUNCIL}`),
            },
            // {
            //     id: SpaceKey.THALES_STAKERS,
            //     name: t(`governance.tabs.${SpaceKey.THALES_STAKERS}`),
            // },
        ],
        [t]
    );

    const isOverviewPage = !selectedProposal;

    return (
        <>
            {!isMobile && (
                <>
                    <Line />
                    <NavContainer width="20%">
                        <Links>
                            {optionsTabContent.map((tab, index) => (
                                <Item
                                    key={index}
                                    onClick={() => {
                                        navigateToGovernance(tab.id);
                                        setSelectedTab(tab.id);
                                    }}
                                    active={tab.id === selectedTab}
                                >
                                    {tab.name}
                                </Item>
                            ))}
                        </Links>
                    </NavContainer>{' '}
                </>
            )}
            <BackLinkWrapper isOverviewPage={isOverviewPage}>
                {selectedProposal && (
                    <BackLink
                        onClick={() => {
                            setSelectedProposal(undefined);
                            navigateToGovernance(selectedProposal.space.id);
                        }}
                    >
                        <ArrowIcon />
                        {t(`governance.back-to-proposals`)}
                    </BackLink>
                )}
            </BackLinkWrapper>
            <Container id="proposal-details">
                <MainContentContainer
                    isOverviewPage={isOverviewPage}
                    isThalesStakersPage={selectedTab == SpaceKey.THALES_STAKERS}
                >
                    <MainContentWrapper isOverviewPage={isOverviewPage}>
                        {!selectedProposal && (
                            <>
                                <OptionsTabWrapper>
                                    {selectedTab !== SpaceKey.THALES_STAKERS && (
                                        <>
                                            <Dropdown
                                                options={Object.values(StatusEnum)}
                                                activeOption={statusFilter}
                                                onSelect={setStatusFilter}
                                                translationKey="proposal-status"
                                            />
                                            <SearchInput
                                                text={proposalSearch}
                                                handleChange={(value) => {
                                                    dispatch(setProposalSearch(value));
                                                }}
                                                placeholder={t('governance.search')}
                                                width={isMobile ? '100%' : '320px'}
                                                height="36px"
                                            />
                                        </>
                                    )}
                                </OptionsTabWrapper>
                                {selectedTab === SpaceKey.TIPS && (
                                    <ProposalList
                                        spaceKey={SpaceKey.TIPS}
                                        onItemClick={setSelectedProposal}
                                        statusFilter={statusFilter}
                                        proposalSearch={proposalSearch}
                                        resetFilters={() => setStatusFilter(StatusEnum.All)}
                                    />
                                )}
                                {selectedTab === SpaceKey.COUNCIL && (
                                    <ProposalList
                                        spaceKey={SpaceKey.COUNCIL}
                                        onItemClick={setSelectedProposal}
                                        statusFilter={statusFilter}
                                        proposalSearch={proposalSearch}
                                        resetFilters={() => setStatusFilter(StatusEnum.All)}
                                    />
                                )}
                                {selectedTab === SpaceKey.THALES_STAKERS && <ThalesStakers />}
                            </>
                        )}
                        {selectedProposal && <ProposalDetails proposal={selectedProposal} />}
                        {selectedProposal && selectedTab == SpaceKey.COUNCIL && (
                            <ElectionVotes proposal={selectedProposal} />
                        )}
                    </MainContentWrapper>
                </MainContentContainer>
                {!selectedProposal && selectedTab !== SpaceKey.THALES_STAKERS && (
                    <SidebarContainer tipsOverview={true}>
                        <SidebarWrapper>
                            <Sidebar>
                                <CouncilMembers />
                            </Sidebar>
                        </SidebarWrapper>
                    </SidebarContainer>
                )}
                {selectedProposal && (
                    <SidebarContainer tipsOverview={false}>
                        {selectedProposal.space.id === SpaceKey.COUNCIL && (
                            <SidebarWrapper>
                                <Sidebar>
                                    <SidebarDetails proposal={selectedProposal} type="results" />
                                </Sidebar>
                            </SidebarWrapper>
                        )}
                        {selectedProposal.space.id === SpaceKey.TIPS && (
                            <SidebarWrapper>
                                <Sidebar>
                                    <SidebarDetails proposal={selectedProposal} type="history" />
                                </Sidebar>
                            </SidebarWrapper>
                        )}
                    </SidebarContainer>
                )}
            </Container>
        </>
    );
};

export default Governance;
