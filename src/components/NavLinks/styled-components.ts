import styled from 'styled-components';

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
    height: 20px;
    margin-top: -6px;
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
    transform: translateX(-15px);
    z-index: 3;
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
