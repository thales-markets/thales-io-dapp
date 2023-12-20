import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: repeat(2, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'bottom';
    margin-bottom: 100px;
    z-index: 1;
    margin-top: 50px;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const Top = styled.div`
    grid-area: top;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
`;

export const Bottom = styled.div`
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
`;

export const LeaderboardBreakdownTitle = styled(FlexDivColumn)`
    color: ${(props) => props.theme.textColor.primary};
    align-items: center;
    font-size: 18px;
    text-transform: uppercase;
    > i {
        font-size: 25px;
        margin-bottom: 5px;
    }
`;
