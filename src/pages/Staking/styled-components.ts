import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 670px);
    grid-template-rows: repeat(3, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left upper-right' 'upper-left middle-right' 'upper-left bottom-right';
    z-index: 1;
    > div {
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const Left = styled.div`
    grid-area: upper-left;
`;

export const UpperRight = styled.div`
    grid-area: upper-right;
`;

export const MiddleRight = styled.div`
    grid-area: middle-right;
`;

export const BottomRight = styled.div`
    grid-area: bottom-right;
`;

export const Line = styled.div`
    margin: 50px 0;
    width: 50%;
    height: 4px;
    border-radius: 10px;
    background: ${(props) => props.theme.background.tertiary};
`;

export const NavContainer = styled.div`
    width: 55%;
    margin-bottom: 45px;
`;
