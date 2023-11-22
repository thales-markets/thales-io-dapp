import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    height: 160px;
    margin-bottom: 100px;
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const VestingDescription = styled.div`
    line-height: 120%;
`;

export const VestingValid = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: justify;
    font-family: NunitoBold;
    font-size: 18px;
`;
