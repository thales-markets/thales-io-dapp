import styled from 'styled-components';

export const FlexDiv = styled.div<{ gap?: string }>`
    display: flex;
    gap: ${(props) => (props.gap ? props.gap : '')};
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
    WHITE: '#FFFFFF',
    CYAN: '#19F8EF',
    BLUE_DARK: '#313652',
};

export const Background = styled.div`
    width: 100%;
    font-size: 16px;
    background: radial-gradient(at center, #484e88, #0d111e);
`;
