import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumn } from 'styles/common';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: repeat(2, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'bottom';
    margin-bottom: 100px;
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        grid-template-rows: repeat(2, auto);
    }
`;

export const Top = styled.div`
    grid-area: top;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        > ${FlexDiv} {
            flex-direction: column;
        }
    }
`;

export const Bottom = styled.div`
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        > ${FlexDiv} {
            flex-direction: column;
        }
    }
`;

export const LeaderboardBreakdownTitle = styled(FlexDivColumn)`
    color: ${(props) => props.theme.textColor.primary};
    align-items: center;
    font-size: 18px;
    text-transform: uppercase;
    > i {
        font-size: 25px;
        margin-bottom: 5px;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        margin-bottom: 10px;
        > i {
            margin-right: 5px;
            margin-bottom: 0px;
        }
    }
`;
export const TableText = styled.p`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 14px;
    font-style: normal;
    line-height: 110%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
    }
`;
export const StickyRow = styled.div`
    display: flex;
    margin-bottom: 10px;
    gap: 4px;
    cursor: pointer;

    ${TableText} {
        color: ${(props) => props.theme.button.textColor.primary};
    }

    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 30px;
    }
`;
export const StickyRowWrapper = styled.div`
    background: ${(props) => props.theme.background.primary};
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.46);
`;
export const StickyRowFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-radius: 8px;
`;
export const Icon = styled.i<{ dark?: boolean }>`
    font-size: 32px;
    color: ${(props) => (props.dark ? props.theme.background.primary : props.theme.textColor.primary)};
    margin-right: 6px;
`;
export const FlexWrapper = styled(FlexDivCentered)`
    flex-direction: column;
`;
export const Label = styled.span<{ dark?: boolean }>`
    color: ${(props) => (props.dark ? props.theme.background.primary : props.theme.textColor.secondary)};
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.455px;
    text-transform: capitalize;
    margin-top: 10px;
    margin-bottom: 5px;
`;
export const StickyExpandedRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    margin: auto;
    width: calc(100% - 55px);
    border-top: 1px solid ${(props) => props.theme.background.primary};
`;
const Cell = styled.div<{ hide?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
`;
export const StickyCell = styled(Cell)<{ first?: boolean; last?: boolean; hide?: boolean }>`
    color: ${(props) => props.theme.button.textColor.primary};
    width: 100%;
    margin-right: ${(props) => (props.last ? '10px' : '0')};

    border-top-left-radius: ${(props) => (props.first ? '8px' : '0')};
    border-bottom-left-radius: ${(props) => (props.first ? '8px' : '0')};

    border-top-right-radius: ${(props) => (props.last ? '8px' : '0')};
    border-bottom-right-radius: ${(props) => (props.last ? '8px' : '0')};
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        display: ${(props) => (props.hide ? 'none' : 'flex')};
    }
`;
