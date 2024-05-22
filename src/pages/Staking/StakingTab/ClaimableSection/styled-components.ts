import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { InfoDiv } from '../../styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: fr 160px;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'bottom';
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100% !important;
    }
`;

export const ClaimableRewardsContainer = styled(FlexDiv)<{ isClaimed?: boolean }>`
    flex-direction: row;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        flex: 1;
    }
    > div {
        flex: ${(props) => (props.isClaimed ? '' : '1')};
    }
`;

export const RewardsDetailsContainer = styled(FlexDiv)`
    flex-direction: column;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

export const ItemsWrapper = styled(FlexDiv)`
    flex-direction: column;
    margin-top: 7px;
`;

export const StakingDetailsSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    > span {
        color: ${(props) => props.theme.textColor.primary};
        font-weight: 700;
    }
`;

export const ClaimSection = styled(FlexDiv)`
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 15px;
        justify-content: center;
        align-items: center;
        > div > button {
            margin-top: 10px;
        }
    }
`;

export const RewardsInfo = styled(FlexDiv)`
    flex-direction: column;
    > span {
        font-size: 18px;
        font-weight: 700;
        text-align: right;
        @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
            text-align: center;
            line-height: 120%;
        }
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const SubTitle = styled(InfoDiv)`
    justify-content: flex-start;
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.secondary};
        text-align: right;
        font-family: NunitoBold;
        line-height: 155%;
        margin-left: 5px;
    }
`;

const ClaimableLabel = styled.span`
    font-size: 18px;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 700;
    text-transform: none;
    margin-right: 5px;
`;

export const SectionText = styled.div`
    margin-top: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    > span {
        color: ${(props) => props.theme.textColor.primary};
        font-family: NunitoBold;
    }
`;

export const GamifiedRewardItem = styled(FlexDiv)`
    flex-direction: row;
    justify-content: space-between;
`;

export const ItemTitle = styled(ClaimableLabel)`
    text-align: right;
`;

export const ItemValue = styled.span`
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: left;
`;

export const FinalPointsTitle = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 13px;
    font-style: normal;
    line-height: normal;
    margin-bottom: 5px;
`;

export const FinalPoints = styled.div`
    color: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: normal;
`;

export const LeaderboardLink = styled(FlexDiv)`
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    align-items: center;
    > i {
        font-size: 20px;
        font-weight: 200;
        margin: 0 5px;
    }
    > i:nth-child(2) {
        font-size: 15px;
    }
`;

export const GamingRewardsContainer = styled.div`
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        display: flex;
        flex-direction: column;
        > div:nth-child(2) {
            margin-bottom: 15px;
        }
        > div:nth-child(6) {
            margin-top: 15px;
        }
    }
`;

export const CompoundContainer = styled(FlexDivColumn)`
    justify-content: end;
    label {
        width: 165px;
        margin-bottom: 5px;
        font-size: 11px;
        span {
            height: 16px;
            width: 16px;
            margin-top: 1px;
        }
        span::after {
            left: 4px;
            top: 0px;
            width: 2px;
            height: 8px;
        }
    }
`;
