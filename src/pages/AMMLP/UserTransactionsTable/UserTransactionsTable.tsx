import Table from 'components/Table';
import ViewEtherscanLink from 'components/ViewEtherscanLink';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CellProps } from 'react-table';
import { formatCurrency, formatTxTimestamp, truncateAddress } from 'thales-utils';
import { LiquidityPoolUserTransaction, LiquidityPoolUserTransactions } from 'types/liquidityPool';

type UserTransactionsTableProps = {
    transactions: LiquidityPoolUserTransactions;
    noResultsMessage?: React.ReactNode;
    isLoading: boolean;
};

const UserTransactionsTable: FC<UserTransactionsTableProps> = memo(({ transactions, noResultsMessage, isLoading }) => {
    const { t } = useTranslation();

    return (
        <Table
            defaultPageSize={10}
            columns={[
                {
                    Header: <>{t('staking.amm-lp.table.date-time-col')}</>,
                    accessor: 'timestamp',
                    Cell: (
                        cellProps: CellProps<LiquidityPoolUserTransaction, LiquidityPoolUserTransaction['timestamp']>
                    ) => <p>{formatTxTimestamp(cellProps.cell.value)}</p>,
                    sortable: true,
                },
                {
                    Header: <>{t('staking.amm-lp.table.wallet-address')}</>,
                    accessor: 'account',
                    Cell: (
                        cellProps: CellProps<LiquidityPoolUserTransaction, LiquidityPoolUserTransaction['account']>
                    ) => <p>{truncateAddress(cellProps.cell.value, 5)}</p>,
                    sortable: true,
                    sortType: 'alphanumeric',
                },
                {
                    Header: <>{t('staking.amm-lp.table.type-col')}</>,
                    accessor: 'type',
                    Cell: (
                        cellProps: CellProps<LiquidityPoolUserTransaction, LiquidityPoolUserTransaction['type']>
                    ) => <p>{t(`staking.amm-lp.user-transactions.type.${cellProps.cell.value}`)}</p>,
                    width: 150,
                    sortable: true,
                    sortType: 'alphanumeric',
                },
                {
                    Header: <>{t('staking.amm-lp.table.amount-col')}</>,
                    accessor: 'amount',
                    Cell: (
                        cellProps: CellProps<LiquidityPoolUserTransaction, LiquidityPoolUserTransaction['amount']>
                    ) => (
                        <>
                            <p>
                                {cellProps.cell.row.original.type === 'withdrawalRequest'
                                    ? '-'
                                    : `$${formatCurrency(cellProps.cell.value)}`}
                            </p>
                        </>
                    ),
                    sortable: true,
                    sortType: 'basic',
                },
                {
                    Header: <>{t('staking.amm-lp.table.tx-status-col')}</>,
                    accessor: 'hash',
                    Cell: (
                        cellProps: CellProps<LiquidityPoolUserTransaction, LiquidityPoolUserTransaction['hash']>
                    ) => <ViewEtherscanLink hash={cellProps.cell.value} />,
                    width: 150,
                },
            ]}
            data={transactions}
            isLoading={isLoading}
            noResultsMessage={noResultsMessage}
        />
    );
});

export default UserTransactionsTable;
