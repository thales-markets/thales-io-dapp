import styled from 'styled-components';
import { FlexDivSpaceBetween } from 'styles/common';

export const HeaderContainer = styled(FlexDivSpaceBetween)`
    width: 100%;
`;

export const LinksContainer = styled.div`
    width: 50%;
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

export const WalletButton = styled.button`
    cursor: pointer;
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
