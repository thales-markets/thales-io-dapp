import Table from 'components/Table';
import ViewEtherscanLink from 'components/ViewEtherscanLink';
import { CRYPTO_CURRENCY_MAP, LP_TOKEN, THALES_CURRENCY, USD_SIGN } from 'constants/currency';
import { EMPTY_VALUE } from 'constants/placeholder';
import { TransactionFilterEnum } from 'enums/token';
import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { formatCurrencyWithKey, formatShortDateWithTime } from 'thales-utils';
import { TokenTransaction, TokenTransactions } from 'types/token';

type TransactionsTableProps = {
    transactions: TokenTransactions;
    noResultsMessage?: React.ReactNode;
    isLoading: boolean;
};

const TransactionsTable: FC<TransactionsTableProps> = memo(({ transactions, noResultsMessage, isLoading }) => {
    const { t } = useTranslation();

    const amountSort = useMemo(
        () => (rowA: any, rowB: any, columnId: any, desc: any) => {
            let a = rowA.values[columnId];
            let b = rowB.values[columnId];

            if (a === 0) {
                // Zeros to bottom
                a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
            }
            if (b === 0) {
                b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        },
        []
    );

    return (
        <>
            <Table
                columns={[
                    {
                        Header: <>{t('staking.table.date-time-col')}</>,
                        accessor: 'timestamp',
                        Cell: (cellProps: CellProps<TokenTransaction, TokenTransaction['timestamp']>) => (
                            <p>{formatShortDateWithTime(cellProps.cell.value)}</p>
                        ),
                        sortable: true,
                    },
                    {
                        Header: <>{t('staking.table.type-col')}</>,
                        accessor: 'type',
                        Cell: (cellProps: CellProps<TokenTransaction, TokenTransaction['type']>) => (
                            <TransactionType>
                                {t(
                                    `staking.table.types.${
                                        cellProps.cell.value === TransactionFilterEnum.LP_CLAIM_STAKING_REWARDS_SECOND
                                            ? TransactionFilterEnum.LP_CLAIM_STAKING_REWARDS
                                            : cellProps.cell.value
                                    }`
                                ).toUpperCase()}
                            </TransactionType>
                        ),
                        sortable: true,
                    },
                    {
                        Header: <>{t('staking.table.amount-col')}</>,
                        accessor: 'amount',
                        Cell: (cellProps: CellProps<TokenTransaction, TokenTransaction['amount']>) => {
                            return <p>{getAmount(cellProps)}</p>;
                        },
                        sortable: true,
                        sortType: amountSort,
                    },
                    {
                        Header: <>{t('staking.table.tx-status-col')}</>,
                        id: 'tx-status',
                        Cell: (cellProps: CellProps<TokenTransaction>) => (
                            <ViewEtherscanLink hash={cellProps.cell.row.original.hash} />
                        ),
                    },
                ]}
                data={transactions}
                isLoading={isLoading}
                noResultsMessage={noResultsMessage}
                preventMobileView
            />
        </>
    );
});

const getAmount = (cellProps: CellProps<TokenTransaction, TokenTransaction['amount']>) => {
    if (cellProps.cell.row.original.feeRewards > 0) {
        return formatCurrencyWithKey(USD_SIGN, cellProps.cell.row.original.feeRewards);
    } else {
        return cellProps.cell.row.original.type !== TransactionFilterEnum.CANCEL_UNSTAKE &&
            cellProps.cell.row.original.type !== TransactionFilterEnum.MERGE_ACCOUNT &&
            cellProps.cell.row.original.type !== TransactionFilterEnum.DELEGATE_VOLUME &&
            cellProps.cell.row.original.type !== TransactionFilterEnum.REMOVE_DELEGATION
            ? formatCurrencyWithKey(
                  cellProps.cell.row.original.type === TransactionFilterEnum.LP_STAKE ||
                      cellProps.cell.row.original.type === TransactionFilterEnum.LP_UNSTAKE
                      ? LP_TOKEN
                      : cellProps.cell.row.original.type === TransactionFilterEnum.LP_CLAIM_STAKING_REWARDS_SECOND
                      ? CRYPTO_CURRENCY_MAP.OP
                      : THALES_CURRENCY,
                  cellProps.cell.value
              )
            : EMPTY_VALUE;
    }
};

const TransactionType = styled.p`
    text-align: right;
`;

export default TransactionsTable;
