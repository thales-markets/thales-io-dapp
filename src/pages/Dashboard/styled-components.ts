import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { AreaChart, PieChart } from 'recharts';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumnNative, FlexDivRow, FlexDivSpaceAround, FlexDivSpaceBetween } from 'styles/common';

export const Container = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 330px);
    grid-template-rows: repeat(3, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left center center upper-right' 'upper-left center center upper-right' 'bottom-left bottom-center-left bottom-right bottom-right';
    z-index: 1;
    margin: 100px 0px;
    > div {
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const MobileContainer = styled(FlexDivColumnNative)`
    width: 100%;
    justify-content: start;
    gap: 10px;
    z-index: 1;
    margin: 50px 0px;
    > div {
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    > a > div {
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const ItemUpperLeft = styled.div`
    grid-area: upper-left;
`;

export const ItemBottomLeft = styled.div`
    grid-area: bottom-left;
`;

export const ItemCenter = styled.div`
    grid-area: center;
`;

export const ItemUpperRight = styled.div`
    grid-area: upper-right;
`;

export const ItemBottomRight = styled.div`
    grid-area: bottom-right;
`;

export const ItemBottomCenterLeft = styled.div`
    grid-area: bottom-center-left;
`;

export const ItemBottomCenter = styled.div`
    grid-area: bottom;
`;

export const WidgetWrapper = styled.div<{ isDoubleHeight?: boolean; isStakingWidget?: boolean }>`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: ${(props) => (props.isDoubleHeight ? '50% 50%' : '40% 60%;')};
    grid-template-areas: 'top top' 'bottom-left bottom-right';
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        grid-template-rows: ${(props) =>
            props.isStakingWidget ? '20% 40% 40%' : props.isDoubleHeight ? '50% 50%' : '40% 60%;'};
        ${(props) =>
            props.isStakingWidget ? `grid-template-areas: 'top top' 'middle-left middle-right' 'bottom bottom'` : ''};
    }
`;

export const WidgetHeader = styled.div<{ isTwoSided?: boolean; notFlex?: boolean }>`
    grid-area: top;
    height: 100%;
    width: 100%;
    text-align: left;
    padding: 15px 20px 20px 20px;
    display: ${(props) => (props.notFlex ? '' : 'flex')};
    justify-content: ${(props) => (props.isTwoSided ? 'space-between' : '')};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 15px 20px 0px 20px;
    }
`;

export const NumericStats = styled.span`
    font-family: Nunito !important;
    font-weight: 700;
    font-size: 34px;
    line-height: 55px;
    color: ${(props) => props.theme.textColor.secondary};
`;

export const InfoText = styled.span<{ color?: string }>`
    font-family: Nunito !important;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => (props.color ? `${props.color}` : props.theme.textColor.tertiary)};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
    }
`;

export const InfoStats = styled.span<{ color?: string }>`
    font-family: Nunito !important;
    font-weight: 800;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => (props.color ? `${props.color}` : props.theme.textColor.primary)};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
    }
`;

export const TitleLabel = styled.span<{ isLink?: boolean; isHighlighted?: boolean }>`
    font-family: Nunito !important;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: ${(props) =>
        props.isLink || props.isHighlighted ? props.theme.textColor.secondary : props.theme.textColor.primary};
    display: flex;
    margin-left: ${(props) => (props.isHighlighted ? '10px' : '')};
    text-transform: ${(props) => (props.isLink ? '' : 'uppercase')};
    letter-spacing: 1px;
    align-items: baseline;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
    }
`;

export const UpperInfoSection = styled.div`
    grid-area: top;
    height: 100%;
    width: 100%;
    margin-top: 35px;
    padding: 20px 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 1px;
`;

export const InfoSection = styled.div<{
    side: string;
    direction?: string;
    justifyContent?: string;
    isStakingWidget?: boolean;
}>`
    grid-area: ${(props) => (props.side === 'left' ? 'bottom-left' : 'bottom-right')};
    height: 100%;
    width: 100%;
    padding: ${(props) => (props.side === 'left' ? '20px 0px 15px 20px' : '20px 20px 15px')};
    display: flex;
    flex-direction: ${(props) => (props.direction ? props.direction : 'column')};
    justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'end')};
    align-items: ${(props) => (props.side === 'left' ? 'start' : 'end')};
    gap: 1px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        ${(props) =>
            props.isStakingWidget ? `grid-area: ${props.side === 'left' ? '1 / 1 / 2 / 2' : '1 / 2 / 2 / 2'};` : ''};
        padding: ${(props) =>
            props.isStakingWidget ? (props.side === 'left' ? '0px 0px 0px 20px' : '0px 20px 0px') : ''};
        ${(props) => (props.isStakingWidget ? 'justify-content: flex-start' : '')};
    }
`;

export const DoubleSideSectionSpan = styled.span`
    font-family: Nunito !important;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.textColor.tertiary};
    text-wrap: nowrap;
`;

export const FlexDivFullWidthSpaceBetween = styled(FlexDivSpaceBetween)<{
    marginRight?: number;
}>`
    width: 100%;
    margin-right: ${(props) => (props.marginRight ? props.marginRight + 'px' : '')};
`;

export const FlexDivAlignStartSpaceBetween = styled(FlexDivSpaceBetween)`
    align-self: self-start;
`;

export const WidgetIcon = styled.i<{ marginLeft?: string }>`
    font-size: 25px;
    margin-right: 5px;
    margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0')};
    color: ${(props) => props.theme.textColor.primary};
`;

export const LinkArrow = styled(ArrowHyperlinkIcon)<{ color?: string }>`
    color: ${(props) => (props.color ? props.color : props.theme.textColor.primary)};
    width: 12px;
    height: 12px;
`;

export const FlexDivColumnNativeFullWidth = styled(FlexDivColumnNative)`
    width: 100%;
    margin-top: 50px;
`;

export const FlexDivSpaceAroundFullWidth = styled(FlexDivSpaceAround)`
    width: 100%;
    margin-top: -50px;
`;

export const EcosystemIcon = styled.i`
    font-size: 200px;
    color: ${(props) => props.theme.textColor.primary};
`;

export const DoubleSideInfoSection = styled.div`
    width: 100%;
    grid-area: 2 / 1 / 3 /3;
    position: relative;
`;

export const StyledPieChart = styled(PieChart)`
    display: flex;
    justify-self: center;
    align-self: flex-end;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100% !important;
    }
    .recharts-legend-item {
        padding-bottom: 5px;
    }
`;

export const ChartInnerText = styled.span`
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: rgb(255, 255, 255);
    font-family: Nunito !important;
    width: min-content;
    text-align: center;
`;

export const FullWidthInfoSection = styled(FlexDiv)`
    flex-direction: column;
    flex-wrap: wrap;
    width: 670px;
    justify-content: start;
    height: 82px;
    padding: 0px 20px;
    gap: 0px 50px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 0px 40px;
        width: 100%;
    }
`;

export const FlexDivIntegrators = styled(FlexDivRow)`
    width: 290px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

export const StyledAreaChart = styled(AreaChart)`
    margin-top: -65px;
    z-index: 1;
`;

export const ChartTooltipBox = styled.div`
    background: ${(props) => props.theme.background.quinary};
    border-radius: 8px;
    z-index: 2;
    width: 150px;
    padding: 10px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const StakingInfo = styled(FlexDivRow)`
    grid-area: top;
    margin-top: 35px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        grid-area: 2 / 1 / 2 / last-line;
        margin-top: 5px;
        display: grid;
    }
`;

export const ChartWrapper = styled(FlexDivRow)`
    grid-area: 2 / 1 / 2 / 3;
    width: 100%;
    padding: 0px 20px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        grid-area: bottom;
        height: fit-content;
        margin-top: -10px;
        margin-bottom: 20px;
        .recharts-wrapper {
            max-height: 135px !important;
        }
    }
`;
