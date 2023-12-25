import styled from 'styled-components';
import { FlexDivSpaceBetween } from 'styles/common';

export const HeaderContainer = styled(FlexDivSpaceBetween)`
    width: 100%;
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
    width: 140px;
    color: ${(props) => props.theme.textColor.primary};
    font-size: 120px;
    cursor: pointer;
    line-height: 50px;
    margin-top: 5px;
`;
