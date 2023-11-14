import { Suspense, useMemo } from 'react';
import Loader from 'components/Loader';
import {
    BottomRight,
    ButtonContainer,
    ClaimButton,
    ClaimButtonDisclaimer,
    Container,
    FinalPoints,
    FinalPointsTitle,
    InfoDiv,
    Left,
    Line,
    MiddleRight,
    NavContainer,
    SectionSubtitle,
    SectionText,
    SectionTitle,
    UpperRight,
} from './styled-components';
import NavLinks from 'components/NavLinks';
import { useTranslation } from 'react-i18next';
import { NavItem } from 'components/NavLinks/NavLinks';
import { FlexDiv, FlexDivColumn } from 'styles/common';

const Staking: React.FC = () => {
    const { t } = useTranslation();

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                href: '',
                title: t('staking.nav.rewards'),
                active: true,
            },
            {
                href: '',
                title: t('staking.nav.staking'),
            },
            {
                href: '',
                title: t('staking.nav.vesting'),
            },
            {
                href: '',
                title: t('staking.nav.leaderboard'),
            },
            {
                href: '',
                title: t('staking.nav.acc-preferences'),
            },
        ];
    }, [t]);

    return (
        <Suspense fallback={<Loader />}>
            <Line />
            <NavContainer>
                <NavLinks items={navItems} />
            </NavContainer>

            <Container>
                <Left>
                    <div>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--house" />
                                How Gamified Staking Rewards Work?
                            </span>
                        </SectionTitle>
                        <SectionText>
                            <span>Every week</span> THALES token holders earn staking rewards. The amount you earn
                            depends on the percentage of THALES you've staked during the weekly snapshot. If you don't
                            claim these rewards within a week, they expire.
                        </SectionText>
                        <SectionText>
                            <span>Each week:</span>
                            <br /> • 45,000 THALES are divided among all stakers.
                            <br /> • An extra 15,000 THALES are given to active stakers who trade, deposit in pools, or
                            use vaults on Thales and Overtime platforms.
                        </SectionText>
                        <SectionText>
                            <span>How points are earned:</span>
                            <br />• <span>Trading:</span> For every <span>$1</span> traded on Thales or Overtime, you
                            earn <span>1 point</span>.
                            <br />• <span>Liquidity</span> Pools: Deposit <span>$1</span> into any Thales liquidity pool
                            and earn <span>0.1 points</span>.
                            <br />• <span>Vaults:</span> Deposit <span>$1</span> into any Thales vault and earn{' '}
                            <span>0.2 points</span>.
                        </SectionText>
                        <SectionText>
                            The more THALES you stake, the more your points multiply, up to 2x.
                            <br /> Your total points determine your share of the 15,000 THALES bonus.
                        </SectionText>
                    </div>
                    <div>
                        <FinalPointsTitle>
                            Final Points = (Trading + Pool + Vault points) x THALES Multiplier
                        </FinalPointsTitle>
                        <FinalPoints>1,598.80 = (483.89 + 129.55 + 1,032.87) x 1.5</FinalPoints>
                    </div>
                </Left>
                <UpperRight>
                    <div>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--download" />
                                Your Current Claimable Rewards
                            </span>
                            <span>5,036.83 THALES</span>
                        </SectionTitle>
                        <SectionSubtitle>
                            Time left to claim : <span>1d 10h 34m</span>
                        </SectionSubtitle>
                    </div>
                    <FlexDiv gap="30px">
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>Gamified Staking Rewards</span>
                                <span>4,795.35 THALES</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Base Rewards</span>
                                <span>235.35 THALES</span>
                            </InfoDiv>
                        </FlexDivColumn>
                        <ButtonContainer>
                            <ClaimButtonDisclaimer>Unclaimed weekly rewards are forfeited!</ClaimButtonDisclaimer>
                            <div>
                                <ClaimButton>Claim Rewards</ClaimButton>
                            </div>
                        </ButtonContainer>
                    </FlexDiv>
                </UpperRight>
                <MiddleRight>
                    <div>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--pig" />
                                Base staking rewards & Multiplier
                            </span>
                            <span>4,253.87 THALES</span>
                        </SectionTitle>
                        <SectionSubtitle>
                            Your current multiplier : <span>x1.07</span>
                        </SectionSubtitle>
                    </div>
                    <FlexDiv gap="30px">
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>Your THALES staked</span>
                                <span>4,795.35 THALES</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Staking Divider</span>
                                <span>235.35 THALES</span>
                            </InfoDiv>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>Total THALES staked</span>
                                <span>4,795.35 THALES</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Your Staked Share</span>
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
                                Your Points Reward
                            </span>
                            <span>254.83 THALES</span>
                        </SectionTitle>
                        <SectionSubtitle>
                            Your current points : <span>1,598.80</span>
                        </SectionSubtitle>
                    </div>
                    <FlexDiv gap="30px">
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>Trading Volume</span>
                                <span>$ 3,234.42</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>AMM LP balances</span>
                                <span>$ 72,322.64</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Vaults balances</span>
                                <span>$ 342,433.42</span>
                            </InfoDiv>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>Trading multiplier</span>
                                <span>X 1</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>LP multiplier</span>
                                <span>X 0.1</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Vaults multiplier</span>
                                <span>X 0.2</span>
                            </InfoDiv>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>Points</span>
                                <span>3,525.00</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Points</span>
                                <span>197.15</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>Points</span>
                                <span>1,403.36</span>
                            </InfoDiv>
                        </FlexDivColumn>
                    </FlexDiv>
                </BottomRight>
            </Container>
        </Suspense>
    );
};

export default Staking;
