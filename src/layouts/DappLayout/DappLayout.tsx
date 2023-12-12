import WavesBackground from 'components/WavesBackground';
import { Background } from 'styles/common';
import DappFooter from './DappFooter';
import DappHeader from './DappHeader';
import { Wrapper } from './styled-components';

const DappLayout: React.FC = ({ children }) => {
    return (
        <div>
            <Background id="radial-background" />
            <WavesBackground />
            <Wrapper>
                <DappHeader />
                {children}
                <DappFooter />
            </Wrapper>
        </div>
    );
};

export default DappLayout;
