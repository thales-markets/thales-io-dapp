import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

export const EcosystemAppsContainer = styled(FlexDiv)`
    position: relative;
    gap: 30px;
    z-index: 1;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

export const DotContainer = styled.div`
    display: none;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        display: flex !important;
        justify-content: center;
        align-items: center;
    }
`;

export const Dot = styled.div`
    background: ${(props) => props.theme.textColor.primary};
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    opacity: 0.6;
    &.selected {
        opacity: 1;
    }
    margin-right: 13px;
    margin-left: 13px;
`;
