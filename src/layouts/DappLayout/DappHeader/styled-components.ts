import styled from 'styled-components';
import { FlexDivSpaceBetween } from 'styles/common';

export const HeaderContainer = styled(FlexDivSpaceBetween)`
    width: 100%;
`;

export const Links = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    z-index: 10;
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

export const Item = styled.label<{ active?: boolean }>`
    position: relative;
    font-family: Nunito !important;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 25.5px;
    z-index: 2;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    @media (max-width: 1024px) {
        margin-bottom: 60px;
    }
`;

export const Logo = styled.i`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 120px;
    cursor: pointer;
    line-height: 50px;
    margin-top: 5px;
`;

export const WalletButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: ${(props) => props.theme.textColor.secondary};
    width: 140px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.textColor.secondary};
    background: transparent;
    margin-top: -4px;
`;
