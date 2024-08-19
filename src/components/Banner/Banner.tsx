import { ScreenSizeBreakpoint } from 'enums/ui';
import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import SPAAnchor from '../SPAAnchor';
import LINKS from 'constants/links';

const IS_VISIBLE = false;

const Banner: React.FC = () => {
    if (!IS_VISIBLE) {
        return <></>;
    }

    return (
        <SPAAnchor href={LINKS.SpeedMarkets}>
            <Container>
                <Label>
                    {<Trans i18nKey={'common.banner.speed-banner-message'} components={{ bold: <Bold /> }} />}
                </Label>
            </Container>
        </SPAAnchor>
    );
};

const Container = styled(FlexDiv)`
    position: relative;
    top: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.button.textColor.primary};
    background-color: ${(props) => props.theme.background.tertiary};
    min-height: 35px;
    z-index: 102;
    cursor: pointer;
    text-align: center;
`;

const Label = styled.span`
    color: ${(props) => props.theme.button.textColor.primary};
    font-size: 18px;
    padding: 9px 0px;
    font-weight: 500;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
        padding: 5px 7px;
    }
`;

const Bold = styled.span`
    font-weight: bold;
`;

export default Banner;
