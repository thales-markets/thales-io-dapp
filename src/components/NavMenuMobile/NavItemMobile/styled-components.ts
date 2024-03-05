import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivSpaceBetween } from 'styles/common';

export const Container = styled(FlexDivCentered)`
    width: 80%;
    align-self: center;
`;

export const ItemContainer = styled(FlexDivColumn)`
    width: 100%;
    border-bottom: ${(props) => `1px solid ${props.theme.borderColor.secondary}`};
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const LabelContainer = styled(FlexDivSpaceBetween)`
    width: 100%;
    margin: 5px 0px;
`;

export const Item = styled.label<{ active?: boolean }>`
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
`;

export const Icon = styled.i<{ active?: boolean }>`
    padding-left: 3px;
    padding-bottom: 3px;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    font-size: 13px;
`;

export const DropdownContainer = styled.div`
    min-width: 200px;
    width: max-content;
    border-radius: 8px;
    position: absolute;
    padding: 7px;
    background: ${(props) => props.theme.background.primary};
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
    transform: translateX(-25%);
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
    text-align: left;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    padding: 8px;
    border-radius: 8px;
    &:hover {
        background: ${(props) => props.theme.background.quaternary};
    }
`;

export const NavItemLabel = styled.span``;
