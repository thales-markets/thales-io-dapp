import { InfoSection, InfoStats, InfoText, WidgetHeader, WidgetTitleLabel, WidgetWrapper } from '../styled-components';

const Governance: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetTitleLabel>Governance</WidgetTitleLabel>
            </WidgetHeader>

            <InfoSection side="left">
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
