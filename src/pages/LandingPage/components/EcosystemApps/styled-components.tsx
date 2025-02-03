import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    gap: 30px;
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const LeftContainer = styled(FlexDivRow)`
    gap: 30px;
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 20px;
    }
`;

export const RightContainer = styled(FlexDivColumn)`
    gap: 30px;
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 20px;
    }
`;

export const CardContainer = styled(FlexDivRow)<{ image: string }>`
    background-image: url(${(props) => props.image});
    padding: 50px;
    width: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.background.primary};
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    color: ${(props) => props.theme.textColor.primary};
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        padding: 25px;
    }
`;

export const CardContent = styled(FlexDivColumn)`
    justify-content: space-between;
`;

export const ActionContainer = styled(FlexDivColumn)`
    justify-content: end;
`;

export const Title = styled.span`
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        line-height: 18px;
    }
`;

export const Description = styled.span`
    font-size: 14px;
    font-weight: 600;
    line-height: 16.8px;
    text-align: justify;
    margin-top: 25px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        text-align: left;
    }
`;

export const Action = styled(FlexDivCentered)`
    height: 50px;
    background-color: ${(props) => props.theme.button.background.secondary};
    color: ${(props) => props.theme.button.textColor.secondary};
    border-radius: 8px;
    font-size: 16px;
    font-weight: 800;
    line-height: 19.36px;
    text-transform: uppercase;
    margin-left: 40px;
    padding: 0 10px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 30px;
        margin-top: 20px;
        margin-left: 0px;
        border-radius: 5px;
    }
`;

export const Icon = styled.i<{ fontSize: string; mobileFontSize: string }>`
    display: flex;
    font-size: ${(props) => props.fontSize};
    height: 100px;
    align-items: center;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: ${(props) => props.mobileFontSize};
    }
`;
