import React, { CSSProperties } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    onClick?: () => void;
    fontSize?: string;
    disabled?: boolean;
    additionalStyles?: CSSProperties;
    children?: any;
};

const Button: React.FC<ButtonProps> = ({
    width,
    height,
    padding,
    textColor,
    backgroundColor,
    borderColor,
    margin,
    onClick,
    disabled,
    additionalStyles,
    fontSize,
    children,
}) => {
    return (
        <Wrapper
            width={width}
            height={height}
            padding={padding}
            margin={margin}
            textColor={textColor}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            onClick={onClick}
            disabled={disabled}
            fontSize={fontSize}
            style={additionalStyles}
        >
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.button<{
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    fontSize?: string;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    width: ${(props) => props.width || 'auto'};
    min-height: ${(props) => props.height || '30px'};
    border: 1px solid ${(props) => props.borderColor || props.theme.button.borderColor.secondary};
    border-radius: 8px;
    font-weight: 600;
    font-size: ${(props) => props.fontSize || '15px'};
    line-height: 100%;
    cursor: pointer;
    color: ${(props) => props.textColor || props.theme.button.textColor.secondary};
    background-color: ${(props) => props.backgroundColor || props.theme.button.background.secondary};
    margin: ${(props) => props.margin || ''};
    padding: ${(props) => props.padding || '3px 30px'};
    outline: none;
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export default Button;
