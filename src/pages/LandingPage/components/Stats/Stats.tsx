import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import barChart from 'assets/images/bar-chart.webp';
import NumberCountdown from 'components/NumberCountdown';
import ROUTES from 'constants/routes';
import { t } from 'i18next';
import { LinkButton } from 'pages/LandingPage/styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AllStats } from 'types/statistics';
import { navigateTo } from 'utils/routes';
import { Container, Label, LeftContainer, RightContainer, SectionContainer, Value } from './styled-components';

type StatsProps = {
    duneStats: AllStats | undefined;
    tvl: number;
};

const Stats: React.FC<StatsProps> = ({ duneStats, tvl }) => {
    return (
        <Container>
            <LeftContainer>
                <img src={barChart} />
            </LeftContainer>
            <RightContainer>
                <SectionContainer>
                    <Label>{t('home.total-protocol-volume')}</Label>
                    <Value>
                        $ <NumberCountdown number={duneStats?.volumeStats?.totalProtocolVolume || 0} />
                    </Value>
                </SectionContainer>
                <SectionContainer>
                    <Label>{t('home.total-value-locked')}</Label>
                    <Value>
                        $ <NumberCountdown number={tvl || 0} />
                    </Value>
                </SectionContainer>
                <SectionContainer>
                    <Label>{t('home.total-unique-users')}</Label>
                    <Value>
                        <NumberCountdown number={duneStats?.usersStats?.totalUniqueUsers || 0} />
                    </Value>
                </SectionContainer>
                <SectionContainer>
                    <Label>{t('home.markets-created')}</Label>
                    <Value>
                        <NumberCountdown number={duneStats?.marketsStats?.totalUniqueMarkets || 0} />
                    </Value>
                </SectionContainer>
                <LinkButton onClick={() => navigateTo(ROUTES.Dashboard)}>
                    {t('home.see-all-stats-button')} <ArrowHyperlinkIcon />
                </LinkButton>
            </RightContainer>
        </Container>
    );
};

export default Stats;
