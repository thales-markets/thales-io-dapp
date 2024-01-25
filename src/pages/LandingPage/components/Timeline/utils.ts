import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel';
import { Quarter } from './types';

export const adaptQuarterForTimeline = (quarter: Quarter): TimelineItemModel => {
    return {
        title: quarter.quarter,
        url: 'http://www.history.com', // TODO
    };
};
