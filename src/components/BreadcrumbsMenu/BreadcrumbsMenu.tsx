import ROUTES from 'constants/routes';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

console.log('ROUTES ', ROUTES);

const BreadcrumbsMenu: React.FC = () => {
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    return isMobile ? (
        <Wrapper>
            <h1></h1>
        </Wrapper>
    ) : (
        <></>
    );
};

const Wrapper = styled(FlexDiv)`
    flex-direction: row;
`;

export default BreadcrumbsMenu;
