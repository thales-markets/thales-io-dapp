import { ScreenSizeBreakpoint } from 'enums/ui';
import ReactTooltip from 'rc-tooltip';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import 'styles/tooltip.css';

type TooltipProps = {
    overlay: any;
    iconFontSize?: number;
    customIconStyling?: CSSProperties;
    overlayInnerStyle?: CSSProperties;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    marginRight?: number;
    top?: number;
    overlayClassName?: string;
    iconColor?: string;
    mobileIconFontSize?: number;
    mouseEnterDelay?: number;
};

const Tooltip: React.FC<TooltipProps> = ({
    overlay,
    iconFontSize,
    customIconStyling,
    overlayInnerStyle,
    marginLeft,
    marginTop,
    marginBottom,
    marginRight,
    top,
    overlayClassName,
    iconColor,
    children,
    mobileIconFontSize,
    mouseEnterDelay,
}) => {
    return (
        <ReactTooltip
            overlay={overlay}
            placement="top"
            overlayClassName={overlayClassName || ''}
            overlayInnerStyle={overlayInnerStyle}
            mouseEnterDelay={mouseEnterDelay}
        >
            {children ? (
                (children as any)
            ) : (
                <InfoIcon
                    color={iconColor}
                    iconFontSize={iconFontSize}
                    marginLeft={marginLeft}
                    marginTop={marginTop}
                    marginBottom={marginBottom}
                    marginRight={marginRight}
                    top={top}
                    style={customIconStyling}
                    mobileIconFontSize={mobileIconFontSize}
                />
            )}
        </ReactTooltip>
    );
};

const InfoIcon = styled.i<{
    iconFontSize?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    marginRight?: number;
    top?: number;
    color?: string;
    mobileIconFontSize?: number;
}>`
    font-size: ${(props) => props.iconFontSize || 15}px;
    font-weight: normal;
    cursor: pointer;
    position: relative;
    margin-left: ${(props) => props.marginLeft || 4}px;
    margin-top: ${(props) => props.marginTop || 0}px;
    margin-bottom: ${(props) => props.marginBottom || 0}px;
    margin-right: ${(props) => props.marginRight || 0}px;
    top: ${(props) => props.top || 0}px;
    color: ${(props) => props.color || 'white'};
    &:before {
        font-family: Icons !important;
        content: '\\0027';
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: ${(props) =>
            props.mobileIconFontSize ? props.mobileIconFontSize : props.iconFontSize ? props.iconFontSize : 15}px;
    }
`;

export default Tooltip;
