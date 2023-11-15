import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 100%;
    height: 320px;
    margin-bottom: 100px;
    z-index: 1;
`;
