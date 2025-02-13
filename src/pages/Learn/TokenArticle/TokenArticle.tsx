import Coins from 'assets/images/coins.png';
import Button from 'components/Button';
import SPAAnchor from 'components/SPAAnchor';
import { THALES_CURRENCY } from 'constants/currency';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { Network } from 'enums/network';
import { LinkArrow } from 'pages/Dashboard/styled-components';
import { OverDescription, SectionContainer } from 'pages/LandingPage/components/OverToken/styled-components';
import {
    Description,
    Section,
    SectionSlogan,
    SectionSloganHighlight,
    SectionTitle,
} from 'pages/LandingPage/styled-components';
import useGlobalStakingDataQuery from 'queries/token/useGlobalStakingDataQuery';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors, FlexDivCentered } from 'styles/common';
import { formatCurrencyWithKey, getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import { GlobalStakingData } from 'types/token';
import thalesContract from 'utils/contracts/thalesContract';
import { buildHref } from 'utils/routes';
import {
    Content,
    H1,
    H2,
    ListItem,
    OverContainer,
    OverLeftContainer,
    OverRightContainer,
    Paragraph,
} from '../styled-components';

const TokenArticle: React.FC = () => {
    const { t } = useTranslation();

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [lastValidGlobalStakingData, setLastValidGlobalStakingData] = useState<GlobalStakingData | undefined>(
        undefined
    );

    const globalStakingDataQuery = useGlobalStakingDataQuery({ enabled: isAppReady });

    useEffect(() => {
        if (globalStakingDataQuery.isSuccess && globalStakingDataQuery.data) {
            setLastValidGlobalStakingData(globalStakingDataQuery.data);
        }
    }, [globalStakingDataQuery.isSuccess, globalStakingDataQuery.data]);

    return (
        <Content>
            <OverContainer>
                <OverLeftContainer>
                    <SectionContainer>
                        <SectionTitle>{t('over-token.title')}</SectionTitle>
                        <OverDescription>{t('home.over-token.description')}</OverDescription>
                        <Description>{t('over-token.description-1')}</Description>
                        <Description>{t('over-token.description-2')}</Description>
                        <Button>Buy $OVER</Button>
                    </SectionContainer>
                </OverLeftContainer>
                <OverRightContainer>
                    <img src={Coins} />
                </OverRightContainer>
            </OverContainer>
            <Section>
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
            </Section>
            <Section>
                <SectionSlogan>
                    {t('over-token.governance-title')}{' '}
                    <SectionSloganHighlight>{t('over-token.governance-title-highlight')}</SectionSloganHighlight>
                </SectionSlogan>
                <Description>{t('over-token.governance-description')}</Description>
            </Section>

            <FlexDivCentered>
                <H1>{t('about-thales-token.title')}</H1>
            </FlexDivCentered>
            <H2 id="section1">{t('about-thales-token.list.1')}</H2>
            <Paragraph>
                <Trans i18nKey="about-thales-token.paragraphs.1" />
            </Paragraph>
            <ListItem>
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(
                        Network.OptimismMainnet,
                        thalesContract.addresses[Network.OptimismMainnet]
                    )}
                >
                    Thales on Optimism
                    <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <ListItem>
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(Network.Arbitrum, thalesContract.addresses[Network.Arbitrum])}
                >
                    Thales on Arbitrum <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <ListItem>
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(Network.Base, thalesContract.addresses[Network.Base])}
                >
                    Thales on Base <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <ListItem>
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(Network.Mainnet, thalesContract.addresses[Network.Mainnet])}
                >
                    Thales on Mainnet <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <H2 id="section1">{t('about-thales-token.list.2')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.2"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href={buildHref(ROUTES.About.Governance)} />,
                    }}
                    values={{
                        rewards: formatCurrencyWithKey(
                            THALES_CURRENCY,
                            lastValidGlobalStakingData?.baseRewards ? lastValidGlobalStakingData?.baseRewards : 0
                        ),
                    }}
                />
            </Paragraph>
            <H2 id="section1">{t('about-thales-token.list.3')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.3"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href={LINKS.Tokenomics} />,
                    }}
                />
            </Paragraph>
            <H2 id="section1">{t('about-thales-token.list.4')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.4"
                    components={{
                        bold: <strong />,
                        oneInch: <a target="_blank" rel="noreferrer" href={LINKS.OneInch} />,
                        llamaSwap: <a target="_blank" rel="noreferrer" href={LINKS.DefiLlama} />,
                        paraswap: <a target="_blank" rel="noreferrer" href={LINKS.Paraswap} />,
                        matcha: <a target="_blank" rel="noreferrer" href={LINKS.Matcha} />,
                    }}
                />
            </Paragraph>
            <ListItem>
                {t('about-thales-token.paragraphs.list.1')}
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(
                        Network.OptimismMainnet,
                        thalesContract.addresses[Network.OptimismMainnet]
                    )}
                >
                    {truncateAddress(thalesContract.addresses[Network.OptimismMainnet].toLowerCase())}{' '}
                    <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <ListItem>
                {t('about-thales-token.paragraphs.list.2')}
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(Network.Arbitrum, thalesContract.addresses[Network.Arbitrum])}
                >
                    {truncateAddress(thalesContract.addresses[Network.Arbitrum].toLowerCase())}{' '}
                    <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <ListItem>
                {t('about-thales-token.paragraphs.list.3')}
                <SPAAnchor
                    style={{ color: Colors.CYAN }}
                    href={getEtherscanTokenLink(Network.Base, thalesContract.addresses[Network.Base])}
                >
                    {truncateAddress(thalesContract.addresses[Network.Base].toLowerCase())}{' '}
                    <LinkArrow color={Colors.CYAN} />
                </SPAAnchor>
            </ListItem>
            <H2 id="section1">{t('about-thales-token.list.5')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.5"
                    components={{
                        bold: <strong />,
                        urlStaking: <a target="_blank" rel="noreferrer" href={buildHref(ROUTES.Token.Staking.Home)} />,
                        urlStakingGuide: <a target="_blank" rel="noreferrer" href={LINKS.StakingGuide} />,
                    }}
                />
            </Paragraph>
            <H2 id="section1">{t('about-thales-token.list.6')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.6"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href={LINKS.Discord} />,
                    }}
                />
            </Paragraph>
        </Content>
    );
};

export default TokenArticle;
