import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn, FlexDivColumnCentered, FlexDivRow, FlexDivSpaceBetween } from 'styles/common';

export const Container = styled(FlexDivColumnCentered)`
    align-items: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding-top: 10px;
    }
`;

export const TableHeaderContainer = styled(FlexDivRow)`
    margin: 0 30px 20px 30px;
    width: 55%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        padding: 0;
        gap: 10px;
        width: 100%;
    }
`;

export const TableContainer = styled(FlexDivColumn)`
    position: relative;
    align-items: center;
    padding: 0 30px;
    width: 60%;
    > div {
        overflow: hidden;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        width: 100%;
        > div {
            overflow: auto;
        }
    }
`;

export const Info = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-left: 0;
        margin-bottom: 10px;
    }
`;
export const Address = styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
    }
`;

export const Amount = styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
    }
`;

export const ArrowIcon = styled(ArrowHyperlinkIcon)`
    width: 12px;
    height: 12px;
    margin-left: 4px;
    margin-top: 5px;
`;

export const Icon = styled.i`
    font-size: 25px;
    margin-right: 5px;
    color: ${(props) => props.theme.textColor.primary};
`;

export const ColoredInfo = styled.span`
    color: ${(props) => props.theme.textColor.secondary};
`;

export const ChartTooltipBox = styled.div`
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    z-index: 2;
    width: 180px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ChartWrapper = styled(FlexDiv)`
    width: 100%;
    justify-content: center;
    position: relative;
`;

export const ChartInnerText = styled(FlexDivColumnCentered)`
    position: absolute;
    top: 206px;
    width: 245px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        top: 190px;
    }
`;

export const ChartLabel = styled(FlexDivSpaceBetween)<{
    direction?: string;
}>`
    width: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: ${(props) => (props.direction ? `${props.direction}` : '')};
    }
`;
