import Banner from 'components/Banner';
import WavesBackground from 'components/WavesBackground';
import Footer from 'pages/LandingPage/Footer';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIsMobile } from 'redux/modules/ui';
import { Background } from 'styles/common';
import DappHeader from './DappHeader';
import { ChildWrapper, Wrapper } from './styled-components';

const DappLayout: React.FC = ({ children }) => {
    const isMobile = useSelector(getIsMobile);

    return (
        <>
            <Background id="radial-background" />
            {!isMobile && <WavesBackground />}
            <Banner />
            <Wrapper>
                <DappHeader />
                <ChildWrapper>{children}</ChildWrapper>
                <Footer />
            </Wrapper>
            <ToastContainer theme={'colored'} />
        </>
    );
};

export default DappLayout;
