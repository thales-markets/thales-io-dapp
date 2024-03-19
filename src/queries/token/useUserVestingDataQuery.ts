import QUERY_KEYS from 'constants/queryKeys';
import addWeeks from 'date-fns/addWeeks';
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks';
import getTime from 'date-fns/getTime';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import { UserVestingData, VestingSchedule } from 'types/token';
import networkConnector from '../../utils/networkConnector';

const useUserVestingDataQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<UserVestingData | undefined>
) => {
    return useQuery<UserVestingData | undefined>(
        QUERY_KEYS.Token.UserVestingData(walletAddress, networkId),
        async () => {
            const userVestingData: UserVestingData = {
                claimable: 0,
                rawClaimable: '0',
                vestingSchedule: [],
            };

            try {
                const { stakingDataContract } = networkConnector;
                if (stakingDataContract) {
                    const contractUserVestingData = await stakingDataContract.getUserVestingData(walletAddress);

                    const lastPeriodDateTime = new Date(Number(contractUserVestingData.lastPeriodTimeStamp) * 1000);
                    const diffInWeeksCurrentDate = differenceInCalendarWeeks(new Date(), lastPeriodDateTime);

                    const vestingSchedule: VestingSchedule = [];
                    contractUserVestingData.vestingEntries.forEach((entry: any) => {
                        const amount = bigNumberFormatter(entry[0]);
                        const period = Number(entry[1]);
                        if (amount > 0 && period > 0) {
                            const diffInWeeksVestingPeriod =
                                period - Number(contractUserVestingData.currentVestingPeriod);
                            const vestingDate = addWeeks(
                                lastPeriodDateTime,
                                diffInWeeksCurrentDate + diffInWeeksVestingPeriod
                            );
                            vestingSchedule.push({ date: getTime(vestingDate), amount });
                        }
                    });
                    userVestingData.claimable = bigNumberFormatter(contractUserVestingData.claimable);
                    userVestingData.rawClaimable = contractUserVestingData.claimable;
                    userVestingData.vestingSchedule = orderBy(vestingSchedule, 'date', 'asc');

                    return userVestingData;
                }
            } catch (e) {
                console.log(e);
            }

            return undefined;
        },
        {
            ...options,
        }
    );
};

export default useUserVestingDataQuery;
