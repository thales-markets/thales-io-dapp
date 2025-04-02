import { SPORT_BETTING_CARDS, SportBettingCardType } from './cards';
import SportBettingCard from './SportBettingCard';
import { Container } from './styled-components';

const SportBetting: React.FC = () => {
    return (
        <Container>
            <SportBettingCard card={SPORT_BETTING_CARDS[SportBettingCardType.FULLY_ON_CHAIN]} />
            <SportBettingCard card={SPORT_BETTING_CARDS[SportBettingCardType.TAILORED_FOR_USERS]} />
            <SportBettingCard card={SPORT_BETTING_CARDS[SportBettingCardType.TRUST_REDEFINED]} />
            <SportBettingCard card={SPORT_BETTING_CARDS[SportBettingCardType.ECOLVING_THE_INDUSTRY]} />
        </Container>
    );
};

export default SportBetting;
