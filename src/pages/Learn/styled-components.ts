import { ScreenSizeBreakpoint } from 'enums/ui';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import { FlexDivCentered } from 'styles/common';

export const Content = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-bottom: 50px;
    @media (max-width: 1024px) {
        width: 100vw;
        margin-top: 50px;
        padding: 0 40px;
        z-index: 1;
    }
`;

export const H1 = styled.h1`
    font-weight: 700;
    font-size: 40px;
    line-height: 110%;
    text-align: justify;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${(props) => props.theme.textColor.primary};
    margin: 50px 0px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin: 10px 0px;
    }
`;

export const H2 = styled.h2`
    font-size: 20px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 1px;
    text-align: justify;
    color: ${(props) => props.theme.textColor.primary};
    margin-top: 40px;
    margin-bottom: 20px;
`;

export const H3 = styled.h3`
    font-size: 18px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 1px;
    text-align: justify;
    color: ${(props) => props.theme.textColor.primary};
    margin-top: 30px;
    margin-bottom: 15px;
`;

export const Paragraph = styled.p`
    font-size: 15px;
    line-height: 16px;
    margin-bottom: 15px;
    &,
    & * {
        color: ${(props) => props.theme.textColor.senary};
        font-style: normal;
        font-weight: 300;
        text-align: justify;
        white-space: pre-line;
    }
    strong {
        font-weight: 600;
    }
    a {
        color: ${(props) => props.theme.textColor.secondary};
        & > strong {
            color: ${(props) => props.theme.textColor.secondary};
        }
    }
`;

export const Date = styled.h1`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 16px;
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
    font-size: 15px;
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
