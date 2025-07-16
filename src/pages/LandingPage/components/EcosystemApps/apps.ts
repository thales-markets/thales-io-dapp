import overtimeImage from 'assets/images/overtime-balls.webp';
import overtimeCardMobile from 'assets/images/overtime-card-mobile.webp';
import overtimeCard from 'assets/images/overtime-card.webp';
import speedMarketsImage from 'assets/images/speed-markets-arrow.webp';
import speedMarketsCardMobile from 'assets/images/speed-markets-card-mobile.webp';
import speedMarketsCard from 'assets/images/speed-markets-card.webp';
import { EcosystemApp, EcosystemDapp } from './types';

// don't remove, used through thales-api
export const ECOSYSTEM_APPS: EcosystemApp[] = [
    {
        icon: 'overtime',
        description:
            'Industry leading interface for Sports Automated Market Maker (Sports AMM) with integrated Parlay AMM architecture. Flagship interface of Thales Sports Markets non-custodial transparent architecture.',
        link: 'https://overtimemarkets.xyz/',
        size: '10em',
    },
    {
        icon: 'thales-markets',
        description:
            'Digital Options marketplace built using Thales architecture. Simplest form of option trading where users can receive a fixed payout on UP, DOWN, IN or OUT positions around various supported asset prices.',
        link: 'https://thalesmarket.io/',
        size: '10em',
    },
    {
        icon: 'bookie',
        description:
            'Telegram-based Sports Markets application with easy onboarding that utilizes Thales Protocol Sports Markets infrastructure as its market making and liquidity backend.',
        link: 'https://bookiebot.app/',
        size: '4em',
    },
    {
        icon: 'spongly',
        description:
            'A sports markets application built using Thales Protocol infrastructure, with a social twist! On Spongly, you can track wallets by their success rate and copy their tickets with Spongly’s integrated Ticket Copy functionality.',
        link: 'https://spongly.eth.limo/dashboard/',
        size: '10em',
    },
];

export enum EcosystemDappType {
    OVERTIME = 'overtime',
    SPEED_MARKETS = 'speed-markets',
}

export const ECOSYSTEM_DAPP: Record<EcosystemDappType, EcosystemDapp> = {
    [EcosystemDappType.OVERTIME]: {
        icon: 'overtime-icon overtime-icon--overtime-sportsbook',
        title: 'Best crypto sportbook in the world',
        description:
            'Enjoy an open blockchain sportsbook that offers everything traditional sportsbooks do and even more! Predict live matches, player props, futures, build parlays and choose from an abundance of sports and leagues. Earn crypto airdrops, free bets and other rewards. You can even deposit funds in the liquidity pool and become the house!',
        actionText: 'Use Overtime',
        link: 'https://overtimemarkets.xyz/',
        iconSize: '300px',
        mobileIconSize: '200px',
        backgroundImage: overtimeCard,
        backgroundImageMobile: overtimeCardMobile,
        image: overtimeImage,
    },
    [EcosystemDappType.SPEED_MARKETS]: {
        icon: 'overtime-icon overtime-icon--speed-markets',
        title: 'Fast paced ETH and BTC Digital Options trading',
        description:
            'Trade faster, win bigger and have fun with Speed Markets! Speed Markets allow users to purchase short timeframe UP or DOWN positions around the current price of ETH and BTC.',
        actionText: 'Use Speed Markets',
        link: 'https://speedmarkets.xyz/',
        iconSize: '250px',
        mobileIconSize: '170px',
        backgroundImage: speedMarketsCard,
        backgroundImageMobile: speedMarketsCardMobile,
        image: speedMarketsImage,
    },
};
