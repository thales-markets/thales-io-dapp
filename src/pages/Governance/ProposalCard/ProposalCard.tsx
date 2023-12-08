import TimeRemaining from 'components/TimeRemaining';
import { SpaceKey, StatusEnum } from 'enums/governance';
import { indexOf, max } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, FlexDivRowCentered } from 'styles/common';
import { truncateText } from 'thales-utils';
import { Proposal } from 'types/governance';
import {
    Body,
    Card,
    CardContainer,
    ResultContainer,
    RightSection,
    Status,
    StatusIcon,
    Title,
} from './styled-components';

type ProposalCardProps = {
    proposal: Proposal;
    onClick: any;
};

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onClick }) => {
    const { t } = useTranslation();
    const closed = proposal.state === StatusEnum.Closed;
    const pending = proposal.state === StatusEnum.Pending;

    const finalChoice = proposal.choices[indexOf(proposal.scores, max(proposal.scores))];

    return (
        <CardContainer onClick={onClick}>
            <Card closed={closed}>
                <FlexDivRowCentered>
                    <Status status={proposal.state}>{t(`governance.status.${proposal.state}`)}</Status>
                    {!closed && (
                        <RightSection>
                            <StatusIcon color={Colors.WHITE} className="icon icon--hourglass" />
                            <span>{t(`governance.proposal.${pending ? 'starts-in-label' : 'ends-in-label'}`)}: </span>
                            <TimeRemaining end={(pending ? proposal.start : proposal.end) * 1000} fontSize={18} />
                        </RightSection>
                    )}
                    {!!closed && proposal.space.id === SpaceKey.TIPS && (
                        <ResultContainer>
                            <StatusIcon
                                color={finalChoice.toUpperCase() == 'NO' ? Colors.RED : Colors.CYAN}
                                className={`icon icon--${
                                    finalChoice.toUpperCase() == 'NO' ? 'circle-cross' : 'circle-check'
                                }`}
                            />
                            <span>{t(`governance.proposal.final-result-label`)}: </span>
                            <span>
                                {t(`governance.proposal.final-result.${finalChoice.toLowerCase()}`).toUpperCase()}
                            </span>
                        </ResultContainer>
                    )}
                </FlexDivRowCentered>
                <Title status={proposal.state}>{proposal.title}</Title>
                <Body status={proposal.state}>{truncateText(proposal.body, 200)}</Body>
            </Card>
        </CardContainer>
    );
};

export default ProposalCard;
