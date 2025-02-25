import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivRow } from 'styles/common';

export const Container = styled(FlexDivRow)`
    gap: 30px;
    width: 100%;
    margin-top: 20px;
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const LeftContainer = styled(FlexDivRow)`
    gap: 30px;
    flex: 50%;
    height: 523px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 20px;
        height: 100%;
        width: 100%;
    }
`;

export const RightContainer = styled(FlexDivColumn)`
    gap: 30px;
    flex: 50%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 20px;
        position: relative;
        left: 0;
        width: 100%;
    }
`;

export const CardContainer = styled(FlexDivRow)<{ image: string; isLeftContainer?: boolean; mobileImage: string }>`
    background-image: url(${(props) => props.image});
    background-size: 100% 100%;
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    border-radius: 15px;
    padding: ${(props) => (props.isLeftContainer ? '50px 40px 40px 50px' : '50px 40px 40px 50px')};
    width: 100%;
    color: ${(props) => props.theme.textColor.primary};
    flex: 1 1 0;
    z-index: ${(props) => (props.isLeftContainer ? 10 : 5)};
    position: relative;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        padding: 25px;
        background-image: url(${(props) => props.mobileImage});
        overflow: ${(props) => (props.isLeftContainer ? 'hidden' : 'initial')};
    }
`;

export const CardContent = styled(FlexDivColumn)`
    justify-content: space-between;
`;

export const ActionContainer = styled(FlexDivColumn)`
    justify-content: end;
    z-index: 200;
`;

export const Title = styled.span`
    font-size: 18px;
    font-weight: 800;
    line-height: 21.6px;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        line-height: 18px;
    }
`;

export const Description = styled.span`
    font-size: 14px;
    font-weight: 600;
    line-height: 16.8px;
    text-align: justify;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        text-align: left;
        margin-top: 20px;
    }
`;

export const Action = styled(FlexDivCentered)`
    height: 40px;
    background-color: ${(props) => props.theme.button.background.secondary};
    color: ${(props) => props.theme.button.textColor.secondary};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
    line-height: 19.36px;
    text-transform: uppercase;
    padding: 0 10px;
    width: 200px;
    align-self: end;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 30px;
        margin-top: 30px;
        margin-left: 0px;
        border-radius: 5px;
        align-self: center;
        width: 200px;
    }
`;

export const Icon = styled.i<{ fontSize: string; mobileFontSize: string; height?: string }>`
    display: flex;
    font-size: ${(props) => props.fontSize};
    height: ${(props) => props.height || '100px'};
    align-items: center;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: ${(props) => props.mobileFontSize};
        height: 90px;
    }
`;

export const ImageContainer = styled(FlexDivCentered)`
    position: absolute;
    height: 521px;
    right: -120px;
    top: 0px;
    overflow: hidden;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: auto;
        right: -280px;
    }
`;

export const ImageCut = styled.img`
    margin-top: 30px;
    z-index: -1;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: -10px;
        height: 520px;
    }
`;

export const Image = styled.img<{
    top: number;
    right: number;
    mobileTop: number;
    mobileRight: number;
    mobileHeight: number;
}>`
    position: absolute;
    right: ${(props) => props.right}px;
    top: ${(props) => props.top}px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        right: ${(props) => props.mobileRight}px;
        top: ${(props) => props.mobileTop}px;
        height: ${(props) => props.mobileHeight}px;
    }
`;
