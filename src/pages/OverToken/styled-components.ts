import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { HashLink } from 'react-router-hash-link';
import styled, { CSSProperties } from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumnCentered, FlexDivRow, FlexDivSpaceBetween } from 'styles/common';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    @media (max-width: 1024px) {
        width: 100vw;
        margin-top: 20px;
        padding: 0 20px;
        z-index: 1;
    }
`;

export const OverContainer = styled(FlexDiv)<{ marginTop?: string }>`
    width: 100%;
    margin-top: ${(props) => props.marginTop || '0px'};
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 0px;
        flex-direction: column;
    }
`;

export const OverLeftContainer = styled(FlexDivColumnCentered)<{ flexBasis?: string }>`
    position: relative;
    justify-content: start;
    flex-basis: ${(props) => props.flexBasis || '50%'};
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: left;
    }
`;

export const BurnContainer = styled(FlexDivColumnCentered)`
    position: absolute;
    top: -30px;
    right: 0;
    padding: 0 50px 0 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        position: relative;
        top: -50px;
        padding: 0;
        align-items: center;
        img {
            width: 250px;
            height: auto;
        }
    }
`;

export const OverRightContainer = styled(FlexDivColumnCentered)<{ flexBasis?: string; padding?: string }>`
    position: relative;
    flex-basis: ${(props) => props.flexBasis || '50%'};
    padding: ${(props) => props.padding || '20px'};
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: center;
    }
`;

export const CoinsContainer = styled(FlexDivColumnCentered)`
    position: absolute;
    bottom: -100px;
    right: 0;
    padding: 0 50px 0 0;
    img {
        width: 435px;
        height: 369px;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0;
        align-items: center;
        bottom: -150px;
        img {
            width: 250px;
            height: auto;
        }
    }
`;

export const CirculatingSupplyLabelContainer = styled(FlexDivSpaceBetween)`
    margin-bottom: 25px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-bottom: 15px;
    }
`;

export const CirculatingSupplyLabel = styled(FlexDiv)`
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    text-align: left;
    width: 100%;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 18px;
        line-height: 18px;
    }
`;

export const LiveLabel = styled(FlexDiv)`
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 400;
    font-size: 22px;
    line-height: 22px;
    align-items: center;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 16px;
        line-height: 16px;
    }
`;

export const BurningLabel = styled.span`
    color: ${(props) => props.theme.error.textColor.tertiary};
    border-radius: 20px;
    font-weight: 400;
    font-size: 21px;
    line-height: 100%;
    background: rgba(207, 18, 33, 0.2);
    padding: 5px 20px;
    margin-left: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-left: 0px;
        font-size: 16px;
        line-height: 16px;
        padding: 5px 20px;
    }
`;

export const CirculatingSupplyContainer = styled(FlexDivCentered)`
    color: ${(props) => props.theme.textColor.primary};
    background: linear-gradient(90deg, #1f274d 0%, #111325 100%);
    font-weight: 700;
    font-size: 87px;
    line-height: 87px;
    letter-spacing: 4px;
    padding: 40px 0;
    border-radius: 22px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 26px;
        line-height: 26px;
        padding: 20px;
        border-radius: 18px;
        width: 100%;
    }
`;

export const CirculatingSupply = styled.span`
    width: 630px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 225px;
    }
`;

export const BurnInfoContainer = styled(FlexDivRow)`
    gap: 40px;
    width: 100%;
    margin-top: 30px;
    flex: 1 1 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        margin-top: 20px;
        gap: 20px;
    }
`;

export const BurnInfo = styled(FlexDivColumnCentered)`
    color: ${(props) => props.theme.textColor.primary};
    background: ${(props) => props.theme.background.primary};
    font-weight: 700;
    font-size: 43px;
    line-height: 100%;
    padding: 40px 40px;
    border-radius: 22px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 26px;
        line-height: 26px;
        padding: 20px;
        border-radius: 18px;
        width: 100%;
    }
`;

export const BurnInfoLabel = styled.div<{ color?: string }>`
    color: ${(props) => props.color || props.theme.textColor.primary};
    font-weight: 400;
    font-size: 25px;
    line-height: 25px;
    letter-spacing: 0%;
    margin-bottom: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 15px;
    }
`;

export const SectionContainer = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    margin-bottom: 30px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Value = styled.div`
    margin-top: 10px;
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 50px;
    font-weight: 800;
    line-height: 60.95px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 25px;
        line-height: 25px;
    }
`;

export const List = styled.ul`
    list-style: disc;
    color: ${(props) => props.theme.textColor.primary};
    list-style-position: inside;
    margin: 20px 0px 0px 0px;
`;

export const ListItem = styled.li`
    margin-bottom: 10px;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 700;
    font-size: 18px;
    line-height: 21.6px;
    a {
        color: ${(props) => props.theme.link.textColor.primary};
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

export const ContractAddressItem = styled(FlexDivSpaceBetween)`
    padding: 20px;
    color: ${(props) => props.theme.textColor.primary};
    background: ${(props) => props.theme.background.primary};
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    border-radius: 8px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

export const OverChainLabel = styled.label``;

export const ContractAddress = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
    a {
        color: ${(props) => props.theme.link.textColor.primary};
    }
`;

export const BridgeDescription = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 700;
    font-size: 18px;
    line-height: 21.6px;
    a {
        color: ${(props) => props.theme.link.textColor.primary};
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

export const LinkArrow = styled(ArrowHyperlinkIcon)<{ color?: string }>`
    color: ${(props) => props.theme.textColor.secondary};
    width: 14px;
    height: 14px;
`;

export const ChartContainer = styled(FlexDivCentered)`
    position: relative;
    margin: 20px 0;
`;

export const ChartLabel = styled.span`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    color: ${(props) => props.theme.textColor.primary};
    text-align: center;
`;

export const CustomHashLink = styled(HashLink)`
    color: ${(props) => props.theme.textColor.primary};
`;

export const liveBlinkStyle: CSSProperties = {
    width: 32,
    margin: '0px 0px -4px 0px',
};

export const liveBlinkStyleMobile: CSSProperties = {
    width: 30,
    margin: '0px 0px -2px 0px',
};
