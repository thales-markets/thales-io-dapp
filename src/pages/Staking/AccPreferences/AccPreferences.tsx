import { useTranslation } from 'react-i18next';
import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivColumnSpaceBetween, FlexDivSpaceBetween } from 'styles/common';
import YourTransactions from '../StakingTab/Transactions/YourTransactions';
import { SectionDescription, SectionTitle, StakingButton, StakingInput } from '../styled-components';
import { Bottom, Container, Middle, Subtitle, Top } from './styled-components';

const AccPreferences: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Container>
                <Top>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--delegate" />
                                    {t('staking.acc-preferences.delegate.title')}
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.source')}:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.destination')}:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivCentered>
                                <StakingButton padding="5px 30px">
                                    {t('staking.acc-preferences.delegate-button')}
                                </StakingButton>
                            </FlexDivCentered>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn>
                            <Subtitle>{t('staking.acc-preferences.delegate.subtitle')}</Subtitle>
                            <SectionDescription>
                                {t('staking.acc-preferences.delegate.description-1')}
                            </SectionDescription>
                            <SectionDescription>
                                {t('staking.acc-preferences.delegate.description-2')}
                            </SectionDescription>
                        </FlexDivColumn>
                    </FlexDiv>
                </Top>
                <Middle>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--merge" />
                                    {t('staking.acc-preferences.merge.title')}
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.source')}:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.destination')}:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivCentered>
                                <StakingButton padding="5px 30px">
                                    {t('staking.acc-preferences.delegate-button')}
                                </StakingButton>
                            </FlexDivCentered>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn>
                            <Subtitle>{t('staking.acc-preferences.merge.subtitle')}</Subtitle>
                            <SectionDescription>{t('staking.acc-preferences.merge.description-1')}</SectionDescription>
                            <SectionDescription>{t('staking.acc-preferences.merge.description-2')}</SectionDescription>
                        </FlexDivColumn>
                    </FlexDiv>
                </Middle>
                <Bottom>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--claim" />
                                    {t('staking.acc-preferences.claim.title')}
                                </span>
                            </SectionTitle>
                            <Subtitle>{t('staking.acc-preferences.claim.subtitle')}:</Subtitle>
                            <FlexDivSpaceBetween>
                                <StakingInput width="60%"></StakingInput>
                                <StakingButton>{t('staking.acc-preferences.claim.button')}</StakingButton>
                            </FlexDivSpaceBetween>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn gap="20px">
                            <SectionDescription>{t('staking.acc-preferences.claim.description')}</SectionDescription>
                            <Subtitle>{t('staking.acc-preferences.claim.enabled-accounts-subtitle')}:</Subtitle>
                        </FlexDivColumn>
                    </FlexDiv>
                </Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default AccPreferences;
