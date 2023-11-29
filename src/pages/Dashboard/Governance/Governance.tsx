import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import useProposalsQuery from 'queries/useProposalsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { formatShortDateWithTime } from 'thales-utils';
import { Proposal } from 'types/governance';
import { buildHref } from 'utils/routes';
import {
    DoubleSideSectionSpan,
    InfoSection,
    InfoStats,
    InfoText,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const Governance: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const [latestProposal, setLatestProposal] = useState<Proposal>();

    const proposalsQuery = useProposalsQuery(SpaceKey.TIPS, 1, { enabled: isAppReady });

    useEffect(() => {
        if (proposalsQuery.isSuccess && proposalsQuery.data) {
            setLatestProposal(proposalsQuery.data[0]);
        }
    }, [proposalsQuery.isSuccess, proposalsQuery.data]);

    return (
        <SPAAnchor href={buildHref(ROUTES.Governance.Home)}>
            <WidgetWrapper>
                <WidgetHeader>
                    <WidgetIcon className="icon icon--governance" />
                    <TitleLabel>{t('dashboard.governance.title')}</TitleLabel>
                </WidgetHeader>

                <InfoSection side="left">
                    <DoubleSideSectionSpan>
                        <InfoStats>{latestProposal ? latestProposal.title.split(':')[0] + ':' : '-'}</InfoStats>
                        <br />
                        {latestProposal ? latestProposal.title.split(':')[1] : '-'}
                    </DoubleSideSectionSpan>
                    <InfoText>{t('dashboard.governance.start-date')}</InfoText>
                    <InfoText>{t('dashboard.governance.end-date')}</InfoText>
                </InfoSection>
                <InfoSection side="right">
                    <InfoStats>{latestProposal ? formatShortDateWithTime(latestProposal.start * 1000) : '-'}</InfoStats>
                    <InfoStats>{latestProposal ? formatShortDateWithTime(latestProposal.end * 1000) : '-'}</InfoStats>
                </InfoSection>
            </WidgetWrapper>
        </SPAAnchor>
    );
};

export default Governance;
