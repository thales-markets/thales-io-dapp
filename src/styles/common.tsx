import styled from 'styled-components';

export const FlexDiv = styled.div<{ gap?: string }>`
    display: flex;
    gap: ${(props) => props.gap || ''};
`;

export const FlexDivCentered = styled(FlexDiv)`
    align-items: center;
    justify-content: center;
`;

export const FlexDivSpaceBetween = styled(FlexDiv)`
    align-items: center;
    justify-content: space-between;
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

export const FlexDivColumnSpaceBetween = styled(FlexDiv)`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const FlexDivColumnNative = styled(FlexDiv)`
    flex-direction: column;
`;

export const FlexDivColumnCentered = styled(FlexDivColumn)`
    justify-content: center;
`;

export const FlexDivSpaceAround = styled(FlexDiv)`
    align-items: center;
    justify-content: space-around;
`;

export const Icon = styled.i<{ color?: string; iconSize?: number }>`
    font-size: ${(props) => (props.iconSize ? props.iconSize : '35')}px;
    color: ${(props) => (props.color ? props.color : props.theme.textColor.primary)};
`;

export const Colors = {
    CYAN: '#19F8EF',
    CETACEAN_BLUE: '#0F1231',
    RICH_BLACK: '#07091C',
    PURPLE_NAVY: '#405682',
    YANKEES_BLUE: '#1F2438',

    GRAY: '#424451',
    LIGHT_GRAY: '#A9ABBB',
    DARK_GRAY: '#181A20',

    WHITE: '#FFFFFF',
    BLACK: '#000000',

    CHINA_PINK: '#E06AA2',
    VIOLET: '#7E19FE',
    BLUEBERRY: '#4B79EE',
    INDIAN_RED: '#DD5667',

    GREEN: '#03DAC5',
    LIGHT_GREEN: '#B0FFE7',
    DARK_GREEN: '#1D976C',

    BLUE: '#5B86E5',
    LIGHT_BLUE: '#36D1DC',
    DARK_BLUE: '#313652',

    ORANGE: '#F7B91A',
    LIGHT_ORANGE: '#FFB866',
    DARK_ORANGE: '#FF8800',

    RED: '#DE496D',
    LIGHT_RED: '#E29587',
    DARK_RED: '#D66D75',
};

export const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    font-size: 16px;
    background: ${(props) => props.theme.background.tertiary};
    min-height: -webkit-fill-available;
`;

export const Line = styled.div`
    margin: 30px 0 50px 0;
    width: 50%;
    height: 4px;
    border-radius: 10px;
    background: ${(props) => props.theme.borderColor.secondary};
`;

export const NavContainer = styled.div<{ width?: string }>`
    width: ${(props) => (props.width ? props.width : '40%')};
    margin-bottom: 45px;
`;
