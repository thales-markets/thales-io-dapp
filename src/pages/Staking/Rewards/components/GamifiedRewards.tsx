import SimpleLoader from 'components/SimpleLoader';
import { THALES_CURRENCY } from 'constants/currency';
import { InfoDivRewards } from 'pages/Staking/styled-components';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { ThalesStakingData, UserStakingData } from 'types/token';
import { SectionTitle } from '../../styled-components';
import { GamifiedRewardItem, ItemTitle, ItemValue } from '../styled-components';

type GamifiedRewardsProps = {
    userStakingData: UserStakingData | undefined;
    stakingData: ThalesStakingData | undefined;
    pointsData: PointsData | undefined;
    isLoading: boolean;
};

const GamifiedRewards: React.FC<GamifiedRewardsProps> = ({ userStakingData, stakingData, pointsData, isLoading }) => {
    const { t } = useTranslation();

    const isClaimed = stakingData && userStakingData && !stakingData.isPaused && userStakingData.claimed;

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
                                    <ItemTitle>{t('staking.rewards.base-rewards.claimable')}</ItemTitle>
                                </ItemTitle>
                                <ItemValue>
                                    {userStakingData?.totalBonus && !isClaimed
                                        ? formatCurrencyWithKey(THALES_CURRENCY, userStakingData?.totalBonus, 2)
                                        : '-'}
                                </ItemValue>
                            </GamifiedRewardItem>
                            <GamifiedRewardItem>
                                <ItemTitle>
                                    <ItemTitle>{t('staking.rewards.base-rewards.current-multiplier')}</ItemTitle>
                                </ItemTitle>
                                <ItemValue>{`${
                                    pointsData?.stakingMultiplier && !isClaimed
                                        ? `x ${pointsData?.stakingMultiplier}`
                                        : '-'
                                }`}</ItemValue>
                            </GamifiedRewardItem>
                            <GamifiedRewardItem>
                                <ItemTitle>
                                    <ItemTitle>{t('staking.rewards.your-rewards.current-points')}</ItemTitle>
                                </ItemTitle>
                                <ItemValue>{!isClaimed ? pointsData?.totalPoints : '-'}</ItemValue>
                            </GamifiedRewardItem>
                        </span>
                    </SectionTitle>
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
                </div>
            )}
        </>
    );
};

const LoaderWrapper = styled(FlexDiv)`
    margin: 40px 0px;
`;

export default GamifiedRewards;
