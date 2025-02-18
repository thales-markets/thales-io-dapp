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
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 12px;
    text-transform: capitalize;
    margin-top: 3px;
`;
