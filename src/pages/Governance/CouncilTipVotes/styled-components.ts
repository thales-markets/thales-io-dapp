import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivRow } from 'styles/common';

export const VoteRow = styled(FlexDivColumnCentered)`
    margin-left: 20px;
    margin-right: 20px;
    padding: 5px 0px;
`;

export const VoteLabel = styled.div<{ color?: string; fontWeight?: number }>`
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '800')};
    font-size: 18px;
    margin-right: 10px;
    @media (max-width: 575px) {
        width: 100px;
    }
    color: ${(props) => (props.color ? props.color : '')};
`;

export const CouncilMemberLabel = styled.div`
    width: 125px;
    font-weight: 700;
    font-size: 18px;
    @media (max-width: 575px) {
        width: 100px;
    }
`;

export const CouncilVoteRowData = styled(FlexDivRow)`
    font-weight: 700;
    font-size: 18px;
    line-height: 36px;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: 575px) {
        font-size: 14px;
    }
`;

export const Divider = styled.div`
    height: 2px;
    background: ${(props) => props.theme.background.tertiary};
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
`;

export const VotesChart = styled(FlexDivRow)`
    margin: 20px;
    height: 20px;
    border-radius: 8px;
    font-family: Nunito;
    font-size: 13px;
    font-weight: 800;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: center;
    position: relative;
`;

export const ColoredVotesSection = styled.div<{ width: number; color: string }>`
    width: ${(props) => (props.width ? `${props.width}%` : '')};
    background: ${(props) => (props.color ? props.color : '')};
    height: 20px;
    position: absolute;
    left: 0;
    border-radius: 8px 8px 8px 8px;
    text-align: end;
    padding-right: 10px;
    &:first-child {
        z-index: 2;
    }
    &:nth-child(2) {
        z-index: 1;
    }
    &:last-child {
    }
`;
