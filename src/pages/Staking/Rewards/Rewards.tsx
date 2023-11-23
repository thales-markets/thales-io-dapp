import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { InfoDiv, SectionTitle, StakingButton } from '../styled-components';
import {
    BottomRight,
    ButtonContainer,
    ClaimButtonDisclaimer,
    Container,
    FinalPoints,
    FinalPointsTitle,
    Left,
    MiddleRight,
    SectionSubtitle,
    SectionText,
    UpperRight,
} from './styled-components';

const Rewards: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Left>
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--house" />
                            {t('staking.rewards.how-it-works.title')}
                        </span>
                    </SectionTitle>
                    <SectionText>
                        <Trans
                            i18nKey="staking.rewards.how-it-works.every-week-description"
                            components={{
                                span: <span />,
                            }}
                        />
                    </SectionText>
                    <SectionText>
                        <Trans
                            i18nKey="staking.rewards.how-it-works.each-week-description"
                            components={{
                                span: <span />,
                                br: <br />,
                            }}
                        />
                    </SectionText>
                    <SectionText>
                        <Trans
                            i18nKey="staking.rewards.how-it-works.how-points-are-earned"
                            components={{
                                span: <span />,
                                br: <br />,
                            }}
                        />
                    </SectionText>
                    <SectionText>
                        <Trans
                            i18nKey="staking.rewards.how-it-works.multiplier-description"
                            components={{
                                br: <br />,
                            }}
                        />
                    </SectionText>
                </div>
                <div>
                    <FinalPointsTitle>{t('staking.rewards.how-it-works.final-points')}</FinalPointsTitle>
                    <FinalPoints>1,598.80 = (483.89 + 129.55 + 1,032.87) x 1.5</FinalPoints>
                </div>
            </Left>
            <UpperRight>
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--download" />
                            {t('staking.rewards.claim.title')}
                        </span>
                        <span>5,036.83 THALES</span>
                    </SectionTitle>
                    <SectionSubtitle>
                        <Trans
                            i18nKey="staking.rewards.claim.time-left"
                            components={{
                                span: <span />,
                            }}
                        />
                    </SectionSubtitle>
                </div>
                <FlexDiv gap="30px">
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.claim.gamified-staking-rewards')}</span>
                            <span>4,795.35 THALES</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.claim.base-rewards')}</span>
                            <span>235.35 THALES</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <ButtonContainer>
                        <ClaimButtonDisclaimer>{t('staking.rewards.claim.disclaimer')}</ClaimButtonDisclaimer>
                        <div>
                            <StakingButton>{t('staking.rewards.claim.claim-rewards')}</StakingButton>
                        </div>
                    </ButtonContainer>
                </FlexDiv>
            </UpperRight>
            <MiddleRight>
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--pig" />
                            {t('staking.rewards.base-rewards.title')}
                        </span>
                        <span>4,253.87 THALES</span>
                    </SectionTitle>
                    <SectionSubtitle>
                        <Trans
                            i18nKey="staking.rewards.base-rewards.current-multiplier"
                            components={{
                                span: <span />,
                            }}
                        />
                    </SectionSubtitle>
                </div>
                <FlexDiv gap="30px">
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.your-staked')}</span>
                            <span>4,795.35 THALES</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.staking-divider')}</span>
                            <span>235.35 THALES</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.total-staked')}</span>
                            <span>4,795.35 THALES</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.staked-share')}</span>
                            <span>235.35 THALES</span>
                        </InfoDiv>
                    </FlexDivColumn>
                </FlexDiv>
            </MiddleRight>
            <BottomRight>
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--gift" />
                            {t('staking.rewards.your-rewards.title')}
                        </span>
                        <span>254.83 THALES</span>
                    </SectionTitle>
                    <SectionSubtitle>
                        <Trans
                            i18nKey="staking.rewards.your-rewards.current-points"
                            components={{
                                span: <span />,
                            }}
                        />
                    </SectionSubtitle>
                </div>
                <FlexDiv gap="30px">
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.trading-volume')}</span>
                            <span>$ 3,234.42</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.amm-lp-balances')}</span>
                            <span>$ 72,322.64</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.vaults-balances')}</span>
                            <span>$ 342,433.42</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.trading-multiplier')}</span>
                            <span>X 1</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.lp-multiplier')}</span>
                            <span>X 0.1</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.vaults-multiplier')}</span>
                            <span>X 0.2</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.points')}</span>
                            <span>3,525.00</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.points')}</span>
                            <span>197.15</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.points')}</span>
                            <span>1,403.36</span>
                        </InfoDiv>
                    </FlexDivColumn>
                </FlexDiv>
            </BottomRight>
        </Container>
    );
};

export default Rewards;
