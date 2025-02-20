import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumnCentered, FlexDivSpaceBetween } from 'styles/common';

export const Container = styled(FlexDivColumnCentered)`
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    background: ${(props) => props.theme.background.primary};
    border-radius: 15px;
    align-items: center;
    padding: 50px;
    width: 600px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: auto;
        height: auto;
        padding: 30px;
    }
`;

export const Title = styled.span`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 25px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.025em;
    text-align: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 18px;
        margin-top: 0px;
    }
`;

export const Description = styled.span`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.025em;
    text-align: left;
    margin-top: 20px;
    width: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
        margin-top: 10px;
    }
    p {
        margin-bottom: 15px;
        text-align: start;
    }
`;

export const InputContainer = styled.div`
    position: relative;
    width: 350px;
    margin-top: 30px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 20px;
        width: 300px;
    }
`;

export const ButtonContainer = styled(FlexDivCentered)`
    button {
        @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
            width: 300px;
        }
    }
`;

export const defaultCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-48%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        background: 'transparent',
        border: 'none',
        overflow: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 202,
    },
};

export const CloseIcon = styled.i`
    font-size: 16px;
    color: ${(props) => props.theme.textColor.tertiary};
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 14px 15px;
    cursor: pointer;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        right: 0px;
        top: 0px;
        padding: 12px 13px;
    }
`;

export const defaultButtonProps = {
    width: '350px',
    margin: '15px 0 0 0',
};

export const TipLink = styled.a`
    color: ${(props) => props.theme.link.textColor.primary};
    &:hover {
        text-decoration: underline;
    }
`;

export const Summary = styled(FlexDivSpaceBetween)`
    width: 350px;
    margin-bottom: 10px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 300px;
    }
`;

export const SummaryLabel = styled.span`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textColor.secondary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        line-height: 24px;
    }
`;

export const SummaryValue = styled.span`
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.025em;
    color: ${(props) => props.theme.textColor.secondary};
    margin-left: auto;
`;
