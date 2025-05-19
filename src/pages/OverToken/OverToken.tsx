import burn from 'assets/images/burn.webp';
import overCoins from 'assets/images/over-coins.webp';
import liveAnimationData from 'assets/lotties/live.json';
import SPAAnchor from 'components/SPAAnchor';
import { OVER_CURRENCY } from 'constants/currency';
import LINKS from 'constants/links';
import { Network } from 'enums/network';
import Lottie from 'lottie-react';
import { Action } from 'pages/LandingPage/components/EcosystemApps/styled-components';
import { OverDescription } from 'pages/LandingPage/components/OverToken/styled-components';
import {
    Description,
    LinkButton,
    Section,
    SectionSlogan,
    SectionSloganHighlight,
    SectionTitle,
} from 'pages/LandingPage/styled-components';
import useOverTokenInfoQuery from 'queries/dashboard/useOverTokenInfoQuery';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { useTheme } from 'styled-components';
import { getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import { OverTokenInfo } from 'types/token';
import { CountUp } from 'use-count-up';
import overContract from 'utils/contracts/overContract';
import BurnChart from './BurnChart';
import BuyOverModal from './BuyOverModal/BuyOverModal';
import OverSupplyChart from './OverSupplyChart';
import {
    BridgeDescription,
    BurnContainer,
    BurnIcon,
    BurnInfo,
    BurnInfoContainer,
    BurnInfoLabel,
    BurningLabel,
    CirculatingSupply,
    CirculatingSupplyContainer,
    CirculatingSupplyLabel,
    CirculatingSupplyLabelContainer,
    CoinsContainer,
    Content,
    ContractAddress,
    ContractAddressItem,
    Icon,
    Label,
    LinkArrow,
    liveBlinkStyle,
    liveBlinkStyleMobile,
    LiveLabel,
    OverChainLabel,
    OverContainer,
    OverIcon,
    OverLeftContainer,
    OverRightContainer,
} from './styled-components';

const OverToken: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useSelector(getIsMobile);
    const isAppReady = useSelector(getIsAppReady);
    const [overTokenInfo, setOverTokenInfo] = useState<OverTokenInfo | undefined>(undefined);
    const [previousOverTokenInfo, setPreviousOverTokenInfo] = useState<OverTokenInfo | undefined>(undefined);
    const [openBuyOverModal, setOpenBuyOverModal] = useState<boolean>(false);

    const overTokenInfoQuery = useOverTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (overTokenInfoQuery.isSuccess && overTokenInfoQuery.data) {
            setPreviousOverTokenInfo(overTokenInfo);
            setOverTokenInfo(overTokenInfoQuery.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overTokenInfoQuery.isSuccess, overTokenInfoQuery.data]);

    const getCounter = (startValue: number | undefined, endValue: number | undefined) => {
        return (
            <CountUp
                isCounting
                start={startValue || 0}
                end={endValue || 0}
                decimalPlaces={2}
                thousandsSeparator=","
                key={endValue || 0}
                duration={1}
            />
        );
    };

    return (
        <>
            <Content>
                <OverContainer marginTop="60px">
                    <OverLeftContainer flexBasis="60%">
                        <SectionTitle>{t('over-token.title')}</SectionTitle>
                        <Section marginTop={10} marginBottom={60} mobileMarginTop={20}>
                            <OverDescription>{t('home.over-token.description')}</OverDescription>
                            <Description>{t('over-token.description-1')}</Description>
                            <Description marginBottom={30}>{t('over-token.description-2')}</Description>
                            <LinkButton onClick={() => setOpenBuyOverModal(true)}>
                                {t('over-token.buy-over')}
                            </LinkButton>
                        </Section>
                    </OverLeftContainer>
                    <OverRightContainer flexBasis="40%" padding="0 50px 0 0">
                        <BurnContainer>
                            <img src={burn} />
                        </BurnContainer>
                    </OverRightContainer>
                </OverContainer>
                <Section marginTop={10} marginBottom={40} mobileMarginTop={20}>
                    <SectionSlogan mobileMarginBottom={20} mobileFontSize={20}>
                        <SectionSloganHighlight>
                            {t('over-token.over-token-info-title-highlight')}
                        </SectionSloganHighlight>{' '}
                        {t('over-token.over-token-info-title')}
                    </SectionSlogan>
                </Section>
                <CirculatingSupplyLabelContainer>
                    <CirculatingSupplyLabel>
                        {isMobile ? '' : t('over-token.over-token-circulating-supply')}
                        <BurningLabel>
                            {t('over-token.over-token-burning')}
                            <Icon className="overtime-icon overtime-icon--arrow-down" />
                        </BurningLabel>
                    </CirculatingSupplyLabel>
                    <LiveLabel>
                        {t('over-token.over-token-live')}
                        <Lottie
                            autoplay={true}
                            animationData={liveAnimationData}
                            loop={true}
                            style={isMobile ? liveBlinkStyleMobile : liveBlinkStyle}
                        />
                    </LiveLabel>
                </CirculatingSupplyLabelContainer>
                {!isMobile && (
                    <CirculatingSupplyContainer>
                        <OverIcon className="overtime-icon overtime-icon--over" />
                        <CirculatingSupply isVisbile={!!overTokenInfo}>
                            {getCounter(previousOverTokenInfo?.circulatingSupply, overTokenInfo?.circulatingSupply)}
                        </CirculatingSupply>
                        <BurnIcon className="overtime-icon overtime-icon--burn2" />
                    </CirculatingSupplyContainer>
                )}
                <BurnInfoContainer>
                    {isMobile && (
                        <BurnInfo>
                            <BurnInfoLabel color={theme.textColor.primary}>
                                {t('over-token.over-token-circulating-supply')}
                                <Icon className="overtime-icon overtime-icon--overtime-logo" />
                            </BurnInfoLabel>
                            {getCounter(previousOverTokenInfo?.circulatingSupply, overTokenInfo?.circulatingSupply)}
                        </BurnInfo>
                    )}
                    <BurnInfo>
                        <BurnInfoLabel color={theme.textColor.secondary}>
                            {t('over-token.over-token-total-supply')}
                            <Icon className="overtime-icon overtime-icon--chart" />
                        </BurnInfoLabel>
                        {getCounter(previousOverTokenInfo?.totalSupply, overTokenInfo?.totalSupply)}
                    </BurnInfo>
                    <BurnInfo>
                        <BurnInfoLabel color={theme.warning.textColor.primary}>
                            {t('over-token.over-token-burn-rate')}
                            <Icon className="overtime-icon overtime-icon--burn2" />
                        </BurnInfoLabel>
                        {getCounter(previousOverTokenInfo?.burnRatePerSecond, overTokenInfo?.burnRatePerSecond)}{' '}
                        {`${OVER_CURRENCY}/sec`}
                    </BurnInfo>
                    <BurnInfo>
                        <BurnInfoLabel color={theme.error.textColor.tertiary}>
                            {t('over-token.over-token-burned')}
                            <Icon className="overtime-icon overtime-icon--burn1" />
                        </BurnInfoLabel>
                        {getCounter(previousOverTokenInfo?.burned, overTokenInfo?.burned)}
                    </BurnInfo>
                </BurnInfoContainer>
                {overTokenInfo && <BurnChart buybackByDates={overTokenInfo?.buybackByDates} />}
                <OverContainer>
                    <OverLeftContainer flexBasis="35%">
                        {overTokenInfo && (
                            <OverSupplyChart overTokenInfo={overTokenInfo} isLoading={overTokenInfoQuery.isLoading} />
                        )}
                        <CoinsContainer>
                            <img src={overCoins} />
                        </CoinsContainer>
                    </OverLeftContainer>
                    <OverRightContainer flexBasis="65%" padding="0 0 10px 20px">
                        <Section marginTop={100} mobileMarginTop={170}>
                            <SectionSlogan>
                                <SectionSloganHighlight>
                                    {t('over-token.valute-capture-title-highlight')}
                                </SectionSloganHighlight>{' '}
                                {t('over-token.valute-capture-title')}
                            </SectionSlogan>
                            <Description>{t('over-token.valute-capture-description-1')}</Description>
                            <Description>{t('over-token.valute-capture-description-2')}</Description>
                        </Section>
                        <Section marginTop={100}>
                            <SectionSlogan>
                                {t('over-token.best-odds-title')}{' '}
                                <SectionSloganHighlight>
                                    {t('over-token.best-odds-title-highlight')}
                                </SectionSloganHighlight>
                            </SectionSlogan>
                            <Description>{t('over-token.best-odds-description-1')}</Description>
                            <Description>{t('over-token.best-odds-description-2')}</Description>
                        </Section>
                    </OverRightContainer>
                </OverContainer>
                <Section marginTop={120}>
                    <Label>{t('over-token.over-token-contract-addresses')}</Label>
                    <ContractAddressItem>
                        <OverChainLabel>{t('over-token.list.1')}</OverChainLabel>
                        <ContractAddress>
                            <SPAAnchor
                                href={getEtherscanTokenLink(Network.Mainnet, overContract.addresses[Network.Mainnet])}
                            >
                                {isMobile
                                    ? truncateAddress(overContract.addresses[Network.Mainnet].toLowerCase())
                                    : overContract.addresses[Network.Mainnet].toLowerCase()}{' '}
                                <LinkArrow />
                            </SPAAnchor>
                        </ContractAddress>
                    </ContractAddressItem>
                    <ContractAddressItem>
                        <OverChainLabel>{t('over-token.list.2')}</OverChainLabel>
                        <ContractAddress>
                            <SPAAnchor
                                href={getEtherscanTokenLink(
                                    Network.OptimismMainnet,
                                    overContract.addresses[Network.OptimismMainnet]
                                )}
                            >
                                {isMobile
                                    ? truncateAddress(overContract.addresses[Network.OptimismMainnet].toLowerCase())
                                    : overContract.addresses[Network.OptimismMainnet].toLowerCase()}{' '}
                                <LinkArrow />
                            </SPAAnchor>
                        </ContractAddress>
                    </ContractAddressItem>
                    <ContractAddressItem>
                        <OverChainLabel>{t('over-token.list.3')}</OverChainLabel>
                        <ContractAddress>
                            <SPAAnchor
                                href={getEtherscanTokenLink(Network.Arbitrum, overContract.addresses[Network.Arbitrum])}
                            >
                                {isMobile
                                    ? truncateAddress(overContract.addresses[Network.Arbitrum].toLowerCase())
                                    : overContract.addresses[Network.Arbitrum].toLowerCase()}{' '}
                                <LinkArrow />
                            </SPAAnchor>
                        </ContractAddress>
                    </ContractAddressItem>
                    <ContractAddressItem>
                        <OverChainLabel>{t('over-token.list.4')}</OverChainLabel>
                        <ContractAddress>
                            <SPAAnchor href={getEtherscanTokenLink(Network.Base, overContract.addresses[Network.Base])}>
                                {isMobile
                                    ? truncateAddress(overContract.addresses[Network.Base].toLowerCase())
                                    : overContract.addresses[Network.Base].toLowerCase()}{' '}
                                <LinkArrow />
                            </SPAAnchor>
                        </ContractAddress>
                    </ContractAddressItem>
                </Section>
                <Section marginTop={40}>
                    <Label>{t('over-token.bridge')}</Label>
                    <BridgeDescription>
                        <Trans
                            i18nKey={'over-token.bridge-description'}
                            components={{
                                transporterLink: <SPAAnchor href={LINKS.OverBridge} />,
                                ccipLink: <SPAAnchor href={LINKS.CCIP} />,
                            }}
                        />{' '}
                    </BridgeDescription>
                    <SPAAnchor href={LINKS.OverBridge}>
                        <Action>{t('over-token.bridge-over')}</Action>
                    </SPAAnchor>
                </Section>
            </Content>
            {openBuyOverModal && <BuyOverModal onClose={() => setOpenBuyOverModal(false)} />}
        </>
    );
};

export default OverToken;
