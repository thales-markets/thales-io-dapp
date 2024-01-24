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
    #react-chrono-timeline section {
        min-height: auto;
    }
    #react-chrono-timeline {
        align-items: center;
        min-height: 210px;
    }
    #react-chrono-timeline > div {
        margin-bottom: 50px;
    }
`;

export const Milestone = styled.div<{ hideBorder?: boolean }>`
    position: relative;
    width: 300px;
    border-right: ${(props) => (props.hideBorder ? '' : '2px solid #405682')};
    background: #313652;
    padding: 15px 25px;
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
    color: #a9abbb;
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
