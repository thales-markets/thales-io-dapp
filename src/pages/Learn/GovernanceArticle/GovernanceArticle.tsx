import { ReactComponent as ChartWhite } from 'assets/images/whitepaper/chart4b.svg';
import { Trans, useTranslation } from 'react-i18next';
import { FlexDivCentered } from 'styles/common';
import { ChartContainer, Content, H1, H2, Paragraph } from '../styled-components';

const GovernanceArticle: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Content>
            <FlexDivCentered>
                <H1>{t('about-governance.title')}</H1>
            </FlexDivCentered>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.intro1"
                    components={{
                        bold: <strong />,
                        urlStaking: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://thalesmarket.io/token?activeButtonId=staking"
                            />
                        ),
                        urlVoting: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://thalesmarket.io/governance/thalescouncil.eth/"
                            />
                        ),
                    }}
                />
            </Paragraph>
            <ChartContainer>
                <ChartWhite />
            </ChartContainer>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.intro2"
                    components={{
                        bold: <strong />,
                        url: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://medium.com/@Thales.Academy/how-to-use-github-to-submit-a-tip-e7d0047b54fd"
                            />
                        ),
                    }}
                />
            </Paragraph>
            <H2 id="section1">{t('about-governance.list.1')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.1"
                    components={{
                        bold: <strong />,
                    }}
                />
            </Paragraph>

            <H2 id="section2">{t('about-governance.list.2')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.2"
                    components={{
                        bold: <strong />,
                        url: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/thales-markets/thales-improvement-proposals/tree/main/TIPs"
                            />
                        ),
                        urlDisc: <a target="_blank" rel="noreferrer" href="https://discord.gg/thales" />,
                        urlGov: <a target="_blank" rel="noreferrer" href="https://thalesmarket.io/governance" />,
                        urlDraft: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href=" https://github.com/thales-markets/thales-improvement-proposals/blob/main/TIPs/TIP-1.md"
                            />
                        ),
                        urlStaking: (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://thalesmarket.io/token?activeButtonId=staking"
                            />
                        ),
                    }}
                />
            </Paragraph>

            <H2 id="section3">{t('about-governance.list.3')}</H2>
            <Paragraph>
                <Trans i18nKey="about-governance.paragraphs.3" />
            </Paragraph>

            <H2 id="section4">{t('about-governance.list.4')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.4"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href="https://contracts.thalesmarket.io/" />,
                    }}
                />
            </Paragraph>

            <H2 id="section5">{t('about-governance.list.5')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.5"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href="https://discord.com/invite/thales" />,
                    }}
                />
            </Paragraph>
        </Content>
    );
};

export default GovernanceArticle;
