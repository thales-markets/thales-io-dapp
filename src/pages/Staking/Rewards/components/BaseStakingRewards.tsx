import LoadingContainer from 'components/LoadingContainer';
import Tooltip from 'components/Tooltip';
import { THALES_CURRENCY } from 'constants/currency';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { InfoDiv, TooltipContainer } from 'pages/Staking/styled-components';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { BaseRewardsData, ThalesStakingData, UserStakingData } from 'types/token';
import { SectionTitle } from '../../styled-components';
import { SubTitle } from '../styled-components';

type BaseStakingRewardsProps = {
    userStakingData: UserStakingData | undefined;
    stakingData: ThalesStakingData | undefined;
    baseStakingRewardsData: BaseRewardsData | undefined;
    pointsData: PointsData | undefined;
    isLoading: boolean;
    isClaimed: boolean;
};

const BaseStakingRewards: React.FC<BaseStakingRewardsProps> = ({
    userStakingData,
    stakingData,
    baseStakingRewardsData,
    pointsData,
    isLoading,
    isClaimed,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <LoadingContainer isLoading={isLoading}>
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--pig" />
                            {t('staking.rewards.base-rewards.title')}
                        </span>
                        {!isClaimed && !stakingData?.closingPeriodInProgress && (
                            <span>
                                {userStakingData?.baseRewards
                                    ? formatCurrencyWithKey(THALES_CURRENCY, userStakingData?.baseRewards, 2)
                                    : '-'}
                            </span>
                        )}
                    </SectionTitle>
                    <SubTitle></SubTitle>
                    <DataWrapper>
                        <FlexDivColumn>
                            <InfoDiv>
                                <TooltipContainer>
                                    <span>{t('staking.rewards.base-rewards.your-staked')}</span>
                                    <Tooltip
                                        overlay={t('staking.rewards.base-rewards.tooltips.your-staked')}
                                        marginTop={2}
                                        mobileIconFontSize={11}
                                        iconFontSize={13}
                                    />
                                </TooltipContainer>
                                <span>{baseStakingRewardsData?.thalesStaked}</span>
                            </InfoDiv>
                            <InfoDiv>
                                <TooltipContainer>
                                    <Trans
                                        i18nKey="staking.rewards.base-rewards.staking-divider"
                                        components={{
                                            span: <span />,
                                        }}
                                    />
                                    <Tooltip
                                        overlay={t('staking.rewards.base-rewards.tooltips.your-staked')}
                                        marginTop={2}
                                        mobileIconFontSize={11}
                                        iconFontSize={13}
                                    />
                                </TooltipContainer>
                                <span>{pointsData?.thalesDivider}</span>
                            </InfoDiv>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoDiv>
                                <TooltipContainer>
                                    <span>{t('staking.rewards.base-rewards.total-staked')}</span>
                                    <Tooltip
                                        overlay={t('staking.rewards.base-rewards.tooltips.total-staked')}
                                        marginTop={2}
                                        mobileIconFontSize={11}
                                        iconFontSize={13}
                                    />
                                </TooltipContainer>
                                <span>{baseStakingRewardsData?.totalStaked}</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>{t('staking.rewards.base-rewards.staked-share')}</span>
                                <span>{baseStakingRewardsData?.share}</span>
                            </InfoDiv>
                        </FlexDivColumn>
                    </DataWrapper>
                </div>
            </LoadingContainer>
        </>
    );
};

const DataWrapper = styled(FlexDiv)`
    margin-top: 35px;
    gap: 30px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        gap: 0px;
        flex-direction: column;
        > ${FlexDivColumn} {
            width: 100%;
        }
    }
`;

export default BaseStakingRewards;
