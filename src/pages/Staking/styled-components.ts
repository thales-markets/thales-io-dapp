import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

export const SectionTitle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor.primary};
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    text-transform: uppercase;
    > span:first-child {
        display: flex;
        align-items: center;
    }
    > span > i {
        margin-right: 5px;
    }
    > span > div {
        color: ${(props) => props.theme.textColor.primary};
        font-size: 14px;
        text-transform: none;
    }
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.secondary};
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding-bottom: 10px;
    }
`;

export const InfoDiv = styled.div<{ height?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${(props) => props.height || 'auto'};
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.primary};
        text-align: right;
        line-height: 155%;
    }
`;

export const StakingButton = styled.button<{ padding?: string; disabled?: boolean; width?: string }>`
    cursor: pointer;
    color: ${(props) => props.theme.background.primary};
    padding: ${(props) => props.padding || '5px 15px'};
    border-radius: 8px;
    border: 0;
    background: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 5px;
    width: ${(props) => props.width || 'auto'};
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const SectionHeader = styled(FlexDiv)`
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.035em;
    color: ${(props) => props.theme.textColor.primary};
    text-transform: uppercase;
    min-height: 30px;
    padding-left: 20px;
    justify-content: space-between;
    align-items: baseline;
    > i {
        margin-right: 6px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        padding: 0px 5px;
        min-height: 25px;
        margin-bottom: 10px;
        align-items: center;
    }
`;

export const SectionDescription = styled.div`
    line-height: 180%;
    text-align: justify;
    a {
        color: ${(props) => props.theme.textColor.secondary};
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const TooltipContainer = styled.div<{ forceInline?: boolean }>`
    display: ${(props) => (props.forceInline ? 'inline' : 'flex')};
    align-items: center;
`;

export const MigrationContainer = styled(FlexDiv)`
    padding: 10px 10px;
    border-radius: 5px;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.warning.textColor.primary};
    background-color: ${(props) => props.theme.background.quaternary};
    text-align: center;
    margin: 20px 0;
    a {
        color: ${(props) => props.theme.textColor.secondary};
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
        padding: 10px;
        margin: 0 0 20px 0;
    }
    span:last-child {
        cursor: pointer;
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const Bold = styled.span`
    font-weight: bold;
`;
