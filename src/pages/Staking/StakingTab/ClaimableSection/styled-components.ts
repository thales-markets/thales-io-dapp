import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';

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
