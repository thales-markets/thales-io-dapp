import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import Table from 'components/Table';
import { THALES_CURRENCY } from 'constants/currency';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CellProps } from 'react-table';
import styled, { useTheme } from 'styled-components';
import { FlexDivRowCentered } from 'styles/common';
import { formatCurrencyWithKey, formatTxTimestamp } from 'thales-utils';
import { TransferHistoryStatus } from 'ts-proto/sgn/cbridge/v1/query_pb';
import { CelerBridgeHistory, CelerBridgeTransaction } from 'types/token';
import { ThemeInterface } from 'types/ui';
import { NETWORK_IDS_MAP } from 'utils/network';
import ConfirmRefund from '../components/ConfirmRefund';
import NetworkIcon from '../components/NetworkIcon';

type HistoryTableProps = {
    transactions: CelerBridgeHistory;
    noResultsMessage?: React.ReactNode;
    isLoading: boolean;
};

const HistoryTable: FC<HistoryTableProps> = memo(({ transactions, noResultsMessage, isLoading }) => {
    const { t } = useTranslation();
    const theme: ThemeInterface = useTheme();

    const getNetworkData = (networkId: number, showArrow?: boolean) => (
        <FlexDivRowCentered>
            <NetworkIcon networkId={networkId} margin="0 4px 1px 0" />
            {NETWORK_IDS_MAP[networkId]?.name}
            {showArrow && <ArrowIcon width="8" height="8" />}
        </FlexDivRowCentered>
    );

    return (
        <Table
            columns={[
                {
                    Header: <>{t('bridge.history.table.date-time-col')}</>,
                    accessor: 'timestamp',
                    Cell: (cellProps: CellProps<CelerBridgeTransaction, CelerBridgeTransaction['timestamp']>) => (
                        <Text>{formatTxTimestamp(cellProps.cell.value)}</Text>
                    ),
                    sortable: true,
                },
                {
                    Header: <>{t('bridge.history.table.from-col')}</>,
                    accessor: 'srcChainId',
                    Cell: (cellProps: CellProps<CelerBridgeTransaction, CelerBridgeTransaction['srcChainId']>) => (
                        <>
                            {cellProps.cell.row.original.srcTx ? (
                                <>
                                    {cellProps.cell.value && (
                                        <StyledLink
                                            href={cellProps.cell.row.original.srcTx}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {getNetworkData(cellProps.cell.value, true)}
                                        </StyledLink>
                                    )}
                                </>
                            ) : (
                                <>{cellProps.cell.value && getNetworkData(cellProps.cell.value)}</>
                            )}
                        </>
                    ),
                    sortable: true,
                },
                {
                    Header: <>{t('bridge.history.table.sent-col')}</>,
                    accessor: 'srcAmount',
                    Cell: (cellProps: CellProps<CelerBridgeTransaction, CelerBridgeTransaction['srcAmount']>) => (
                        <Text color={theme.chart.negative}>
                            {cellProps.cell.value
                                ? `-${formatCurrencyWithKey(THALES_CURRENCY, cellProps.cell.value)}`
                                : ''}
                        </Text>
                    ),
                    sortable: true,
                },
                {
                    Header: <>{t('bridge.history.table.to-col')}</>,
                    accessor: 'dstChainId',
                    Cell: (cellProps: CellProps<CelerBridgeTransaction, CelerBridgeTransaction['dstChainId']>) => (
                        <>
                            {cellProps.cell.row.original.dstTx ? (
                                <>
                                    {cellProps.cell.value && (
                                        <StyledLink
                                            href={cellProps.cell.row.original.dstTx}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {getNetworkData(cellProps.cell.value, true)}
                                        </StyledLink>
                                    )}
                                </>
                            ) : (
                                <>{cellProps.cell.value && getNetworkData(cellProps.cell.value)}</>
                            )}
                        </>
                    ),
                    sortable: true,
                },
                {
                    Header: <>{t('bridge.history.table.received-col')}</>,
                    accessor: 'dstAmount',
                    Cell: (cellProps: CellProps<CelerBridgeTransaction, CelerBridgeTransaction['dstAmount']>) => (
                        <Text color={theme.chart.positive}>
                            {cellProps.cell.value
                                ? `+${formatCurrencyWithKey(THALES_CURRENCY, cellProps.cell.value)}`
                                : ''}
                        </Text>
                    ),
                    sortable: true,
                },
                {
                    Header: <>{t('bridge.history.table.status-col')}</>,
                    accessor: 'status',
                    Cell: (cellProps: CellProps<CelerBridgeTransaction, CelerBridgeTransaction['status']>) => (
                        <Text
                            color={
                                [
                                    TransferHistoryStatus.TRANSFER_FAILED,
                                    TransferHistoryStatus.TRANSFER_TO_BE_REFUNDED,
                                ].includes(cellProps.cell.value)
                                    ? theme.error.textColor.primary
                                    : [
                                          TransferHistoryStatus.TRANSFER_SUBMITTING,
                                          TransferHistoryStatus.TRANSFER_REFUND_TO_BE_CONFIRMED,
                                          TransferHistoryStatus.TRANSFER_DELAYED,
                                      ].includes(cellProps.cell.value)
                                    ? theme.warning.textColor.primary
                                    : [
                                          TransferHistoryStatus.TRANSFER_COMPLETED,
                                          TransferHistoryStatus.TRANSFER_REFUNDED,
                                      ].includes(cellProps.cell.value)
                                    ? theme.textColor.tertiary
                                    : undefined
                            }
                        >
                            {t(`bridge.history.status.${cellProps.cell.value}`)}
                            {cellProps.cell.value === TransferHistoryStatus.TRANSFER_REFUND_TO_BE_CONFIRMED && (
                                <ConfirmRefund
                                    transferId={cellProps.cell.row.original.transferId}
                                    srcChainId={cellProps.cell.row.original.srcChainId || 0}
                                />
                            )}
                        </Text>
                    ),
                    sortable: true,
                },
            ]}
            data={transactions}
            isLoading={isLoading}
            noResultsMessage={noResultsMessage}
            initialState={{
                sortBy: [
                    {
                        id: 'timestamp',
                        desc: true,
                    },
                ],
            }}
        />
    );
});

const Text = styled.p<{ color?: string }>`
    color: ${(props) => props.color || props.theme.textColor.primary};
`;

const StyledLink = styled.a`
    color: ${(props) => props.theme.link.textColor.secondary};
    &:hover {
        text-decoration: underline;
    }
`;

const ArrowIcon = styled(ArrowHyperlinkIcon)`
    margin-left: 5px;
    ${StyledLink} {
        fill: ${(props) => props.theme.link.textColor.secondary};
    }
    ${StyledLink}:hover & path {
        text-decoration: underline;
    }
`;

export default HistoryTable;
