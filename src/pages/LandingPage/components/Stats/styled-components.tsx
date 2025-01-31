import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
    padding: 0 80px;
`;

export const LeftContainer = styled(FlexDivColumnCentered)``;

export const RightContainer = styled(FlexDivColumnCentered)`
    padding: 0 0 20px 60px;
`;

export const SectionContainer = styled.div`
    margin-bottom: 20px;
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor.senary};
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Value = styled.div`
    margin-top: 10px;
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 50px;
    font-weight: 800;
    line-height: 60.95px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 25px;
    }
`;
