import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    gap: 30px;
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

export const LeftContainer = styled(FlexDivColumnCentered)`
    padding: 0 10px 0 100px;
`;

export const RightContainer = styled(FlexDivColumnCentered)`
    padding: 0 40px 0 0;
`;

export const SectionContainer = styled.div`
    margin-bottom: 40px;
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor.senary};
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Value = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    margin-top: 10px;
    font-size: 24px;
    font-weight: 600;
    line-height: 25px;
`;

export const OverValue = styled(Value)`
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 64px;
    font-weight: 700;
    line-height: 64px;
`;
