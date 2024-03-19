import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivSpaceBetween } from 'styles/common';

export const IconContainer = styled(FlexDivColumnCentered)`
    cursor: pointer;
    align-items: center;
`;

export const Container = styled(FlexDivSpaceBetween)`
    width: 100%;
`;

export const Name = styled.div`
    color: #c6c8da;
    font-family: MontserratLight;
    font-size: 10px;
    font-style: normal;
    text-transform: capitalize;
    margin-top: 3px;
`;
