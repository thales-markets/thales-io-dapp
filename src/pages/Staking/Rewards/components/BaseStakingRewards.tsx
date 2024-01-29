import SimpleLoader from 'components/SimpleLoader';
import { THALES_CURRENCY } from 'constants/currency';
import { InfoDiv } from 'pages/Staking/styled-components';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { BaseRewardsData, UserStakingData } from 'types/token';
import { SectionTitle } from '../../styled-components';
import { ClaimableLabel, SubTitle } from '../styled-components';

type BaseStakingRewardsProps = {
    userStakingData: UserStakingData | undefined;
    baseStakingRewardsData: BaseRewardsData | undefined;
    pointsData: PointsData | undefined;
    isLoading: boolean;
};

const BaseStakingRewards: React.FC<BaseStakingRewardsProps> = ({
    userStakingData,
    baseStakingRewardsData,
    pointsData,
    isLoading,
}) => {
    const { t } = useTranslation();

    return (
        <>
            {isLoading && (
                <LoaderWrapper>
                    <SimpleLoader />
                </LoaderWrapper>
            )}
            {!isLoading && (
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--pig" />
                            {t('staking.rewards.base-rewards.title')}
                        </span>
                        <span>
                            <ClaimableLabel>{t('staking.rewards.base-rewards.claimable')}</ClaimableLabel>
                            {userStakingData?.baseRewards
                                ? formatCurrencyWithKey(THALES_CURRENCY, userStakingData?.baseRewards, 2)
                                : '-'}
                        </span>
                    </SectionTitle>
                    <SubTitle></SubTitle>
                    <FlexDiv gap="30px">
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>{t('staking.rewards.base-rewards.your-staked')}</span>
                                <span>{baseStakingRewardsData?.thalesStaked}</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>
                                    <Trans
                                        i18nKey="staking.rewards.base-rewards.staking-divider"
                                        components={{
                                            span: <span />,
                                        }}
                                    />
                                </span>
                                <span>{pointsData?.thalesDivider}</span>
                            </InfoDiv>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoDiv>
                                <span>{t('staking.rewards.base-rewards.total-staked')}</span>
                                <span>{baseStakingRewardsData?.totalStaked}</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>{t('staking.rewards.base-rewards.staked-share')}</span>
                                <span>{baseStakingRewardsData?.share}</span>
                            </InfoDiv>
                        </FlexDivColumn>
                    </FlexDiv>
                </div>
            )}
        </>
    );
};

const LoaderWrapper = styled(FlexDiv)`
    margin: 40px 0px;
`;

export default BaseStakingRewards;
