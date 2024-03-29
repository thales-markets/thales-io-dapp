import { TransactionFilterEnum } from 'enums/token';
import usePointsBreakdownQuery, { PointsData } from 'queries/token/usePointsBreakdownQuery';
import useThalesStakingDataQuery from 'queries/token/useThalesStakingDataQuery';
import useUserBaseRewardsQuery from 'queries/token/useUserBaseRewards';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { BaseRewardsData, ThalesStakingData, UserStakingData } from 'types/token';
import TransactionsWithFilters from '../components/TransactionsWithFilters';
import BaseStakingRewards from './components/BaseStakingRewards';
import ClaimableSection from './components/ClaimbleSection';
import GamifiedRewards from './components/GamifiedRewards';
import { Container } from './styled-components';

const Rewards: React.FC = () => {
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

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
        <>
            <Container>
                <ClaimableSection
                    userStakingData={userStakingData}
                    stakingData={stakingData}
                    isLoading={userStakingDataQuery.isLoading || stakingDataQuery.isLoading}
                />
                <BaseStakingRewards
                    userStakingData={userStakingData}
                    stakingData={stakingData}
                    pointsData={pointsData}
                    baseStakingRewardsData={baseRewardsData}
                    isLoading={
                        pointsBreakdownQuery?.isLoading ||
                        userStakingDataQuery?.isLoading ||
                        baseRewardsQuery?.isLoading
                    }
                    isClaimed={!!stakingData && !!userStakingData && !stakingData.isPaused && userStakingData.claimed}
                />
                <GamifiedRewards
                    stakingData={stakingData}
                    pointsData={pointsData}
                    isLoading={pointsBreakdownQuery?.isLoading || userStakingDataQuery?.isLoading}
                    isClaimed={!!stakingData && !!userStakingData && !stakingData.isPaused && userStakingData.claimed}
                />
            </Container>
            <TransactionsWithFilters
                width={isMobile ? `100%` : `60%`}
                filters={[TransactionFilterEnum.CLAIM_STAKING_REWARDS]}
                hideFilters
                hideTitle
                translationKey={'rewards'}
            />
        </>
    );
};

export default Rewards;
