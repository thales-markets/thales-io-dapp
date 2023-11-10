import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered } from 'styles/common';

export const About = styled.div`
    margin-top: 150px;
    margin-bottom: 50px;
`;
export const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
`;
export const Title = styled.div`
    color: white;
    font-family: 'NunitoBold';
    font-weight: bold;
    font-size: 50px;
    font-style: normal;
    line-height: 91.4%;
    letter-spacing: 3.25px;
    text-transform: uppercase;
    & > span {
        font-family: 'NunitoExtraLight';
        font-weight: normal;
    }
`;
export const Subtitle = styled.div`
    color: #a9abbb;
    font-family: 'NunitoExtraLight';
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 103%;
    text-transform: capitalize;
`;
export const StatsSection = styled.div`
    margin-bottom: 10px;
`;
export const SectionTitle = styled.div`
    color: #a9abbb;
    font-family: 'NunitoExtraLight';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
`;
export const Stat = styled.div`
    color: #fff;
    font-family: MontserratBold;
    font-size: 50px;
    font-style: normal;
    line-height: normal;
`;
export const HomeButton = styled.button`
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
export const EcosystemApps = styled(FlexDiv)`
    gap: 30px;
`;
export const EcosystemSection = styled.div`
    margin-top: 150px;
`;
export const Description = styled.div<{ marginBottom?: number }>`
    color: #a9abbb;
    text-align: justify;
    font-family: MontserratLight;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
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
    line-height: 120%;
    margin: 15px 0;
`;
export const SectionTitleLink = styled.div`
    color: #a9abbb;
    font-family: NunitoExtraLight;
    font-size: 13px;
    font-style: normal;
    line-height: 120%;
    text-transform: uppercase;
`;
export const SectionTitleLinkArrow = styled(ArrowHyperlinkIcon)`
    color: #a9abbb;
    width: 9px;
    height: 9px;
`;
export const LottieContaienr = styled(FlexDivCentered)`
    margin-top: -50px;
`;
export const StepsSection = styled(FlexDivCentered)`
    align-items: flex-start;
    margin-top: -50px;
    gap: 50px;
    & > div {
        width: 15%;
    }
    & > div > div {
        color: white;
    }
`;
export const MilestonesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 60px;
    column-gap: 20px;
    padding: 20px 0;
`;
export const Milestone = styled.div<{ index: number; isLast: boolean }>`
    height: 80px;
    border-radius: 8px;
    background: #313652;
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
    padding: 15px 20px;
    transform-style: preserve-3d;
    &:before {
        content: '';
        height: 60px;
        position: absolute;
        border-radius: 10px 0 0 0;
        border-top: ${(props) =>
            props.index > 4 && props.index % 4 === 1 ? '#424451 solid 6px' : 'transparent solid 6px'};
        border-left: ${(props) => (props.index > 4 && props.index % 4 === 1 ? '#424451 solid 6px' : '0')};
        z-index: -1;
        width: calc(100% + 20px);
        transform: translateZ(-1px);
        top: calc(-50% + 6px);
        left: 50%;
    }
    &:after {
        content: '';
        height: 60px;
        position: absolute;
        border-radius: ${(props) => ((props.index + 1) % 4 === 0 ? '0 0 10px 0' : '0')};
        border-top: ${(props) =>
            props.isLast || props.index % 4 === 0 ? 'transparent solid 6px' : '#424451 solid 6px'};
        border-right: ${(props) => ((props.index + 1) % 4 === 0 ? '#424451 solid 6px' : '0')};
        border-bottom: ${(props) =>
            props.isLast || (props.index + 3) % 4 === 0 || props.index % 4 === 0
                ? 'transparent solid 6px'
                : '#424451 solid 6px'};
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
    color: #a9abbb;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
`;

export const HomeIcon = styled.i<{ fontSize?: string }>`
    display: flex;
    align-items: center;
    color: white;
    font-size: ${(props) => props.fontSize ?? '20em'};
    line-height: 0.5em;
`;
