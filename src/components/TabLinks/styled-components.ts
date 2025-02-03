import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

export const Links = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
`;

export const Item = styled.div<{ active?: boolean; deprecated?: boolean }>`
    position: relative;
    font-weight: 500;
    font-size: 18px;
    line-height: 25.5px;
    z-index: 2;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    text-decoration: ${(props) => (props.deprecated ? 'line-through' : 'initial')};
    opacity: ${(props) => (props.deprecated ? '0.6' : '1')};
    @media (max-width: 1024px) {
        margin-bottom: 60px;
    }
`;

export const Icon = styled.i<{ active?: boolean }>`
    padding-left: 3px;
    padding-bottom: 3px;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    font-size: 13px;
`;

export const ItemTitle = styled(FlexDiv)`
    align-items: center;
    justify-content: center;
`;
