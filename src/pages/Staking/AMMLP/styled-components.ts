import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumn, FlexDivColumnCentered } from 'styles/common';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: fr 160px;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'bottom';
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
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
`;

export const Bottom = styled.div`
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
`;

export const SectionContentContainer = styled(FlexDivColumn)`
    height: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0 5px 0 5px;
    }
`;

export const InputContainer = styled.div<{ marginTop?: number; mediaMarginBottom?: number }>`
    display: flex;
    flex-direction: column;
    position: relative;
    ${(props) => (props.marginTop ? 'margin-top: ' + props.marginTop + 'px;' : '')}
    @media (max-width: 1192px) {
        ${(props) => (props.mediaMarginBottom ? 'margin-bottom: ' + props.mediaMarginBottom + 'px;' : '')}
    }
`;

export const ButtonContainer = styled(FlexDivColumnCentered)`
    align-items: center;
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

export const ChartsContainer = styled.div`
    font-family: Nunito;
    width: 60%;
`;
