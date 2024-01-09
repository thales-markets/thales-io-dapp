import { ReactComponent as Chart1White } from 'assets/images/whitepaper/chart1b.svg';
import { ReactComponent as Chart2White } from 'assets/images/whitepaper/chart2b.svg';
import { ReactComponent as Chart3White } from 'assets/images/whitepaper/chart3b.svg';
import { ReactComponent as Chart4White } from 'assets/images/whitepaper/chart4b.svg';
import { ReactComponent as Chart5White } from 'assets/images/whitepaper/chart5b.svg';
import { ReactComponent as ThalesLogoWhitepaperWhite } from 'assets/images/whitepaper/thales-logo-whitepaper-white.svg';
import { Trans, useTranslation } from 'react-i18next';
import { FlexDivCentered } from 'styles/common';
import { ChartContainer, ChartLabel, Content, Date, H1, H2, H3, List, ListItem, Paragraph } from '../styled-components';

const WhitepaperArticle: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Content>
            <FlexDivCentered>
                <ThalesLogoWhitepaperWhite />
            </FlexDivCentered>
            <FlexDivCentered>
                <H1>{t('whitepaper.title')}</H1>
            </FlexDivCentered>
            <FlexDivCentered>
                <Date>{t('whitepaper.date')}</Date>
            </FlexDivCentered>
            <H2>{t('whitepaper.paragraphs.abstract.title')}</H2>
            <Paragraph>{t('whitepaper.paragraphs.abstract.section1')}</Paragraph>
            <H2>{t('whitepaper.paragraphs.1.title')}</H2>
            <Paragraph>{t('whitepaper.paragraphs.1.section1')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.1.section2')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.1.section3')}</Paragraph>
            <H3>{t('whitepaper.paragraphs.1-1.title')}</H3>
            <Paragraph>{t('whitepaper.paragraphs.1-1.section1')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.1-1.section2')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.1-1.section3')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.1-1.section4')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.1-1.section5')}</Paragraph>
            <H3>{t('whitepaper.paragraphs.1-2.title')}</H3>
            <Paragraph>{t('whitepaper.paragraphs.1-2.section1')}</Paragraph>
            <H3>{t('whitepaper.paragraphs.1-3.title')}</H3>
            <Paragraph>{t('whitepaper.paragraphs.1-3.section1')}</Paragraph>
            <H2>{t('whitepaper.paragraphs.2.title')}</H2>
            <Paragraph>{t('whitepaper.paragraphs.2.section1')}</Paragraph>
            <ListItem bold={true}>ParimutuelMarketManager.sol</ListItem>
            <Paragraph>{t('whitepaper.paragraphs.2.section2')}</Paragraph>
            <ListItem bold={true}>ParimutuelMarketFactory.sol</ListItem>
            <Paragraph>{t('whitepaper.paragraphs.2.section3')}</Paragraph>
            <ListItem bold={true}>ParimutuelMarket.sol</ListItem>
            <Paragraph>{t('whitepaper.paragraphs.2.section4')}</Paragraph>
            <ListItem bold={true}>ParimutuelPosition.sol</ListItem>
            <Paragraph>{t('whitepaper.paragraphs.2.section5')}</Paragraph>
            <H3>{t('whitepaper.paragraphs.2-1.title')}</H3>
            <ChartContainer>
                <Chart1White />
                <ChartLabel>{t('whitepaper.paragraphs.2-1.chartlabel')}</ChartLabel>
            </ChartContainer>
            <Paragraph>{t('whitepaper.paragraphs.2-1.section1')}</Paragraph>
            <List>
                <ListItem bold={true}>{t('whitepaper.paragraphs.2-1.listitem1')}</ListItem>
                <ListItem bold={true}>{t('whitepaper.paragraphs.2-1.listitem2')}</ListItem>
                <ListItem bold={true}>{t('whitepaper.paragraphs.2-1.listitem3')}</ListItem>
                <ListItem bold={true} style={{ marginBottom: '1em' }}>
                    {t('whitepaper.paragraphs.2-1.listitem4')}
                </ListItem>
            </List>
            <Paragraph>
                <Trans
                    i18nKey="whitepaper.paragraphs.2-1.section2"
                    components={{
                        bold: <strong />,
                    }}
                />
            </Paragraph>
            <H3>{t('whitepaper.paragraphs.2-2.title')}</H3>
            <ChartContainer>
                <Chart2White />
                <ChartLabel>{t('whitepaper.paragraphs.2-2.chartlabel')}</ChartLabel>
            </ChartContainer>
            <Paragraph>{t('whitepaper.paragraphs.2-2.section1')}</Paragraph>
            <Paragraph>
                <Trans
                    i18nKey="whitepaper.paragraphs.2-2.section2"
                    components={{
                        bold: <strong />,
                    }}
                />
            </Paragraph>
            <H3>{t('whitepaper.paragraphs.2-3.title')}</H3>
            <ChartContainer>
                <Chart3White />
                <ChartLabel>{t('whitepaper.paragraphs.2-3.chartlabel')}</ChartLabel>
            </ChartContainer>
            <Paragraph>{t('whitepaper.paragraphs.2-3.section1')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.2-3.section2')}</Paragraph>
            <H2>{t('whitepaper.paragraphs.3.title')}</H2>
            <Paragraph>{t('whitepaper.paragraphs.3.section1')}</Paragraph>
            <ChartContainer>
                <Chart4White />
            </ChartContainer>
            <Paragraph>{t('whitepaper.paragraphs.3.section2')}</Paragraph>
            <List>
                <ListItem bold={true}>{t('whitepaper.paragraphs.3.listitem1')}</ListItem>
                <ListItem bold={true}>{t('whitepaper.paragraphs.3.listitem2')}</ListItem>
                <ListItem bold={true} style={{ marginBottom: '1em' }}>
                    {t('whitepaper.paragraphs.3.listitem3')}
                </ListItem>
            </List>
            <Paragraph>{t('whitepaper.paragraphs.3.section3')}</Paragraph>
            <H3>{t('whitepaper.paragraphs.3-1.title')}</H3>
            <Paragraph>
                <Trans
                    i18nKey="whitepaper.paragraphs.3-1.section1"
                    components={{
                        bold: <strong />,
                    }}
                />
            </Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.3-1.section2')}</Paragraph>
            <Paragraph>
                <Trans
                    i18nKey="whitepaper.paragraphs.3-1.section3"
                    components={{
                        bold: <strong />,
                    }}
                />
            </Paragraph>
            <List>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem1')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem2')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem3')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem4')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem5')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem6')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem7')}</ListItem>
                <ListItem>{t('whitepaper.paragraphs.3-1.listitem8')}</ListItem>
            </List>
            <H3>{t('whitepaper.paragraphs.3-2.title')}</H3>
            <Paragraph>{t('whitepaper.paragraphs.3-2.section1')}</Paragraph>
            <H3>{t('whitepaper.paragraphs.3-3.title')}</H3>
            <Paragraph>{t('whitepaper.paragraphs.3-3.section1')}</Paragraph>
            <H2>{t('whitepaper.paragraphs.4.title')}</H2>
            <ChartContainer>
                <Chart5White />
            </ChartContainer>
            <Paragraph>{t('whitepaper.paragraphs.4.section1')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.4.section2')}</Paragraph>
            <Paragraph>{t('whitepaper.paragraphs.4.section3')}</Paragraph>
        </Content>
    );
};

export default WhitepaperArticle;
