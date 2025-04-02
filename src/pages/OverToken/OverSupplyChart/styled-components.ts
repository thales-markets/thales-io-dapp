import { ScreenSizeBreakpoint } from 'enums/ui';
import { PieChart } from 'recharts';
import styled from 'styled-components';

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
