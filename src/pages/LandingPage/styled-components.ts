import { CircularProgress } from '@material-ui/core';
import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ScreenSizeBreakpoint } from 'enums/ui';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivSpaceAround, FlexDivSpaceBetween, Icon } from 'styles/common';

export const About = styled.div`
    margin-top: 120px;
    margin-bottom: 50px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 50px;
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
    color: white;
    font-family: 'NunitoBold';
    font-weight: bold;
    font-size: 50px;
    font-style: normal;
    line-height: 91.4%;
    letter-spacing: 3.25px;
    text-transform: uppercase;
    margin-bottom: 10px;
    & > span {
        font-family: 'NunitoExtraLight';
        font-weight: normal;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 28px;
        letter-spacing: 2px;
    }
`;

export const EcosystemTitle = styled(FlexDiv)`
    color: white;
    font-size: 25px;
    font-style: normal;
    line-height: 91.4%;
    height: 35px;
    i {
        margin: 0px 10px 13px 0px;
    }
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 17px;
        margin-top: -10px;
        i {
            margin: 0;
        }
    }
`;

export const Subtitle = styled.div`
    color: #c6c8da;
    font-family: 'NunitoExtraLight';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Highlight = styled.div<{ marginBottom?: number; cursor?: string }>`
    cursor: ${(props) => (props.cursor ? props.cursor : 'default')};
    color: white;
    font-family: MontserratBold;
    font-size: 17px;
    font-style: normal;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
    line-height: 140%;
`;

export const StatsSection = styled.div`
    margin-bottom: 10px;
`;

export const SectionTitle = styled.div`
    color: #c6c8da;
    font-family: 'NunitoExtraLight';
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

export const Stat = styled.div`
    color: #fff;
    font-family: MontserratBold;
    font-size: 50px;
    font-style: normal;
    line-height: normal;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 25px;
    }
`;

export const HomeButton = styled.button`
    cursor: pointer;
    color: white;
    border-radius: 8px;
    border: 1px solid #19f8ef;
    text-transform: capitalize;
    background: transparent;
    width: fit-content;
    text-align: center;
    font-family: NunitoBold;
    font-size: 13px;
    line-height: 80%;
    text-transform: capitalize;
    padding: 7px 12px;
`;

export const EcosystemSection = styled.div`
    margin-top: 150px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin-top: 50px;
    }
`;

export const Description = styled(FlexDivColumn)<{ marginBottom?: number; marginTop?: number }>`
    color: ${(props) => props.theme.borderColor.quaternary};
    text-align: justify;
    font-family: MontserratLight;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')}px;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
    > span {
        margin-bottom: 15px;
    }
`;

export const BulletNumber = styled.span`
    font-family: monospace;
    font-size: 22px;
    margin-right: 5px;
`;

export const Section = styled.div<{ marginBottom?: number }>`
    margin-top: 100px;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
`;

export const SectionSlogan = styled.div`
    color: white;
    text-align: justify;
    font-family: MontserratBold;
    font-size: 40px;
    font-style: normal;
    line-height: 140%;
    margin: 15px 0;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 30px;
        text-align: left;
    }
`;

export const SectionTitleLink = styled.div`
    color: #c6c8da;
    font-family: NunitoExtraLight;
    font-size: 13px;
    font-style: normal;
    line-height: 140%;
    text-transform: uppercase;
`;

export const SectionTitleLinkArrow = styled(ArrowHyperlinkIcon)`
    color: #c6c8da;
    width: 9px;
    height: 9px;
`;

export const LottieContainer = styled(FlexDivCentered)`
    margin-top: -50px;
`;

export const StepsSection = styled(FlexDivColumn)`
    margin-top: -60px;
`;

export const MilestonesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 60px;
    column-gap: 20px;
    padding: 20px 0;
`;

export const Milestone = styled.div<{ index: number; isLast: boolean; isLastRow: boolean }>`
    height: 100px;
    border-radius: 8px;
    background: #313652;
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
    padding: 15px 20px;
    transform-style: preserve-3d;
    &:before {
        content: '';
        height: 70px;
        position: absolute;
        border-radius: 10px 0 0 0;
        border-top: ${(props) =>
            props.index > 4 && props.index % 4 === 1 ? '#03DAC6 solid 1px' : 'transparent solid 1px'};
        border-left: ${(props) => (props.index > 4 && props.index % 4 === 1 ? '#03DAC6 solid 1px' : '0')};
        z-index: -1;
        width: calc(100% + 20px);
        transform: translateZ(-1px);
        top: calc(-50% + 11px);
        left: 50%;
    }
    &:after {
        content: '';
        height: 70px;
        position: absolute;
        border-radius: ${(props) => ((props.index + 1) % 4 === 0 ? '0 0 10px 0' : '0')};
        border-top: ${(props) =>
            props.isLast || props.index % 4 === 0 ? 'transparent solid 1px' : '#03DAC6 solid 1px'};
        border-right: ${(props) =>
            !props.isLast && !props.isLastRow && (props.index + 1) % 4 === 0 ? '#03DAC6 solid 1px' : '0'};
        border-bottom: ${(props) =>
            props.isLastRow || props.isLast || (props.index + 3) % 4 === 0 || props.index % 4 === 0
                ? 'transparent solid 1px'
                : '#03DAC6 solid 1px'};
        z-index: -1;
        width: calc(100% + 20px);
        transform: translateZ(-1px);
        top: 50%;
        left: 50%;
    }
`;

export const MilestoneDate = styled.div`
    color: white;
    font-family: MontserratBold;
    font-size: 13px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
`;

export const MilestoneDescription = styled.div`
    padding-top: 8px;
    color: #c6c8da;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
    span {
        font-family: MontserratBold;
    }
`;

export const HomeIcon = styled.i<{ fontSize?: string; paddingBottom?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${(props) => props.fontSize ?? '20em'};
    padding-bottom: ${(props) => props.paddingBottom ?? '0'};
    line-height: 0.5em;
`;
export const FooterLogo = styled.i`
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-120%);
    color: ${(props) => props.theme.textColor.primary};
    font-size: 120px;
    cursor: pointer;
    line-height: 50px;
    margin-top: 5px;
    z-index: -1;
`;
export const LinksContainer = styled(FlexDivSpaceBetween)`
    height: 100%;
    & > div:nth-child(1) {
        width: 45%;
    }
    & > div:nth-child(2) {
        width: 30%;
    }
`;
export const ThalesLinks = styled(FlexDiv)`
    position: relative;
    gap: 50px;
`;
export const ThalesLinksTitle = styled.div`
    color: #fff;
    font-family: MontserratBold;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
    line-height: 186.5%;
    text-transform: capitalize;
`;
export const ThalesLinksItem = styled.div`
    color: #c6c8da;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 186.5%;
    text-transform: capitalize;
`;
export const FooterLine = styled.div`
    position: absolute;
    bottom: 0;
    transform: translateX(-25%);
    background-image: linear-gradient(to right, white 17%, rgba(255, 255, 255, 0) 0%);
    background-position: bottom;
    background-size: 13px 1px;
    background-repeat: repeat-x;
    height: 1px;
    width: 200%;
`;
export const FooterContainer = styled.div`
    width: 100%;
    padding: 150px 0 75px 0;
`;

export const SocialIcon = styled(Icon)`
    padding-top: 10px;
    padding-right: 20px;
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 25px;
    }
`;

export const BuySellSection = styled.div<{ flex: string }>`
    display: flex;
    flex-direction: column;
    align-self: baseline;
    margin-top: 50px;
    flex: ${(props) => props.flex};
`;

export const ThemedCircularProgress = styled(CircularProgress)`
    &.MuiCircularProgress-colorPrimary {
        color: ${(props) => props.theme.background.secondary};
    }
`;

export const Partners = styled(FlexDivSpaceBetween)`
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;

export const Backers = styled(FlexDivSpaceAround)`
    @media screen and (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        flex-direction: column;
    }
`;
