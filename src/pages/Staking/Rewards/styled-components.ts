import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 670px);
    grid-template-rows: 550px 150px;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left right' 'bottom-left right';
    margin-bottom: 100px;
    z-index: 1;
    line-height: normal;
    margin-top: 50px;
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

export const SectionSubtitle = styled.div`
    margin-top: 5px;
    > span {
        color: ${(props) => props.theme.textColor.secondary};
    }
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

export const ClaimButtonDisclaimer = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    text-align: center;
    margin-top: 5px;
`;
