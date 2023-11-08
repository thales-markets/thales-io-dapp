import styled from 'styled-components';

const CenteredDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 2;
    width: 100%;
`;

export const Links = styled(CenteredDiv)`
    justify-content: space-between;
    z-index: 10;
    @media (max-width: 1024px) {
        display: none;
    }
`;

export const PositionedContainer = styled.div`
    position: relative;
    display: block;
    top: 50px;
    padding-bottom: 100px;
    &:hover {
        div {
            display: flex;
        }
    }
`;

export const Item = styled.label<{ active?: boolean }>`
    position: relative;
    font-family: Nunito !important;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 25.5px;
    z-index: 2;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => (props.active ? props.theme.textColor.secondary : props.theme.textColor.primary)};
    @media (max-width: 1024px) {
        margin-bottom: 60px;
    }
`;
