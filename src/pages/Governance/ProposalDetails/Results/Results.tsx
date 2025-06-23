import SimpleLoader from 'components/SimpleLoader';
import Tooltip from 'components/Tooltip';
import {
    COUNCIL_PROPOSAL_ID,
    DEFAULT_VIEW_COUNT,
    FIRST_COUNCIL_ELECTIONS_ID,
    NUMBER_OF_ORACLE_COUNCIL_MEMBERS,
    VIEW_ALL_COUNT,
    VOTING_ORACLE_COUNCIL_PROPOSAL_ID,
} from 'constants/governance';
import { LoaderContainer, Percentage, SidebarRowData, ViewMore, Votes } from 'pages/Governance/styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumn } from 'styles/common';
import { formatPercentage, truncateText } from 'thales-utils';
import { ProposalResults } from 'types/governance';
import { ThemeInterface } from 'types/ui';
import { formatNumberShort } from 'utils/formatters/number';
import { getProposalApprovalData } from 'utils/governance';
import {
    Divider,
    ResultLabel,
    ResultRow,
    RowPercentage,
    RowPercentageContainer,
    RowPercentageIndicator,
} from './styled-components';

type ResultsProps = {
    proposalResults?: ProposalResults;
    isCouncilResults?: boolean;
    isCouncilVoting?: boolean;
    isLoading: boolean;
    showAll?: boolean;
    proposalId: string;
    proposalStart: number;
    hideViewMore?: boolean;
};

const Results: React.FC<ResultsProps> = ({
    isCouncilVoting,
    proposalId,
    proposalStart,
    proposalResults,
    isCouncilResults,
    isLoading,
    showAll,
    hideViewMore,
}) => {
    const { t } = useTranslation();
    const theme: ThemeInterface = useTheme();
    const [viewCount, setViewCount] = useState<number>(showAll ? VIEW_ALL_COUNT : DEFAULT_VIEW_COUNT);

    const { numberOfCouncilMembers } = getProposalApprovalData(proposalStart);
    useEffect(() => {
        if (showAll) {
            setViewCount(VIEW_ALL_COUNT);
        } else if (isCouncilResults) {
            setViewCount(numberOfCouncilMembers);
        }
    }, [showAll, isCouncilResults, numberOfCouncilMembers]);

    const spaceSymbol =
        proposalId.toLowerCase() === FIRST_COUNCIL_ELECTIONS_ID.toLowerCase() || !proposalResults
            ? 'WD'
            : proposalResults.spaceSymbol;

    const choices = useMemo(() => {
        if (proposalResults) {
            const choices = proposalResults.choices.map((choice: any, i: number) => ({
                choice,
                i,
            }));
            if (proposalResults.results && proposalResults.results.resultsByVoteBalance) {
                return choices.sort(
                    (a: any, b: any) =>
                        proposalResults.results.resultsByVoteBalance[b.i] -
                        proposalResults.results.resultsByVoteBalance[a.i]
                );
            }
            return choices;
        }
        return [];
    }, [proposalResults]);

    const numberOfCouncilMembersPerCouncil =
        proposalId === VOTING_ORACLE_COUNCIL_PROPOSAL_ID ? NUMBER_OF_ORACLE_COUNCIL_MEMBERS : numberOfCouncilMembers;

    return (
        <>
            {!isLoading && proposalResults && (
                <FlexDivColumn>
                    {choices.slice(0, viewCount).map((choice: any, index: number) => {
                        const results = proposalResults.results;
                        const label = truncateText(
                            choice.choice,
                            isCouncilResults && index < numberOfCouncilMembersPerCouncil ? 18 : 12
                        );
                        const percentage = results.sumOfResultsBalance
                            ? results.resultsByVoteBalance[choice.i] / results.sumOfResultsBalance
                            : 0;

                        return (
                            <ResultRow
                                key={label}
                                opacity={
                                    (isCouncilVoting || isCouncilResults) && index >= numberOfCouncilMembersPerCouncil
                                        ? 0.5
                                        : 1
                                }
                                borderColor={
                                    (isCouncilVoting || isCouncilResults) &&
                                    index === numberOfCouncilMembersPerCouncil - 1 &&
                                    !hideViewMore
                                        ? theme.borderColor.primary
                                        : undefined
                                }
                                paddingBottom={
                                    (isCouncilVoting && index === numberOfCouncilMembersPerCouncil - 1) ||
                                    (isCouncilResults &&
                                        (index === numberOfCouncilMembersPerCouncil - 1 ||
                                            index === choices.length - 1))
                                        ? 20
                                        : 10
                                }
                            >
                                <SidebarRowData>
                                    <FlexDiv>
                                        <Tooltip overlay={choice.choice}>
                                            <ResultLabel>{label}</ResultLabel>
                                        </Tooltip>
                                        <Votes>{`${formatNumberShort(
                                            results.resultsByVoteBalance[choice.i]
                                        )} ${spaceSymbol}`}</Votes>
                                    </FlexDiv>
                                    <Percentage>{formatPercentage(percentage)}</Percentage>
                                </SidebarRowData>
                                {!(proposalId == COUNCIL_PROPOSAL_ID && hideViewMore) ? (
                                    <RowPercentageContainer>
                                        <RowPercentage />
                                        <RowPercentageIndicator width={percentage * 100}></RowPercentageIndicator>
                                    </RowPercentageContainer>
                                ) : (
                                    <Divider className="divider" />
                                )}
                            </ResultRow>
                        );
                    })}
                    {choices.length > viewCount && !hideViewMore && (
                        <FlexDivCentered>
                            <ViewMore
                                onClick={() => setViewCount(viewCount + 10)}
                                padding={isCouncilResults ? '10px' : '10px 10px 0px 10px'}
                            >
                                {t(`governance.view-more`)}
                            </ViewMore>
                        </FlexDivCentered>
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

export default Results;
