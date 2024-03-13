import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn, FlexDivRow } from 'styles/common';

export const EcosystemAppsContainer = styled(FlexDiv)`
    position: relative;
    gap: 30px;
    z-index: 1;
`;

export const CarouselContainer = styled(FlexDivRow)`
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        height: 270px;
        color: ${(props) => props.theme.textColor.primary};
    }
    & > div {
        width: 100%;
        height: 100%;
        & > div {
            height: 100%;
        }
    }
    & ul {
        &.control-dots {
            @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
                bottom: 0px;
                width: 100%;
            }
        }
        & > li {
            &.dot {
                height: 20px !important;
                margin: 0px 10px !important;
                width: 20px !important;
                @media (max-width: 600px) {
                    height: 16px !important;
                    width: 16px !important;
                }
            }
        }
    }
`;

export const CarouselAppContainer = styled(FlexDivColumn)`
    margin: 0px 5px;
`;
