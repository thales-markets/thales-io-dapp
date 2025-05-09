import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';

export const FieldContainer = styled(FlexDivColumn)<{ margin?: string; width?: string }>`
    flex: initial;
    position: relative;
    margin: ${(props) => props.margin || '0 0 10px 0'};
    width: ${(props) => (props.width ? props.width : '')};
`;

export const FieldLabel = styled.label`
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    color: ${(props) => props.theme.textColor.primary};
    margin-bottom: 6px;
`;

export const Input = styled.input<{ fontSize?: string; width?: string; height?: string }>`
    background: ${(props) => props.theme.background.quaternary};
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    box-sizing: border-box;
    mix-blend-mode: normal;
    border-radius: 8px;
    height: ${(props) => props.height || '34px'};
    width: ${(props) => props.width || '100%'};
    padding: 5px 10px;
    outline: 0;
    font-weight: normal;
    font-size: ${(props) => props.fontSize || '15px'};
    line-height: 18px;
    color: ${(props) => props.theme.textColor.primary};
    text-overflow: ellipsis;
    overflow: hidden;
    &::placeholder {
        color: ${(props) => props.theme.textColor.tertiary};
    }
    &:focus {
        outline: none;
        box-sizing: border-box;
    }
    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
    &.error {
        border: 1px solid ${(props) => props.theme.error.borderColor.primary};
    }
`;
