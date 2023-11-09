import { InfoSection, InfoStats, InfoText, WidgetTitleLabel } from '../styled-components';
import { Header, Wrapper } from './styled-components';

const IntegratorsVolume: React.FC = () => {
    return (
        <Wrapper>
            <Header>
                <WidgetTitleLabel>Integrators volume</WidgetTitleLabel>
            </Header>
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
        </Wrapper>
    );
};

export default IntegratorsVolume;
