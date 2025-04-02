import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivRow } from 'styles/common';
import { getStatusColor } from 'utils/governance';

export const Card = styled(FlexDivColumn)<{ closed: boolean }>`
    height: 222px;
    border-radius: 8px;
    background: ${(props) => (props.closed ? 'rgba(49, 54, 82, 0.4)' : 'rgba(49, 54, 82, 0.7)')};
    border: ${(props) => `1.5px solid ${props.theme.borderColor.secondary}`};
    padding: 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.textColor.primary};
    cursor: pointer;
    &:hover {
        border: ${(props) => `1.5px solid ${props.theme.borderColor.tertiary}`};
    }
    gap: 15px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 14px;
        height: auto;
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
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
    }
`;

export const Title = styled(FlexDivRow)<{ status: string }>`
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 14px;
    }
`;

export const TipTable = styled(FlexDivColumn)`
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    display: flex;
    flex-direction: row;
    color: ${(props) => props.theme.textColor.primary};
    p {
        margin-bottom: 15px;
        color: ${(props) => props.theme.textColor.tertiary};
    }
    a {
        color: ${(props) => props.theme.textColor.primary};
        word-wrap: break-word;
        pointer-events: none;
        cursor: default;
    }
    table {
        width: 100% !important;
        table-layout: fixed;
        text-overflow: ellipsis;
        th {
            border: 1px solid ${(props) => props.theme.borderColor.primary};
            padding: 6px 13px;
            p {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2;
                -webkit-box-orient: vertical;
                color: ${(props) => props.theme.textColor.tertiary};
                margin-bottom: 0px;
            }
        }
        td {
            border: 1px solid ${(props) => props.theme.borderColor.primary};
            padding: 6px 13px;
            p {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3; /* number of lines to show */
                line-clamp: 3;
                -webkit-box-orient: vertical;
                color: ${(props) => props.theme.textColor.primary};
                margin-bottom: 0px;
            }
        }
    }
    h2 {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: ${(props) => props.theme.textColor.primary};
        margin-top: 24px;
        margin-bottom: 16px;
    }
`;

export const ResultContainer = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: right;
    font-size: 18px;
    font-weight: 600px;
    line-height: 18px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
    }
`;

export const RightSection = styled.div`
    text-align: right;
    font-size: 18px;
    font-weight: 600px;
    line-height: 18px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
    }
`;

export const StatusIcon = styled.i<{ color: string }>`
    font-size: 25px;
    margin-right: 5px;
    color: ${(props) => props.color};
`;
