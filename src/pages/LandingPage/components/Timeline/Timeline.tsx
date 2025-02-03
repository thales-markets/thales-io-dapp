import SPAAnchor from 'components/SPAAnchor';
import { t } from 'i18next';
import { useGetTimelineQuery } from 'queries/landing/useGetTimelineQuery';
import { useEffect, useMemo, useState } from 'react';
import { Chrono } from 'react-chrono';
import { Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { useTheme } from 'styled-components';
import {
    ArrowIcon,
    Container,
    Milestone,
    MilestoneContainer,
    MilestoneDate,
    MilestoneDescription,
} from './styled-components';
import { Quarter } from './types';
import {
    adaptQuarterForTimeline,
    checkVisible,
    disableAutoScrollTimeline,
    displaySelectedCard,
    scrollSelectedCardIntoView,
} from './utils';

const Timeline: React.FC = () => {
    const theme = useTheme();
    const milestonesQuery = useGetTimelineQuery();

    const milestonesByQuarter: Quarter[] = useMemo(() => {
        return milestonesQuery.isSuccess && milestonesQuery.data ? milestonesQuery.data : [];
    }, [milestonesQuery.isSuccess, milestonesQuery.data]);

    const [selectedItem, setSelectedItem] = useState(milestonesByQuarter.find((quarter) => quarter.selected));
    const items = milestonesByQuarter.map((quarter) => adaptQuarterForTimeline(quarter));

    const isMobile = useSelector(getIsMobile);

    useEffect(() => {
        setSelectedItem(milestonesByQuarter.find((quarter) => quarter.selected));
    }, [milestonesByQuarter]);

    useEffect(() => {
        if (isMobile) {
            displaySelectedCard(items, selectedItem);
            scrollSelectedCardIntoView(items, selectedItem);
        }
    }, [selectedItem, items, isMobile]);

    useEffect(() => {
        if (isMobile) {
            const listener = () => {
                const elm = document.getElementById('timeline-main-wrapper');
                if (elm && checkVisible(elm)) {
                    scrollSelectedCardIntoView(items, selectedItem);
                }
            };
            window.removeEventListener('scroll', listener);
            window.addEventListener('scroll', listener);
        }
    }, [isMobile, items, selectedItem]);

    return (
        <Container>
            {items.length && (
                <Chrono
                    mode={isMobile ? 'VERTICAL' : 'HORIZONTAL'}
                    items={items}
                    activeItemIndex={milestonesByQuarter.findIndex((quarter) => quarter.selected)}
                    theme={{
                        primary: theme.background.secondary,
                        secondary: 'transparent',
                        cardBgColor: theme.background.primary,
                        titleColor: 'white',
                        titleColorActive: 'white',
                    }}
                    onItemSelected={(item) => {
                        // @ts-ignore
                        setSelectedItem(item);
                        disableAutoScrollTimeline();
                    }}
                >
                    {milestonesByQuarter.map((item, index) => {
                        return (
                            <MilestoneContainer key={index}>
                                {item.milestones.map((milestone, index) => {
                                    return (
                                        <SPAAnchor key={index} href={milestone.link}>
                                            <Milestone hideBorder={item.milestones.length - 1 === index}>
                                                {milestone.link && <ArrowIcon />}
                                                <MilestoneDate visible={!!milestone.month || !!milestone.year}>{`${t(
                                                    `${
                                                        milestone?.month
                                                            ? `common.${milestone?.month?.toLowerCase()}`
                                                            : ''
                                                    }`
                                                )}${' '}${milestone.year ? milestone.year : ''}`}</MilestoneDate>
                                                <MilestoneDescription>
                                                    {milestone.description ? (
                                                        milestone.description
                                                    ) : (
                                                        <Trans
                                                            i18nKey={`milestones.${milestone.descriptionKey}`}
                                                            components={{ bold: <span /> }}
                                                        />
                                                    )}
                                                </MilestoneDescription>
                                            </Milestone>
                                        </SPAAnchor>
                                    );
                                })}
                            </MilestoneContainer>
                        );
                    })}
                </Chrono>
            )}
        </Container>
    );
};

export default Timeline;
