import TimeRemaining from 'components/TimeRemaining';
import { PROPOSALS_DIFFERENT_FORMATTING } from 'constants/governance';
import { SpaceKey, StatusEnum } from 'enums/governance';
import { indexOf, max } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import { Colors, FlexDivRowCentered } from 'styles/common';
import { truncateText } from 'thales-utils';
import { Proposal } from 'types/governance';
import { Card, ResultContainer, RightSection, Status, StatusIcon, TipTable, Title } from './styled-components';

type ProposalCardProps = {
    proposal: Proposal;
    onClick: any;
};

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onClick }) => {
    const { t } = useTranslation();
    const isMobile = useSelector(getIsMobile);

    const closed = proposal.state === StatusEnum.Closed;
    const pending = proposal.state === StatusEnum.Pending;
    const finalChoice = proposal.choices[indexOf(proposal.scores, max(proposal.scores))];

    const getRawMarkup = (value?: string | null) => {
        const remarkable = new Remarkable({
            html: false,
            breaks: true,
            typographer: false,
        }).use(linkify);

        if (!value) return { __html: '' };
        const splitValue = value?.split('Simple Summary')[0];
        const matchTipDateArray = splitValue.match(`(\\d{4}-\\d{2}-\\d{2})`);
        const matchTipDate = matchTipDateArray && matchTipDateArray[0] ? matchTipDateArray[0] : '';
        if (splitValue.split(matchTipDate)[0] == undefined) {
            return { __html: truncateText(value, 800) };
        } else {
            const textWithoutTrailingSpaces = splitValue.split(matchTipDate)[0].concat(`${matchTipDate} |`);
            const html = { __html: remarkable.render(textWithoutTrailingSpaces) };
            const adaptedHtml = html.__html
                .replaceAll('<td>', '<td><p>')
                .replaceAll('</td>', '</p></td>')
                .replaceAll('<th>', '<th><p>')
                .replaceAll('</th>', '</p></th>');
            return { __html: adaptedHtml };
        }
    };

    return (
        <Card onClick={onClick} closed={closed}>
            <FlexDivRowCentered>
                <Status status={proposal.state}>{t(`governance.status.${proposal.state}`)}</Status>
                {!closed && (
                    <RightSection>
                        <StatusIcon color={Colors.WHITE} className="icon icon--hourglass" />
                        <span>{t(`governance.proposal.${pending ? 'starts-in-label' : 'ends-in-label'}`)}: </span>
                        <TimeRemaining
                            end={(pending ? proposal.start : proposal.end) * 1000}
                            fontSize={18}
                            textColor={Colors.CYAN}
                        />
                    </RightSection>
                )}
                {!!closed && proposal.space.id === SpaceKey.OIPS && (
                    <ResultContainer>
                        <StatusIcon
                            color={finalChoice.toUpperCase() == 'NO' ? Colors.RED : Colors.CYAN}
                            className={`icon icon--${
                                finalChoice.toUpperCase() == 'NO' ? 'circle-cross' : 'circle-check'
                            }`}
                        />
                        <span>{t(`governance.proposal.final-result-label`)}: </span>
                        <span>{t(`governance.proposal.final-result.${finalChoice.toLowerCase()}`).toUpperCase()}</span>
                    </ResultContainer>
                )}
            </FlexDivRowCentered>
            <Title status={proposal.state}>{proposal.title}</Title>
            {proposal.space.id === SpaceKey.OIPS &&
            !PROPOSALS_DIFFERENT_FORMATTING.includes(proposal.id) &&
            !isMobile ? (
                <TipTable dangerouslySetInnerHTML={getRawMarkup(proposal.body)} />
            ) : (
                <></>
            )}
        </Card>
    );
};

export default ProposalCard;
