import styled from 'styled-components';
import { Colors, FlexDivCentered } from 'styles/common';

export const Content = styled.div`
    margin-top: 100px;
    grid-column-start: 7;
    grid-column-end: 48;
    grid-row-start: 8;
    grid-row-end: 80;
    width: 60%;
    @media (max-width: 1024px) {
        position: absolute;
        display: block;
        top: 140px;
        width: 100vw;
        padding: 0 40px;
        z-index: 9;
        grid-column-start: unset;
        grid-column-end: unset;
        grid-row-start: unset;
        grid-row-end: unset;
    }
`;

export const H1 = styled.h1`
    font-family: Nunito !important;
    font-weight: 700;
    font-size: 50px;
    line-height: 20px;
    text-align: justify;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${Colors.WHITE};
    margin: 50px 0px;
`;

export const H2 = styled.h2`
    font-family: Nunito !important;
    font-size: 20px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 1px;
    text-align: justify;
    color: ${Colors.WHITE};
    margin-top: 40px;
    margin-bottom: 20px;
`;

export const H3 = styled.h3`
    font-family: Nunito !important;
    font-size: 18px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 1px;
    text-align: justify;
    color: ${Colors.WHITE};
    margin-top: 30px;
    margin-bottom: 15px;
`;

export const Paragraph = styled.p`
    font-size: 15px;
    line-height: 16px;
    margin-bottom: 15px;
    &,
    & * {
        color: ${Colors.LIGHT_GRAY};
        font-family: Nunito !important;
        font-style: normal;
        font-weight: 300;
        text-align: justify;
        white-space: pre-line;
    }
    strong {
        font-family: Nunito !important;
        font-weight: 600;
    }
    a {
        color: ${Colors.CYAN};
        & > strong {
            color: ${Colors.CYAN};
        }
    }
`;

export const Date = styled.h1`
    font-family: Nunito !important;
    color: ${Colors.WHITE};
    font-size: 16px;
`;

export const List = styled.ul`
    list-style: disc;
    color: ${Colors.WHITE};
    list-style-position: inside;
`;

export const ListItem = styled.li<{ bold?: boolean }>`
    margin-bottom: 10px;
    color: ${Colors.WHITE};
    font-size: 15px;
    font-family: Nunito !important;
`;

export const ChartContainer = styled(FlexDivCentered)`
    position: relative;
    margin: 20px 0;
`;

export const ChartLabel = styled.span`
    font-family: Nunito !important;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    color: ${Colors.WHITE};
    text-align: center;
`;
