import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import { SUPPORTED_NETWORKS_PARAMS } from 'constants/network';
import { Network } from 'enums/network';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import YourTransactions from '../LPStaking/components/Transactions';
import StakeSection from './components/StakeSection';
import StakingData from './components/StakingData';
import Steps from './components/Steps';
import { Header, Icon } from './styled-components';

const LPStaking: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <RowsContainer>
                <StakingData />
            </RowsContainer>
            <Wrapper>
                <StakeSection />
            </Wrapper>
            <Wrapper>
                <Header>
                    <Icon className={'icon icon--staking'} />
                    {t('staking.lp-staking.other-lp')}
                </Header>
                <RowsContainer>
                    <SPAAnchor href={LINKS.LPStaking.Velodrome}>
                        <PoolWrapper>
                            <LogoContainer>
                                <Logo className="logo logo--velodrome" />
                                <Arrow className="icon icon--external-arrow" />
                            </LogoContainer>
                            <Text>
                                <Trans
                                    i18nKey="staking.lp-staking.pool-text"
                                    values={{
                                        network: SUPPORTED_NETWORKS_PARAMS[
                                            Network.OptimismMainnet
                                        ].chainName.toUpperCase(),
                                    }}
                                />
                            </Text>
                        </PoolWrapper>
                    </SPAAnchor>
                    <SPAAnchor href={LINKS.LPStaking.Aerodrome}>
                        <PoolWrapper>
                            <LogoContainer>
                                <Logo className="logo logo--aerodrome" />
                                <Arrow className="icon icon--external-arrow" />
                            </LogoContainer>
                            <Text>
                                <Trans
                                    i18nKey="staking.lp-staking.pool-text"
                                    values={{
                                        network: SUPPORTED_NETWORKS_PARAMS[Network.Base].chainName.toUpperCase(),
                                    }}
                                />
                            </Text>
                        </PoolWrapper>
                    </SPAAnchor>
                    <SPAAnchor href={LINKS.LPStaking.Camelot}>
                        <PoolWrapper>
                            <LogoContainer>
                                <Arrow className="icon icon--external-arrow" />
                                <Logo className="logo logo--camelot" />
                            </LogoContainer>
                            <Text>
                                <Trans
                                    i18nKey="staking.lp-staking.pool-text"
                                    values={{
                                        network: SUPPORTED_NETWORKS_PARAMS[Network.Arbitrum].chainName.toUpperCase(),
                                    }}
                                />
                            </Text>
                        </PoolWrapper>
                    </SPAAnchor>
                </RowsContainer>
            </Wrapper>
            <Steps />
            <YourTransactions />
        </Container>
    );
};

const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: fr 160px;
    column-gap: 10px;
    margin-top: 90px;
    row-gap: 10px;
    grid-template-areas: 'top' 'bottom';
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

const RowsContainer = styled(FlexDiv)`
    flex-direction: row;
    padding: 0 !important;
    justify-content: space-between;
    flex: 1;
    > div {
        flex: 1;
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    gap: 10px;
`;

const Wrapper = styled(FlexDiv)`
    flex-direction: column;
`;

const PoolWrapper = styled(Wrapper)`
    font-size: 13px;
    align-items: center;
    position: relative;
    flex: 1;
    padding: 20px;
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    cursor: pointer;
`;

const Arrow = styled.i`
    position: absolute;
    right: -15px;
    top: 20px;
    font-size: 15px;
`;

const Text = styled.p`
    display: inline;
    margin-bottom: 30px;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 400;
    text-align: center;
    justify-content: center;
`;

const LogoContainer = styled(FlexDiv)`
    position: relative;
`;

const Logo = styled.i`
    color: ${(props) => props.theme.textColor.primary};
`;

export default LPStaking;
