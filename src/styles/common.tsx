import styled from 'styled-components';

export const FlexDiv = styled.div<{ gap?: string }>`
    display: flex;
    gap: ${(props) => props.gap || ''};
`;

export const FlexOne = styled.div`
    flex: 1;
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

export const FlexDivColumnBottom = styled(FlexDiv)`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
`;

export const FlexDivColumnSpaceBetween = styled(FlexDiv)`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const FlexDivColumnSpaceAround = styled(FlexDiv)`
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
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
    GRAY: '#BCBCBC',
    LIGHT_GRAY: '#A9ABBB',
    DARK_GRAY: '#181A20',
    WHITE: '#FFFFFF',
    CYAN: '#19F8EF',
    BLUE_DARK: '#313652',
    PURPLE_NAVY: '#405682',
    CHINA_PINK: '#E06AA2',
    VIOLET: '#7E19FE',
    BLUEBERRY: '#4B79EE',
    YANKEES_BLUE: '#1F2438',
    METALLIC_BLUE: '#3F5580',
    INDEPENDENCE: '#43496D',
    RED: '#DE496D',
    ORANGE: '#F7B91A',
    DARK_ORANGE: '#FF8800',
    GREEN: '#03DAC5',
    LIGHT_GREEN: '#B0FFE7',
    DARK_GREEN: '#1D976C',
    BLACK: '#000000',
    BLUE: '#5B86E5',
    LIGHT_BLUE: '#36D1DC',
    LIGHT_RED: '#E29587',
    DARK_RED: '#D66D75',
    LIGHT_ORANGE: '#FFB866',
    TURQUOISE: '#36E5D0',
    INDIAN_RED: '#DD5667',
    VENETIAN_RED: '#E06AA2',
    EGG_BLUE: '#03DAC6',
};

export const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    font-size: 16px;
    background: radial-gradient(circle at center, #262847, #0d111e);
`;

export const Line = styled.div`
    margin: 30px 0 50px 0;
    width: 50%;
    height: 4px;
    border-radius: 10px;
    background: ${(props) => props.theme.background.tertiary};
`;

export const NavContainer = styled.div<{ width?: string }>`
    width: ${(props) => (props.width ? props.width : '60%')};
    margin-bottom: 45px;
`;
