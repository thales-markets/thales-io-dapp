import Lottie from 'lottie-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CardContainer, Description, LottieContainer, Title } from '../styled-components';
import { SportBettingCardInfo } from '../types';

type SportBettingCardProps = {
    card: SportBettingCardInfo;
};

const SportBettingCard: React.FC<SportBettingCardProps> = ({ card }) => {
    return (
        <CardContainer image={card.backgroundImage} mobileImage={card.backgroundImageMobile}>
            <LottieContainer>
                <Lottie animationData={card.lottie} />
            </LottieContainer>
            <Title>{card.title}</Title>
            <Description>{card.description}</Description>
        </CardContainer>
    );
};

export default SportBettingCard;
