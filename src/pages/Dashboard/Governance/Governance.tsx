import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import useProposalsQuery from 'queries/dashboard/useProposalsQuery';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
    // TODO: IS APP READY
    const proposalsQuery = useProposalsQuery(SpaceKey.TIPS, { enabled: true });
    const proposals = useMemo(
        () => (proposalsQuery.isSuccess && proposalsQuery.data ? proposalsQuery.data : []),
        [proposalsQuery.isSuccess, proposalsQuery.data]
    );

    const lastProposal = proposals[0];

    console.log(lastProposal);
    return (
        <SPAAnchor href={buildHref(ROUTES.Governance)}>
            <WidgetWrapper>
                <WidgetHeader>
                    <WidgetIcon className="icon icon--governance" />
                    <TitleLabel>{t('dashboard.governance.title')}</TitleLabel>
                </WidgetHeader>

                <InfoSection side="left">
                    <DoubleSideSectionSpan>
                        <SPAAnchor href={''}>TIP-XXX: Placeholder for current TIP link</SPAAnchor>
                    </DoubleSideSectionSpan>
                    <InfoText>{t('dashboard.governance.start-date')}</InfoText>
                    <InfoText>{t('dashboard.governance.end-date')}</InfoText>
                </InfoSection>
                <InfoSection side="right">
                    <InfoStats>some date</InfoStats>
                    <InfoStats>some date</InfoStats>
                </InfoSection>
            </WidgetWrapper>
        </SPAAnchor>
    );
};

export default Governance;
