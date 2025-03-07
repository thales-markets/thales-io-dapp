import industryCardMobile from 'assets/images/industry-card-mobile.webp';
import industryCard from 'assets/images/industry-card.webp';
import trustCardMobile from 'assets/images/trust-card-mobile.webp';
import trustCard from 'assets/images/trust-card.webp';
import usersCardMobile from 'assets/images/users-card-mobile.webp';
import usersCard from 'assets/images/users-card.webp';

import { AssetCard } from './types';

export enum AssetCardType {
    TOKEN = 'token',
    LOGO = 'logo',
    LOGOTYPE = 'logotype',
}

export const BRAND_ASSETS_FOLDER = 'brand-assets';

export const ASSET_CARDS: Record<AssetCardType, AssetCard> = {
    [AssetCardType.TOKEN]: {
        icon: 'overtime-icon overtime-icon--over-token',
        title: 'Token',
        iconSize: '100px',
        mobileIconSize: '60px',
        backgroundImage: usersCard,
        backgroundImageMobile: usersCardMobile,
        pngImage: 'token.png',
        svgImage: 'token.svg',
        pngImageDark: '',
        svgImageDark: '',
    },
    [AssetCardType.LOGO]: {
        icon: 'overtime-icon overtime-icon--overtime-logo',
        title: 'Logo',
        iconSize: '120px',
        mobileIconSize: '70px',
        backgroundImage: trustCard,
        backgroundImageMobile: trustCardMobile,
        pngImage: 'logo.png',
        svgImage: 'logo.svg',
        pngImageDark: '',
        svgImageDark: '',
    },
    [AssetCardType.LOGOTYPE]: {
        icon: 'overtime-icon overtime-icon--overtime',
        title: 'Logotype',
        iconSize: '300px',
        mobileIconSize: '250px',
        backgroundImage: industryCard,
        backgroundImageMobile: industryCardMobile,
        pngImage: 'logotype.png',
        svgImage: 'logotype.svg',
        pngImageDark: 'logotype-dark.png',
        svgImageDark: 'logotype-dark.svg',
    },
};
