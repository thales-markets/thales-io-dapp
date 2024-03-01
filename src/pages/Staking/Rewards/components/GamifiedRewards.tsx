import Collapse from 'components/Collapse';
import LoadingContainer from 'components/LoadingContainer';
import SPAAnchor from 'components/SPAAnchor';
import { THALES_CURRENCY } from 'constants/currency';
import ROUTES from 'constants/routes';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { InfoDiv, InfoDivRewards } from 'pages/Staking/styled-components';
import useGlobalStakingDataQuery from 'queries/token/useGlobalStakingDataQuery';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv, FlexDivColumn, FlexDivColumnCentered } from 'styles/common';
import { formatCurrency, formatCurrencyWithKey } from 'thales-utils';
import { GlobalStakingData, ThalesStakingData } from 'types/token';
import { formatMultiplier } from 'utils/formatters/number';
import { SectionTitle } from '../../styled-components';
import {
    FinalPoints,
    FinalPointsTitle,
    GamifiedRewardItem,
    ItemTitle,
    ItemValue,
    LeaderboardLink,
    SectionText,
    SubTitle,
} from '../styled-components';

type GamifiedRewardsProps = {
    stakingData: ThalesStakingData | undefined;
    pointsData: PointsData | undefined;
    isLoading: boolean;
    isClaimed: boolean;
};

const GamifiedRewards: React.FC<GamifiedRewardsProps> = ({ stakingData, pointsData, isLoading, isClaimed }) => {
    const { t } = useTranslation();
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [globalStakingData, setGlobalStakingData] = useState<GlobalStakingData | undefined>();

    const globalStakingDataQuery = useGlobalStakingDataQuery({ enabled: isAppReady });

    useEffect(() => {
        if (globalStakingDataQuery.isSuccess && globalStakingDataQuery.data) {
            setGlobalStakingData(globalStakingDataQuery.data);
        }
    }, [globalStakingDataQuery.isSuccess, globalStakingDataQuery.data]);

    return (
        <>
            <LoadingContainer isLoading={isLoading}>
                <div>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--gift" />
                            {t('staking.rewards.your-rewards.title')}
                        </span>
                        {!isMobile && !isClaimed && !stakingData?.closingPeriodInProgress && (
                            <span>
                                <GamifiedRewardItem>
                                    <ItemTitle>
                                        <Trans
                                            i18nKey={'staking.rewards.how-it-works.for-period'}
                                            values={{
                                                round: stakingData?.period,
                                            }}
                                        />
                                    </ItemTitle>
                                    <ItemValue>
                                        {pointsData?.totalBonusRewards
                                            ? formatCurrencyWithKey(THALES_CURRENCY, pointsData?.totalBonusRewards, 2)
                                            : '-'}
                                    </ItemValue>
                                </GamifiedRewardItem>
                            </span>
                        )}
                    </SectionTitle>
                    {!isMobile && (
                        <SubTitleWrapper>
                            <FlexDivColumn>
                                <SubTitle>
                                    <span>{t('staking.rewards.base-rewards.current-multiplier')}</span>
                                    <span>{`${
                                        pointsData?.stakingMultiplier
                                            ? formatMultiplier(pointsData?.stakingMultiplier)
                                            : '-'
                                    }`}</span>
                                </SubTitle>
                                <SubTitle>
                                    <span>{t('staking.rewards.your-rewards.current-points')}</span>
                                    <span>{pointsData?.totalPoints || '-'}</span>
                                </SubTitle>
                            </FlexDivColumn>
                            <LeaderboardLinkContainer>
                                <SPAAnchor href={ROUTES.Token.Staking.Leaderboard}>
                                    <LeaderboardLink>
                                        <i className="icon icon--protocol-volume" />
                                        {t('staking.nav.leaderboard')}
                                        <i className="icon icon--external-arrow" />
                                    </LeaderboardLink>
                                </SPAAnchor>
                            </LeaderboardLinkContainer>
                        </SubTitleWrapper>
                    )}
                    {isMobile && (
                        <>
                            <FlexDivColumn>
                                <InfoDiv>
                                    <span>
                                        {t('staking.rewards.how-it-works.for-period', { round: stakingData?.period })}
                                    </span>
                                    <span>
                                        <HighlightedValue>
                                            {pointsData?.totalBonusRewards
                                                ? formatCurrencyWithKey(
                                                      THALES_CURRENCY,
                                                      pointsData?.totalBonusRewards,
                                                      2
                                                  )
                                                : '-'}
                                        </HighlightedValue>
                                    </span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.rewards.base-rewards.current-multiplier')}</span>
                                    <span>
                                        <HighlightedValue>{`${
                                            pointsData?.stakingMultiplier
                                                ? formatMultiplier(pointsData?.stakingMultiplier)
                                                : '-'
                                        }`}</HighlightedValue>
                                    </span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.rewards.your-rewards.current-points')}</span>
                                    <span>
                                        <HighlightedValue>{pointsData?.totalPoints || '-'}</HighlightedValue>
                                    </span>
                                </InfoDiv>
                            </FlexDivColumn>
                            <LeaderboardLinkContainer>
                                <SPAAnchor href={ROUTES.Token.Staking.Leaderboard}>
                                    <LeaderboardLink>
                                        <i className="icon icon--protocol-volume" />
                                        {t('staking.nav.leaderboard')}
                                        <i className="icon icon--external-arrow" />
                                    </LeaderboardLink>
                                </SPAAnchor>
                            </LeaderboardLinkContainer>
                        </>
                    )}
                    <Collapse
                        title={t('staking.rewards.how-it-works.title')}
                        additionalStyling={{
                            titleFontSize: '13px',
                            titleMarginBottom: '5px',
                            titleMarginTop: '20px',
                            downwardsArrowAlignRight: true,
                        }}
                    >
                        <SectionText style={{ marginBottom: '10px' }}>
                            <Trans
                                i18nKey="staking.rewards.how-it-works.description"
                                components={{
                                    span: <span />,
                                    br: <br />,
                                    ul: <ListItem />,
                                    li: <li />,
                                }}
                                values={{
                                    periodReward: formatCurrency(globalStakingData?.baseRewards ?? 0),
                                }}
                            />
                        </SectionText>
                    </Collapse>
                    <Collapse
                        title={t('staking.rewards.how-it-works.points-breakdown-for-round', {
                            round: stakingData?.period,
                        })}
                        additionalStyling={{
                            titleFontSize: '13px',
                            titleMarginBottom: '5px',
                            titleMarginTop: '20px',
                            downwardsArrowAlignRight: true,
                        }}
                    >
                        <FlexDiv gap="30px" style={{ marginBottom: '10px' }}>
                            <FlexDivColumn>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.trading-volume')}</span>
                                    <span></span>
                                    <span>{pointsData?.tradingVolume}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.amm-lp-balances')}</span>
                                    <span></span>
                                    <span>{pointsData?.lpVolume}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.vaults-balances')}</span>
                                    <span></span>
                                    <span>{pointsData?.vaultsVolume}</span>
                                </InfoDivRewards>
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.trading-multiplier')}</span>
                                    <span></span>
                                    <span>{formatMultiplier(pointsData?.tradingMultiplier)}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.lp-multiplier')}</span>
                                    <span></span>
                                    <span>{formatMultiplier(pointsData?.lpMultiplier)}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.vaults-multiplier')}</span>
                                    <span></span>
                                    <span>{formatMultiplier(pointsData?.vaultsMultiplier)}</span>
                                </InfoDivRewards>
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.points')}</span>
                                    <span></span>
                                    <span>{pointsData?.tradingPoints}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.points')}</span>
                                    <span></span>
                                    <span>{pointsData?.lpPoints}</span>
                                </InfoDivRewards>
                                <InfoDivRewards>
                                    <span>{t('staking.rewards.your-rewards.points')}</span>
                                    <span></span>
                                    <span>{pointsData?.vaultsPoints}</span>
                                </InfoDivRewards>
                            </FlexDivColumn>
                        </FlexDiv>
                    </Collapse>
                    {isWalletConnected && (
                        <FlexDivColumnCentered>
                            <FinalPointsTitle>{t('staking.rewards.how-it-works.final-points')}</FinalPointsTitle>
                            <FinalPoints>
                                {pointsData?.totalPoints} = ({pointsData?.tradingPoints} + {pointsData?.lpPoints} +{' '}
                                {pointsData?.vaultsPoints}) x {pointsData?.stakingMultiplier}
                            </FinalPoints>
                        </FlexDivColumnCentered>
                    )}
                </div>
            </LoadingContainer>
        </>
    );
};

const HighlightedValue = styled.span`
    color: ${(props) => props.theme.textColor.secondary};
`;

const SubTitleWrapper = styled(FlexDiv)`
    justify-content: space-between;
    align-items: flex-start;
`;

const LeaderboardLinkContainer = styled(FlexDiv)`
    justify-content: flex-end;
    align-items: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        justify-content: center;
        margin-top: 10px;
    }
`;

const ListItem = styled.ul`
    li {
        list-style-type: circle;
        list-style-position: inside;
    }
`;

export default GamifiedRewards;
