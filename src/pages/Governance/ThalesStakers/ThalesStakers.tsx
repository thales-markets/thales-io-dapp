import SearchInput from 'components/SearchInput';
import Table from 'components/Table';
import Tooltip from 'components/Tooltip/Tooltip';
import { THALES_CURRENCY } from 'constants/currency';
import { StakersFilterEnum } from 'enums/governance';
import { Network } from 'enums/network';
import makeBlockie from 'ethereum-blockies-base64';
import useDebouncedMemo from 'hooks/useDebouncedMemo';
import useThalesStakersQuery from 'queries/governance/useThalesStakersQuery';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CellProps } from 'react-table';
import { getIsAppReady } from 'redux/modules/app';
import { getNetworkId } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDiv } from 'styles/common';
import { formatCurrencyWithKey, getEtherscanAddressLink, truncateAddress } from 'thales-utils';
import { DEFAULT_SEARCH_DEBOUNCE_MS } from 'thales-utils/src/constants/defaults';
import { EnsNames, Staker, Stakers } from 'types/governance';
import snxJSConnector from 'utils/snxJSConnector';
import Dropdown from '../components/Dropdown/Dropdown';
import { Blockie, StyledLink } from '../styled-components';
import { Address, Amount, ArrowIcon, Container, HeaderContainer, Info, TableContainer } from './styled-components';

const ThalesStakers: React.FC = () => {
    const { t } = useTranslation();
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const [addressSearch, setAddressSearch] = useState<string>('');
    const [ensNames, setEnsNames] = useState<EnsNames | undefined>(undefined);
    const [filter, setFilter] = useState<StakersFilterEnum>(StakersFilterEnum.All);

    const stakersQuery = useThalesStakersQuery(filter, {
        enabled: isAppReady,
    });
    const stakers: Staker[] = useMemo(
        () => (stakersQuery.isSuccess && stakersQuery.data ? stakersQuery.data : []),
        [stakersQuery.isSuccess, stakersQuery.data]
    );

    useEffect(() => {
        const getEnsNames = async (stakers: Stakers) => {
            const records: EnsNames = {};
            const names = await Promise.all(
                stakers.map((staker: Staker) => (snxJSConnector as any).provider.lookupAddress(staker.id))
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

    const searchFilteredStakers = useDebouncedMemo(
        () => {
            return addressSearch
                ? stakers.filter((staker: Staker) => {
                      return staker.id.toLowerCase().includes(addressSearch.toLowerCase()) || findByEnsName(staker.id);
                  })
                : stakers;
        },
        [stakers, addressSearch],
        DEFAULT_SEARCH_DEBOUNCE_MS
    );

    return (
        <Container>
            <HeaderContainer>
                <Dropdown
                    options={Object.values(StakersFilterEnum)}
                    activeOption={filter}
                    onSelect={setFilter}
                    translationKey="stakers-filter"
                />
                <Info>
                    {`${t('governance.stakers.number-of-stakers')}: ${stakersQuery.isLoading ? '-' : stakers.length}`}
                </Info>
                <SearchInput
                    text={addressSearch}
                    placeholder={t('op-rewards.search-placeholder')}
                    handleChange={setAddressSearch}
                    width="320px"
                />
            </HeaderContainer>
            <TableContainer>
                <Table
                    columns={[
                        {
                            Header: <>{t('governance.stakers.staker-col')}</>,
                            accessor: 'id',
                            Cell: (cellProps: CellProps<Staker, Staker['id']>) => (
                                <StyledLink
                                    href={getEtherscanAddressLink(Network.Mainnet, cellProps.cell.value)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FlexDiv style={{ textAlign: 'left' }}>
                                        <Blockie src={makeBlockie(cellProps.cell.value)} style={{ marginBottom: 2 }} />
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
                            Cell: (cellProps: CellProps<Staker, Staker['totalStakedAmount']>) => {
                                const amountTooltip = `${formatCurrencyWithKey(
                                    THALES_CURRENCY,
                                    cellProps.cell.row.original.stakedAmount
                                )} (${t('governance.stakers.tooltip-staked-directly')}) + ${formatCurrencyWithKey(
                                    THALES_CURRENCY,
                                    cellProps.cell.row.original.escrowedAmount
                                )} (${t('governance.stakers.tooltip-escrowed-amount')})`;

                                return (
                                    <Tooltip overlay={amountTooltip}>
                                        <Amount>{formatCurrencyWithKey(THALES_CURRENCY, cellProps.cell.value)}</Amount>
                                    </Tooltip>
                                );
                            },
                            sortable: true,
                        },
                    ]}
                    data={addressSearch ? searchFilteredStakers : stakers}
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
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    useEffect(() => {
        const fetchStakerEns = async () => {
            const stakerEns = await (snxJSConnector as any).provider.lookupAddress(staker.id);
            setStakerEns(stakerEns);
        };
        if (networkId === Network.Mainnet) {
            fetchStakerEns();
        }
    }, [staker, networkId]);

    return <Address>{stakerEns != null ? stakerEns : truncateAddress(staker.id)}</Address>;
};

export default ThalesStakers;
