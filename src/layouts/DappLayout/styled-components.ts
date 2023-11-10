import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';

export const Wrapper = styled(FlexDivColumn)`
    align-items: center;
    width: 99%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 0px;
    max-width: 1350px;
    min-height: 100vh;
    justify-content: flex-start;
    @media (max-width: 1260px) {
        padding: 0px 20px;
    }
    @media (max-width: 767px) {
        padding: 0px 10px;
    }
`;
