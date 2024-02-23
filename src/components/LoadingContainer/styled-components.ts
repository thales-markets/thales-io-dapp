import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

export const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const CustomCircularProgress = styled(CircularProgress)`
    &.MuiCircularProgress-colorPrimary {
        color: ${(props) => props.theme.background.secondary};
    }
`;
