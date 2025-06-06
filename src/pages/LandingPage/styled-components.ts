import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import {
    FlexDiv,
    FlexDivCentered,
    FlexDivColumn,
    FlexDivColumnCentered,
    FlexDivSpaceBetween,
    Icon,
} from 'styles/common';

export const Header = styled.div`
    position: relative;
    margin-top: 126px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 42px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    @media screen and (min-width: ${ScreenSizeBreakpoint.SMALL}px) {
        max-width: 1400px;
    }
`;

export const Title = styled(FlexDiv)`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 40px;
    font-weight: 600;
    line-height: 41.2px;
    white-space: nowrap;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 18px;
        line-height: 18px;
    }
`;

export const HighlightTitle = styled.span`
    color: ${(props) => props.theme.textColor.secondary};
    margin-right: 12px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-right: 8px;
    }
`;

export const Logo = styled.i`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 500px;
    cursor: pointer;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 200px;
        margin-bottom: 8px;
    }
`;

export const LogoBackgroundContainer = styled.div`
    position: absolute;
    top: -80px;
    left: 100px;
    svg {
        height: 90%;
        width: 90%;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        top: -57px;
        left: 30px;
        svg {
            height: 180px;
            width: 180px;
        }
    }
`;

export const Subtitle = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 20px;
    font-weight: 400;
    line-height: 125%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Highlight = styled.div<{ marginBottom?: number; cursor?: string }>`
    cursor: ${(props) => (props.cursor ? props.cursor : 'default')};
    color: white;
    font-size: 17px;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
    line-height: 140%;
`;

export const SectionTitle = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const LinkButton = styled.button`
    height: 34px;
    cursor: pointer;
    color: white;
    border-radius: 8px;
    background-color: ${(props) => props.theme.button.background.secondary};
    color: ${(props) => props.theme.button.textColor.secondary};
    width: fit-content;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
    line-height: 19.36px;
    padding: 0px 20px;
    text-transform: uppercase;
    z-index: 1000;
    transition: 0.2s all;
    &:hover {
        transform: scale(1.07);
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 30px;
        border-radius: 5px;
    }
`;

export const Description = styled(FlexDivColumn)<{ marginBottom?: number; marginTop?: number }>`
    color: ${(props) => props.theme.textColor.tertiary};
    text-align: justify;
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : '20')}px;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
    > span {
        margin-bottom: 15px;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 14px;
        line-height: 16px;
        display: flex;
        justify-content: center;
    }
`;

export const ImageContainer = styled(FlexDivColumnCentered)`
    align-items: center;
    margin-top: 60px;
    svg {
        height: 70%;
        width: 70%;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 20px;
        svg {
            height: 100%;
            width: 100%;
        }
    }
`;

export const BulletNumberIcon = styled.i`
    font-weight: normal;
    font-size: 14px;
    margin-right: 5px;
`;

export const Section = styled.div<{
    marginTop?: number;
    marginBottom?: number;
    mobileMarginTop?: number;
    mobileMarginBottom?: number;
}>`
    margin-top: ${(props) => props.marginTop || '100'}px;
    margin-bottom: ${(props) => props.marginBottom || '0'}px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: ${(props) => props.mobileMarginTop || '50'}px;
        margin-bottom: ${(props) => props.mobileMarginBottom || '0'}px;
    }
`;

export const SectionSlogan = styled.div<{ align?: string; mobileMarginBottom?: number; mobileFontSize?: number }>`
    color: ${(props) => props.theme.textColor.primary};
    text-align: justify;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: ${(props) => (props.mobileFontSize ? props.mobileFontSize : '18')}px;
        line-height: 22px;
        text-align: ${(props) => (props.align ? props.align : 'left')};
        margin-bottom: ${(props) => (props.mobileMarginBottom ? props.mobileMarginBottom : '0')}px;
    }
`;

export const SectionSloganHighlight = styled.span`
    color: ${(props) => props.theme.textColor.secondary};
`;

export const SectionTitleLink = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 13px;
    line-height: 140%;
    text-transform: uppercase;
    margin-bottom: 15px;
`;

export const SectionTitleLinkArrow = styled(ArrowHyperlinkIcon)`
    color: ${(props) => props.theme.textColor.tertiary};
    width: 9px;
    height: 9px;
`;

export const LottieContainer = styled(FlexDivCentered)`
    margin-top: -50px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 0;
    }
`;

export const StepsSection = styled(FlexDivColumn)`
    margin-top: -60px;
`;

export const IconLink = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

export const HomeIcon = styled.i<{
    fontSize?: string;
    paddingBottom?: string;
    mobileFontSize?: string;
    margin?: string;
    height?: string;
}>`
    display: flex;
    position: relative;
    height: ${(props) => props.height ?? 'auto'};
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${(props) => props.fontSize ?? '20em'};
    padding-bottom: ${(props) => props.paddingBottom ?? '0'};
    line-height: 0.5em;
    margin: ${(props) => props.margin ?? '0'};
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: ${(props) => props.mobileFontSize ?? props.fontSize ?? '20em'};
    }
    width: 100%;
    transition: 0.2s all;
    &:hover {
        transform: scale(1.1);
    }
`;
export const FooterLogo = styled.i`
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-120%);
    color: ${(props) => props.theme.textColor.primary};
    font-size: 150px;
    cursor: pointer;
    line-height: 50px;
    margin-top: 5px;
    z-index: -1;
`;
export const LinksContainer = styled(FlexDivSpaceBetween)`
    height: 100%;
    & > div:nth-child(1) {
        flex: 0.45;
    }
    & > div:nth-child(2) {
        flex: 0.3;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
        & > div:nth-child(1) {
            flex: 1;
        }
        & > div:nth-child(2) {
            flex: 1;
        }
    }
`;
export const ThalesLinks = styled(FlexDiv)`
    position: relative;
    gap: 50px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-bottom: 50px;
    }
`;

export const OvertimeLinksTitle = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 13px;
    font-weight: 800;
    line-height: 186.5%;
    text-transform: capitalize;
`;
export const ThalesLinksItem = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-size: 13px;
    font-weight: 600;
    line-height: 186.5%;
    text-transform: capitalize;
`;

export const FooterContainer = styled.div`
    width: 100%;
    padding: 120px 0 50px 0;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 75px 0 50px 0;
    }
`;

export const SocialIcon = styled(Icon)`
    padding-top: 10px;
    padding-right: 20px;
    position: relative;
    z-index: 2;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 25px;
    }
`;

export const PartnersContainer = styled(FlexDivColumnCentered)`
    margin-top: 20px;
`;

export const Partners = styled(FlexDivSpaceBetween)`
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

export const Backers = styled(FlexDivSpaceBetween)`
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;
