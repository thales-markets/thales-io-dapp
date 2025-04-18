import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';

export const Wrapper = styled(FlexDivColumn)`
    position: relative;
    z-index: 1;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding: 20px 0px;
    min-height: 100vh;
    justify-content: flex-start;
    padding-top: 10px !important;
    @media (max-width: 1260px) {
        padding: 0px 20px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding-top: 20px !important;
    }
    @media (min-width: ${ScreenSizeBreakpoint.SMALL}px) {
        max-width: 1426px;
        padding: 20px;
    }
`;

export const ChildWrapper = styled(FlexDivColumn)`
    width: 100%;
    align-items: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 25px;
    }
`;
