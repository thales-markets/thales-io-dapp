import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    @media (max-width: 1024px) {
        width: 100vw;
        padding: 0 20px;
        z-index: 1;
    }
`;

export const Content = styled(FlexDivColumn)`
    width: 100%;
    postion: relative;
`;

export const Header = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 64px;
    font-weight: 700;
    line-height: 70px;
    margin-top: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 28px;
        line-height: 34px;
    }
`;

export const HeaderHighlight = styled(Header)`
    color: ${(props) => props.theme.textColor.secondary};
    margin-top: 0px;
    margin-bottom: 40px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-bottom: 20px;
    }
`;

export const LogoBackgroundContainer = styled.div`
    position: absolute;
    top: 125px;
    left: 35%;
    svg {
        height: 140%;
        width: 140%;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        top: 120px;
        left: 80px;
        svg {
            height: 220px;
            width: 220px;
        }
    }
`;
