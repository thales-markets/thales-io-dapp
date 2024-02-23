import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

export const Container = styled.div<{ marginBottom: string }>`
    color: ${(props) => props.theme.textColor.tertiary};
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    /* height: 160px; */
    z-index: 1;
    margin-bottom: ${(props) => props.marginBottom};
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

export const AvailableToVestWrapper = styled(FlexDiv)`
    flex-direction: column;
    flex: 1;
`;

export const VestingWrapper = styled(FlexDiv)`
    margin-bottom: 20px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

export const Amount = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.textColor.secondary};
`;

export const DescriptionWrapper = styled(FlexDiv)`
    flex: 2;
`;

export const HighlightedDescText = styled.span`
    font-weight: 600;
    color: ${(props) => props.theme.textColor.primary};
`;

export const VestingDescription = styled.div`
    line-height: 120%;
`;

export const VestingValid = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: justify;
    font-family: NunitoBold;
    font-size: 18px;
`;

export const ScheduleWrapper = styled(FlexDiv)`
    overflow: hidden;
    width: 70%;
    align-items: center;
    justify-content: center;
    padding: 90px 0px 90px 0px;
    margin: 30px 0px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        /* margin: 30px 0px; */
    }
`;

export const ScheduleContainer = styled(FlexDiv)`
    font-family: Nunito;
    position: relative;
    align-items: center;
`;

export const ScheduleDot = styled.div`
    background: ${(props) => props.theme.textColor.secondary};
    border-radius: 20px;
    width: 20px;
    height: 20px;
`;

export const ScheduleLine = styled.div<{ invisible?: boolean }>`
    background: ${(props) => props.theme.textColor.secondary};
    height: 2px;
    width: 70px;
    display: ${(props) => (props.invisible ? 'none' : 'block')};
`;

export const ScheduleAmount = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 13px;
    transform: translate(calc(-50% + 10px), -60px);
    position: absolute;
    top: 0;
    width: 80px;
`;

export const ScheduleDate = styled.div`
    color: ${(props) => props.theme.textColor.quaternary};
    font-size: 13px;
    transform: translate(calc(-50% + 10px), 60px);
    position: absolute;
    bottom: 0;
    width: 80px;
`;
