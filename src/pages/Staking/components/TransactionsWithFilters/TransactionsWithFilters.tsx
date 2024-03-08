import { TransactionFilterEnum } from 'enums/token';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { orderBy } from 'lodash';
import useUserTokenTransactionsQuery from 'queries/token/useUserTokenTransactionsQuery';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import { getIsAppReady } from 'redux/modules/app';
import Dropdown from 'components/Dropdown';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';
import { TokenTransaction } from 'types/token';
import { SectionHeader } from '../../styled-components';
import TransactionsTable from '../TransactionsTable';

type TransactionsWithFiltersProps = {
    filters: TransactionFilterEnum[];
    hideFilters?: boolean;
    hideTitle?: boolean;
    width?: string;
    height?: string;
    translationKey?: string;
};

const TransactionsWithFilters: React.FC<TransactionsWithFiltersProps> = ({
    filters,
    hideFilters,
    hideTitle,
    width,
    height,
    translationKey,
}) => {
    const { t } = useTranslation();
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const [filter, setFilter] = useState<string>(TransactionFilterEnum.ALL);

    const userTokenTransactionsQuery = useUserTokenTransactionsQuery(walletAddress, networkId, undefined, {
        enabled: isAppReady && isWalletConnected,
    });

    const userTokenTransactions = useMemo(
        () =>
            userTokenTransactionsQuery.isSuccess && userTokenTransactionsQuery.data
                ? orderBy(
                      userTokenTransactionsQuery.data.filter((tx: TokenTransaction) =>
                          filters.includes(tx.type as TransactionFilterEnum)
                      ),
                      ['timestamp', 'blockNumber'],
                      ['desc', 'desc']
                  )
                : [],
        [userTokenTransactionsQuery.data, filters, userTokenTransactionsQuery.isSuccess]
    );

    const filteredTransactions = useMemo(
        () =>
            filter === TransactionFilterEnum.ALL
                ? userTokenTransactions
                : userTokenTransactions.filter((tx: TokenTransaction) => tx.type.startsWith(filter)),
        [userTokenTransactions, filter]
    );

    return (
        <SectionContainer width={width} height={height} txCount={filteredTransactions.length}>
            <SectionHeader>
                {!hideTitle && (
                    <div>
                        <i className="icon icon--lightbulb" />
                        {t('staking.table.title')}
                    </div>
                )}
                {!hideFilters && (
                    <Dropdown
                        options={filters}
                        activeOption={filter}
                        onSelect={setFilter}
                        translationKey={translationKey}
                    />
                )}
            </SectionHeader>

            <SectionContent>
                <TransactionsTable
                    transactions={filteredTransactions}
                    isLoading={userTokenTransactionsQuery.isLoading}
                    noResultsMessage={t(`staking.table.no-results.${filter}`)}
                />
            </SectionContent>
        </SectionContainer>
    );
};

const SectionContainer = styled.section<{
    txCount: number;
    width?: string;
    height?: string;
}>`
    font-family: Nunito;
    width: ${(props) => (props.width ? props.width : '60%')};
    min-height: 200px;
    margin-bottom: 20px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 100%;
        width: 100%;
    }
`;

const SectionContent = styled(FlexDivColumn)`
    margin-top: 15px;
    height: calc(100% - 52px);
`;

export default TransactionsWithFilters;
