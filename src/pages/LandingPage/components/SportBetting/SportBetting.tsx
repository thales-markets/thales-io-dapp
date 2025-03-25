import chain from 'assets/lotties/chain.json';
import industry from 'assets/lotties/industry.json';
import trust from 'assets/lotties/trust.json';
import users from 'assets/lotties/users.json';
import Lottie from 'lottie-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { SPORT_BETTING_CARDS, SportBettingCardType } from './cards';
import { CardContainer, Container, Description, LottieContainer, Title } from './styled-components';

const SportBetting: React.FC = () => {
    return (
        <Container>
            <CardContainer
                image={SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].backgroundImage}
                mobileImage={SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].backgroundImageMobile}
            >
                <LottieContainer>
                    <Lottie animationData={chain} />
                </LottieContainer>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].description}</Description>
            </CardContainer>
            <CardContainer
                image={SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].backgroundImage}
                mobileImage={SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].backgroundImageMobile}
            >
                <LottieContainer>
                    <Lottie animationData={users} />
                </LottieContainer>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].description}</Description>
            </CardContainer>
            <CardContainer
                image={SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].backgroundImage}
                mobileImage={SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].backgroundImageMobile}
            >
                <LottieContainer>
                    <Lottie animationData={trust} />
                </LottieContainer>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].description}</Description>
            </CardContainer>
            <CardContainer
                image={SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].backgroundImage}
                mobileImage={SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].backgroundImageMobile}
            >
                <LottieContainer>
                    <Lottie animationData={industry} />
                </LottieContainer>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].description}</Description>
            </CardContainer>
        </Container>
    );
};

export default SportBetting;
