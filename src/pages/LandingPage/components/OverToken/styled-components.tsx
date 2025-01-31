import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    width: 100%;
    margin-top: -150px;
    margin-bottom: -100px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

export const LeftContainer = styled(FlexDivColumnCentered)`
    padding: 0 0 0 120px;
`;

export const RightContainer = styled(FlexDivColumnCentered)`
    padding: 0 40px 0 0;
`;

export const SectionContainer = styled.div`
    margin-bottom: 40px;
`;

export const Title = styled.div`
    color: ${(props) => props.theme.textColor.senary};
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Description = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    margin-top: 10px;
    font-size: 24px;
    font-weight: 600;
    line-height: 25px;
`;

export const OverDescription = styled(Description)`
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 64px;
    font-weight: 700;
    line-height: 64px;
`;
