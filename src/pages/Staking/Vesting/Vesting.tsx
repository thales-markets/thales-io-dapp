import { useTranslation } from 'react-i18next';
import { FlexDiv, FlexDivColumnSpaceBetween } from 'styles/common';
import YourTransactions from '../StakingTab/Transactions';
import { SectionDescription, SectionTitle, StakingButton } from '../styled-components';
import { Container, VestingValid } from './styled-components';

const Vesting: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Container>
                <FlexDiv gap="10px">
                    <FlexDivColumnSpaceBetween>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--staking" />
                                {t('staking.vesting.title')}
                            </span>
                            <span>98,659.31 THALES</span>
                        </SectionTitle>
                        <div>
                            <StakingButton padding="5px 30px">{t('staking.vesting.vest')}</StakingButton>
                        </div>
                    </FlexDivColumnSpaceBetween>
                    <FlexDivColumnSpaceBetween>
                        <SectionDescription>{t('staking.vesting.description')}</SectionDescription>
                        <VestingValid>{t('staking.vesting.vested-until')} 30. November 2023.</VestingValid>
                    </FlexDivColumnSpaceBetween>
                </FlexDiv>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default Vesting;
