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

export const PositionedContainer = styled.div`
    position: relative;
    display: block;
    top: 50px;
    padding-bottom: 100px;
    &:hover {
        div {
            display: flex;
        }
    }
`;

export const Logo = styled.i`
    width: 120px;
    color: ${(props) => props.theme.textColor.primary};
    font-size: 120px;
    cursor: pointer;
    line-height: 50px;
    margin-top: 5px;
`;

export const MenuIcon = styled.i`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 25px;
    margin-right: 10px;
    cursor: pointer;
    line-height: 50px;
    @media (min-width: 1024px) {
        display: none;
    }
`;

export const LeftWrapper = styled(FlexDiv)`
    flex-direction: row;
`;
