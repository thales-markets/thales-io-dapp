import { t } from 'i18next';
import MILESTONES from 'pages/LandingPage/components/Timeline/milestones';
import { Chrono } from 'react-chrono';
import { Trans } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import { FlexDiv } from 'styles/common';
import { adaptQuarterForTimeline } from './utils';

const Timeline: React.FC = () => {
    const items = MILESTONES.map((quarter) => adaptQuarterForTimeline(quarter));

    const theme = useTheme();
    return (
        <Container>
            <Chrono
                mode="HORIZONTAL"
                items={items}
                activeItemIndex={MILESTONES.length - 1}
                theme={{
                    primary: '#424451',
                    secondary: 'transparent',
                    cardBgColor: theme.background.primary,
                    titleColor: 'white',
                    titleColorActive: 'white',
                }}
            >
                {MILESTONES.map((item, index) => {
                    return (
                        <FlexDiv key={index}>
                            {item.milestones.map((milestone, index) => {
                                return (
                                    <Milestone hideBorder={item.milestones.length - 1 === index} key={index}>
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
                                );
                            })}
                        </FlexDiv>
                    );
                })}
            </Chrono>
        </Container>
    );
};

// override styles from react-chrono
const Container = styled.div`
    & > div > div:nth-child(1) {
        order: 1;
    }
    & > div > div:nth-child(2) {
        order: 3;
    }
    & > div > div:nth-child(3) {
        order: 2;
    }
    .timeline-horizontal-container li div.active:after {
        background: #19f8ef !important;
        width: 15px;
        height: 15px;
    }
    .timeline-controls {
        background: #313652;
    }
    .timeline-controls > li > button {
        background: #3f5580;
    }
    #react-chrono-timeline section {
        min-height: auto;
    }
    #react-chrono-timeline {
        align-items: center;
        min-height: 200px;
    }
    #react-chrono-timeline > div {
        margin-bottom: 50px;
    }
`;

const Milestone = styled.div<{ hideBorder?: boolean }>`
    width: 300px;
    border-right: ${(props) => (props.hideBorder ? '' : '2px solid #405682')};
    background: #313652;
    padding: 15px 25px;
`;

const MilestoneDate = styled.div`
    color: white;
    font-family: MontserratBold;
    font-size: 13px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
`;

const MilestoneDescription = styled.div`
    padding-top: 8px;
    color: #a9abbb;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
    span {
        font-family: MontserratBold;
    }
`;

export default Timeline;
