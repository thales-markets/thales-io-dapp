import styled from 'styled-components';
import { Colors, FlexDivCentered, FlexDivColumnCentered, FlexDivRow } from 'styles/common';
import { getStatusColor } from 'utils/governance';

export const CardContainer = styled(FlexDivColumnCentered)`
    width: 100%;
    position: relative;
    max-height: 160px;
    padding: 2px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    align-items: center;
    color: ${(props) => props.theme.textColor.primary};
    cursor: pointer;
`;

export const Card = styled.div<{ closed: boolean }>`
    border-radius: 8px;
    background: ${(props) => (props.closed ? 'rgba(49, 54, 82, 0.4)' : 'rgba(49, 54, 82, 1)')};
    border: ${(props) => (props.closed ? `1.5px solid ${Colors.PURPLE_NAVY}` : `1.5px solid ${Colors.BLUE_DARK}`)};
    width: 100%;
    height: 100%;
    padding: 20px;
    &:hover {
        border: ${(props) => `1.5px solid ${props.theme.background.secondary}`};
    }
`;

export const Status = styled(FlexDivCentered)<{ status: string }>`
    font-weight: bold;
    color: ${(props) => getStatusColor(props.status)};
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: 0.5px;
    border-radius: 8px;
    height: 18px;
    text-align: center;
    margin-right: 20px;
`;

export const Title = styled(FlexDivRow)<{ status: string }>`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.textColor.primary};
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const Body = styled(FlexDivRow)<{ status: string }>`
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    color: ${(props) => props.theme.textColor.tertiary};
    overflow-wrap: anywhere;
`;

export const ResultContainer = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: right;
    font-size: 18px;
    font-weight: 600px;
    line-height: 18px;
`;

export const RightSection = styled.div`
    text-align: right;
    font-size: 18px;
    font-weight: 600px;
    line-height: 18px;
`;

export const StatusIcon = styled.i<{ color: string }>`
    font-size: 25px;
    margin-right: 5px;
    color: ${(props) => props.color};
`;
