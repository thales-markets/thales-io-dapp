import SPAAnchor from 'components/SPAAnchor';
import { t } from 'i18next';
import MILESTONES_BY_QUARTER from 'pages/LandingPage/components/Timeline/milestones';
import { Chrono } from 'react-chrono';
import { Trans } from 'react-i18next';
import { useTheme } from 'styled-components';
import { FlexDiv } from 'styles/common';
import { ArrowIcon, Container, Milestone, MilestoneDate, MilestoneDescription } from './styled-components';
import { adaptQuarterForTimeline } from './utils';

const Timeline: React.FC = () => {
    const items = MILESTONES_BY_QUARTER.map((quarter) => adaptQuarterForTimeline(quarter));

    const theme = useTheme();
    return (
        <Container>
            <Chrono
                mode="HORIZONTAL"
                items={items}
                activeItemIndex={MILESTONES_BY_QUARTER.length - 1}
                theme={{
                    primary: '#424451',
                    secondary: 'transparent',
                    cardBgColor: theme.background.primary,
                    titleColor: 'white',
                    titleColorActive: 'white',
                }}
            >
                {MILESTONES_BY_QUARTER.map((item, index) => {
                    return (
                        <FlexDiv key={index}>
                            {item.milestones.map((milestone, index) => {
                                return (
                                    <SPAAnchor key={index} href={milestone.link}>
                                        <Milestone hideBorder={item.milestones.length - 1 === index}>
                                            <ArrowIcon />
                                            <MilestoneDate>{`${t(`common.${milestone.month.toLowerCase()}`)} ${
                                                milestone.year
                                            }`}</MilestoneDate>
                                            <MilestoneDescription>
                                                <Trans
                                                    i18nKey={`milestones.${milestone.descriptionKey}`}
                                                    components={{ bold: <span /> }}
                                                />
                                            </MilestoneDescription>
                                        </Milestone>
                                    </SPAAnchor>
                                );
                            })}
                        </FlexDiv>
                    );
                })}
            </Chrono>
        </Container>
    );
};

export default Timeline;
