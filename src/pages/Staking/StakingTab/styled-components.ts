import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 170px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left upper-right' 'bottom bottom';
    margin-bottom: 30px;
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const UpperLeft = styled.div`
    grid-area: upper-left;
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

export const Bottom = styled.div`
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    > div {
        width: 390px;
    }
    > div > span {
        font-size: 13px;
        text-transform: none;
    }
    > div > span:nth-child(2) {
        font-family: Nunito;
    }
`;
