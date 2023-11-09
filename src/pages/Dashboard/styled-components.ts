import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 330px);
    grid-template-rows: repeat(3, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left top top upper-right' 'upper-left middle-left middle-right upper-right' 'bottom-left bottom bottom bottom-right';
    z-index: 1;
    > div {
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const ItemUpperLeft = styled.div`
    grid-area: upper-left;
`;

export const ItemBottomLeft = styled.div`
    grid-area: bottom-left;
`;

export const ItemTop = styled.div`
    grid-area: top;
`;

export const ItemUpperRight = styled.div`
    grid-area: upper-right;
`;

export const ItemBottomRight = styled.div`
    grid-area: bottom-right;
`;

export const ItemMiddleLeft = styled.div`
    grid-area: middle-left;
`;

export const ItemMiddleRight = styled.div`
    grid-area: middle-right;
`;

export const ItemBottom = styled.div`
    grid-area: bottom;
`;

export const InfoText = styled.label``;
export const InfoStats = styled.span``;
