import ROUTES from 'constants/routes';
import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import SPAAnchor from '../SPAAnchor';

const ElectionsBanner: React.FC = () => {
    return (
        <SPAAnchor
            href={`${ROUTES.DAO.Home}/thalescouncil.eth/0x6c34802e090ccf84e06e9c6616402b9add95aa4475e1fa0dd90a831bcf77bc47`}
        >
            <Container>
                <Label>
                    {<Trans i18nKey={'common.banner.elections-banner-message'} components={{ bold: <Bold /> }} />}
                </Label>
            </Container>
        </SPAAnchor>
    );
};

const Container = styled(FlexDiv)`
    position: absolute;
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
    text-transform: uppercase;
`;

const Bold = styled.span`
    font-weight: bold;
`;

export default ElectionsBanner;
