import Loader from 'components/Loader';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import WavesBackground from 'components/WavesBackground';

const Home: React.FC = () => {
    return (
        <Background>
            <WavesBackground>
                <Suspense fallback={<Loader />}>
                    <Wrapper>
                        <Header />
                    </Wrapper>
                </Suspense>
            </WavesBackground>
        </Background>
    );
};

export default Home;

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    font-size: 16px;
    background: linear-gradient(236.02deg, #484e88 17.37%, #0d111e 57.85%);
`;

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    margin: auto;
    max-width: 1400px;
`;
