import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    gap: 45px;
    width: 100%;
    margin-top: 40px;
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        margin-top: 20px;
        gap: 20px;
    }
`;

export const CardContainer = styled(FlexDivColumnCentered)<{ image: string; mobileImage: string }>`
    background-image: url(${(props) => props.image});
    background-size: 100% 100%;
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    border-radius: 10px;
    padding: 20px 20px 30px 20px;
    width: 100%;
    background-color: ${(props) => props.theme.background.primary};
    color: ${(props) => props.theme.textColor.primary};
    flex: 1 1 0;
    align-items: center;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        padding: 10px 20px 20px 20px;
        background-image: url(${(props) => props.mobileImage});
    }
`;

export const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
    line-height: 24.2px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 18px;
        line-height: 22px;
    }
`;

export const Description = styled.span`
    margin-top: 25px;
    font-size: 14px;
    font-weight: 600;
    line-height: 16.94px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 20px;
    }
`;

export const Icon = styled.i<{ fontSize: string }>`
    color: ${(props) => props.theme.textColor.secondary};
    display: flex;
    font-size: ${(props) => props.fontSize};
    align-items: center;
    margin: 10px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 50px;
    }
`;

export const LottieContainer = styled(FlexDivCentered)`
    width: 100px;
    height: 76px;
    margin-top: 0px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 0;
    }
`;
