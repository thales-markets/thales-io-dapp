import SimpleLoader from 'components/SimpleLoader';
import { THALES_CURRENCY } from 'constants/currency';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { InfoDiv } from 'pages/Staking/styled-components';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { BaseRewardsData, UserStakingData } from 'types/token';
import { SectionTitle } from '../../styled-components';
import { SubTitle } from '../styled-components';

type BaseStakingRewardsProps = {
    userStakingData: UserStakingData | undefined;
    baseStakingRewardsData: BaseRewardsData | undefined;
    pointsData: PointsData | undefined;
    isLoading: boolean;
    isClaimed: boolean;
};

const BaseStakingRewards: React.FC<BaseStakingRewardsProps> = ({
    userStakingData,
    baseStakingRewardsData,
    pointsData,
    isLoading,
    isClaimed,
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
                        {!isClaimed && (
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
                    </DataWrapper>
                </div>
            )}
        </>
    );
};

const LoaderWrapper = styled(FlexDiv)`
    margin: 40px 0px;
`;

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
