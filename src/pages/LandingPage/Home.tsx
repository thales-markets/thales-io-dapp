import Loader from 'components/Loader';
import React, { Suspense } from 'react';
import styled from 'styled-components';

const Home: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Wrapper>
                <Title>
                    Thales<span>Protocol</span>
                </Title>
                <Subtitle>A permissionless ecosystem where every market is a unique smart contract,</Subtitle>
                <Subtitle>powered by AMM-driven liquidity. Pioneering the Future of On-Chain Markets</Subtitle>
                <StatTitle>Total protocol volume</StatTitle>
                <Stat>$ 944,459,682</Stat>
            </Wrapper>
        </Suspense>
    );
};

export default Home;

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
`;

const Title = styled.div`
    color: white;
    font-family: 'NunitoBold';
    font-weight: bold;
    font-size: 50px;
    font-style: normal;
    line-height: 91.4%;
    letter-spacing: 3.25px;
    text-transform: uppercase;
    & > span {
        font-family: 'NunitoExtraLight';
        font-weight: normal;
    }
`;

const Subtitle = styled.div`
    color: #a9abbb;
    font-family: 'NunitoExtraLight';
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 103%;
    text-transform: capitalize;
`;

const StatTitle = styled.div`
    color: #a9abbb;
    font-family: 'NunitoExtraLight;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
`;

const Stat = styled.div`
    color: #fff;
    font-family: Montserrat;
    font-size: 50px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;
