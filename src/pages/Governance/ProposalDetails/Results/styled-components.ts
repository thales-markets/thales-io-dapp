import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumnCentered } from 'styles/common';

export const ResultRow = styled(FlexDivColumnCentered)<{
    backgroundColor?: string;
    opacity?: number;
    borderColor?: string;
    paddingBottom?: number;
    paddingTop?: number;
}>`
    padding: 5px 20px;
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : props.theme.background.primary)};
    opacity: ${(props) => (props.opacity ? props.opacity : 1)};
    border-radius: ${(props) => (props.borderColor ? 0 : 15)}px;
    &:last-child {
        padding-bottom: 10px;
        & .divider {
            display: none;
        }
    }
`;

export const RowPercentageContainer = styled.div`
    position: relative;
`;

export const RowPercentage = styled.div`
    height: 3px;
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    border-radius: 10px;
    background-color: ${(props) => props.theme.background.secondary};
`;

export const Divider = styled.div`
    height: 2px;
    background: ${(props) => props.theme.borderColor.secondary};
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
`;

export const RowPercentageIndicator = styled(FlexDiv)<{ width: number }>`
    height: 5px;
    background: linear-gradient(90deg, #36d1dc -1.48%, #5b86e5 102.44%);
    width: ${(props) => `${props.width}%`};
    position: absolute;
    border-radius: 10px;
    top: -1px;
    left: 0;
    z-index: 1;
`;

export const ResultLabel = styled.div`
    width: 180px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 140px;
    }
`;
