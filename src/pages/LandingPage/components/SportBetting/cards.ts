import chainCardMobile from 'assets/images/chain-card-mobile.webp';
import chainCard from 'assets/images/chain-card.webp';
import industryCardMobile from 'assets/images/industry-card-mobile.webp';
import industryCard from 'assets/images/industry-card.webp';
import trustCardMobile from 'assets/images/trust-card-mobile.webp';
import trustCard from 'assets/images/trust-card.webp';
import usersCardMobile from 'assets/images/users-card-mobile.webp';
import usersCard from 'assets/images/users-card.webp';
import chain from 'assets/lotties/chain.json';
import industry from 'assets/lotties/industry.json';
import trust from 'assets/lotties/trust.json';
import users from 'assets/lotties/users.json';

import { SportBettingCardInfo } from './types';

export enum SportBettingCardType {
    FULLY_ON_CHAIN = 'fully-on-chain',
    TAILORED_FOR_USERS = 'tailored-for-users',
    TRUST_REDEFINED = 'trust-redefined',
    ECOLVING_THE_INDUSTRY = 'evolving-the-industry',
}

export const SPORT_BETTING_CARDS: Record<SportBettingCardType, SportBettingCardInfo> = {
    [SportBettingCardType.FULLY_ON_CHAIN]: {
        icon: 'overtime-icon overtime-icon--chain',
        title: 'Fully onchain',
        description: 'Non-custodial, transparent, and global access.',
        iconSize: '56px',
        backgroundImage: chainCard,
        backgroundImageMobile: chainCardMobile,
        lottie: chain,
    },
    [SportBettingCardType.TAILORED_FOR_USERS]: {
        icon: 'overtime-icon overtime-icon--users',
        title: 'Tailored for users',
        description: 'Join seamlessly and bet seamlessly on a wide, industry standard offering.',
        iconSize: '56px',
        backgroundImage: usersCard,
        backgroundImageMobile: usersCardMobile,
        lottie: users,
    },
    [SportBettingCardType.TRUST_REDEFINED]: {
        icon: 'overtime-icon overtime-icon--trust',
        title: 'Trust redefined',
        description: 'Blockchain powered transparency and security built into every bet.',
        iconSize: '56px',
        backgroundImage: trustCard,
        backgroundImageMobile: trustCardMobile,
        lottie: trust,
    },
    [SportBettingCardType.ECOLVING_THE_INDUSTRY]: {
        icon: 'overtime-icon overtime-icon--industry',
        title: 'Evolving the industry',
        description: 'Experience the next generation of sports betting.',
        iconSize: '56px',
        backgroundImage: industryCard,
        backgroundImageMobile: industryCardMobile,
        lottie: industry,
    },
};
