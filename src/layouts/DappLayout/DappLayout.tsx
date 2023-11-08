import { Background } from 'styles/common';
import DappFooter from './DappFooter';
import DappHeader from './DappHeader';
import { Wrapper } from './styled-components';
import WavesBackground from 'components/WavesBackground';

const DappLayout: React.FC = ({ children }) => {
    return (
        <Background id="radial-background">
            <WavesBackground />
            <Wrapper>
                <DappHeader />
                {children}
                <DappFooter />
            </Wrapper>
        </Background>
    );
};

export default DappLayout;
