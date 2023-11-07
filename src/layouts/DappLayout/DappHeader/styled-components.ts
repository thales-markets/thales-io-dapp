import styled from 'styled-components';

export const Wrapper = styled.div`
    display: contents;
    @media (max-width: 1024px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 20px;
        width: 100vw;
        padding: 0 40px;
        z-index: 10;
        margin-top: 50px;
    }
`;

const CenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

export const Links = styled(CenteredDiv)`
    grid-column-start: 14;
    grid-column-end: 39;
    grid-row-start: 3;
    grid-row-end: 4;
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

export const Link = styled.a`
    position: relative;
    font-family: Nunito !important;
    font-style: normal;
    font-weight: 300;
    font-size: 1em;
    line-height: 91.91%;
    z-index: 2;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => props.theme.landingPage.textColor.primary};
    @media (max-width: 1024px) {
        margin-bottom: 60px;
    }
    &.dropdown-icon {
        :after {
            content: '';
            display: block;
            position: absolute;
            top: -4px;
            right: -32px;
            width: 10px;
            height: 10px;
            border-top: 2px solid ${(props) => props.theme.landingPage.textColor.primary};
            border-right: 2px solid ${(props) => props.theme.landingPage.textColor.primary};
            transform: rotate(135deg);
        }
        &.open:after {
            top: 2px;
            transform: rotate(-45deg);
        }
    }
`;
