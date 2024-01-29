import { THALES_CURRENCY } from 'constants/currency';
import usePointsBreakdownQuery, { PointsData } from 'queries/token/usePointsBreakdownQuery';
// import useStakersDataLeaderboardQuery from 'queries/token/useStakersDataLeaderboardQuery';
import useThalesStakingDataQuery from 'queries/token/useThalesStakingDataQuery';
import useUserBaseRewardsQuery from 'queries/token/useUserBaseRewards';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { BaseRewardsData, ThalesStakingData, UserStakingData } from 'types/token';
import { InfoDivRewards, SectionTitle } from '../styled-components';
import BaseStakingRewards from './components/BaseStakingRewards';
import ClaimableSection from './components/ClaimbleSection';
import GamifiedStakingExplainer from './components/GamifiedStakingExplainer';
import { Container, GamifiedRewardItem, ItemTitle, ItemValue } from './styled-components';

const Rewards: React.FC = () => {
    const { t } = useTranslation();

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const [lastValidPointsData, setLastValidPointsData] = useState<PointsData | undefined>(undefined);
    const [lastValidStakingData, setLastValidStakingData] = useState<ThalesStakingData | undefined>(undefined);
    const [lastValidBaseRewardsData, setLastValidBaseRewardsData] = useState<BaseRewardsData | undefined>(undefined);
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);

    const userStakingDataQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const baseRewardsQuery = useUserBaseRewardsQuery(walletAddress, networkId, { enabled: isAppReady });

    useEffect(() => {
        if (baseRewardsQuery.isSuccess && baseRewardsQuery.data) {
            setLastValidBaseRewardsData(baseRewardsQuery.data);
        }
    }, [baseRewardsQuery.isSuccess, baseRewardsQuery.data]);

    const baseRewardsData: BaseRewardsData | undefined = useMemo(() => {
        if (baseRewardsQuery.isSuccess && baseRewardsQuery.data) {
            return baseRewardsQuery.data;
        }
        return lastValidBaseRewardsData;
    }, [baseRewardsQuery.data, baseRewardsQuery.isSuccess, lastValidBaseRewardsData]);

    const pointsBreakdownQuery = usePointsBreakdownQuery(walletAddress, networkId, { enabled: isAppReady });

    useEffect(() => {
        if (pointsBreakdownQuery.isSuccess && pointsBreakdownQuery.data) {
            setLastValidPointsData(pointsBreakdownQuery.data);
        }
    }, [pointsBreakdownQuery.isSuccess, pointsBreakdownQuery.data]);

    const pointsData: PointsData | undefined = useMemo(() => {
        if (pointsBreakdownQuery.data && pointsBreakdownQuery.isSuccess) {
            return pointsBreakdownQuery.data;
        }
        return lastValidPointsData;
    }, [pointsBreakdownQuery.data, pointsBreakdownQuery.isSuccess, lastValidPointsData]);

    const userStakingData: UserStakingData | undefined = useMemo(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            return userStakingDataQuery.data;
        }
        return lastValidUserStakingData;
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data, lastValidUserStakingData]);

    useEffect(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            setLastValidUserStakingData(userStakingDataQuery.data);
        }
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data]);

    const stakingDataQuery = useThalesStakingDataQuery(networkId, {
        enabled: isAppReady,
    });

    useEffect(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            setLastValidStakingData(stakingDataQuery.data);
        }
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data]);

    const stakingData: ThalesStakingData | undefined = useMemo(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            return stakingDataQuery.data;
        }
        return lastValidStakingData;
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data, lastValidStakingData]);

    return (
        <Container>
            <ClaimableSection
                userStakingData={userStakingData}
                stakingData={stakingData}
                isLoading={userStakingDataQuery.isLoading || stakingDataQuery.isLoading}
            />
            <BaseStakingRewards
                userStakingData={userStakingData}
                pointsData={pointsData}
                baseStakingRewardsData={baseRewardsData}
                isLoading={
                    pointsBreakdownQuery?.isLoading || userStakingDataQuery?.isLoading || baseRewardsQuery?.isLoading
                }
            />
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
                                {userStakingData?.totalBonus
                                    ? formatCurrencyWithKey(THALES_CURRENCY, userStakingData?.totalBonus, 2)
                                    : '-'}
                            </ItemValue>
                        </GamifiedRewardItem>
                        <GamifiedRewardItem>
                            <ItemTitle>
                                <ItemTitle>{t('staking.rewards.base-rewards.current-multiplier')}</ItemTitle>
                            </ItemTitle>
                            <ItemValue>{`${
                                pointsData?.stakingMultiplier ? `x${pointsData?.stakingMultiplier}` : '-'
                            }`}</ItemValue>
                        </GamifiedRewardItem>
                        <GamifiedRewardItem>
                            <ItemTitle>
                                <ItemTitle>{t('staking.rewards.your-rewards.current-points')}</ItemTitle>
                            </ItemTitle>
                            <ItemValue>{pointsData?.totalPoints}</ItemValue>
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
            <GamifiedStakingExplainer pointsData={pointsData} />
        </Container>
    );
};

export default Rewards;
