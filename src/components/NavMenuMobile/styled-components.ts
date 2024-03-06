import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';

export const BurgerFiltersContainer = styled(FlexDivColumn)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: ${(props) => props.theme.background.primary};
    display: flex;
    z-index: 10000;
    gap: 30px;
    padding: 50px 0px;
    @media (max-width: 1300px) {
        margin: 0;
        scrollbar-width: 0px; /* Firefox */
        ::-webkit-scrollbar {
            /* WebKit */
            width: 0px;
            height: 0px;
        }
    }
`;
