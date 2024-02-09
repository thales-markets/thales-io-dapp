import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { InfoDiv } from '../styled-components';

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
        width: 100%;
    }
`;

export const ClaimableRewardsContainer = styled(FlexDiv)<{ isClaimed?: boolean }>`
    flex-direction: row;
    > div {
        flex: ${(props) => (props.isClaimed ? '' : '1')};
    }
`;

export const RewardsDetailsContainer = styled(FlexDiv)`
    flex-direction: column;
`;
export const ClaimContainer = styled(FlexDiv)``;

export const ItemsWrapper = styled(FlexDiv)`
    flex-direction: column;
    margin-top: 7px;
`;

export const UpperLeft = styled.div`
    grid-area: upper-left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BottomLeft = styled.div`
    grid-area: bottom-left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Right = styled.div`
    grid-area: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const UpperRight = styled.div`
    grid-area: upper-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const MiddleRight = styled.div`
    grid-area: middle-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BottomRight = styled.div`
    grid-area: bottom-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
`;

export const RewardsInfo = styled(FlexDiv)`
    flex-direction: column;
    > span {
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        text-align: right;
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

export const ClaimableLabel = styled.span`
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
`;

export const FinalPoints = styled.div`
    color: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: normal;
`;

export const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
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
`;

export const ClaimButtonDisclaimer = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    text-align: center;
    margin-top: 5px;
`;
