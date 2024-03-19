import Table from 'components/Table';
import ViewEtherscanLink from 'components/ViewEtherscanLink';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { StakerWithLeaderboardData } from 'queries/token/useStakersDataLeaderboardQuery';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { formatCurrencyWithKey } from 'thales-utils';

type TransactionsTableProps = {
    stakingData: StakerWithLeaderboardData[];
    isLoading: boolean;
    stickyRow?: JSX.Element;
};

const LeaderboardTable: FC<TransactionsTableProps> = memo(({ stakingData, isLoading, stickyRow }) => {
    const { t } = useTranslation();
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const columns = useMemo(() => {
        if (stakingData) {
            return [
                {
                    id: 'rank',
                    Header: <>{t('staking.leaderboard.table.rank')}</>,
                    width: 40,
                    Cell: (row: any) => {
                        return <p>{row.cell.row.index + 1}</p>;
                    },
                },
                {
                    id: 'address',
                    Header: <>{t('staking.leaderboard.table.address')}</>,

                    accessor: (row: any) => {
                        return <ViewEtherscanLink isAddress showAddress hash={row.id} />;
                    },
                },
                {
                    id: 'points',
                    Header: <>{t('staking.leaderboard.table.points')}</>,

                    accessor: (row: any) => {
                        return <p>{formatCurrencyWithKey('', row.userRoundBonusPoints, 2)}</p>;
                    },
                },
                {
                    id: 'multiplier',
                    Header: <p>{t('staking.leaderboard.table.multiplier')}</p>,

                    accessor: (row: any) => {
                        return <p>x{formatCurrencyWithKey('', row.stakingMultiplier, 2)}</p>;
                    },
                    sortable: true,
                    sortType: (rowA: any, rowB: any) => {
                        return rowA.original.stakingMultiplier - rowB.original.stakingMultiplier;
                    },
                    sortDescFirst: true,
                },
                {
                    id: 'rewards',
                    Header: <> {t('staking.leaderboard.table.rewards')}</>,
                    accessor: (row: any) => {
                        return <p>{row.estimatedRewards}</p>;
                    },
                },
            ];
        } else {
            return [];
        }
    }, [stakingData, t]);

    return (
        <>
            <SectionContainer width={isMobile ? '100%' : '60%'} rowCount={stakingData.length}>
                <Table columns={columns} data={stakingData} stickyRow={stickyRow} isLoading={isLoading} />
            </SectionContainer>
        </>
    );
});

const SectionContainer = styled.section<{
    rowCount: number;
    width?: string;
    height?: string;
}>`
    display: flex;
    flex-direction: column;
    font-family: Nunito;
    width: ${(props) => (props.width ? props.width : '100%')};
    min-height: 200px;
    margin-bottom: 20px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 100%;
    }
`;

export default LeaderboardTable;
