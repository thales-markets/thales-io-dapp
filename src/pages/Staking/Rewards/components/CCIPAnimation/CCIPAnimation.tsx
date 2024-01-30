import ccipAnimation from 'assets/lotties/ccip.json';
import Lottie from 'lottie-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ThalesStakingData } from 'types/token';

type CCIPAnimationProps = {
    stakingData: ThalesStakingData | undefined;
};

const CCIPAnimation: React.FC<CCIPAnimationProps> = ({ stakingData }) => {
    const { t } = useTranslation();

    return stakingData?.closingPeriodInProgress ? (
        <LottieContainer>
            <Lottie animationData={ccipAnimation} style={CCIPAnimationStyle} />
            <TextContainer>
                <CCIPMessage>{t('staking.rewards.claim.ccip-msg')}</CCIPMessage>
                <DotFlashing />
            </TextContainer>
        </LottieContainer>
    ) : (
        <></>
    );
};

const LottieContainer = styled.div`
    height: 150px;
    position: relative;
    width: 100%;
    background: none !important;
    margin-bottom: 30px;
`;

const CCIPAnimationStyle: React.CSSProperties = {
    position: 'absolute',
    top: -130,
    height: 350,
    width: '100%',
    margin: 'auto',
};

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`;

const CCIPMessage = styled.span`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 28px;
    @media (max-width: 512px) {
        font-size: 22px;
    }
`;

const DotFlashing = styled.div`
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.textColor.primary};
    color: ${(props) => props.theme.textColor.primary};
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;
    margin-top: 12px;
    margin-left: 20px;

    &::before,
    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
    }
    &::before {
        left: -15px;
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background-color: ${(props) => props.theme.textColor.primary};
        color: ${(props) => props.theme.textColor.primary};
        animation: dot-flashing 1s infinite alternate;
        animation-delay: 0s;
    }
    &::after {
        left: 15px;
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background-color: ${(props) => props.theme.textColor.primary};
        color: ${(props) => props.theme.textColor.primary};
        animation: dot-flashing 1s infinite alternate;
        animation-delay: 1s;
    }

    @keyframes dot-flashing {
        0% {
            background-color: ${(props) => props.theme.textColor.primary};
        }
        50%,
        100% {
            background-color: ${(props) => props.theme.textColor.secondary};
        }
    }
`;

export default CCIPAnimation;
