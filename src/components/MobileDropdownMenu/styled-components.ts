import styled from 'styled-components';

export const PositionWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    z-index: 2;
`;

export const FiltersButton = styled.div<{ visible?: boolean }>`
    display: block;
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
    padding: 6px 20px;
    // border: 1px solid ${(props) => props.theme.borderColor.primary};
    box-sizing: border-box;
    border-radius: 30px;
    background: ${(props) => props.theme.button.background.primary};
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
    line-height: 10px;
    text-transform: uppercase;
    color: ${(props) => props.theme.button.textColor.primary};
    align-self: center;
    margin: 10px;
`;

export const Arrow = styled.i`
    margin-left: 5px;
    font-size: 10px;
    text-transform: none;
    &.thales-icon--double-arrow {
        font-size: 12px;
    }
`;

export const Wrapper = styled.div<{ visible?: boolean }>`
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
    background: ${(props) => props.theme.background.primary};
    box-sizing: border-box;
    border-radius: 12px;
    padding: 10px 20px;
    width: 200px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    box-shadow: 0px 4px 31px 3px rgba(0, 0, 0, 0.45);
`;

export const Item = styled.div<{ active: boolean }>`
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => (props.active ? props.theme.textColor.primary : props.theme.textColor.tertiary)};
    display: flex;
    flex-direction: row;
    justify-content: center;
    user-select: none;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    padding: 3px 0;
`;
