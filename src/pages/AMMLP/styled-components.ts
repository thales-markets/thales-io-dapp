import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn, FlexDivColumnCentered } from 'styles/common';

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
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

export const Top = styled.div`
    grid-area: top;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div:first-child {
        margin-bottom: 20px;
    }
    > div {
        height: 100%;
    }
`;

export const Middle = styled.div`
    grid-area: bottom;
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
    padding: 10px 0;
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
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        > ${FlexDiv} {
            flex-direction: column-reverse;
        }
    }
`;

export const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.primary};
        text-align: right;
        font-family: NunitoBold;
        line-height: 155%;
    }
`;

export const StakingButton = styled.button<{ padding?: string; disabled?: boolean; width?: string }>`
    cursor: pointer;
    color: ${(props) => props.theme.background.primary};
    padding: ${(props) => props.padding || '5px 15px'};
    border-radius: 8px;
    border: 0;
    background: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 13px;
    text-transform: uppercase;
    width: ${(props) => props.width || 'auto'};
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const SectionDescription = styled.div`
    line-height: 180%;
    text-align: justify;
    margin-bottom: 10px;
    a {
        color: ${(props) => props.theme.textColor.secondary};
        &:hover {
            text-decoration: underline;
        }
    }
    span {
        font-weight: bold;
    }
`;

export const SectionTitle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor.primary};
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
    text-transform: uppercase;
    > span > i {
        margin-right: 5px;
    }
    > span > div {
        color: #fff;
        font-family: NunitoBold;
        font-size: 14px;
        font-style: normal;
        margin-top: 5px;
        margin-left: 3px;
        text-transform: none;
    }
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const RoundEndContainer = styled(FlexDivColumn)`
    color: white;
    gap: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 15px;
    line-height: 15px;
    margin-bottom: 10px;
    span {
        font-size: 15px;
        font-weight: 600;
        color: ${(props) => props.theme.textColor.secondary};
        line-height: 15px;
    }
    @media (max-width: 1199px) {
        font-size: 15px;
        line-height: 15px;
        span {
            font-size: 15px;
            line-height: 15px;
        }
    }
`;

export const RoundEndLabel = styled.p``;

export const RoundEnd = styled.p`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 15px;
    color: ${(props) => props.theme.textColor.secondary};
    line-height: 15px;
`;

export const RoundInfoContainer = styled(FlexDivColumn)`
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
`;

export const RoundInfoLabel = styled.p``;

export const RoundInfo = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor.secondary};
    line-height: 15px;
`;

export const SwitchContainer = styled.div`
    margin-bottom: 25px;
`;

export const CloseRoundButton = styled.button`
    background: transparent;
    border: none;
    border-radius: 3px;
    font-family: NunitoExtraBold;
    font-size: 13px;
    line-height: 20px;
    background: ${(props) => props.theme.button.background.tertiary};
    color: ${(props) => props.theme.button.textColor.tertiary};
    text-transform: uppercase;
    cursor: pointer;
    padding: 0 10px;
    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;
