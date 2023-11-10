import styled from 'styled-components';
import { FlexDivSpaceBetween } from 'styles/common';

export const Container = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 330px);
    grid-template-rows: repeat(3, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left top top upper-right' 'upper-left middle-left middle-right upper-right' 'bottom-left bottom bottom bottom-right';
    z-index: 1;
    > div {
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

export const ItemTop = styled.div`
    grid-area: top;
`;

export const ItemUpperRight = styled.div`
    grid-area: upper-right;
`;

export const ItemBottomRight = styled.div`
    grid-area: bottom-right;
`;

export const ItemMiddleLeft = styled.div`
    grid-area: middle-left;
`;

export const ItemMiddleRight = styled.div`
    grid-area: middle-right;
`;

export const ItemBottomCenter = styled.div`
    grid-area: bottom;
`;

export const WidgetWrapper = styled.div<{ isDoubleHeight?: boolean }>`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: ${(props) => (props.isDoubleHeight ? '50% 50%' : '40% 60%;')};
    grid-template-areas: 'top top' 'bottom-left bottom-right';
`;

export const WidgetHeader = styled.div<{ isTwoSided?: boolean; notFlex?: boolean }>`
    grid-area: top;
    height: 100%;
    width: 100%;
    text-align: left;
    padding: 20px;
    display: ${(props) => (props.notFlex ? '' : 'flex')};
    justify-content: ${(props) => (props.isTwoSided ? 'space-between' : '')};
`;

export const NumericStats = styled.span`
    font-family: Nunito !important;
    font-weight: 700;
    font-size: 40px;
    line-height: 55px;
    color: ${(props) => props.theme.textColor.secondary};
`;

export const InfoText = styled.label`
    font-family: Nunito !important;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.textColor.tertiary};
`;

export const InfoStats = styled.span`
    font-family: Nunito !important;
    font-weight: 800;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.textColor.primary};
`;

export const WidgetTitleLabel = styled.span<{ isLink?: boolean }>`
    font-family: Nunito !important;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: ${(props) => (props.isLink ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    display: flex;
    text-transform: ${(props) => (props.isLink ? '' : 'uppercase')};
    letter-spacing: 1px;
`;

export const UpperInfoSection = styled.div`
    grid-area: top;
    height: 100%;
    width: 100%;
    margin-top: 19%;
    padding: 20px 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 1px;
`;

export const InfoSection = styled.div<{ side: string }>`
    grid-area: ${(props) => (props.side === 'left' ? 'bottom-left' : 'bottom-right')};
    height: 100%;
    width: 100%;
    padding: 20px 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: ${(props) => (props.side === 'left' ? 'start' : 'end')};
    gap: 1px;
`;

export const DoubleSideSection = styled.span`
    font-family: Nunito !important;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.textColor.tertiary};
    text-wrap: nowrap;
`;

export const OneSideFlexDiv = styled(FlexDivSpaceBetween)`
    width: 100%;
`;

export const WidgetIcon = styled.i`
    font-size: 25px;
    margin-right: 5px;
    color: ${(props) => props.theme.textColor.primary};
`;
