import TimeRemaining from 'components/TimeRemaining';
import { StatusEnum } from 'enums/governance';
import { Network } from 'enums/network';
import makeBlockie from 'ethereum-blockies-base64';
import { Blockie, StyledLink } from 'pages/Governance/styled-components';
import { useTranslation } from 'react-i18next';
import { Colors, FlexDiv, FlexDivColumnNative } from 'styles/common';
import {
    formatCurrency,
    formatShortDateWithTime,
    getEtherscanAddressLink,
    getEtherscanBlockLink,
    truncateAddress,
} from 'thales-utils';
import { Proposal } from 'types/governance';
import { getProposalUrl } from 'utils/governance';
import { ArrowIcon, Icon } from '../styled-components';
import {
    Container,
    FlexDivFullWidthSpaceBetween,
    InfoSection,
    InfoStats,
    InfoText,
    TimeLeftContainer,
    TimeLeftLabel,
    TitleLabel,
    WidgetHeader,
    WidgetWrapper,
} from './styled-components';

type ProposalHeaderProps = {
    proposal: Proposal;
    authorEns: string | null;
};

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal, authorEns }) => {
    const { t } = useTranslation();

    const closed = proposal.state === StatusEnum.Closed;
    const pending = proposal.state === StatusEnum.Pending;

    return (
        <Container>
            <WidgetWrapper>
                <WidgetHeader isTwoSided={true}>
                    <FlexDiv>
                        <Icon className="icon icon--proposal" />
                        <TitleLabel>{t(`governance.proposal.details`)}</TitleLabel>
                    </FlexDiv>
                    {!closed && (
                        <TimeLeftContainer>
                            <TimeLeftLabel>
                                {t(`governance.proposal.${pending ? 'starts-in-label' : 'ends-in-label'}`)}:{' '}
                            </TimeLeftLabel>
                            <TimeRemaining
                                end={proposal.end * 1000}
                                fontSize={18}
                                fontWeight={700}
                                textColor={Colors.CYAN}
                            />
                        </TimeLeftContainer>
                    )}
                </WidgetHeader>
                <InfoSection side="left">
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t(`governance.proposal.author-label`)}</InfoText>
                        <InfoStats>
                            <StyledLink
                                href={getEtherscanAddressLink(Network.Mainnet, proposal.author)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Blockie
                                    src={makeBlockie(proposal.author)}
                                    style={{ width: '16px', height: '16px', marginBottom: '-3px' }}
                                />
                                <InfoStats>
                                    {authorEns != null ? authorEns : truncateAddress(proposal.author)}
                                </InfoStats>
                                <ArrowIcon />
                            </StyledLink>
                        </InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t(`governance.proposal.proposal-label`)}</InfoText>
                        <InfoStats>
                            <StyledLink
                                href={getProposalUrl(proposal.space.id, proposal.id)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <InfoStats>{truncateAddress(proposal.id)}</InfoStats>
                                <ArrowIcon />
                            </StyledLink>
                        </InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t(`governance.proposal.voting-system-label`)}</InfoText>
                        <InfoStats>{t(`governance.proposal.type.${proposal.type}`)}</InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                </InfoSection>
                <InfoSection side="right" direction="row" justifyContent="space-between">
                    <FlexDivColumnNative>
                        <InfoText>{t(`governance.proposal.start-date-label`)}</InfoText>
                        <InfoText>{t(`governance.proposal.end-date-label`)}</InfoText>
                        <InfoText>{t(`governance.proposal.snapshot-label`)}</InfoText>
                    </FlexDivColumnNative>
                    <FlexDivColumnNative>
                        <InfoStats>{formatShortDateWithTime(proposal.start * 1000)}</InfoStats>
                        <InfoStats>{formatShortDateWithTime(proposal.end * 1000)}</InfoStats>
                        <InfoStats>
                            <StyledLink
                                href={getEtherscanBlockLink(Network.Mainnet, proposal.snapshot)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <InfoStats>{formatCurrency(proposal.snapshot, 0)}</InfoStats>
                                <ArrowIcon />
                            </StyledLink>
                        </InfoStats>
                    </FlexDivColumnNative>
                </InfoSection>
            </WidgetWrapper>
        </Container>
    );
};

export default ProposalHeader;
