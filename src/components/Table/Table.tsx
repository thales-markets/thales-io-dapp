import MobileDropdownMenu from 'components/MobileDropdownMenu';
import SPAAnchor from 'components/SPAAnchor';
import SimpleLoader from 'components/SimpleLoader/SimpleLoader';
import React, { DependencyList, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    Cell,
    Column,
    DefaultSortTypes,
    Row,
    SortByFn,
    useFlexLayout,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table';
import { getIsMobile } from 'redux/modules/ui';
import { FlexDivColumn } from 'styles/common';
import {
    LoaderContainer,
    NoDataContainer,
    Pagination,
    PaginationContainer,
    TableArrow,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableRowMobile,
    TableView,
} from './styled-components';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_SIZE_NO_PAGINATION = 1000;

type ColumnWithSorting<D extends Record<string, unknown>> = Column<D> & {
    sortType?: string | SortByFn<D> | DefaultSortTypes;
    sortable?: boolean;
};

type TableProps = {
    data: Record<string, unknown>[];
    columns: ColumnWithSorting<Record<string, unknown>>[];
    columnsDeps?: DependencyList;
    options?: any;
    onTableRowClick?: (row: Row<any>) => void;
    onTableCellClick?: (row: Row<any>, cell: Cell<any>) => void;
    isLoading?: boolean;
    noResultsMessage?: React.ReactNode;
    initialState?: any;
    searchQuery?: string;
    hidePagination?: boolean;
    hasStickyRow?: boolean;
    preventMobileView?: boolean;
    defaultPageSize?: number;
    stickyRow?: JSX.Element;
};

const Table: React.FC<TableProps> = ({
    data = [],
    columns = [],
    columnsDeps = [],
    options = {},
    onTableRowClick = undefined,
    onTableCellClick = undefined,
    isLoading = false,
    noResultsMessage = null,
    initialState = {},
    searchQuery,
    hidePagination,
    stickyRow,
    defaultPageSize,
}) => {
    const { t } = useTranslation();

    // eslint-disable-next-line
    const memoizedColumns = useMemo(() => columns, [...columnsDeps, t]);

    useEffect(() => {
        setGlobalFilter(searchQuery);
        // eslint-disable-next-line
    }, [searchQuery]);

    const isMobile = useSelector(getIsMobile);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        gotoPage,
        setPageSize,
    } = useTable(
        {
            columns: memoizedColumns,
            data,
            ...options,
            initialState,
            autoResetPage: false,
            autoResetSortBy: false,
            autoResetGlobalFilter: false,
            autoResetRowState: false,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useFlexLayout
    );

    const { pageIndex, pageSize, sortBy } = state;

    const handleChangePage = (_event: any, newPage: number) => {
        gotoPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(Number(event.target.value));
        gotoPage(0);
    };

    useEffect(() => {
        setPageSize(hidePagination ? DEFAULT_PAGE_SIZE_NO_PAGINATION : defaultPageSize || DEFAULT_PAGE_SIZE);
    }, [defaultPageSize, hidePagination, setPageSize]);

    useEffect(() => {
        gotoPage(0);
    }, [sortBy, searchQuery, gotoPage]);

    const sortHeaderMenus = useMemo(() => {
        const menuItems: any = [];

        headerGroups.forEach((headerGroup: any) => {
            headerGroup.headers.map((column: any) => {
                if (column.sortable) {
                    menuItems.push({
                        active: false,
                        onClick: column.toggleSortBy,
                        title: column.render('Header'),
                        sortableIndex: 0,
                        sortable: true,
                        clearSort: column.clearSortBy,
                    });
                }
            });
        });
        return menuItems;
    }, [headerGroups]);

    return (
        <>
            <>
                {isMobile ? (
                    data.length > 0 && (
                        <MobileDropdownMenu
                            buttonTitle={t('common.sort-menu')}
                            dropdownTitle={t('common.sort-menu')}
                            items={sortHeaderMenus}
                        />
                    )
                ) : (
                    <TableHeader>
                        {headerGroups.map((headerGroup: any, headerGroupIndex: any) => (
                            <TableRow key={headerGroupIndex} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any, columnIndex: number) => (
                                    <TableCell
                                        key={columnIndex}
                                        {...column.getHeaderProps(
                                            column.sortable ? column.getSortByToggleProps() : undefined
                                        )}
                                    >
                                        {column.render('Header')}
                                        {column.sortable && (
                                            <TableArrow
                                                className={`icon ${
                                                    column.isSorted
                                                        ? column.isSortedDesc
                                                            ? 'icon--caret-down'
                                                            : 'icon--caret-up'
                                                        : 'icon--caret-double'
                                                }`}
                                            />
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                )}

                <TableView {...getTableProps()}>
                    {isLoading ? (
                        <LoaderContainer>
                            <SimpleLoader />
                        </LoaderContainer>
                    ) : data.length === 0 ? (
                        <NoDataContainer>{noResultsMessage || t('common.no-data')}</NoDataContainer>
                    ) : (
                        <FlexDivColumn>
                            {stickyRow}
                            <TableBody {...getTableBodyProps()} isMobile={isMobile}>
                                {page.map((row: any, rowIndex: number) => {
                                    prepareRow(row);
                                    const rowComponent = (
                                        <TableRow
                                            key={rowIndex}
                                            {...row.getRowProps()}
                                            onClick={onTableRowClick ? () => onTableRowClick(row) : undefined}
                                            isMobile={isMobile}
                                            isClaimed={row.original.claimed}
                                            isClaimable={row.original.claimable}
                                        >
                                            {row.cells.map((cell: any, cellIndex: number) => {
                                                return isMobile ? (
                                                    <TableRowMobile key={`mrm${rowIndex}${cellIndex}`}>
                                                        <TableCell key={`mh${cellIndex}`} {...cell.getCellProps()}>
                                                            {cell.render('Header')}
                                                        </TableCell>
                                                        <TableCell {...cell.getCellProps()} key={`mc${cellIndex}`}>
                                                            {cell.render('Cell')}
                                                        </TableCell>
                                                    </TableRowMobile>
                                                ) : (
                                                    <TableCell
                                                        key={cellIndex}
                                                        {...cell.getCellProps()}
                                                        onClick={
                                                            onTableCellClick
                                                                ? () => onTableCellClick(row, cell)
                                                                : undefined
                                                        }
                                                    >
                                                        {cell.render('Cell')}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );

                                    if (row.original.link) {
                                        return (
                                            <SPAAnchor href={row.original.link} key={rowIndex}>
                                                {rowComponent}
                                            </SPAAnchor>
                                        );
                                    }

                                    if (row.original.sticky) return;

                                    return rowComponent;
                                })}
                            </TableBody>
                        </FlexDivColumn>
                    )}
                </TableView>
            </>
            {!hidePagination && data.length > 0 && (
                <PaginationContainer>
                    <tbody>
                        <tr>
                            <Pagination
                                rowsPerPageOptions={[10, 20, 50, 100]}
                                count={data.length ? data.length : 0}
                                rowsPerPage={pageSize}
                                page={pageIndex}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage={t('common.pagination.rows-per-page')}
                            />
                        </tr>
                    </tbody>
                </PaginationContainer>
            )}
        </>
    );
};

export default Table;
