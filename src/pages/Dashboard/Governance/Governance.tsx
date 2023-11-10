import SPAAnchor from 'components/SPAAnchor';
import {
    DoubleSideSection,
    InfoSection,
    InfoStats,
    InfoText,
    WidgetHeader,
    WidgetIcon,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';

const Governance: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--governance" />
                <WidgetTitleLabel>Governance</WidgetTitleLabel>
            </WidgetHeader>

            <InfoSection side="left">
                <DoubleSideSection>
                    <SPAAnchor href={''}>TIP-XXX: Placeholder for current TIP link</SPAAnchor>
                </DoubleSideSection>
                <InfoText>Start date</InfoText>
                <InfoText>End date</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>some date</InfoStats>
                <InfoStats>some date</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default Governance;
