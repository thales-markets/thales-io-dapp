import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumn, FlexDivColumnCentered } from 'styles/common';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 170px 160px min-content;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top top' 'upper-left upper-right' 'bottom bottom';
    margin-bottom: 30px;
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        grid-template-columns: 1fr;
        grid-template-areas: 'top' 'upper-left' 'upper-right' 'bottom';
        grid-template-rows: 350px auto auto auto;
    }
`;

export const Top = styled.div`
    grid-area: top;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const UpperLeft = styled.div`
    grid-area: upper-left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const UpperRight = styled.div`
    grid-area: upper-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Bottom = styled.div`
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    > div {
        /* width: 390px; */
    }
    > div > span {
        font-size: 13px;
        text-transform: none;
    }
    > div > span:nth-child(2) {
        font-family: Nunito;
    }
`;

export const StakeButtonDiv = styled(FlexDivColumnCentered)`
    align-items: center;
`;

export const StakeInputContainer = styled.div<{ marginTop?: number; mediaMarginBottom?: number }>`
    display: flex;
    flex-direction: column;
    position: relative;
    ${(props) => (props.marginTop ? 'margin-top: ' + props.marginTop + 'px;' : '')}
    @media (max-width: 1192px) {
        ${(props) => (props.mediaMarginBottom ? 'margin-bottom: ' + props.mediaMarginBottom + 'px;' : '')}
    }
`;

export const ClaimMessage = styled.div<{ invisible?: boolean; color?: string; above?: boolean }>`
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: ${(props) => (props.color ? props.color : props.theme.warning.textColor.primary)};
    ${(props) => (props.above ? 'margin-bottom: 10px;' : 'margin-top: 10px;')}
    visibility: ${(props) => (props.invisible ? 'hidden' : 'visible')};
    min-height: 16px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
    }
`;

export const WarningMessage = styled(ClaimMessage)``;

export const EarnSection = styled.section<{
    orderOnMobile?: number;
    orderOnTablet?: number;
    paddingOnMobile?: number;
    spanOnTablet?: number;
}>`
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 15px;
    color: white;
    padding: 15px 15px 10px 15px;
    max-width: 100%;
    @media screen and (max-width: 1024px) {
        grid-column: span ${(props) => props.spanOnTablet ?? 10} !important;
        order: ${(props) => props.orderOnTablet ?? 10};
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        grid-column: span 10 !important;
        order: ${(props) => props.orderOnMobile ?? 10};
        padding: ${(props) => props.paddingOnMobile ?? 2}px;
    }
`;

export const SectionContentContainer = styled(FlexDivColumn)`
    height: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0 5px 0 5px;
    }
`;

export const AboutToken = styled.div`
    padding: 10px 0;
    line-height: normal;
`;
