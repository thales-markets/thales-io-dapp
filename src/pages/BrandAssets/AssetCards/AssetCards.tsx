import { t } from 'i18next';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { buildHref } from 'utils/routes';
import { ASSET_CARDS, AssetCardType } from './cards';
import {
    CardContainer,
    Container,
    DownloadContainer,
    DownloadLink,
    DownloadRow,
    Icon,
    Label,
    Title,
    TypeDownloadContainer,
    TypeDownloadItem,
} from './styled-components';

const AssetCards: React.FC = () => {
    const getDownloadLink = (type: AssetCardType, imageType: 'SVG' | 'PNG', isDark?: boolean) => (
        <DownloadLink
            href={buildHref(
                ASSET_CARDS[type][
                    `${imageType.toLowerCase()}Image${isDark ? 'Dark' : ''}` as
                        | 'svgImage'
                        | 'pngImage'
                        | 'svgImageDark'
                        | 'pngImageDark'
                ]
            )}
            target="_blank"
            rel="noreferrer"
        >
            {imageType}
        </DownloadLink>
    );

    return (
        <Container>
            <CardContainer
                image={ASSET_CARDS[AssetCardType.TOKEN].backgroundImage}
                mobileImage={ASSET_CARDS[AssetCardType.TOKEN].backgroundImageMobile}
            >
                <Icon
                    className={ASSET_CARDS[AssetCardType.TOKEN].icon}
                    fontSize={ASSET_CARDS[AssetCardType.TOKEN].iconSize}
                    mobileFontSize={ASSET_CARDS[AssetCardType.TOKEN].mobileIconSize}
                ></Icon>
                <Title>{ASSET_CARDS[AssetCardType.TOKEN].title}</Title>
                <DownloadContainer>
                    <DownloadRow>
                        <Label>{t('brand-assets.download')}</Label>
                        <TypeDownloadContainer>
                            <TypeDownloadItem>
                                <Label>Vector</Label>
                                {getDownloadLink(AssetCardType.TOKEN, 'SVG')}
                            </TypeDownloadItem>
                            <TypeDownloadItem>
                                <Label>Raster</Label>
                                {getDownloadLink(AssetCardType.TOKEN, 'PNG')}
                            </TypeDownloadItem>
                        </TypeDownloadContainer>
                    </DownloadRow>
                </DownloadContainer>
            </CardContainer>
            <CardContainer
                image={ASSET_CARDS[AssetCardType.LOGO].backgroundImage}
                mobileImage={ASSET_CARDS[AssetCardType.LOGO].backgroundImageMobile}
            >
                <Icon
                    className={ASSET_CARDS[AssetCardType.LOGO].icon}
                    fontSize={ASSET_CARDS[AssetCardType.LOGO].iconSize}
                    mobileFontSize={ASSET_CARDS[AssetCardType.LOGO].mobileIconSize}
                ></Icon>
                <Title>{ASSET_CARDS[AssetCardType.LOGO].title}</Title>
                <DownloadContainer>
                    <DownloadRow>
                        <Label>{t('brand-assets.download')}</Label>
                        <TypeDownloadContainer>
                            <TypeDownloadItem>
                                <Label>Vector</Label>
                                {getDownloadLink(AssetCardType.LOGO, 'SVG')}
                            </TypeDownloadItem>
                            <TypeDownloadItem>
                                <Label>Raster</Label>
                                {getDownloadLink(AssetCardType.LOGO, 'PNG')}
                            </TypeDownloadItem>
                        </TypeDownloadContainer>
                    </DownloadRow>
                </DownloadContainer>
            </CardContainer>
            <CardContainer
                image={ASSET_CARDS[AssetCardType.LOGOTYPE].backgroundImage}
                mobileImage={ASSET_CARDS[AssetCardType.LOGOTYPE].backgroundImageMobile}
            >
                <Icon
                    className={ASSET_CARDS[AssetCardType.LOGOTYPE].icon}
                    fontSize={ASSET_CARDS[AssetCardType.LOGOTYPE].iconSize}
                    mobileFontSize={ASSET_CARDS[AssetCardType.LOGOTYPE].mobileIconSize}
                    marginTop="50px"
                    height="45px"
                ></Icon>
                <Title>{ASSET_CARDS[AssetCardType.LOGOTYPE].title}</Title>
                <DownloadContainer>
                    <DownloadRow>
                        <Label>{t('brand-assets.download-light')}</Label>
                        <TypeDownloadContainer>
                            <TypeDownloadItem>
                                <Label>Vector</Label>
                                {getDownloadLink(AssetCardType.LOGOTYPE, 'SVG')}
                            </TypeDownloadItem>
                            <TypeDownloadItem>
                                <Label>Raster</Label>
                                {getDownloadLink(AssetCardType.LOGOTYPE, 'PNG')}
                            </TypeDownloadItem>
                        </TypeDownloadContainer>
                    </DownloadRow>
                    <DownloadRow>
                        <Label>{t('brand-assets.download-dark')}</Label>
                        <TypeDownloadContainer>
                            <TypeDownloadItem>
                                <Label>Vector</Label>
                                {getDownloadLink(AssetCardType.LOGOTYPE, 'SVG', true)}
                            </TypeDownloadItem>
                            <TypeDownloadItem>
                                <Label>Raster</Label>
                                {getDownloadLink(AssetCardType.LOGOTYPE, 'PNG', true)}
                            </TypeDownloadItem>
                        </TypeDownloadContainer>
                    </DownloadRow>
                </DownloadContainer>
            </CardContainer>
        </Container>
    );
};

export default AssetCards;
