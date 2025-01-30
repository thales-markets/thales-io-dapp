import Collapse from 'components/Collapse';
import LINKS from 'constants/links';
import { t } from 'i18next';
import { SectionDescription } from 'pages/Staking/styled-components';
import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { ContentContainer, Header, Icon } from '../../styled-components';

const collapseAdditionalStyling = {
    titleFontSize: '13px',
    containerMarginBottom: '10px',
    titleMarginBottom: '7px',
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
                    <StepDescription>
                        <Trans
                            i18nKey={'staking.lp-staking.steps.step-2.description'}
                            components={{
                                url: <Link target="_blank" href={LINKS.LPStaking.UniswapLink} />,
                            }}
                        />
                    </StepDescription>
                </Collapse>
                <Collapse
                    title={t('staking.lp-staking.steps.step-3.header')}
                    additionalStyling={collapseAdditionalStyling}
                >
                    <StepDescription>
                        <Trans
                            i18nKey={'staking.lp-staking.steps.step-3.description'}
                            components={{
                                url: <Link target="_blank" href={LINKS.LPStaking.ArrakisLink} />,
                            }}
                        />
                    </StepDescription>
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
    padding-bottom: 10px;
`;

const StepsContainer = styled(FlexDiv)`
    flex-direction: column;
    margin-top: 20px;
`;

const Link = styled.a`
    text-decoration: underline;
`;

export default Steps;
