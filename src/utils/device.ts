import { ScreenSizeBreakpoint } from 'enums/ui';

export const isMobile = () => {
    return document.documentElement.clientWidth <= ScreenSizeBreakpoint.SMALL;
};
