import { Icon } from '@material-ui/core';
import { t } from 'i18next';
import { SectionDescription, SectionHeader, SectionTitle } from 'pages/Staking/styled-components';
import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { ContentContainer } from '../../styled-components';

const Steps: React.FC = () => {
    return (
        <ContentContainer>
            <HeaderContainer>
                <SectionTitle>
                    <Icon className={'icon icon--staking'} />
                    {t('staking.lp-staking.header')}
                </SectionTitle>
            </HeaderContainer>
            <StepsContainer>
                <StepHeader>{t('staking.lp-staking.steps.step-1.header')}</StepHeader>
                <StepDescription>{t('staking.lp-staking.steps.step-1.description')}</StepDescription>
                <StepHeader>{t('staking.lp-staking.steps.step-2.header')}</StepHeader>
                <StepDescription>{t('staking.lp-staking.steps.step-2.description')}</StepDescription>
                <StepHeader>{t('staking.lp-staking.steps.step-3.header')}</StepHeader>
                <StepDescription>{t('staking.lp-staking.steps.step-3.description')}</StepDescription>
                <StepHeader>{t('staking.lp-staking.steps.step-4.header')}</StepHeader>
                <StepDescription>{t('staking.lp-staking.steps.step-4.description')}</StepDescription>
                <StepHeader>{t('staking.lp-staking.steps.step-5.header')}</StepHeader>
                <StepDescription>{t('staking.lp-staking.steps.step-5.description')}</StepDescription>
            </StepsContainer>
        </ContentContainer>
    );
};

const HeaderContainer = styled(FlexDiv)`
    flex-direction: row;
    margin-bottom: 5px;
`;

const StepHeader = styled(SectionHeader)`
    text-transform: none;
    font-size: 13px;
    padding: 0;
    align-items: center;
    margin-top: 12px;
`;

const StepDescription = styled(SectionDescription)`
    font-size: 13px;
`;

const StepsContainer = styled(FlexDiv)`
    flex-direction: column;
`;

export default Steps;
