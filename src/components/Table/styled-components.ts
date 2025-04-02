import { TablePagination } from '@material-ui/core';
import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered } from 'styles/common';

export const TableView = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    width: 100%;
    height: 100%;
    overflow-x: auto;
    position: relative;
    display: flex;
`;

export const TableCell = styled.div`
    display: flex;
    flex: 1 !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        justify-content: end;
    }
`;

export const TableRow = styled(FlexDiv)<{
    isSticky?: boolean;
    isMobile?: boolean;
    isClaimed?: boolean;
    isClaimable?: boolean;
}>`
    flex-direction: ${(props) => (props.isMobile ? 'column' : '')};
    min-height: 35px;
    font-size: 13px;
    line-height: 16px;
    align-items: center;
    color: ${(props) => (props.isSticky ? props.theme.textColor.primary : props.theme.textColor.primary)};
    border: 1px solid
        ${(props) =>
            props.isMobile
                ? props.isSticky
                    ? props.theme.borderColor.secondary
                    : props.theme.borderColor.secondary
                : props.isClaimable
                ? props.theme.borderColor.secondary
                : 'transparent'};
    border-bottom: 1px solid ${(props) => props.theme.borderColor.secondary};
    background: ${(props) => (props.isSticky ? props.theme.background.tertiary : 'transparent')};
    border-radius: ${(props) => (props.isClaimable || props.isMobile || props.isSticky ? '15px' : '0px')};
    opacity: ${(props) => (props.isClaimed ? '0.5' : '1')};
    margin: ${(props) => (props.isMobile || props.isSticky ? '10px 0 0 0' : '0')};
    i {
        color: ${(props) => (props.isSticky ? props.theme.button.textColor.primary : props.theme.textColor.primary)};
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        min-height: 30px;
        font-size: ${(props) => (props.isMobile ? '13px' : '10px')};
    }
`;

export const TableRowMobile = styled.div<{ isSticky?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 10px;

    ${TableCell} {
        height: auto;
        margin: 6px 0px;
        width: 100%;
        :first-child {
            justify-content: flex-start;
            color: ${(props) => (props.isSticky ? props.theme.textColor.tertiary : props.theme.textColor.tertiary)};
            text-transform: uppercase;
        }
    }
`;

export const TableHeader = styled(FlexDiv)`
    width: 100%;
    font-weight: 500;
    text-transform: uppercase;
    ${TableCell} {
        color: ${(props) => props.theme.textColor.tertiary};
        user-select: none;
        i {
            color: ${(props) => props.theme.textColor.tertiary};
        }
    }
    ${TableRow} {
        width: 100%;
        border-bottom: none;
    }
`;

export const TableBody = styled.div<{ isMobile?: boolean }>`
    width: 100%;
    color: ${(props) => props.theme.textColor.primary};
    overflow: auto;
`;

export const TableArrow = styled.i`
    margin-left: 5px;
    font-size: 10px;
    text-transform: none;
    &.thales-icon--double-arrow {
        font-size: 12px;
    }
`;

export const NoDataContainer = styled(TableRow)`
    justify-content: center;
    margin: 20px 0px;
    font-size: 15px;
    font-weight: bold;
    border: none;
    width: 100%;
    height: 20px;
    text-align: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
    }
  }
`;

export const LoaderContainer = styled(FlexDivCentered)`
    position: relative;
    min-height: 220px;
    width: 100%;
`;

export const PaginationContainer = styled.table`
    width: 100%;
`;

export const Pagination = styled(TablePagination)`
    border: none !important;
    display: flex;
    width: 100%;
    height: auto;
    color: ${(props) => props.theme.textColor.tertiary} !important;
    .MuiToolbar-root {
        padding: 0;
        display: flex;
        .MuiSelect-icon {
            color: ${(props) => props.theme.textColor.tertiary};
        }
    }
    .MuiIconButton-root.Mui-disabled {
        color: ${(props) => props.theme.background.secondary};
        opacity: 0.5;
    }
    .MuiTablePagination-toolbar > .MuiTablePagination-caption:last-of-type {
        display: block;
    }
    .MuiTablePagination-selectRoot {
        @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
            margin-left: 0px;
            margin-right: 10px;
        }
    }
    .MuiIconButton-root {
        @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
            padding: 6px;
        }
    }
`;
