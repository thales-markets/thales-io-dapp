import Coins from 'assets/images/coins.png';
import Button from 'components/Button';
import NumberCountdown from 'components/NumberCountdown';
import SPAAnchor from 'components/SPAAnchor';
import { Network } from 'enums/network';
import { LinkArrow } from 'pages/Dashboard/styled-components';
import { OverDescription } from 'pages/LandingPage/components/OverToken/styled-components';
import {
    Description,
    Section,
    SectionSlogan,
    SectionSloganHighlight,
    SectionTitle,
} from 'pages/LandingPage/styled-components';
import { useTranslation } from 'react-i18next';
import { Colors } from 'styles/common';
import { getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import overContract from 'utils/contracts/overContract';
import OverSupplyChart from './OverSupplyChart';
import {
    Content,
    Label,
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
                    <SectionSloganHighlight>{t('over-token.over-token-info-title-highlight')}</SectionSloganHighlight>{' '}
                    {t('over-token.over-token-info-title')}
                </SectionSlogan>
            </Section>
            <OverContainer>
                <OverLeftContainer>
                    <SectionContainer>
                        <Label>{t('over-token.over-token-total-supply')}</Label>
                        <Value>
                            <NumberCountdown number={69420000} />
                        </Value>
                    </SectionContainer>
                    <SectionContainer>
                        <Label>{t('over-token.over-token-total-burned')}</Label>
                        <Value>
                            <NumberCountdown number={420000} />
                        </Value>
                    </SectionContainer>
                    <SectionContainer>
                        <Label>{t('over-token.over-token-circulating-supply')}</Label>
                        <Value>
                            <NumberCountdown number={69000000} />
                        </Value>
                    </SectionContainer>
                    <SectionContainer>
                        <Label>{t('over-token.over-token-contract-addresses')}</Label>
                        <List>
                            <ListItem>
                                {t('over-token.list.1')}
                                <SPAAnchor
                                    style={{ color: Colors.CYAN }}
                                    href={getEtherscanTokenLink(
                                        Network.OptimismMainnet,
                                        overContract.addresses[Network.Mainnet]
                                    )}
                                >
                                    {truncateAddress(overContract.addresses[Network.Mainnet].toLowerCase())}{' '}
                                    <LinkArrow color={Colors.CYAN} />
                                </SPAAnchor>
                            </ListItem>
                            <ListItem>
                                {t('over-token.list.2')}
                                <SPAAnchor
                                    style={{ color: Colors.CYAN }}
                                    href={getEtherscanTokenLink(
                                        Network.OptimismMainnet,
                                        overContract.addresses[Network.OptimismMainnet]
                                    )}
                                >
                                    {truncateAddress(overContract.addresses[Network.OptimismMainnet].toLowerCase())}{' '}
                                    <LinkArrow color={Colors.CYAN} />
                                </SPAAnchor>
                            </ListItem>
                            <ListItem>
                                {t('over-token.list.3')}
                                <SPAAnchor
                                    style={{ color: Colors.CYAN }}
                                    href={getEtherscanTokenLink(
                                        Network.Arbitrum,
                                        overContract.addresses[Network.Arbitrum]
                                    )}
                                >
                                    {truncateAddress(overContract.addresses[Network.Arbitrum].toLowerCase())}{' '}
                                    <LinkArrow color={Colors.CYAN} />
                                </SPAAnchor>
                            </ListItem>
                            <ListItem>
                                {t('over-token.list.4')}
                                <SPAAnchor
                                    style={{ color: Colors.CYAN }}
                                    href={getEtherscanTokenLink(Network.Base, overContract.addresses[Network.Base])}
                                >
                                    {truncateAddress(overContract.addresses[Network.Base].toLowerCase())}{' '}
                                    <LinkArrow color={Colors.CYAN} />
                                </SPAAnchor>
                            </ListItem>
                        </List>
                    </SectionContainer>
                </OverLeftContainer>
                <OverRightContainer>
                    <OverSupplyChart />
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
        </Content>
    );
};

export default OverToken;
