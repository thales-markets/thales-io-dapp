import React from 'react';
import styled from 'styled-components';
import { navigateTo } from 'utils/routes';
import ROUTES from 'constants/routes';

const Header: React.FC = () => {
    return (
        <Wrapper>
            <Logo
                onClick={() => navigateTo(ROUTES.Home, false, false, 'show')}
                className="icon-home icon-home--thales"
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
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

const Logo = styled.i`
    grid-column-start: 4;
    grid-column-end: 9;
    grid-row-start: 3;
    grid-row-end: 4;
    font-size: 8.3em;
    line-height: 34px;
    color: ${(props) => props.theme.landingPage.textColor.primary};
    z-index: 2;
    flex: 1;
    cursor: pointer;
`;

export default Header;
