import ROUTES from 'constants/routes';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import SPAAnchor from '../SPAAnchor';

const ElectionsBanner: React.FC = () => {
    const { t } = useTranslation();
    return (
        <SPAAnchor
            href={`${ROUTES.DAO.Home}/thalescouncil.eth/0x6c34802e090ccf84e06e9c6616402b9add95aa4475e1fa0dd90a831bcf77bc47`}
        >
            <Container>
                <Label>{t('common.banner.elections-banner-message')}</Label>
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
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px !important;
    }
`;

const Label = styled.span`
    color: ${(props) => props.theme.button.textColor.primary};
    font-size: 18px;
    padding: 9px 0px;
    font-style: normal;
    font-weight: 800;
    text-transform: uppercase;
`;

export default ElectionsBanner;
