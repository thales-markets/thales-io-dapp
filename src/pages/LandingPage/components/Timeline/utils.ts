import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel';
import { Quarter } from './types';

export const adaptQuarterForTimeline = (quarter: Quarter): TimelineItemModel => {
    return {
        title: quarter.quarter,
        // @ts-ignore
        milestones: quarter.milestones,
    };
};

export const displaySelectedCard = (items: TimelineItemModel[], selectedItem: Quarter | undefined) => {
    const cards = document.getElementsByClassName('card-content-wrapper');

    const selectedIndex = items.findIndex((quarter) => {
        // @ts-ignore
        if (quarter?.milestones[0].descriptionKey) {
            // @ts-ignore
            return quarter.milestones[0].descriptionKey === selectedItem?.milestones[0].descriptionKey;
        } else {
            // @ts-ignore
            return quarter.milestones[0].description === selectedItem?.milestones[0].description;
        }
    });

    for (const index in cards) {
        // @ts-ignore
        if (cards[index]?.style) {
            if (Number(index) === selectedIndex) {
                // @ts-ignore
                cards[index].style.setProperty('visibility', 'visible', 'important');
            } else {
                // @ts-ignore
                cards[index].style.setProperty('visibility', 'hidden', 'important');
            }
        }
    }
};

export const scrollSelectedCardIntoView = (items: TimelineItemModel[], selectedItem: Quarter | undefined) => {
    const selectedIndex = items.findIndex((quarter) => {
        // @ts-ignore
        if (quarter?.milestones[0].descriptionKey) {
            // @ts-ignore
            return quarter.milestones[0].descriptionKey === selectedItem?.milestones[0].descriptionKey;
        } else {
            // @ts-ignore
            return quarter.milestones[0].description === selectedItem?.milestones[0].description;
        }
    });
    const wrapper = document.getElementById('timeline-main-wrapper');
    const verticalRows = document.getElementsByClassName('vertical-item-row');

    let scrollTop = 0;
    for (const index in verticalRows) {
        if (Number(index) < selectedIndex) {
            const rect = verticalRows[index].getBoundingClientRect();
            scrollTop += rect.height;
        }
    }

    if (wrapper) {
        wrapper.scrollTop = scrollTop;
    }
};

export const disableAutoScrollTimeline = () => {
    // hacky way to disable scrolling the element into view
    const itemElement = document.getElementsByClassName('timeline-horz-card-wrapper')?.[0];
    if (itemElement) {
        itemElement.scrollIntoView = function () {};
    }
};
