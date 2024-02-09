import Collapse from 'components/Collapse';
import SPAAnchor from 'components/SPAAnchor';
import SimpleLoader from 'components/SimpleLoader';
import { THALES_CURRENCY } from 'constants/currency';
import ROUTES from 'constants/routes';
import { InfoDivRewards } from 'pages/Staking/styled-components';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsWalletConnected } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn, FlexDivColumnCentered } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { ThalesStakingData } from 'types/token';
import { SectionTitle } from '../../styled-components';
import {
    FinalPoints,
    FinalPointsTitle,
    GamifiedRewardItem,
    ItemTitle,
    ItemValue,
    LeaderboardLink,
    SectionText,
    SubTitle,
} from '../styled-components';

type GamifiedRewardsProps = {
    stakingData: ThalesStakingData | undefined;
    pointsData: PointsData | undefined;
    isLoading: boolean;
};

const GamifiedRewards: React.FC<GamifiedRewardsProps> = ({ stakingData, pointsData, isLoading }) => {
    const { t } = useTranslation();
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));

    return (
        <>
            {isLoading && (
                <LoaderWrapper>
                    <SimpleLoader />
                </LoaderWrapper>
            )}
            {!isLoading && (
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--gift" />
                            {t('staking.rewards.your-rewards.title')}
                        </span>
                        <span>
                            <GamifiedRewardItem>
                                <ItemTitle>
                                    <Trans
                                        i18nKey={'staking.rewards.how-it-works.for-period'}
                                        values={{
                                            round: stakingData?.period,
                                        }}
                                    />
                                </ItemTitle>
                                <ItemValue>
                                    {pointsData?.totalBonusRewards
                                        ? formatCurrencyWithKey(THALES_CURRENCY, pointsData?.totalBonusRewards, 2)
                                        : '-'}
                                </ItemValue>
                            </GamifiedRewardItem>
                        </span>
                    </SectionTitle>
                    <SubTitleWrapper>
                        <FlexDivColumn>
                            <SubTitle>
                                <span>{t('staking.rewards.base-rewards.current-multiplier')}</span>
                                <span>{`${
                                    pointsData?.stakingMultiplier ? `x ${pointsData?.stakingMultiplier}` : '-'
                                }`}</span>
                            </SubTitle>
                            <SubTitle>
                                <span>{t('staking.rewards.your-rewards.current-points')}</span>
                                <span>{pointsData?.totalPoints || '-'}</span>
                            </SubTitle>
                        </FlexDivColumn>
                        <LeaderboardLinkContainer>
                            <SPAAnchor href={ROUTES.Token.Leaderboard}>
                                <LeaderboardLink>
                                    <i className="icon icon--protocol-volume" />
                                    {t('staking.nav.leaderboard')}
                                    <i className="icon icon--external-arrow" />
                                </LeaderboardLink>
                            </SPAAnchor>
                        </LeaderboardLinkContainer>
                    </SubTitleWrapper>

                    <Collapse
                        title={t('staking.rewards.how-it-works.each-week')}
                        additionalStyling={{ titleFontSize: '13px', titleMarginBottom: '5px', titleMarginTop: '20px' }}
                    >
                        <SectionText>
                            <Trans
                                i18nKey="staking.rewards.how-it-works.each-week-description"
                                components={{
                                    span: <span />,
                                }}
                            />
                        </SectionText>
                    </Collapse>
                    <Collapse
                        title={t('staking.rewards.how-it-works.how-points-are-earned-title')}
                        additionalStyling={{ titleFontSize: '13px', titleMarginBottom: '5px', titleMarginTop: '20px' }}
                    >
                        <FlexDiv gap="30px" style={{ marginTop: '20px' }}>
                            <FlexDivColumn>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.trading-volume')}</span>
                                    <span></span>
                                    <span>{pointsData?.tradingVolume}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.amm-lp-balances')}</span>
                                    <span></span>
                                    <span>{pointsData?.lpVolume}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.vaults-balances')}</span>
                                    <span></span>
                                    <span>{pointsData?.vaultsVolume}</span>
                                </InfoDivRewards>
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.trading-multiplier')}</span>
                                    <span></span>
                                    <span>X {pointsData?.tradingMultiplier}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.lp-multiplier')}</span>
                                    <span></span>
                                    <span>X {pointsData?.lpMultiplier}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.vaults-multiplier')}</span>
                                    <span></span>
                                    <span>X {pointsData?.vaultsMultiplier}</span>
                                </InfoDivRewards>
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.points')}</span>
                                    <span></span>
                                    <span>{pointsData?.tradingPoints}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.points')}</span>
                                    <span></span>
                                    <span>{pointsData?.lpPoints}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.points')}</span>
                                    <span></span>
                                    <span>{pointsData?.vaultsPoints}</span>
                                </InfoDivRewards>
                            </FlexDivColumn>
                        </FlexDiv>
                    </Collapse>
                    {isWalletConnected && (
                        <FlexDivColumnCentered>
                            <FinalPointsTitle>{t('staking.rewards.how-it-works.final-points')}</FinalPointsTitle>
                            <FinalPoints>
                                {pointsData?.totalPoints} = ({pointsData?.tradingPoints} + {pointsData?.lpPoints} +{' '}
                                {pointsData?.vaultsPoints}) x {pointsData?.stakingMultiplier}
                            </FinalPoints>
                        </FlexDivColumnCentered>
                    )}
                </div>
            )}
        </>
    );
};

const LoaderWrapper = styled(FlexDiv)`
    margin: 40px 0px;
`;

const SubTitleWrapper = styled(FlexDiv)`
    justify-content: space-between;
    align-items: flex-start;
`;

const LeaderboardLinkContainer = styled(FlexDiv)`
    justify-content: flex-end;
    align-items: center;
`;

export default GamifiedRewards;
