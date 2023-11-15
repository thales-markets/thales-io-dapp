import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 100%;
    grid-template-rows: 320px 320px 160px;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'middle' 'bottom';
    margin-bottom: 100px;
    z-index: 1;
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
`;

export const Middle = styled.div`
    grid-area: middle;
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
