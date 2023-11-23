import SwitchInput from 'components/SwitchInput';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { FlexDivCentered } from 'styles/common';
import { InfoDiv, SectionTitle, StakingButton, StakingInput } from '../styled-components';
import YourTransactions from './Transactions/YourTransactions';
import { Bottom, ButtonContainer, Container, InputContainer, UpperLeft, UpperRight } from './styled-components';

const StakingTab: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    return (
        <>
            <Container>
                <UpperLeft>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--staking" />
                            {t('staking.staking.staking-data.title')}
                        </span>
                    </SectionTitle>
                    <div>
                        <InfoDiv>
                            <span>APY:</span>
                            <span>20%</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.staking-data.my-staking-share')}:</span>
                            <span>20%</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.staking-data.estimated-rewards')}:</span>
                            <span>865 THALES</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.staking-data.for-date')}:</span>
                            <span>18.12-21.12</span>
                        </InfoDiv>
                    </div>
                </UpperLeft>
                <UpperRight>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--person" />
                            {t('staking.staking.my-balance.title')}
                        </span>
                        <span>5000 THALES</span>
                    </SectionTitle>
                    <div>
                        <InfoDiv>
                            <span>{t('staking.staking.my-balance.staked-directly')}:</span>
                            <span>8265 THALES</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.my-balance.escrowed-balance')}:</span>
                            <span>865 THALES</span>
                        </InfoDiv>
                    </div>
                </UpperRight>
                <Bottom>
                    <SwitchInput
                        label={{
                            firstLabel: t('staking.staking.stake-unstake.stake'),
                            secondLabel: t('staking.staking.stake-unstake.unstake'),
                            fontSize: '18px',
                        }}
                        borderColor={theme.borderColor.secondary}
                        dotBackground={theme.textColor.secondary}
                        dotSize="20px"
                        active={true}
                    />
                    <InputContainer>
                        <SectionTitle>
                            <span>
                                {t('staking.staking.stake-unstake.amount-to')}{' '}
                                {t('staking.staking.stake-unstake.stake')}
                            </span>
                            <span>
                                <i className="icon icon--wallet" />
                                Balance: 841729.98 Thales
                            </span>
                        </SectionTitle>
                    </InputContainer>
                    <FlexDivCentered>
                        <StakingInput width="400px" />
                    </FlexDivCentered>
                    <ButtonContainer>
                        <StakingButton padding="5px 20px">{t('staking.staking.stake-unstake.stake')}</StakingButton>
                    </ButtonContainer>
                </Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default StakingTab;
