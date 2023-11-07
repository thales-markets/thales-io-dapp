import { Background } from 'styles/common';
import DappFooter from './DappFooter';
import DappHeader from './DappHeader';
import { Wrapper } from './styled-components';

const DappLayout: React.FC = ({ children }) => {
    return (
        <Background>
            <Wrapper>
                <DappHeader />
                {children}
                <DappFooter />
            </Wrapper>
        </Background>
    );
};

export default DappLayout;
