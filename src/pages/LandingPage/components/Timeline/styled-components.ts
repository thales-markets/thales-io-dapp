import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import styled from 'styled-components';

// override styles from react-chrono
export const Container = styled.div`
    & > div > div:nth-child(1) {
        order: 1;
    }
    & > div > div:nth-child(2) {
        order: 3;
    }
    & > div > div:nth-child(3) {
        order: 2;
    }
    .timeline-horizontal-container li div.active:after {
        background: #19f8ef !important;
        width: 15px;
        height: 15px;
    }
    .timeline-controls {
        background: #313652;
    }
    .timeline-controls > li > button {
        background: #3f5580;
    }
    #react-chrono-timeline {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
    }
    #react-chrono-timeline section {
        min-height: auto;
        width: 100%;
    }
    #react-chrono-timeline {
        align-items: center;
        min-height: 210px;
    }
    #react-chrono-timeline > div {
        margin-bottom: 50px;
        margin-left: 0;
        margin-right: 0;
        min-width: 350px;
    }
    .card-description {
        width: 100%;
    }
    .timeline-main-wrapper ul {
        position: relative;
    }
    .timeline-main-wrapper ul li:last-child {
        margin-right: -35px;
    }
    .timeline-main-wrapper ul:after {
        font-family: Icons !important;
        content: '\\003F';
        color: white;
        font-size: 39px;
        width: 34px;
        right: -25px;
        top: 48%;
        transform: translateY(-50%);
        position: absolute;
    }
    button[aria-disabled='true'] {
        opacity: 0.5;
    }
`;

export const Milestone = styled.div<{ hideBorder?: boolean }>`
    position: relative;
    width: 320px;
    border-right: ${(props) => (props.hideBorder ? '' : '2px solid #405682')};
    background: #313652;
    padding: 15px 25px;
`;

export const MilestoneDate = styled.div<{ visible?: boolean }>`
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
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

const StyledLink = styled.a`
    color: ${(props) => props.theme.link.textColor.secondary};
    &:hover {
        text-decoration: underline;
    }
`;

export const ArrowIcon = styled(ArrowHyperlinkIcon)`
    position: absolute;
    top: 18px;
    right: 25px;
    margin-left: 5px;
    ${StyledLink} {
        fill: ${(props) => props.theme.link.textColor.tertiary};
    }
    ${StyledLink}:hover & path {
        text-decoration: underline;
    }
`;
