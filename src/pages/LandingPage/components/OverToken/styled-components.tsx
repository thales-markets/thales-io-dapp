import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    width: 100%;
    margin-top: -150px;
    margin-bottom: -100px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        margin-top: 0px;
        margin-bottom: -10px;
    }
`;

export const LeftContainer = styled(FlexDivColumnCentered)`
    padding: 0 0 0 120px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: left;
    }
`;

export const RightContainer = styled(FlexDivColumnCentered)`
    padding: 0 40px 0 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: center;
        svg {
            height: 300px;
            width: 300px;
        }
    }
`;

export const SectionContainer = styled.div`
    margin-bottom: 40px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        text-align: left;
        margin-bottom: 20px;
    }
`;

export const Title = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
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
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        line-height: 20px;
    }
`;

export const OverDescription = styled(Description)`
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 64px;
    font-weight: 700;
    line-height: 64px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 35px;
        line-height: 40px;
    }
`;
