import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumnCentered, FlexDivRow } from 'styles/common';
import { getStatusColor } from 'utils/governance';

export const CardContainer = styled(FlexDivColumnCentered)`
    width: 100%;
    position: relative;
    min-height: 200px;
    padding: 2px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    align-items: center;
    color: ${(props) => props.theme.textColor.primary};
    cursor: pointer;
    &:hover {
        background: ${(props) => props.theme.background.secondary};
    }
`;

export const Card = styled.div`
    border-radius: 15px;
    background: ${(props) => props.theme.background.primary};
    width: 100%;
    height: 100%;
    padding: 20px;
`;

export const Status = styled(FlexDivCentered)<{ status: string }>`
    font-weight: bold;
    color: ${(props) => getStatusColor(props.status)};
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: 0.5px;
    border-radius: 8px;
    padding: 0px 20px;
    height: 36px;
    text-align: center;
    margin-right: 20px;
`;

export const Title = styled(FlexDivRow)<{ status: string }>`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.textColor.primary};
    margin-top: 25px;
    margin-bottom: 25px;
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
`;

export const RightSection = styled.div`
    text-align: right;
`;

export const StatusIcon = styled.i<{ color: string }>`
    font-size: 25px;
    margin-right: 5px;
    color: ${(props) => props.color};
`;
