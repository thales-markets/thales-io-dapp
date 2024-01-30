import Collapse from 'components/Collapse';
import { t } from 'i18next';
import { SectionDescription } from 'pages/Staking/styled-components';
import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { ContentContainer, Header, Icon } from '../../styled-components';

const collapseAdditionalStyling = {
    titleFontFamily: 'Nunito',
    titleFontSize: '13px',
    containerMarginButton: '10px',
    titleMarginBottom: '10px',
};

const Steps: React.FC = () => {
    return (
        <ContentContainer>
            <HeaderContainer>
                <Header>
                    <Icon className={'icon icon--staking'} />
                    {t('staking.lp-staking.header')}
                </Header>
            </HeaderContainer>
            <StepsContainer>
                <Collapse
                    title={t('staking.lp-staking.steps.step-1.header')}
                    additionalStyling={collapseAdditionalStyling}
                >
                    <StepDescription>{t('staking.lp-staking.steps.step-1.description')}</StepDescription>
                </Collapse>
                <Collapse
                    title={t('staking.lp-staking.steps.step-2.header')}
                    additionalStyling={collapseAdditionalStyling}
                >
                    <StepDescription>{t('staking.lp-staking.steps.step-2.description')}</StepDescription>
                </Collapse>
                <Collapse
                    title={t('staking.lp-staking.steps.step-3.header')}
                    additionalStyling={collapseAdditionalStyling}
                >
                    <StepDescription>{t('staking.lp-staking.steps.step-3.description')}</StepDescription>
                </Collapse>
                <Collapse
                    title={t('staking.lp-staking.steps.step-4.header')}
                    additionalStyling={collapseAdditionalStyling}
                >
                    <StepDescription>{t('staking.lp-staking.steps.step-4.description')}</StepDescription>
                </Collapse>
                <Collapse
                    title={t('staking.lp-staking.steps.step-5.header')}
                    additionalStyling={collapseAdditionalStyling}
                >
                    <StepDescription>{t('staking.lp-staking.steps.step-5.description')}</StepDescription>
                </Collapse>
            </StepsContainer>
        </ContentContainer>
    );
};

const HeaderContainer = styled(FlexDiv)`
    flex-direction: row;
    margin-bottom: 5px;
`;

const StepDescription = styled(SectionDescription)`
    font-size: 13px;
`;

const StepsContainer = styled(FlexDiv)`
    flex-direction: column;
    margin-top: 20px;
`;

export default Steps;
