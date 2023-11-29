import NavLinks from 'components/NavLinks';
import { NavItem } from 'components/NavLinks/NavLinks';
import { SNAPSHOT_GRAPHQL_URL } from 'constants/governance';
import ROUTES from 'constants/routes';
import { SpaceKey, StatusEnum } from 'enums/governance';
import request, { gql } from 'graphql-request';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { Line, NavContainer } from 'styles/common';
import { Proposal } from 'types/governance';
import { buildHref, navigateToGovernance } from 'utils/routes';
import CouncilMembers from './CouncilMembers';
import ProposalDetails from './ProposalDetails';
import SidebarDetails from './ProposalDetails/SidebarDetails';
import ProposalList from './ProposalList';
import ThalesStakers from './ThalesStakers';
import Dropdown from './components/Dropdown';
import {
    Container,
    MainContentContainer,
    MainContentWrapper,
    OptionsTab,
    OptionsTabContainer,
    OptionsTabWrapper,
    Sidebar,
    SidebarContainer,
    SidebarWrapper,
} from './styled-components';

enum Tab {
    TIPS = 'tips',
    ELECTIONS = 'elections',
    THALESSTAKERS = 'thales-stakers',
}

type GovernanceProps = RouteComponentProps<{
    space: string;
    id: string;
}>;

const Governance: React.FC<GovernanceProps> = (props) => {
    const { t } = useTranslation();

    const [selectedProposal, setSelectedProposal] = useState<Proposal | undefined>(undefined);
    const [selectedTab, setSelectedTab] = useState<SpaceKey>(SpaceKey.TIPS);
    const [statusFilter, setStatusFilter] = useState<StatusEnum>(StatusEnum.All);

    const isMobile = false;

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                href: `${buildHref(ROUTES.Governance.Home)}`,
                title: t('governance.nav.tips'),
                active: selectedTab === SpaceKey.TIPS,
            },
            {
                href: `${buildHref(ROUTES.Governance.Proposal)}?tab=${Tab.ELECTIONS}`,
                title: t('governance.nav.elections'),
                active: selectedTab === SpaceKey.COUNCIL,
            },
            {
                href: `${buildHref(ROUTES.Governance.Space)}?tab=${Tab.THALESSTAKERS}`,
                title: t('governance.nav.thales-stakers'),
                active: selectedTab === SpaceKey.THALES_STAKERS,
            },
        ];
    }, [selectedTab, t]);

    const fetchPreloadedProposal = useCallback(() => {
        const fetch = async () => {
            const { params } = props.match;
            const { proposal }: { proposal: Proposal } = await request(
                SNAPSHOT_GRAPHQL_URL,
                gql`
                    query Proposals($id: String) {
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
                                params
                            }
                        }
                    }
                `,
                { id: params.id }
            );
            setSelectedProposal(proposal);
            if (!proposal) {
                setSelectedTab(params.space as SpaceKey);
            }
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
                setSelectedTab(params.space as SpaceKey);
                setSelectedProposal(undefined);
            }
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
            {
                id: SpaceKey.THALES_STAKERS,
                name: t(`governance.tabs.${SpaceKey.THALES_STAKERS}`),
            },
        ],
        [t]
    );

    const isOverviewPage = !selectedProposal;

    return (
        <>
            <Line />
            <NavContainer>
                <NavLinks items={navItems} />
            </NavContainer>
            {/* <BackLinkWrapper isOverviewPage={isOverviewPage}>
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
                </BackLinkWrapper> */}
            <Container id="proposal-details">
                <MainContentContainer isOverviewPage={isOverviewPage}>
                    <MainContentWrapper isOverviewPage={isOverviewPage}>
                        {!selectedProposal && (
                            <>
                                <OptionsTabWrapper>
                                    {isMobile ? (
                                        <Dropdown
                                            options={Object.values(SpaceKey)}
                                            activeOption={selectedTab}
                                            onSelect={setSelectedTab}
                                            translationKey="tabs"
                                        />
                                    ) : (
                                        <OptionsTabContainer>
                                            {optionsTabContent.map((tab, index) => (
                                                <OptionsTab
                                                    isActive={tab.id === selectedTab}
                                                    key={index}
                                                    index={index}
                                                    onClick={() => {
                                                        navigateToGovernance(tab.id);
                                                        setSelectedTab(tab.id);
                                                    }}
                                                    className={`${tab.id === selectedTab ? 'selected' : ''}`}
                                                >
                                                    {tab.name}
                                                </OptionsTab>
                                            ))}
                                        </OptionsTabContainer>
                                    )}
                                    {selectedTab !== SpaceKey.THALES_STAKERS && (
                                        <Dropdown
                                            options={Object.values(StatusEnum)}
                                            activeOption={statusFilter}
                                            onSelect={setStatusFilter}
                                            translationKey="status"
                                        />
                                    )}
                                </OptionsTabWrapper>
                                {selectedTab === SpaceKey.TIPS && (
                                    <ProposalList
                                        spaceKey={SpaceKey.TIPS}
                                        onItemClick={setSelectedProposal}
                                        statusFilter={statusFilter}
                                        resetFilters={() => setStatusFilter(StatusEnum.All)}
                                    />
                                )}
                                {selectedTab === SpaceKey.COUNCIL && (
                                    <ProposalList
                                        spaceKey={SpaceKey.COUNCIL}
                                        onItemClick={setSelectedProposal}
                                        statusFilter={statusFilter}
                                        resetFilters={() => setStatusFilter(StatusEnum.All)}
                                    />
                                )}
                                {selectedTab === SpaceKey.THALES_STAKERS && <ThalesStakers />}
                            </>
                        )}
                        {selectedProposal && <ProposalDetails proposal={selectedProposal} />}
                    </MainContentWrapper>
                </MainContentContainer>
                {!selectedProposal && (
                    <SidebarContainer>
                        <SidebarWrapper>
                            <Sidebar>
                                <CouncilMembers />
                            </Sidebar>
                        </SidebarWrapper>
                    </SidebarContainer>
                )}
                {selectedProposal && (
                    <SidebarContainer>
                        {selectedProposal.space.id === SpaceKey.TIPS && (
                            <SidebarWrapper>
                                <Sidebar>
                                    <SidebarDetails proposal={selectedProposal} type="approval-box" />
                                </Sidebar>
                            </SidebarWrapper>
                        )}
                        <SidebarWrapper>
                            <Sidebar>
                                <SidebarDetails proposal={selectedProposal} type="results" />
                            </Sidebar>
                        </SidebarWrapper>
                        <SidebarWrapper>
                            <Sidebar>
                                <SidebarDetails proposal={selectedProposal} type="history" />
                            </Sidebar>
                        </SidebarWrapper>
                    </SidebarContainer>
                )}
            </Container>
        </>
    );
};

export default Governance;
