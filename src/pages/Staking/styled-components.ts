import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

export const SectionTitle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor.primary};
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
    text-transform: uppercase;
    > span > i {
        margin-right: 5px;
    }
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.primary};
        text-align: right;
        font-family: NunitoBold;
        line-height: 155%;
    }
`;
export const StakingButton = styled.button<{ padding?: string; disabled?: boolean }>`
    cursor: pointer;
    color: ${(props) => props.theme.background.primary};
    padding: ${(props) => props.padding || '5px 7px'};
    border-radius: 8px;
    border: 0;
    background: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 13px;
    text-transform: uppercase;
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const SectionHeader = styled(FlexDiv)`
    font-family: NunitoBold;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.035em;
    color: ${(props) => props.theme.textColor.primary};
    text-transform: uppercase;
    min-height: 30px;
    padding-left: 20px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        padding: 0px 5px;
        min-height: 25px;
        margin-bottom: 10px;
        flex-direction: column;
        align-items: start;
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
