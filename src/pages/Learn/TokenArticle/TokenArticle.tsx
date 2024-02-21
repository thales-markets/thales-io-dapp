import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { Network } from 'enums/network';
import { LinkArrow } from 'pages/Dashboard/styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { Colors, FlexDivCentered } from 'styles/common';
import { getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import thalesContract from 'utils/contracts/thalesContract';
import { buildHref } from 'utils/routes';
import { Content, H1, H2, ListItem, Paragraph } from '../styled-components';

const TokenArticle: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Content>
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
                />
            </Paragraph>
            <H2 id="section1">{t('about-thales-token.list.3')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.3"
                    components={{
                        bold: <strong />,
                        url: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://docs.thalesmarket.io/thales-token/thales-tokenomics"
                            />
                        ),
                    }}
                />
            </Paragraph>
            <H2 id="section1">{t('about-thales-token.list.4')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.4"
                    components={{
                        bold: <strong />,
                        oneInch: <a target="_blank" rel="noreferrer" href="https://app.1inch.io/" />,
                        llamaSwap: <a target="_blank" rel="noreferrer" href="http://swap.defillama.com" />,
                        paraswap: <a target="_blank" rel="noreferrer" href="https://www.paraswap.io/" />,
                        matcha: <a target="_blank" rel="noreferrer" href="https://matcha.xyz/" />,
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
                        urlStakingGuide: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://docs.thalesmarket.io/thales-token/staking-thales-on-optimism-guide"
                            />
                        ),
                    }}
                />
            </Paragraph>
            <H2 id="section1">{t('about-thales-token.list.6')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-thales-token.paragraphs.6"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href="https://discord.com/invite/thales" />,
                    }}
                />
            </Paragraph>
        </Content>
    );
};

export default TokenArticle;
