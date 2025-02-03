import ChainCard from 'assets/images/chain-card.svg';
import IndustryCard from 'assets/images/industry-card.svg';
import TrustCard from 'assets/images/trust-card.svg';
import UsersCard from 'assets/images/users-card.svg';
import { SportBettingCard } from './types';

export enum SportBettingCardType {
    FULLY_ON_CHAIN = 'fully-on-chain',
    TAILORED_FOR_USERS = 'tailored-for-users',
    TRUST_REDEFINED = 'trust-redefined',
    ECOLVING_THE_INDUSTRY = 'evolving-the-industry',
}

export const SPORT_BETTING_CARDS: Record<SportBettingCardType, SportBettingCard> = {
    [SportBettingCardType.FULLY_ON_CHAIN]: {
        icon: 'overtime-icon overtime-icon--chain',
        title: 'Fully onchain',
        description: 'Non-custodial, transparent, and global access.',
        iconSize: '56px',
        image: ChainCard,
    },
    [SportBettingCardType.TAILORED_FOR_USERS]: {
        icon: 'overtime-icon overtime-icon--users',
        title: 'Tailored for users',
        description: 'Join seamlessly and bet seamlessly on a wide, industry standard offering.',
        iconSize: '56px',
        image: UsersCard,
    },
    [SportBettingCardType.TRUST_REDEFINED]: {
        icon: 'overtime-icon overtime-icon--trust',
        title: 'Trust redefined',
        description: 'Blockchain powered transparency and security built into every bet.',
        iconSize: '56px',
        image: TrustCard,
    },
    [SportBettingCardType.ECOLVING_THE_INDUSTRY]: {
        icon: 'overtime-icon overtime-icon--industry',
        title: 'Evolving the industry',
        description: 'Experience the next generation of sports betting.',
        iconSize: '56px',
        image: IndustryCard,
    },
};
