import {
    InfoSection,
    InfoStats,
    InfoText,
    WidgetHeader,
    WidgetIcon,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';

const IntegratorsVolume: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--integrators" />
                <WidgetTitleLabel>Integrators volume</WidgetTitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>Purebet</InfoText>
                <InfoText>BookieBot</InfoText>
                <InfoText>VegasBot</InfoText>
                <InfoText>TotalVolume</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ 24,523,564.76</InfoStats>
                <InfoStats>$ 4,536,745.54</InfoStats>
                <InfoStats>$ 564,652.43</InfoStats>
                <InfoStats>$ 100,929</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default IntegratorsVolume;
