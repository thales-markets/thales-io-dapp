import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumnCentered } from 'styles/common';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    @media (max-width: 1024px) {
        width: 100vw;
        margin-top: 50px;
        padding: 0 20px;
        z-index: 1;
    }
`;

export const OverContainer = styled(FlexDiv)`
    width: 100%;
    margin-top: 40px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 0px;
        flex-direction: column;
    }
`;

export const OverLeftContainer = styled(FlexDivColumnCentered)`
    flex-basis: 65%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: left;
    }
`;

export const OverRightContainer = styled(FlexDivColumnCentered)<{ padding?: string }>`
    flex-basis: 35%;
    padding: ${(props) => props.padding || '20px'};
    img {
        height: 500px;
        width: 500px;
    }
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
    a {
        color: ${(props) => props.theme.link.textColor.primary};
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

export const LinkArrow = styled(ArrowHyperlinkIcon)<{ color?: string }>`
    color: ${(props) => props.theme.textColor.secondary};
    width: 14px;
    height: 14px;
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
