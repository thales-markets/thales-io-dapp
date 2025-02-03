import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { SPORT_BETTING_CARDS, SportBettingCardType } from './cards';
import { CardContainer, Container, Description, Icon, Title } from './styled-components';

const SportBetting: React.FC = () => {
    return (
        <Container>
            <CardContainer image={SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].image}>
                <Icon
                    className={SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].icon}
                    fontSize={SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].iconSize}
                ></Icon>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN].description}</Description>
            </CardContainer>
            <CardContainer image={SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].image}>
                <Icon
                    className={SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].icon}
                    fontSize={SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].iconSize}
                ></Icon>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS].description}</Description>
            </CardContainer>
            <CardContainer image={SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].image}>
                <Icon
                    className={SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].icon}
                    fontSize={SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].iconSize}
                ></Icon>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED].description}</Description>
            </CardContainer>
            <CardContainer image={SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].image}>
                <Icon
                    className={SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].icon}
                    fontSize={SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].iconSize}
                ></Icon>
                <Title>{SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].title}</Title>
                <Description>{SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY].description}</Description>
            </CardContainer>
        </Container>
    );
};

export default SportBetting;
