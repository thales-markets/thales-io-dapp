import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumnCentered, FlexDivRow, FlexDivSpaceBetween } from 'styles/common';

export const Container = styled(FlexDivRow)`
    gap: 45px;
    width: 100%;
    margin-top: 60px;
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        margin-top: 40px;
        gap: 20px;
    }
`;

export const CardContainer = styled(FlexDivColumnCentered)<{ image: string; mobileImage: string }>`
    background-image: url(${(props) => props.image});
    background-size: 100% 100%;
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    border-radius: 10px;
    padding: 20px 20px 30px 20px;
    width: 100%;
    height: 340px;
    background-color: ${(props) => props.theme.background.primary};
    color: ${(props) => props.theme.textColor.primary};
    flex: 1 1 0;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        padding: 10px 20px 20px 20px;
        background-image: url(${(props) => props.mobileImage});
    }
`;

export const Title = styled.span`
    border-top: 1px solid ${(props) => props.theme.borderColor.secondary};
    font-weight: 600;
    font-size: 18px;
    line-height: 21.6px;
    letter-spacing: 0%;
    width: 100%;
    padding-top: 25px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        line-height: 18px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
`;

export const Icon = styled.i<{ fontSize: string; mobileFontSize: string; marginTop?: string; height?: string }>`
    color: ${(props) => props.theme.textColor.primary};
    display: flex;
    font-size: ${(props) => props.fontSize};
    align-items: center;
    margin-top: ${(props) => props.marginTop || '20px'};
    height: ${(props) => props.height || '75px'};
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: ${(props) => props.mobileFontSize};
        margin-top: ${(props) => (props.marginTop ? '25px' : '0px')};
        height: ${(props) => (props.height ? '65px' : '75px')};
    }
`;

export const DownloadContainer = styled(FlexDivColumnCentered)`
    width: 100%;
    max-height: 40px;
    justify-content: flex-end;
`;

export const DownloadRow = styled(FlexDivSpaceBetween)`
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 10px;
    }
`;

export const TypeDownloadContainer = styled(FlexDivSpaceBetween)``;

export const TypeDownloadItem = styled(FlexDiv)`
    margin-left: 40px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-left: 20px;
    }
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor.quaternary};
    font-weight: 600;
    font-size: 14px;
    line-height: 14.4px;
    letter-spacing: 0%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
        line-height: 12px;
    }
`;

export const DownloadLink = styled.a`
    color: ${(props) => props.theme.link.textColor.secondary};
    font-weight: 600;
    font-size: 14px;
    line-height: 14.4px;
    letter-spacing: 0%;
    margin-left: 5px;
    &:hover {
        text-decoration: underline;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
        line-height: 12px;
    }
`;
