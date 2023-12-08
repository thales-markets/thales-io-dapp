import TimeRemaining from 'components/TimeRemaining';
import { SpaceKey, StatusEnum } from 'enums/governance';
import { indexOf, max } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { FlexDivRowCentered } from 'styles/common';
import { truncateText } from 'thales-utils';
import { Proposal } from 'types/governance';
import { ThemeInterface } from 'types/ui';
import { Body, Card, CardContainer, Result, ResultContainer, RightSection, Status, Title } from './styled-components';

type ProposalCardProps = {
    proposal: Proposal;
    onClick: any;
};

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onClick }) => {
    const { t } = useTranslation();
    const theme: ThemeInterface = useTheme();
    const closed = proposal.state === StatusEnum.Closed;
    const pending = proposal.state === StatusEnum.Pending;

    const finalChoice = proposal.choices[indexOf(proposal.scores, max(proposal.scores))];

    return (
        <CardContainer onClick={onClick}>
            <Card>
                <FlexDivRowCentered>
                    <Status status={proposal.state}>{t(`governance.status.${proposal.state}`)}</Status>
                    {!closed && (
                        <RightSection>
                            <span>{t(`governance.proposal.${pending ? 'starts-in-label' : 'ends-in-label'}`)}: </span>
                            <TimeRemaining end={(pending ? proposal.start : proposal.end) * 1000} fontSize={16} />
                        </RightSection>
                    )}
                    {!!closed && proposal.space.id === SpaceKey.TIPS && (
                        <ResultContainer>
                            <span>{t(`governance.proposal.final-result-label`)}: </span>
                            <Result
                                color={
                                    finalChoice.toUpperCase() === 'NO'
                                        ? theme.textColor.tertiary
                                        : theme.textColor.secondary
                                }
                            >
                                {finalChoice}
                            </Result>
                        </ResultContainer>
                    )}
                </FlexDivRowCentered>
                <Title status={proposal.state}>{proposal.title}</Title>
                <Body status={proposal.state}>{truncateText(proposal.body, 250)}</Body>
            </Card>
        </CardContainer>
    );
};

export default ProposalCard;