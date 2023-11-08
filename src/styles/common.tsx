import styled from 'styled-components';

export const FlexDiv = styled.div`
    display: flex;
`;

export const FlexDivCentered = styled(FlexDiv)`
    align-items: center;
    justify-content: center;
`;

export const FlexDivSpaceBetween = styled(FlexDiv)`
    align-items: center;
    justify-content: space-between;
`;

export const FlexDivEnd = styled(FlexDiv)`
    justify-content: end;
`;

export const FlexDivStart = styled(FlexDiv)`
    justify-content: start;
`;

export const FlexDivRow = styled(FlexDiv)`
    justify-content: space-between;
`;

export const FlexDivRowCentered = styled(FlexDivRow)`
    align-items: center;
`;

export const FlexDivColumn = styled(FlexDiv)`
    flex: 1;
    flex-direction: column;
`;

export const FlexDivColumnNative = styled(FlexDiv)`
    flex-direction: column;
`;

export const FlexDivColumnCentered = styled(FlexDivColumn)`
    justify-content: center;
`;

export const Colors = {
    GRAY: '#2B3139',
    GRAY_LIGHT: '#848E9C',
    GRAY_DARK: '#181A20',
    GRAY_PURPLE: '#303656',
    GRAY_BLUE: '#808997',

    WHITE: '#FFFFFF',
    CYAN: '#19F8EF',

    GREEN: '#03DAC5',
    GREEN_LIGHT: '#B0FFE7',
    GREEN_DARK: '#1D976C',

    BLACK: '#000000',
    BLACK_LIGHT: '#121212',

    BLUE: '#5B86E5',
    BLUE_LIGHT: '#36D1DC',
    BLUE_DARK: '#1043B4',
    BLUE_MIDNIGHT: '#052040',
    BLUE_MIDNIGHT_LIGHT: '#1b314f',
    BLUE_SKY: '#91bced',

    RED: '#DE496D',
    RED_LIGHT: '#E29587',
    RED_DARK: '#D66D75',

    ORANGE: '#F7B91A',
    ORANGE_LIGHT: '#FFB866',
    ORANGE_DARK: '#FF8800',

    YELLOW: '#FFCC00',
    YELLOW_DARK: '#9b8327',

    PURPLE: '#BF7EFF',
};

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    font-size: 16px;

    @media (max-width: 1440px) {
        font-size: 14px;
    }

    background: linear-gradient(236.02deg, #484e88 17.37%, #0d111e 57.85%);
`;
