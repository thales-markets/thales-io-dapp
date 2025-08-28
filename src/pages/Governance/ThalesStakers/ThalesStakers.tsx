import SearchInput from 'components/SearchInput';
import SimpleLoader from 'components/SimpleLoader';
import Table from 'components/Table';
import Tooltip from 'components/Tooltip';
import { THALES_CURRENCY } from 'constants/currency';
import { StakersFilterEnum } from 'enums/governance';
import { Network } from 'enums/network';
import makeBlockie from 'ethereum-blockies-base64';
import { ethers } from 'ethers';
import useDebouncedMemo from 'hooks/useDebouncedMemo';
import { RPC_LIST } from 'pages/Root/Root';
import useStakingDataQuery from 'queries/dashboard/useStakingDataQuery';
import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import useThalesStakersQuery from 'queries/useThalesStakersQuery';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CellProps } from 'react-table';
import { Cell, Tooltip as ChartTooltip, Pie } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getNetworkId } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { Colors, FlexDiv } from 'styles/common';
import { formatCurrency, formatCurrencyWithKey, getEtherscanAddressLink, truncateAddress } from 'thales-utils';
import { DEFAULT_SEARCH_DEBOUNCE_MS } from 'thales-utils/src/constants/defaults';
import { EnsNames, Staker, Stakers } from 'types/governance';
import { StakingData, TokenInfo } from 'types/token';
import networkConnector from 'utils/networkConnector';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { Blockie, InfoStats, InfoText, LoaderContainer, StyledLink, StyledPieChart } from '../styled-components';
import {
    Address,
    Amount,
    ArrowIcon,
    ChartInnerText,
    ChartLabel,
    ChartTooltipBox,
    ChartWrapper,
    ColoredInfo,
    Container,
    Icon,
    Info,
    TableContainer,
    TableHeaderContainer,
} from './styled-components';

const ChartColors = [
    Colors.CHINA_PINK,
    Colors.VIOLET,
    Colors.ORANGE,
    Colors.CYAN,
    Colors.DARK_BLUE,
    Colors.BLUE,
    Colors.RED,
    Colors.BLUEBERRY,
    Colors.DARK_GREEN,
];

type TableData = {
    id: string;
    timestamp: number;
    stakedAmount: number;
    escrowedAmount: number;
    totalStakedAmount: number;
    unstakingAmount: number;
    ensName: string | null;
    percentageOfCirculatingSupply: number;
    percentageOfStakedSupply: number;
};

const ThalesStakers: React.FC = () => {
    const { t } = useTranslation();
    const isMobile = useSelector(getIsMobile);
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const [addressSearch, setAddressSearch] = useState<string>('');
    const [ensNames, setEnsNames] = useState<EnsNames | undefined>(undefined);
    const [filter, setFilter] = useState<StakersFilterEnum>(StakersFilterEnum.All);
    const [stakingData, setStakingData] = useState<StakingData | undefined>(undefined);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);

    const stakersQuery = useThalesStakersQuery(filter, {
        enabled: isAppReady,
    });

    const stakingDataQuery = useStakingDataQuery({
        enabled: isAppReady,
    });

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            setStakingData(stakingDataQuery.data);
        }
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data]);

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    const stakers: Staker[] = useMemo(() => (stakersQuery.isSuccess && stakersQuery.data ? stakersQuery.data : []), [
        stakersQuery.isSuccess,
        stakersQuery.data,
    ]);

    const pieData = useMemo(() => {
        const data: any[] = [];
        if (stakers.length > 0) {
            stakers
                .filter((staker: Staker) => staker.totalStakedAmount >= 50000)
                .forEach((staker: Staker, index: number) => {
                    const stakerData = {
                        name: staker.id,
                        value: staker.totalStakedAmount,
                        color: ChartColors[Math.round(index % ChartColors.length)],
                    };
                    data.push(stakerData);
                });
        }

        return data;
    }, [stakers]);

    const outerPieData = useMemo(() => {
        const data = [];
        if (stakers.length > 0 && stakingData) {
            const smallStakersTotal = stakers
                .filter((staker: Staker) => staker.totalStakedAmount <= 10000)
                .map((staker: Staker) => staker.totalStakedAmount)
                .reduce((sum, current) => sum + current, 0);

            const middleStakersTotal = stakers
                .filter((staker: Staker) => staker.totalStakedAmount > 10000 && staker.totalStakedAmount < 50000)
                .map((staker: Staker) => staker.totalStakedAmount)
                .reduce((sum, current) => sum + current, 0);

            const smallStakersPiece = {
                name: 'Stakers below 10k',
                value: smallStakersTotal,
                color: Colors.BLUEBERRY,
            };
            const middleStakersPiece = {
                name: 'Stakers between 10k and 50k',
                value: middleStakersTotal,
                color: Colors.INDIAN_RED,
            };
            const restOfStakers = {
                name: 'Rest of stakers',
                value: stakingData.totalStakedAmount - smallStakersTotal - middleStakersTotal,
                color: 'transparent',
            };
            data.push(smallStakersPiece, middleStakersPiece, restOfStakers);
        }

        return data;
    }, [stakers, stakingData]);

    useEffect(() => {
        const getEnsNames = async (stakers: Stakers) => {
            const records: EnsNames = {};
            const names = await Promise.all(
                stakers.map((staker: Staker) => (networkConnector as any).provider.lookupAddress(staker.id))
            );
            for (let index = 0; index < stakers.length; index++) {
                records[stakers[index].id] = names[index];
            }
            setEnsNames(records);
        };

        if (networkId === Network.Mainnet) {
            getEnsNames(stakers);
        }
    }, [stakers, networkId]);

    const findByEnsName = (address: string) => {
        if (ensNames && ensNames[address]) {
            const ensName = ensNames[address];
            return ensName !== null && ensName.toLowerCase().includes(addressSearch.toLowerCase());
        }
        return false;
    };

    const tableData: TableData[] = useMemo(() => {
        if (
            stakersQuery.isSuccess &&
            stakersQuery.data &&
            tokenInfoQuery.isSuccess &&
            tokenInfoQuery.data &&
            stakingData
        ) {
            return stakersQuery.data.map((staker: Staker) => {
                const percentageOfCirculatingSupply = tokenInfoQuery.data
                    ? (staker.totalStakedAmount / tokenInfoQuery.data.circulatingSupply) * 100
                    : 0;

                const percentageOfStakedSupply =
                    tokenInfoQuery.data && stakingData
                        ? (staker.totalStakedAmount / stakingData.totalStakedAmount) * 100
                        : 0;

                return {
                    id: staker.id,
                    timestamp: staker.timestamp,
                    stakedAmount: staker.stakedAmount,
                    escrowedAmount: staker.escrowedAmount,
                    totalStakedAmount: staker.totalStakedAmount,
                    unstakingAmount: staker.unstakingAmount,
                    ensName: staker.ensName,
                    percentageOfCirculatingSupply: percentageOfCirculatingSupply,
                    percentageOfStakedSupply: percentageOfStakedSupply,
                };
            });
        }
        return [];
    }, [stakersQuery.isSuccess, stakersQuery.data, tokenInfoQuery.isSuccess, tokenInfoQuery.data, stakingData]);

    const searchFilteredTableData = useDebouncedMemo(
        () => {
            return addressSearch
                ? tableData.filter((tableObject: TableData) => {
                      return (
                          tableObject.id.toLowerCase().includes(addressSearch.toLowerCase()) ||
                          findByEnsName(tableObject.id)
                      );
                  })
                : tableData;
        },
        [tableData, addressSearch],
        DEFAULT_SEARCH_DEBOUNCE_MS
    );

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            if (payload[0].payload.name.toLowerCase() == 'rest of stakers') return <></>;
            return (
                <ChartTooltipBox>
                    <InfoText color={Colors.WHITE}>
                        {payload[0].payload.name.toLowerCase() == 'stakers below 10k' ||
                        payload[0].payload.name.toLowerCase() == 'stakers between 10k and 50k'
                            ? payload[0].payload.name
                            : truncateAddress(payload[0].payload.name)}
                    </InfoText>
                    <InfoStats>{formatCurrency(payload[0].payload.value, 2)}</InfoStats>
                </ChartTooltipBox>
            );
        }

        return null;
    };

    const totalStakedAmount = stakingData ? stakingData.totalStakedAmount : 0;
    const stakedOfCirculatingSupplyPercentage =
        stakingData && tokenInfo ? (stakingData?.totalStakedAmount / tokenInfo?.circulatingSupply) * 100 : 0;

    return (
        <Container>
            <Info>
                <Icon className="icon icon--people" />
                <span>{t('governance.stakers.number-of-stakers')}: </span>
                <ColoredInfo>{stakersQuery.isLoading ? '-' : formatCurrency(stakers.length, 0, true)}</ColoredInfo>
            </Info>
            <ChartWrapper>
                {stakersQuery.isLoading ? (
                    <LoaderContainer height={350}>
                        <SimpleLoader />
                    </LoaderContainer>
                ) : (
                    <>
                        <ChartInnerText>
                            <ChartLabel direction={'column'}>
                                <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                                <InfoStats>{formatCurrency(totalStakedAmount)}</InfoStats>
                            </ChartLabel>
                            <ChartLabel direction={'column'}>
                                <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                                <InfoStats>{stakedOfCirculatingSupplyPercentage.toFixed(2)}%</InfoStats>
                            </ChartLabel>
                        </ChartInnerText>
                        <StyledPieChart width={450} height={450}>
                            <Pie
                                isAnimationActive={false}
                                blendStroke={true}
                                data={pieData}
                                dataKey={'value'}
                                innerRadius={130}
                                outerRadius={170}
                                cx="50%"
                                cy="50%"
                                fill="#82ca9d"
                            >
                                {pieData.map((slice, index) => (
                                    <Cell style={{ outline: 'none' }} key={index} fill={slice.color} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<CustomTooltip />} />
                            <Pie
                                isAnimationActive={false}
                                blendStroke={true}
                                data={outerPieData}
                                dataKey={'value'}
                                innerRadius={180}
                                outerRadius={200}
                                cx="50%"
                                cy="50%"
                            >
                                {outerPieData.map((slice, index) => (
                                    <Cell style={{ outline: 'none' }} key={index} fill={slice.color} />
                                ))}
                            </Pie>
                        </StyledPieChart>
                    </>
                )}
            </ChartWrapper>

            <TableHeaderContainer>
                <Dropdown
                    options={Object.values(StakersFilterEnum)}
                    activeOption={filter}
                    onSelect={setFilter}
                    translationKey="stakers-filter"
                />

                <SearchInput
                    text={addressSearch}
                    placeholder={t('governance.stakers.search-wallet')}
                    handleChange={setAddressSearch}
                    width={isMobile ? '100%' : '320px'}
                />
            </TableHeaderContainer>
            <TableContainer>
                <Table
                    columns={
                        isMobile
                            ? [
                                  {
                                      Header: <>{t('governance.stakers.staker-col')}</>,
                                      accessor: 'id',
                                      Cell: (cellProps: CellProps<TableData, TableData['id']>) => (
                                          <StyledLink
                                              href={getEtherscanAddressLink(Network.Mainnet, cellProps.cell.value)}
                                              target="_blank"
                                              rel="noreferrer"
                                          >
                                              <FlexDiv style={{ textAlign: 'left' }}>
                                                  <Blockie
                                                      src={makeBlockie(cellProps.cell.value)}
                                                      style={{ marginBottom: 2 }}
                                                  />
                                                  <StakerCell staker={cellProps.cell.row.original} />
                                                  <ArrowIcon />
                                              </FlexDiv>
                                          </StyledLink>
                                      ),
                                      sortable: true,
                                  },
                                  {
                                      Header: <>{t('governance.stakers.total-staked-col')}</>,
                                      accessor: 'totalStakedAmount',
                                      Cell: (cellProps: CellProps<TableData, TableData['totalStakedAmount']>) => {
                                          const amountTooltip = `${formatCurrencyWithKey(
                                              THALES_CURRENCY,
                                              cellProps.cell.row.original.stakedAmount
                                          )} (${t(
                                              'governance.stakers.tooltip-staked-directly'
                                          )}) + ${formatCurrencyWithKey(
                                              THALES_CURRENCY,
                                              cellProps.cell.row.original.escrowedAmount
                                          )} (${t('governance.stakers.tooltip-escrowed-amount')})`;

                                          return (
                                              <Tooltip overlay={amountTooltip}>
                                                  <Amount>
                                                      {formatCurrencyWithKey(THALES_CURRENCY, cellProps.cell.value)}
                                                  </Amount>
                                              </Tooltip>
                                          );
                                      },
                                      sortable: true,
                                  },
                              ]
                            : [
                                  {
                                      Header: <>{t('governance.stakers.staker-col')}</>,
                                      accessor: 'id',
                                      Cell: (cellProps: CellProps<TableData, TableData['id']>) => (
                                          <StyledLink
                                              href={getEtherscanAddressLink(Network.Mainnet, cellProps.cell.value)}
                                              target="_blank"
                                              rel="noreferrer"
                                          >
                                              <FlexDiv style={{ textAlign: 'left' }}>
                                                  <Blockie
                                                      src={makeBlockie(cellProps.cell.value)}
                                                      style={{ marginBottom: 2 }}
                                                  />
                                                  <StakerCell staker={cellProps.cell.row.original} />
                                                  <ArrowIcon />
                                              </FlexDiv>
                                          </StyledLink>
                                      ),
                                      sortable: true,
                                  },
                                  {
                                      Header: <>{t('governance.stakers.total-staked-col')}</>,
                                      accessor: 'totalStakedAmount',
                                      Cell: (cellProps: CellProps<TableData, TableData['totalStakedAmount']>) => {
                                          const amountTooltip = `${formatCurrencyWithKey(
                                              THALES_CURRENCY,
                                              cellProps.cell.row.original.stakedAmount
                                          )} (${t(
                                              'governance.stakers.tooltip-staked-directly'
                                          )}) + ${formatCurrencyWithKey(
                                              THALES_CURRENCY,
                                              cellProps.cell.row.original.escrowedAmount
                                          )} (${t('governance.stakers.tooltip-escrowed-amount')})`;

                                          return (
                                              <Tooltip overlay={amountTooltip}>
                                                  <Amount>
                                                      {formatCurrencyWithKey(THALES_CURRENCY, cellProps.cell.value)}
                                                  </Amount>
                                              </Tooltip>
                                          );
                                      },
                                      sortable: true,
                                  },
                                  {
                                      Header: <>{t('governance.stakers.percentage-of-staked-supply-col')}</>,
                                      accessor: 'percentageOfStakedSupply',
                                      Cell: (
                                          cellProps: CellProps<TableData, TableData['percentageOfStakedSupply']>
                                      ) => {
                                          return <Amount>{cellProps.cell.value.toFixed(2)}</Amount>;
                                      },
                                      sortable: true,
                                  },
                                  {
                                      Header: <>{t('governance.stakers.percentage-of-circulating-supply-col')}</>,
                                      accessor: 'percentageOfCirculatingSupply',
                                      Cell: (
                                          cellProps: CellProps<TableData, TableData['percentageOfCirculatingSupply']>
                                      ) => {
                                          return <Amount>{cellProps.cell.value.toFixed(2)}</Amount>;
                                      },
                                      sortable: true,
                                  },
                              ]
                    }
                    data={addressSearch ? searchFilteredTableData : tableData}
                    isLoading={stakersQuery.isLoading}
                    noResultsMessage={t('governance.stakers.no-stakers-found')}
                    searchQuery={addressSearch}
                    preventMobileView
                    initialState={{
                        sortBy: [
                            {
                                id: 'totalStakedAmount',
                                desc: true,
                            },
                        ],
                    }}
                />
            </TableContainer>
        </Container>
    );
};

type StakerCellProps = {
    staker: Staker;
};

const StakerCell: React.FC<StakerCellProps> = ({ staker }) => {
    const [stakerEns, setStakerEns] = useState<string | null>(null);

    useEffect(() => {
        const fetchVoterEns = async () => {
            const mainnetInfuraProvider = new ethers.providers.JsonRpcProvider(RPC_LIST.DRPC[Network.Mainnet].http);
            const stakerEns = await mainnetInfuraProvider.lookupAddress(staker.id);
            setStakerEns(stakerEns);
        };
        fetchVoterEns();
    }, [staker]);

    return <Address>{stakerEns != null ? stakerEns : truncateAddress(staker.id)}</Address>;
};

export default ThalesStakers;
