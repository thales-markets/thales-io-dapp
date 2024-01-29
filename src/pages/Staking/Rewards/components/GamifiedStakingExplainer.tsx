import Collapse from 'components/Collapse';
import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { PointsData } from 'queries/token/usePointsBreakdownQuery';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsWalletConnected } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { SectionTitle } from '../../styled-components';
import { FinalPoints, FinalPointsTitle, LeaderboardLink, SectionText } from '../styled-components';

type GamifiedStakingExplainerProps = {
    pointsData: PointsData | undefined;
};

const GamifiedStakingExplainer: React.FC<GamifiedStakingExplainerProps> = ({ pointsData }) => {
    const { t } = useTranslation();

    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));

    return (
        <div>
            <SectionTitle>
                <span>
                    <i className="icon icon--house" />
                    {t('staking.rewards.how-it-works.title')}
                </span>
                <SPAAnchor href={ROUTES.Token.Leaderboard}>
                    <LeaderboardLink>
                        <i className="icon icon--protocol-volume" />
                        {t('staking.nav.leaderboard')}
                        <i className="icon icon--external-arrow" />
                    </LeaderboardLink>
                </SPAAnchor>
            </SectionTitle>
            <Collapse
                title={t('staking.rewards.how-it-works.each-week')}
                additionalStyling={{ titleFontSize: '13px', titleMarginBottom: '5px', titleMarginTop: '20px' }}
            >
                <SectionText>
                    <Trans
                        i18nKey="staking.rewards.how-it-works.each-week-description"
                        components={{
                            span: <span />,
                        }}
                    />
                </SectionText>
            </Collapse>
            <Collapse
                title={t('staking.rewards.how-it-works.how-points-are-earned-title')}
                additionalStyling={{ titleFontSize: '13px', titleMarginBottom: '5px', titleMarginTop: '20px' }}
            >
                <FinalPointsTitle>{t('staking.rewards.how-it-works.final-points')}</FinalPointsTitle>
                {isWalletConnected && (
                    <FinalPoints>
                        {pointsData?.totalPoints} = ({pointsData?.tradingPoints} + {pointsData?.lpPoints} +{' '}
                        {pointsData?.vaultsPoints}) x {pointsData?.stakingMultiplier}
                    </FinalPoints>
                )}
            </Collapse>
        </div>
    );
};

export default GamifiedStakingExplainer;
