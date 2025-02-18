import { ScreenSizeBreakpoint } from 'enums/ui';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    @media (max-width: 1024px) {
        width: 100vw;
        margin-top: 50px;
        padding: 0 40px;
        z-index: 1;
    }
`;

export const OverContainer = styled(FlexDivRow)`
    width: 100%;
    margin-top: 40px;
`;

export const OverLeftContainer = styled(FlexDivColumnCentered)`
    width: 60%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: left;
    }
`;

export const OverRightContainer = styled(FlexDivColumnCentered)`
    width: 40%;
    padding: 0 0 0 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: center;
        img {
            height: 300px;
            width: 300px;
        }
    }
`;

export const SectionContainer = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 18px;
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
        line-height: 25px;
    }
`;

export const List = styled.ul<{ margin?: boolean }>`
    list-style: disc;
    color: ${(props) => props.theme.textColor.primary};
    list-style-position: inside;
    margin: 20px 0px;
`;

export const ListItem = styled.li<{ bold?: boolean }>`
    margin-bottom: 10px;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 700;
    font-size: 18px;
    line-height: 21.6px;
    text-align: justify;
`;

export const ChartContainer = styled(FlexDivCentered)`
    position: relative;
    margin: 20px 0;
`;

export const ChartLabel = styled.span`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    color: ${(props) => props.theme.textColor.primary};
    text-align: center;
`;

export const CustomHashLink = styled(HashLink)`
    color: ${(props) => props.theme.textColor.primary};
`;
