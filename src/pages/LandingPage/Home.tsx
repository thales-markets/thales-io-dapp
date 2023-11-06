import Loader from 'components/Loader';
import React, { Suspense } from 'react';
import styled from 'styled-components';

const Home: React.FC = () => {
    return (
        <Background>
            <Suspense fallback={<Loader />}>
                <div />
            </Suspense>
        </Background>
    );
};

export default Home;

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    font-size: 16px;

    @media (max-width: 1440px) {
        font-size: 14px;
    }

    background: linear-gradient(236.02deg, #484e88 17.37%, #0d111e 57.85%);
`;
