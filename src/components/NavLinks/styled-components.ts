import styled from 'styled-components';

export const Links = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
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
