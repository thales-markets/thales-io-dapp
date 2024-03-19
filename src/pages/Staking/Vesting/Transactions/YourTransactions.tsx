import TransactionsWithFilters from 'pages/Staking/components/TransactionsWithFilters';
import React from 'react';

import { TransactionFilterEnum } from 'enums/token';

const filters = [TransactionFilterEnum.ALL, TransactionFilterEnum.ADD_TO_ESCROW, TransactionFilterEnum.VEST];

const YourTransactions: React.FC<{ width?: string; height?: string }> = ({ width, height }) => {
    return <TransactionsWithFilters width={width} height={height} filters={filters} translationKey="vesting" />;
};

export default YourTransactions;
