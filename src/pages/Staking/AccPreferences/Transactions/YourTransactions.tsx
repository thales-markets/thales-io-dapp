import TransactionsWithFilters from 'pages/Staking/components/TransactionsWithFilters';
import React from 'react';

import { TransactionFilterEnum } from 'enums/token';

const filters = [
    TransactionFilterEnum.ALL,
    TransactionFilterEnum.MERGE_ACCOUNT,
    TransactionFilterEnum.DELEGATE_VOLUME,
    TransactionFilterEnum.REMOVE_DELEGATION,
];

const YourTransactions: React.FC<{ width?: string; height?: string }> = ({ width, height }) => {
    return <TransactionsWithFilters width={width} height={height} filters={filters} translationKey="preferences" />;
};

export default YourTransactions;
