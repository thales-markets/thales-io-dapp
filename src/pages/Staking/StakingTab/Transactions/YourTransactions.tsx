import TransactionsWithFilters from 'pages/Staking/components/TransactionsWithFilters';
import React from 'react';

import { TransactionFilterEnum } from 'enums/token';

const filters = [
    TransactionFilterEnum.ALL,
    TransactionFilterEnum.STAKE,
    TransactionFilterEnum.UNSTAKE,
    TransactionFilterEnum.CLAIM_STAKING_REWARDS,
    TransactionFilterEnum.START_UNSTAKE,
    TransactionFilterEnum.CANCEL_UNSTAKE,
];

const YourTransactions: React.FC<{ width?: string; height?: string }> = ({ width, height }) => {
    return <TransactionsWithFilters width={width} height={height} filters={filters} translationKey="staking" />;
};

export default YourTransactions;
