import { InfoSection, InfoStats, InfoText, WidgetTitleLabel } from '../styled-components';
import { Header, Wrapper } from './styled-components';

const TVLInfo: React.FC = () => {
    return (
        <Wrapper>
            <Header>
                <WidgetTitleLabel>TVL</WidgetTitleLabel>
            </Header>
            <InfoSection side="left">
                <InfoText>Overtime AMM TVL</InfoText>
                <InfoText>Thales AMM TVL</InfoText>
                <InfoText>Parlay AMM TVL</InfoText>
                <InfoText>Vaults</InfoText>
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

export default TVLInfo;
