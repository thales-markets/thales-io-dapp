import Dropdown from 'components/Dropdown';
import { LiquidityPool, LiquidityPoolTransaction } from 'enums/liquidityPool';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { orderBy } from 'lodash';
import useLiquidityPoolUserTransactionsQuery from 'queries/liquidityPool/useLiquidityPoolUserTransactionsQuery';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivRow, Icon } from 'styles/common';
import { Coins } from 'thales-utils';
import { LiquidityPoolUserTransaction, LiquidityPoolUserTransactions } from 'types/liquidityPool';
import UserTransactionsTable from '../UserTransactionsTable';

type TransactionsProps = {
    currentRound: number;
    liquidityPool: LiquidityPool;
    collateral: Coins;
};

const Transactions: React.FC<TransactionsProps> = ({ currentRound, liquidityPool, collateral }) => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const [liquidityPoolUserTransactions, setLiquidityPoolUserTransactions] = useState<LiquidityPoolUserTransactions>(
        []
    );
    const [liquidityPoolMyTransactions, setLiquidityPoolMyTransactions] = useState<LiquidityPoolUserTransactions>([]);
    const [round, setRound] = useState<number>(currentRound);
    const [selectedTab, setSelectedTab] = useState<LiquidityPoolTransaction>(
        LiquidityPoolTransaction.USER_TRANSACTIONS
    );

    const tabContent: Array<{
        id: LiquidityPoolTransaction;
        name: string;
    }> = useMemo(
        () => [
            {
                id: LiquidityPoolTransaction.USER_TRANSACTIONS,
                name: t(`staking.amm-lp.user-transactions.title`),
            },
            {
                id: LiquidityPoolTransaction.YOUR_TRANSACTIONS,
                name: t(`staking.amm-lp.user-transactions.your-transactions-title`),
            },
        ],
        [t]
    );

    const rounds: Array<{ value: number; label: string }> = [];
    for (let index = currentRound; index >= 0; index--) {
        rounds.push({
            value: index,
            label: `${t('staking.amm-lp.user-transactions.round-label')} ${index}`,
        });
    }

    const liquidityPoolUserTransactionsQuery = useLiquidityPoolUserTransactionsQuery(
        networkId,
        liquidityPool,
        collateral,
        walletAddress,
        undefined,
        {
            enabled: isAppReady && !!walletAddress,
        }
    );

    const liquidityPoolRoundTransactionsQuery = useLiquidityPoolUserTransactionsQuery(
        networkId,
        liquidityPool,
        collateral,
        undefined,
        round,
        {
            enabled: isAppReady,
        }
    );

    useEffect(() => setRound(currentRound), [currentRound]);

    useEffect(() => {
        if (liquidityPoolRoundTransactionsQuery.isSuccess && liquidityPoolRoundTransactionsQuery.data) {
            setLiquidityPoolUserTransactions(
                orderBy(
                    liquidityPoolRoundTransactionsQuery.data.filter(
                        (trade: LiquidityPoolUserTransaction) => trade.round === round
                    ),
                    ['timestamp', 'blockNumber'],
                    ['desc', 'desc']
                )
            );
        } else {
            setLiquidityPoolUserTransactions([]);
        }
    }, [liquidityPoolRoundTransactionsQuery.isSuccess, liquidityPoolRoundTransactionsQuery.data, round]);

    useEffect(() => {
        if (liquidityPoolUserTransactionsQuery.isSuccess && liquidityPoolUserTransactionsQuery.data) {
            setLiquidityPoolMyTransactions(
                orderBy(
                    liquidityPoolUserTransactionsQuery.data.filter(
                        (trade: LiquidityPoolUserTransaction) => trade.account === walletAddress.toLowerCase()
                    ),
                    ['timestamp', 'blockNumber'],
                    ['desc', 'desc']
                )
            );
        } else {
            setLiquidityPoolMyTransactions([]);
        }
    }, [liquidityPoolUserTransactionsQuery.isSuccess, liquidityPoolUserTransactionsQuery.data, walletAddress]);

    const noLiquidityPoolUserTransactions = liquidityPoolUserTransactions.length === 0;
    const noLiquidityPoolMyTransactions = liquidityPoolMyTransactions.length === 0;

    return (
        <Container>
            <Header>
                <TabContainer>
                    {tabContent.map((tab, index) => (
                        <Tab
                            isActive={tab.id === selectedTab}
                            key={index}
                            index={index}
                            onClick={() => {
                                setSelectedTab(tab.id);
                            }}
                            className={`${tab.id === selectedTab ? 'selected' : ''}`}
                        >
                            <Icon className="icon icon--transactions" iconSize={15} color="inherit" />
                            {tab.name}
                        </Tab>
                    ))}
                </TabContainer>
                {selectedTab === LiquidityPoolTransaction.USER_TRANSACTIONS && (
                    <RightHeader>
                        <SelectContainer>
                            <Dropdown
                                options={rounds.map((round) => round.value)}
                                activeOption={Number(round)}
                                onSelect={setRound}
                                translationKey="ammlp"
                            />
                        </SelectContainer>
                    </RightHeader>
                )}
            </Header>
            <TableContainer>
                {selectedTab === LiquidityPoolTransaction.USER_TRANSACTIONS && (
                    <UserTransactionsTable
                        collateral={collateral}
                        transactions={liquidityPoolUserTransactions}
                        isLoading={liquidityPoolRoundTransactionsQuery.isLoading}
                        noResultsMessage={
                            noLiquidityPoolUserTransactions ? (
                                <span>{t(`staking.amm-lp.user-transactions.no-transactions`)}</span>
                            ) : undefined
                        }
                    />
                )}
                {selectedTab === LiquidityPoolTransaction.YOUR_TRANSACTIONS && (
                    <UserTransactionsTable
                        collateral={collateral}
                        transactions={liquidityPoolMyTransactions}
                        isLoading={liquidityPoolUserTransactionsQuery.isLoading}
                        noResultsMessage={
                            noLiquidityPoolMyTransactions ? (
                                <span>{t(`staking.amm-lp.user-transactions.no-transactions`)}</span>
                            ) : undefined
                        }
                    />
                )}
            </TableContainer>
        </Container>
    );
};

const Container = styled(FlexDivColumn)`
    font-family: Nunito;
    position: relative;
    min-height: 370px;
    overflow-y: auto;
    width: 60%;
    margin-top: 20px;
    margin-bottom: 10px;
    @media (max-width: 1440px) {
        width: 95%;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        max-height: 1100px;
        min-height: initial;
    }
`;

const Header = styled(FlexDivRow)`
    margin: 15px 0;
    align-items: baseline;
`;

const RightHeader = styled(FlexDivRow)`
    align-items: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

const TabContainer = styled(FlexDiv)`
    min-height: 38px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 10px;
    }
`;

const Tab = styled(FlexDivCentered)<{ isActive: boolean; index: number }>`
    font-family: NunitoBold;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    user-select: none;
    margin-left: 0px;
    margin-right: 40px;
    color: ${(props) => props.theme.textColor.tertiary};
    i {
        margin-right: 5px;
    }
    &.selected {
        transition: 0.2s;
        color: ${(props) => props.theme.textColor.secondary};
    }
    &:hover:not(.selected) {
        cursor: pointer;
        color: ${(props) => props.theme.textColor.primary};
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-left: 0px;
        margin-right: 0px;
        font-size: 15px;
    }
`;

const TableContainer = styled(FlexDivColumn)`
    overflow: auto;
`;

const SelectContainer = styled(FlexDiv)`
    width: 230px;
    justify-content: flex-end;
    margin-right: 2px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 120px;
    }
`;

export default Transactions;
