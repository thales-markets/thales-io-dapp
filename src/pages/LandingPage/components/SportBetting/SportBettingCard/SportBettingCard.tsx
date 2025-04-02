import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CardContainer, Description, Icon, Title } from '../styled-components';
import { SportBettingCardInfo } from '../types';

type SportBettingCardProps = {
    card: SportBettingCardInfo;
};

const SportBettingCard: React.FC<SportBettingCardProps> = ({ card }) => {
    return (
        <CardContainer image={card.backgroundImage} mobileImage={card.backgroundImageMobile}>
            <Icon className={card.icon} fontSize={card.iconSize}></Icon>
            <Title>{card.title}</Title>
            <Description>{card.description}</Description>
        </CardContainer>
    );
};

export default SportBettingCard;
