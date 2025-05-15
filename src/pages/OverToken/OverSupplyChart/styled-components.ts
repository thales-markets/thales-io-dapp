import { ScreenSizeBreakpoint } from 'enums/ui';
import { PieChart } from 'recharts';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivSpaceBetween } from 'styles/common';

export const StyledPieChart = styled(PieChart)`
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100% !important;
        height: 100% !important;
        .recharts-legend-wrapper {
            width: 100% !important;
        }
    }
    .recharts-legend-item {
        padding-bottom: 5px;
    }
`;

export const TooltipContainer = styled(FlexDivColumnCentered)`
    min-width: 200px;
    padding: 10px;
    border-radius: 5px;
    z-index: 999;
    padding: 15px 15px;
    background: ${(props) => props.theme.background.primary};
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    color: ${(props) => props.theme.textColor.primary};
    text-align: left;
`;

export const TooltipInfoContainer = styled(FlexDivSpaceBetween)`
    font-weight: 500;
    font-size: 13px;
    text-align: left;
    line-height: 18px;
    gap: 40px;
`;

export const TooltipInfoLabel = styled.span`
    color: ${(props) => props.theme.textColor.tertiary};
`;

export const TooltipInfoValue = styled.span`
    font-weight: 600;
`;
