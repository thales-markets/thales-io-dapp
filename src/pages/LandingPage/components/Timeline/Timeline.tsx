import SPAAnchor from 'components/SPAAnchor';
import { t } from 'i18next';
import { useGetTimelineQuery } from 'queries/landing/useGetTimelineQuery';
import { useMemo } from 'react';
import { Chrono } from 'react-chrono';
import { Trans } from 'react-i18next';
import { useTheme } from 'styled-components';
import { FlexDiv } from 'styles/common';
import { ArrowIcon, Container, Milestone, MilestoneDate, MilestoneDescription } from './styled-components';
import { Quarter } from './types';
import { adaptQuarterForTimeline } from './utils';

const Timeline: React.FC = () => {
    const theme = useTheme();
    const milestonesQuery = useGetTimelineQuery();

    const milestonesByQuarter: Quarter[] = useMemo(() => {
        return milestonesQuery.isSuccess && milestonesQuery.data ? milestonesQuery.data : [];
    }, [milestonesQuery.isSuccess, milestonesQuery.data]);

    const items = milestonesByQuarter.map((quarter) => adaptQuarterForTimeline(quarter));
    return (
        <Container>
            {items.length && (
                <Chrono
                    mode="HORIZONTAL"
                    items={items}
                    activeItemIndex={milestonesByQuarter.length - 1}
                    theme={{
                        primary: '#424451',
                        secondary: 'transparent',
                        cardBgColor: theme.background.primary,
                        titleColor: 'white',
                        titleColorActive: 'white',
                    }}
                >
                    {milestonesByQuarter.map((item, index) => {
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
            )}
        </Container>
    );
};

export default Timeline;
