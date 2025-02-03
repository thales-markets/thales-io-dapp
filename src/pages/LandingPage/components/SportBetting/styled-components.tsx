import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    gap: 40px;
    width: 100%;
    margin-top: 40px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
    flex: 1 1 0;
`;

export const CardContainer = styled(FlexDivColumnCentered)<{ image: string }>`
    background-image: url(${(props) => props.image});
    padding: 20px 20px 30px 20px;
    width: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.background.primary};
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    color: ${(props) => props.theme.textColor.primary};
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        padding: 10px 20px 20px 20px;
    }
    align-items: center;
`;

export const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
    line-height: 24.2px;
`;

export const Description = styled.span`
    margin-top: 25px;
    font-size: 14px;
    font-weight: 600;
    line-height: 16.94px;
`;

export const Icon = styled.i<{ fontSize: string }>`
    color: ${(props) => props.theme.textColor.secondary};
    display: flex;
    font-size: ${(props) => props.fontSize};
    height: 100px;
    align-items: center;
`;
