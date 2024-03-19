import { ReactComponent as ChartWhite } from 'assets/images/whitepaper/chart4b.svg';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import { Trans, useTranslation } from 'react-i18next';
import { FlexDivCentered } from 'styles/common';
import { buildGovernanceHref, buildHref } from 'utils/routes';
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
                            <a target="_blank" rel="noreferrer" href={`${buildHref(ROUTES.Token.Staking.Home)}`} />
                        ),
                        urlVoting: (
                            <a target="_blank" rel="noreferrer" href={`${buildGovernanceHref(SpaceKey.COUNCIL)}`} />
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
                        url: <a target="_blank" rel="noreferrer" href={LINKS.Blog.HowToOpenTIP} />,
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
                        url: <a target="_blank" rel="noreferrer" href={LINKS.TIPs} />,
                        urlDisc: <a target="_blank" rel="noreferrer" href={LINKS.Discord} />,
                        urlGov: <a target="_blank" rel="noreferrer" href={`${buildHref(ROUTES.DAO.Home)}`} />,
                        urlDraft: <a target="_blank" rel="noreferrer" href={LINKS.TIP1} />,
                        urlStaking: (
                            <a target="_blank" rel="noreferrer" href={`${buildHref(ROUTES.Token.Staking.Home)}`} />
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
                        url: <a target="_blank" rel="noreferrer" href={LINKS.Contracts} />,
                    }}
                />
            </Paragraph>

            <H2 id="section5">{t('about-governance.list.5')}</H2>
            <Paragraph>
                <Trans
                    i18nKey="about-governance.paragraphs.5"
                    components={{
                        bold: <strong />,
                        url: <a target="_blank" rel="noreferrer" href={LINKS.Discord} />,
                    }}
                />
            </Paragraph>
        </Content>
    );
};

export default GovernanceArticle;
