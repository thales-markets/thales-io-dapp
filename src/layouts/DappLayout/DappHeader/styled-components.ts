import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivSpaceBetween } from 'styles/common';

export const HeaderContainer = styled(FlexDivSpaceBetween)`
    width: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
    }
`;

export const LinksContainer = styled.div`
    width: 55%;
    z-index: 100;
    @media (max-width: 1024px) {
        display: none;
    }
`;

export const Logo = styled.i`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 170px;
    cursor: pointer;
    line-height: 20px;
    margin-top: 15px;
`;

export const MenuIcon = styled.i`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 25px;
    margin-right: 5px;
    margin-top: -3px;
    cursor: pointer;
    line-height: 25px;
    @media (min-width: 1024px) {
        display: none;
    }
`;

export const LogoMobile = styled.i`
    display: flex;
    position: relative;
    height: auto;
    align-items: center;
    justify-content: center;
    font-size: 150px;
    line-height: 4px;
    margin: 15px 5px 0px 2px;
    color: ${(props) => props.theme.textColor.primary};
`;

export const IconLink = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

export const LeftWrapper = styled(FlexDiv)`
    flex-direction: row;
`;
