import coins from 'assets/images/coins.webp';
import overflow from 'assets/lotties/overflow.json';
import NumberCountdown from 'components/NumberCountdown';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { Network } from 'enums/network';
import Lottie from 'lottie-react';
import { Action } from 'pages/LandingPage/components/EcosystemApps/styled-components';
import { OverDescription } from 'pages/LandingPage/components/OverToken/styled-components';
import {
    Description,
    LinkButton,
    LottieContainer,
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
import { getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import { OverTokenInfo } from 'types/token';
import overContract from 'utils/contracts/overContract';
import { buildHref } from 'utils/routes';
import BuyOverModal from './BuyOverModal/BuyOverModal';
import OverSupplyChart from './OverSupplyChart';
import {
    BridgeDescription,
    Content,
    Label,
    LinkArrow,
    List,
    ListItem,
    OverContainer,
    OverLeftContainer,
    OverRightContainer,
    SectionContainer,
    Value,
} from './styled-components';

const OverToken: React.FC = () => {
    const { t } = useTranslation();
    const isMobile = useSelector(getIsMobile);
    const isAppReady = useSelector(getIsAppReady);
    const [overTokenInfo, setOverTokenInfo] = useState<OverTokenInfo | undefined>(undefined);
    const [openBuyOverModal, setOpenBuyOverModal] = useState<boolean>(false);

    const overTokenInfoQuery = useOverTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (overTokenInfoQuery.isSuccess && overTokenInfoQuery.data) {
            setOverTokenInfo(overTokenInfoQuery.data);
        }
    }, [overTokenInfoQuery.isSuccess, overTokenInfoQuery.data]);

    return (
        <>
            <Content>
                <OverContainer>
                    <OverLeftContainer>
                        <SectionTitle>{t('over-token.title')}</SectionTitle>
                        <Section marginTop={70}>
                            <OverDescription>{t('home.over-token.description')}</OverDescription>
                            <Description>{t('over-token.description-1')}</Description>
                            <Description marginBottom={40}>{t('over-token.description-2')}</Description>
                            <LinkButton onClick={() => setOpenBuyOverModal(true)}>
                                {t('over-token.buy-over')}
                            </LinkButton>
                        </Section>
                    </OverLeftContainer>
                    <OverRightContainer>
                        <img src={coins} />
                    </OverRightContainer>
                </OverContainer>
                <Section marginTop={70}>
                    <SectionSlogan mobileMarginBottom={20} mobileFontSize={20}>
                        <SectionSloganHighlight>
                            {t('over-token.over-token-info-title-highlight')}
                        </SectionSloganHighlight>{' '}
                        {t('over-token.over-token-info-title')}
                    </SectionSlogan>
                </Section>
                <OverContainer>
                    <OverLeftContainer>
                        <SectionContainer>
                            <Label>{t('over-token.over-token-total-supply')}</Label>
                            <Value>
                                <NumberCountdown number={overTokenInfo?.totalSupply || 0} />
                            </Value>
                        </SectionContainer>
                        <SectionContainer>
                            <Label>{t('over-token.over-token-total-burned')}</Label>
                            <Value>
                                <NumberCountdown number={overTokenInfo?.burned || 0} />
                            </Value>
                        </SectionContainer>
                        <SectionContainer>
                            <Label>{t('over-token.over-token-circulating-supply')}</Label>
                            <Value>
                                <NumberCountdown number={overTokenInfo?.circulatingSupply || 0} />
                            </Value>
                        </SectionContainer>
                        <SectionContainer>
                            <Label>{t('over-token.over-token-contract-addresses')}</Label>
                            <List>
                                <ListItem>
                                    {t('over-token.list.1')}
                                    <SPAAnchor
                                        href={getEtherscanTokenLink(
                                            Network.Mainnet,
                                            overContract.addresses[Network.Mainnet]
                                        )}
                                    >
                                        {isMobile
                                            ? truncateAddress(overContract.addresses[Network.Mainnet].toLowerCase())
                                            : overContract.addresses[Network.Mainnet].toLowerCase()}{' '}
                                        <LinkArrow />
                                    </SPAAnchor>
                                </ListItem>
                                <ListItem>
                                    {t('over-token.list.2')}
                                    <SPAAnchor
                                        href={getEtherscanTokenLink(
                                            Network.OptimismMainnet,
                                            overContract.addresses[Network.OptimismMainnet]
                                        )}
                                    >
                                        {isMobile
                                            ? truncateAddress(
                                                  overContract.addresses[Network.OptimismMainnet].toLowerCase()
                                              )
                                            : overContract.addresses[Network.OptimismMainnet].toLowerCase()}{' '}
                                        <LinkArrow />
                                    </SPAAnchor>
                                </ListItem>
                                <ListItem>
                                    {t('over-token.list.3')}
                                    <SPAAnchor
                                        href={getEtherscanTokenLink(
                                            Network.Arbitrum,
                                            overContract.addresses[Network.Arbitrum]
                                        )}
                                    >
                                        {isMobile
                                            ? truncateAddress(overContract.addresses[Network.Arbitrum].toLowerCase())
                                            : overContract.addresses[Network.Arbitrum].toLowerCase()}{' '}
                                        <LinkArrow />
                                    </SPAAnchor>
                                </ListItem>
                                <ListItem>
                                    {t('over-token.list.4')}
                                    <SPAAnchor
                                        href={getEtherscanTokenLink(Network.Base, overContract.addresses[Network.Base])}
                                    >
                                        {isMobile
                                            ? truncateAddress(overContract.addresses[Network.Base].toLowerCase())
                                            : overContract.addresses[Network.Base].toLowerCase()}{' '}
                                        <LinkArrow />
                                    </SPAAnchor>
                                </ListItem>
                            </List>
                        </SectionContainer>
                        <SectionContainer>
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
                        </SectionContainer>
                    </OverLeftContainer>
                    <OverRightContainer padding="0 0 60px 0">
                        {overTokenInfo && (
                            <OverSupplyChart overTokenInfo={overTokenInfo} isLoading={overTokenInfoQuery.isLoading} />
                        )}
                    </OverRightContainer>
                </OverContainer>
                <Section marginTop={70}>
                    <SectionSlogan>
                        {t('over-token.best-odds-title')}{' '}
                        <SectionSloganHighlight>{t('over-token.best-odds-title-highlight')}</SectionSloganHighlight>
                    </SectionSlogan>
                    <Description>{t('over-token.best-odds-description-1')}</Description>
                    <Description>{t('over-token.best-odds-description-2')}</Description>
                </Section>
                <Section>
                    <SectionSlogan>{t('over-token.valute-capture-title')}</SectionSlogan>
                    <Description>{t('over-token.valute-capture-description-1')}</Description>
                    <Description>{t('over-token.valute-capture-description-2')}</Description>
                    <LottieContainer>
                        <Lottie animationData={overflow} />
                    </LottieContainer>
                </Section>
                <Section marginBottom={50}>
                    <SectionSlogan>
                        {t('over-token.governance-title')}{' '}
                        <SectionSloganHighlight>{t('over-token.governance-title-highlight')}</SectionSloganHighlight>
                    </SectionSlogan>
                    <Description marginBottom={20}>{t('over-token.governance-description')}</Description>
                    <SPAAnchor href={buildHref(ROUTES.DAO.Home)} scrollTop={true}>
                        <LinkButton>{t('home.governance.explore-overtime-dao-button')}</LinkButton>
                    </SPAAnchor>
                </Section>
            </Content>
            {openBuyOverModal && <BuyOverModal onClose={() => setOpenBuyOverModal(false)} />}
        </>
    );
};

export default OverToken;
