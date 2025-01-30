import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    font-family: MontserratLight;
    gap: 30px;
    width: 100%;
    margin-top: 20px;
`;

export const LeftContainer = styled(FlexDivRow)`
    gap: 30px;
    flex: 1 1 0;
`;

export const RightContainer = styled(FlexDivColumn)`
    gap: 30px;
    flex: 1 1 0;
`;

export const CardContainer = styled(FlexDivRow)`
    padding: 50px;
    width: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.background.primary};
    border: 1px solid ${(props) => props.theme.borderColor.tertiary};
    color: ${(props) => props.theme.textColor.primary};
    flex: 1 1 0;
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
`;

export const Description = styled.span`
    font-size: 14px;
    font-weight: 600;
    line-height: 16.8px;
    text-align: justify;
    margin-top: 25px;
`;

export const Action = styled(FlexDivCentered)`
    font-family: MontserratBold;
    height: 50px;
    background-color: ${(props) => props.theme.button.background.tertiary};
    color: ${(props) => props.theme.button.textColor.tertiary};
    border-radius: 8px;
    font-size: 16px;
    line-height: 19.36px;
    text-transform: uppercase;
    margin-left: 40px;
`;

export const Icon = styled.i<{ fontSize: string }>`
    display: flex;
    font-size: ${(props) => props.fontSize};
    height: 100px;
    align-items: center;
`;
