import TransactionsWithFilters from 'pages/Staking/components/TransactionsWithFilters';
import React from 'react';

import { TransactionFilterEnum } from 'enums/token';

const filters = [
    TransactionFilterEnum.ALL,
    TransactionFilterEnum.LP_STAKE,
    TransactionFilterEnum.LP_UNSTAKE,
    TransactionFilterEnum.LP_CLAIM_STAKING_REWARDS,
    TransactionFilterEnum.LP_CLAIM_STAKING_REWARDS_SECOND,
];

const YourTransactions: React.FC<{ width?: string; height?: string }> = ({ width, height }) => {
    return <TransactionsWithFilters width={width} height={height} filters={filters} />;
};

export default YourTransactions;
