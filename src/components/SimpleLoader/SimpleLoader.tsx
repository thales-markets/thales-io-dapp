import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styled from 'styled-components';
import { Colors } from 'styles/common';

const SimpleLoader: React.FC = () => {
    return <StyledLoader />;
};

const StyledLoader = styled(CircularProgress)`
    position: absolute;
    left: calc(50% - 22px);
    top: calc(50% - 22px);
    &.MuiCircularProgress-colorPrimary {
        color: ${Colors.CYAN};
    }
`;

export default SimpleLoader;
